// LLM API wrapper for the Ericsson Mimir endpoint (a GPT-5.4 proxy).
//
// Calls go through a local Vite dev-server proxy (/mimir -> internal endpoint), which
// clears browser CORS and lets Node accept the internal TLS certificate. The bearer token
// is supplied by the user (from Microsoft Graph Explorer), held in sessionStorage only,
// and cleared on tab close. The token expires and must be refreshed periodically.

const API_URL = '/mimir/v1/chat/completions';
const MODEL = 'gpt-5.4';
const TEMPERATURE = 0.3;
const TOP_P = 0.5;

// The Mimir guide documents a non-streaming request. Flip to true once the endpoint's SSE
// support and event format are confirmed (see the streaming branch below).
const USE_STREAMING = false;

const TOKEN_KEY = 'mimir_token';

export function getApiKey() {
  return sessionStorage.getItem(TOKEN_KEY) || '';
}

export function setApiKey(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearApiKey() {
  sessionStorage.removeItem(TOKEN_KEY);
}

// Extract assistant text from whichever response shape the proxy returns. Handles OpenAI
// Chat Completions (choices[].message.content), the Responses API (output[].content[].text
// or output_text), and a couple of fallbacks. Defensive on purpose: the guide is ambiguous
// about which contract the proxy actually exposes.
function extractText(data) {
  if (!data) return '';
  if (typeof data.output_text === 'string') return data.output_text;
  if (Array.isArray(data.choices) && data.choices[0]) {
    const c = data.choices[0];
    if (c.message && typeof c.message.content === 'string') return c.message.content;
    if (typeof c.text === 'string') return c.text;
  }
  if (Array.isArray(data.output)) {
    const parts = [];
    for (const item of data.output) {
      if (Array.isArray(item.content)) {
        for (const ct of item.content) {
          if (typeof ct.text === 'string') parts.push(ct.text);
        }
      } else if (typeof item.text === 'string') {
        parts.push(item.text);
      }
    }
    if (parts.length) return parts.join('');
  }
  return '';
}

/**
 * Call the Mimir LLM. onChunk(text) is invoked as text arrives (once, for non-streaming).
 * Resolves when the response is complete. Throws on error.
 */
export async function streamCompletion({ system, userMessage, onChunk, maxTokens = 1500 }) {
  const token = getApiKey();
  if (!token) throw new Error('Token not set. Click the token indicator in the header to set it.');

  // maxTokens is not sent yet: the guide's example omits it and the correct field name
  // (max_tokens vs max_completion_tokens) is unconfirmed for this proxy. The endpoint
  // applies its own default. If output gets truncated, add the right field here.
  void maxTokens;

  const body = {
    model: MODEL,
    input: [
      { role: 'system', content: system },
      { role: 'user', content: userMessage },
    ],
    temperature: TEMPERATURE,
    top_p: TOP_P,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  if (USE_STREAMING) body.stream = true;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let detail = '';
    try {
      detail = await response.text();
    } catch (e) {
      /* swallow */
    }
    throw new Error(`API ${response.status}\n${detail.slice(0, 400)}`);
  }

  if (!USE_STREAMING) {
    const data = await response.json();
    const text = extractText(data);
    if (!text) {
      throw new Error(`Could not parse the response. Raw start:\n${JSON.stringify(data).slice(0, 400)}`);
    }
    onChunk(text);
    return;
  }

  // Streaming path (OpenAI-style server-sent events). Enable via USE_STREAMING once the
  // endpoint's streaming format is confirmed. Handles Chat Completions deltas and a couple
  // of Responses-API delta shapes.
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const dataStr = line.slice(6).trim();
      if (!dataStr || dataStr === '[DONE]') continue;
      try {
        const event = JSON.parse(dataStr);
        const delta =
          event.choices?.[0]?.delta?.content ??
          (typeof event.delta === 'string' ? event.delta : '') ??
          '';
        if (typeof delta === 'string' && delta) onChunk(delta);
      } catch (e) {
        // ignore partial events
      }
    }
  }
}
