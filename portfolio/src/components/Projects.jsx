export default function Projects() {
  return (
    <section
      className="work-section wrap section"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow mono">
            <span className="accent">03 /</span> SELECTED WORK
          </p>
          <h2 id="work-title">
            Built with <span className="serif">intent.</span>
          </h2>
        </div>
        <p className="section-intro">
          The problem, the approach, and the code.
          <br />A few things I’ve put into the world.
        </p>
      </div>
      <div className="project-grid">
        <article className="project" data-category="ai">
          <a
            href="https://github.com/MSNP1381/kaggle-Agent"
            target="_blank"
            rel="noopener noreferrer"
            className="project-art agent-art"
            aria-label="View Kaggle Agent source on GitHub"
          >
            <span className="art-top mono">AGENT ORCHESTRATION / 001</span>
            <svg
              viewBox="0 0 560 280"
              role="img"
              aria-label="Kaggle Agent workflow from data through planning, coding and execution"
            >
              <defs>
                <pattern
                  id="grid"
                  width="22"
                  height="22"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r=".65" fill="#575757" />
                </pattern>
              </defs>
              <rect width="560" height="280" fill="url(#grid)" />
              <g fill="none" stroke="#717171">
                <path d="M95 140H195M275 140H365M445 140H485" />
                <path d="M405 165V218H235V166" strokeDasharray="4 5" />
                <path d="m229 174 6-8 6 8" />
              </g>
              <g fontFamily="monospace" fontSize="11" textAnchor="middle">
                <rect
                  x="35"
                  y="116"
                  width="90"
                  height="48"
                  rx="4"
                  fill="#212121"
                  stroke="#5f5f5f"
                />
                <text x="80" y="144" fill="#c1c1c1">
                  DATA
                </text>
                <rect
                  x="175"
                  y="110"
                  width="120"
                  height="60"
                  rx="4"
                  fill="#ffffff"
                />
                <text x="235" y="136" fill="#262626">
                  PLANNER
                </text>
                <text x="235" y="153" fill="#626262" fontSize="9">
                  reason → plan
                </text>
                <rect
                  x="355"
                  y="110"
                  width="100"
                  height="60"
                  rx="4"
                  fill="#212121"
                  stroke="#989898"
                />
                <text x="405" y="136" fill="#dedede">
                  EXECUTOR
                </text>
                <text x="405" y="153" fill="#a0a0a0" fontSize="9">
                  code → run
                </text>
                <text x="320" y="239" fill="#8c8c8c" fontSize="9">
                  REFLECT & REPLAN
                </text>
              </g>
              <circle cx="488" cy="140" r="5" fill="#ffffff" />
            </svg>
            <span className="art-bottom mono">
              PLAN. CODE. EXECUTE. REPEAT.<span>↗</span>
            </span>
          </a>
          <div className="project-meta mono">
            <span>AI / DEVELOPER TOOLS</span>
            <span>OPEN SOURCE ↗</span>
          </div>
          <h3>
            Kaggle Agent<span>01</span>
          </h3>
          <p className="project-description">
            From a machine learning challenge to an agent-driven workflow.
          </p>
          <div className="tags mono">
            <span>Python</span>
            <span>LangGraph</span>
            <span>Docker</span>
          </div>
          <details>
            <summary>
              The why & the how <span>+</span>
            </summary>
            <div className="project-details">
              <h4>Why I built it</h4>
              <p>
                ML challenges involve a repeated loop of understanding data,
                planning experiments, writing code, and reacting to results.
                This project explores how much of that loop agents can take on.
              </p>
              <h4>How it works</h4>
              <p>
                A planner, task enhancer, code-generation agent, replanner, and
                executor work together. Generated code runs through a feedback
                loop that reflects on errors before another attempt.
              </p>
              <a
                href="https://github.com/MSNP1381/kaggle-Agent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the repository ↗
              </a>
            </div>
          </details>
        </article>
        <article className="project" data-category="infrastructure">
          <a
            href="https://github.com/MSNP1381/cache-cool"
            target="_blank"
            rel="noopener noreferrer"
            className="project-art cache-art"
            aria-label="View Cache-cool source on GitHub"
          >
            <span className="art-top mono">LLM INFRASTRUCTURE / 002</span>
            <div className="cache-visual">
              <div className="cache-orbit orbit-one"></div>
              <div className="cache-orbit orbit-two"></div>
              <div className="cache-core">
                <span>↯</span>
              </div>
              <div className="orbit-label label-request mono">REQUEST</div>
              <div className="orbit-label label-cache mono">
                <i></i> CACHE HIT
              </div>
              <div className="orbit-label label-response mono">RESPONSE</div>
            </div>
            <span className="art-bottom mono">
              THE BEST API CALL? THE ONE YOU DON’T MAKE.<span>↗</span>
            </span>
          </a>
          <div className="project-meta mono">
            <span>BACKEND / INFRASTRUCTURE</span>
            <span>OPEN SOURCE ↗</span>
          </div>
          <h3>
            Cache-cool<span>02</span>
          </h3>
          <p className="project-description">
            A caching layer between your application and your LLM bill.
          </p>
          <div className="tags mono">
            <span>FastAPI</span>
            <span>Redis</span>
            <span>MongoDB</span>
          </div>
          <details>
            <summary>
              The why & the how <span>+</span>
            </summary>
            <div className="project-details">
              <h4>Why I built it</h4>
              <p>
                Repeated LLM requests shouldn’t always mean repeated latency and
                cost. Cache-cool puts a reusable caching proxy in front of model
                providers.
              </p>
              <h4>How it works</h4>
              <p>
                A FastAPI proxy returns cached chat completions or forwards
                requests to the configured provider. Redis, MongoDB, and JSON
                backends offer different storage options, with dynamic
                configuration and LRU eviction support.
              </p>
              <a
                href="https://github.com/MSNP1381/cache-cool"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the repository ↗
              </a>
            </div>
          </details>
        </article>
      </div>
      <a
        className="all-projects mono"
        href="https://github.com/msnp1381?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>THERE’S MORE IN THE REPOS</span>
        <span>Explore GitHub ↗</span>
      </a>
    </section>
  );
}
