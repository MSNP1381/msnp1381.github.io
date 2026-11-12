export default function About() {
  return (
    <section
      className="about-section section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="wrap about-grid">
        <div>
          <p className="eyebrow mono">
            <span className="accent">01 /</span> INTRO / THE HUMAN BEHIND THE
            TERMINAL
          </p>
          <h1 id="about-title">
            Muhammad Sadegh
            <br />
            <span className="serif">Nematpour.</span>
          </h1>
          <p className="intro-role mono">
            SENIOR SOFTWARE ENGINEER & AI ENGINEER
          </p>
          <a
            className="inline-link mono"
            href="https://www.linkedin.com/in/msnp1381/"
            target="_blank"
            rel="noopener noreferrer"
          >
            THE LONGER STORY ON LINKEDIN ↗
          </a>
        </div>
        <div className="about-content">
          <p className="about-lead">
            I’m Muhammad Sadegh Nematpour.
            <br />
            You can call me <span className="accent">MSNP.</span>
          </p>
          <p>
            My work lives where software engineering meets artificial
            intelligence: agents that act, backends that hold up, and tools that
            make the next build a little easier.
          </p>
          <p>
            I’m interested in the whole system — from the model’s behavior to
            the API, the data, and the infrastructure underneath. Building it is
            only part of the work. Understanding why it should exist is the
            other.
          </p>
          <div className="capabilities">
            <div>
              <span className="mono">01</span>
              <h3>Intelligence, applied.</h3>
              <p>LLM agents · RAG · Structured outputs · Evaluation</p>
            </div>
            <div>
              <span className="mono">02</span>
              <h3>Software, engineered.</h3>
              <p>Python · FastAPI · PostgreSQL · Redis · Docker</p>
            </div>
            <div>
              <span className="mono">03</span>
              <h3>Ideas, shared.</h3>
              <p>Open source · Technical writing · Building in public</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
