import { downloadResume } from "../data/resume.js";
export default function ResumeDialog({ dialogRef: ref, onBackdrop }) {
  return (
    <dialog id="resume-dialog" ref={ref} onClick={onBackdrop}>
      <div className="dialog-top mono">
        <span>~/MSNP/RESUME</span>
        <button
          id="close-resume"
          onClick={() => ref.current.close()}
          aria-label="Close résumé"
        >
          ✕
        </button>
      </div>
      <div className="resume-content">
        <p className="eyebrow mono">SOFTWARE × INTELLIGENCE</p>
        <h2>
          Muhammad Sadegh
          <br />
          Nematpour<span className="accent">.</span>
        </h2>
        <p className="resume-role">Senior Software & AI Engineer</p>
        <p>
          I build software and applied AI systems, with a focus on LLM agents,
          retrieval, backend architecture, and developer tools.
        </p>
        <h3>Engineering focus</h3>
        <p>
          Python, FastAPI, LangGraph, LangChain, PostgreSQL, pgvector, Redis,
          MongoDB, Docker, and structured model outputs.
        </p>
        <h3>Selected open source</h3>
        <p>
          <strong>Kaggle Agent</strong> — planning, code generation, execution,
          and reflection for ML challenges.
        </p>
        <p>
          <strong>Cache-cool</strong> — a configurable LLM caching proxy with
          Redis, MongoDB, and JSON backends.
        </p>
        <h3>Education</h3>
        <p>Iran University of Science and Technology · 2020–2025</p>
        <p className="resume-note">
          A concise portfolio résumé. See LinkedIn for the full experience
          record.
        </p>
        <div className="resume-actions">
          <button
            className="button primary"
            id="download-resume"
            onClick={downloadResume}
          >
            Download résumé ↓
          </button>
          <a
            className="inline-link"
            href="https://www.linkedin.com/in/msnp1381/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </dialog>
  );
}
