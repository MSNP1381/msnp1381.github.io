export default function Experience() {
  return (
    <section
      className="experience-section section wrap"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow mono">
            <span className="accent">02 /</span> THE PATH SO FAR
          </p>
          <h2 id="experience-title">
            Work & <span className="serif">education.</span>
          </h2>
        </div>
        <a
          className="inline-link mono"
          href="https://www.linkedin.com/in/msnp1381/"
          target="_blank"
          rel="noreferrer"
        >
          FULL EXPERIENCE ON LINKEDIN ↗
        </a>
      </div>
      <div className="career-timeline">
        <article className="timeline-entry">
          <div className="timeline-meta mono">
            <span>WORK</span>
            <span>ENGINEERING PRACTICE</span>
          </div>
          <div className="timeline-content">
            <h3>Software engineering × applied AI</h3>
            <p>
              LLM agents, backend architecture, retrieval, and the
              infrastructure that makes intelligent systems useful.
            </p>
            <div className="tags mono">
              <span>Python</span>
              <span>FastAPI</span>
              <span>LangGraph</span>
              <span>System design</span>
            </div>
          </div>
        </article>
        <article className="timeline-entry">
          <div className="timeline-meta mono">
            <span>OPEN SOURCE</span>
            <span>SELECTED WORK</span>
          </div>
          <div className="timeline-content">
            <h3>From experiments to tools.</h3>
            <p>
              Kaggle Agent explores planning and execution for machine learning
              challenges. Cache-cool puts a reusable caching layer in front of
              LLM providers.
            </p>
            <a className="inline-link mono" href="#work">
              EXPLORE THE PROJECTS ↓
            </a>
          </div>
        </article>
        <article className="timeline-entry" id="education">
          <div className="timeline-meta mono">
            <span>EDUCATION</span>
            <span>2020 — 2025</span>
          </div>
          <div className="timeline-content">
            <h3>
              Iran University of
              <br />
              Science and Technology
            </h3>
            <p>
              A foundation for an ongoing practice of learning, questioning, and
              building.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
