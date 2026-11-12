import { blogUrl } from "../data/site.js";
export default function Writing() {
  return (
    <section
      className="writing-section section wrap"
      id="log"
      aria-labelledby="log-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow mono">
            <span className="accent">05 /</span> FIELD NOTES
          </p>
          <h2 id="log-title">
            Thinking <span className="serif">out loud.</span>
          </h2>
        </div>
        <a
          className="inline-link mono"
          href={blogUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          BINARY THOUGHTS OF MINE ↗
        </a>
      </div>
      <div id="writing-list">
        <a
          className="writing-row"
          href={blogUrl("posts/Evolution-Prompt/")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mono writing-date">SEP 07, 2024</span>
          <h3>The evolution of prompt engineering</h3>
          <span className="mono writing-tag">AI / LANGUAGE MODELS</span>
          <span className="writing-arrow">↗</span>
        </a>
        <a
          className="writing-row"
          href={blogUrl("posts/Revolutionizing-Kaggle-Challenges/")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mono writing-date">JUL 24, 2024</span>
          <h3>Introducing the AI-powered problem solver</h3>
          <span className="mono writing-tag">AGENTS / MACHINE LEARNING</span>
          <span className="writing-arrow">↗</span>
        </a>
        <a
          className="writing-row"
          href={blogUrl("posts/a-dilemma-in-ai-development/")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mono writing-date">JUL 11, 2024</span>
          <h3>A dilemma in AI development</h3>
          <span className="mono writing-tag">AI / CRITICAL THINKING</span>
          <span className="writing-arrow">↗</span>
        </a>
      </div>
    </section>
  );
}
