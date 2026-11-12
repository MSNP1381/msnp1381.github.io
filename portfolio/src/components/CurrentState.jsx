import { blogUrl } from "../data/site.js";
export default function CurrentState() {
  return (
    <section
      className="now-section section wrap"
      id="now"
      aria-labelledby="now-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow mono">
            <span className="accent">04 /</span> CURRENT STATE
          </p>
          <h2 id="now-title">
            Always <span className="serif">in progress.</span>
          </h2>
        </div>
        <span className="state-indicator mono">
          <span className="status-dot"></span> BUILDING & EXPLORING
        </span>
      </div>
      <div className="now-grid">
        <div className="now-card">
          <span className="mono card-index">[ BUILD ]</span>
          <h3>Useful intelligence.</h3>
          <p>
            Agents, retrieval, and the software that connects language models to
            real tasks.
          </p>
          <span className="mono now-foot">APPLIED AI / SYSTEMS</span>
        </div>
        <div className="now-card">
          <span className="mono card-index">[ THINK ]</span>
          <h3>Beyond the demo.</h3>
          <p>
            The gap between an impressive prototype and a system you can
            actually depend on.
          </p>
          <span className="mono now-foot">ARCHITECTURE / RELIABILITY</span>
        </div>
        <div className="now-card">
          <span className="mono card-index">[ SHARE ]</span>
          <h3>Leave a trail.</h3>
          <p>
            Open repositories and field notes about experiments, questions, and
            lessons along the way.
          </p>
          <a
            className="mono now-foot"
            href={blogUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            READ THE BLOG ↗
          </a>
        </div>
      </div>
      <p className="now-note mono">
        A snapshot of my engineering interests. For my latest role and
        availability,{" "}
        <a
          href="https://www.linkedin.com/in/msnp1381/"
          target="_blank"
          rel="noopener noreferrer"
        >
          find me on LinkedIn ↗
        </a>
      </p>
    </section>
  );
}
