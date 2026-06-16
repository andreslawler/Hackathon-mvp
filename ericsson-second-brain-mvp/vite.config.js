import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Proxy LLM calls to the internal Mimir endpoint. This clears browser CORS (the call
    // is same-origin from the browser's view) and lets Node accept the internal TLS cert.
    // The dev server must run on the Ericsson corporate network to reach the endpoint.
    proxy: {
      '/mimir': {
        target: 'https://atopredict-mimir-europe.internal.ericsson.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/mimir/, ''),
      },
    },
  },
});
