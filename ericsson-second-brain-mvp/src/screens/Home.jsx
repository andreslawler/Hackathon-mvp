export default function Home({ onNavigate }) {
  return (
    <>
      <header className="screen-header">
        <div className="screen-kicker">Ericsson's Second Brain — MVP</div>
        <h1 className="screen-title">
          Capturing how <em>we decide</em>, and how our <em>customers negotiate</em>
        </h1>
        <p className="screen-deck">
          A working probe. Three commercial use cases. Each runs the same scenario twice — once with
          a generic LLM and public information, once with Ericsson role skills, customer
          behavioural patterns, prior deal history, and won/loss debriefs loaded. Same model. Same
          scenario. Only the captured knowledge differs.
        </p>
      </header>

      <div className="home-cards">
        <Card
          n="01"
          title="Budgetary quotation"
          body="From an RFI, generate a pricing schedule, solution description, and statement of compliance. Compare what a generic model writes against what an Ericsson commercial team would write."
          onClick={() => onNavigate('uc1')}
        />
        <Card
          n="02"
          title="Negotiation advisor"
          body="A live negotiation scenario. The Second Brain reads the customer's known pattern, references prior deals, and recommends a commercial construct rather than a list-price move."
          onClick={() => onNavigate('uc2')}
        />
        <Card
          n="03"
          title="Contracting"
          body="A contract deviation assessment. The Second Brain has the BCTC catalogue with Ericsson wanted positions and the customer's known contract pattern."
          onClick={() => onNavigate('uc3')}
        />
      </div>

      <div className="home-thesis">
        <h2>What this demonstrates</h2>
        <p>
          The advantage in AI-first commercial operations will not come from the model. It will not
          come from a data lake. A generic model on a data lake can retrieve what happened — it
          cannot reason about why, or decide what to do next, the way an experienced operator
          would.
        </p>
        <p>
          That reasoning — the institutional judgement of how Ericsson does business, and how each
          major customer actually behaves — is the scarce asset. The companies that capture it
          arrive at the AI-first future with an edge. The ones that do not arrive as a commodity.
        </p>
      </div>
    </>
  );
}

function Card({ n, title, body, onClick }) {
  return (
    <div className="home-card" onClick={onClick}>
      <div className="num">{n}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
