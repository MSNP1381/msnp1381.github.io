import { useEffect, useRef, useState } from "react";
import { commandHelp, profile, projects } from "../data/profile";
import { downloadResume } from "../data/resume";

const prompt = "visitor@msnp:~$";

const sections = {
  projects: "work",
  work: "experience",
  education: "education",
  about: "about",
  now: "now",
  blog: "log",
  contact: "contact",
  "~": "terminal",
  "/": "terminal",
};
export default function Terminal({ onResume }) {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState([]);
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => {
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [entries]);
  const clear = () => {
    setEntries([]);
  };
  const links = (
    <>
      {Object.entries(profile.links).map(([name, url]) => (
        <p key={name}>
          <a href={url} target="_blank" rel="noreferrer">
            {name.padEnd(10, " ")} ↗ {url.replace("https://", "")}
          </a>
        </p>
      ))}
    </>
  );
  const run = (value) => {
    const raw = value.trim();
    if (!raw) return;
    const [cmd, ...args] = raw.split(/\s+/);
    const command = cmd.toLowerCase();
    setHistory((prev) => [...prev, raw]);
    setCursor(history.length + 1);
    setInput("");
    let response;
    switch (command) {
      case "help":
        response = (
          <>
            {Object.entries(commandHelp)
              .filter(
                ([name]) =>
                  args[0] === "all" ||
                  ["whoami", "resume", "projects", "contact", "clear"].includes(
                    name,
                  ),
              )
              .map(([name, desc]) => (
                <div className="command-row" key={name}>
                  <button className="command-name" onClick={() => run(name)}>
                    {name}
                  </button>
                  <span>{desc}</span>
                </div>
              ))}
          </>
        );
        break;
      case "whoami":
        response = (
          <>
            <p className="accent">{profile.name}</p>
            <p>{profile.role}</p>
            <p>{profile.focus}</p>
          </>
        );
        break;
      case "resume":
        if (args.length && args.join(" ") !== "download") {
          response = "Usage: resume [download]";
          break;
        }
        if (args[0] === "download") {
          downloadResume();
          response = "Saved resume.md.";
        } else {
          onResume();
          response = "resume.md opened.";
        }
        break;
      case "projects":
        response = (
          <>
            {projects.map((p) => (
              <p key={p.name}>
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.name} ↗
                </a>
                <br />
                {p.description}
              </p>
            ))}
            <a href="#work">View projects</a>
          </>
        );
        break;
      case "stack":
        response = (
          <>
            <p className="accent">Engineering toolkit</p>
            <p>{profile.stack.join(" · ")}</p>
          </>
        );
        break;
      case "now":
        response = (
          <>
            <p>Focus: agentic systems, useful AI, and reliable backends.</p>
            <p>
              Role & availability:{" "}
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                Check my latest LinkedIn profile ↗
              </a>
            </p>
            <a href="#now">View current focus</a>
          </>
        );
        break;
      case "contact":
        response = links;
        break;
      case "github":
      case "blog":
        response = (
          <a href={profile.links[command]} target="_blank" rel="noreferrer">
            Open {command} ↗
          </a>
        );
        break;
      case "ls":
        response =
          "about/    projects/    now/    blog/\nresume.md    stack.json    contact.txt";
        break;
      case "pwd":
        response = "/home/visitor";
        break;
      case "date":
        response = new Date().toLocaleString("en-GB", {
          dateStyle: "full",
          timeStyle: "short",
        });
        break;
      case "echo":
        response = args.join(" ");
        break;
      case "cat":
        if (args[0] === "resume.md") {
          onResume();
          response = "Opening resume.md…";
        } else if (args[0] === "stack.json")
          response = JSON.stringify({ stack: profile.stack }, null, 2);
        else if (args[0] === "contact.txt") response = links;
        else
          response = args.length
            ? `cat: ${args.join(" ")}: No such file. Try ls.`
            : "Usage: cat resume.md | stack.json | contact.txt";
        break;
      case "cd": {
        const target = sections[(args[0] || "~").replace(/\/$/, "") || "/"];
        if (target) {
          setTimeout(
            () =>
              document.getElementById(target)?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              }),
            0,
          );
          response = `Navigated to ${args[0] || "~"}.`;
        } else response = `cd: ${args[0]}: No such directory. Try ls.`;
        break;
      }
      case "clear":
        clear();
        inputRef.current?.focus();
        return;
      case "sudo":
        response = "sudo: permission denied";
        break;
      default:
        response = `bash: ${cmd}: command not found`;
    }
    setEntries((prev) => [...prev.slice(-49), { command: raw, response }]);
    inputRef.current?.focus();
  };
  const onInputKey = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      clear();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = Math.max(
        0,
        Math.min(history.length, cursor + (event.key === "ArrowUp" ? -1 : 1)),
      );
      setCursor(next);
      setInput(history[next] || "");
    }
    if (event.key === "Tab" && input.trim()) {
      const matches = Object.keys(commandHelp).filter((c) =>
        c.startsWith(input.toLowerCase()),
      );
      if (matches.length === 1) {
        event.preventDefault();
        setInput(matches[0]);
      } else if (matches.length > 1) {
        event.preventDefault();
        setEntries((prev) => [
          ...prev,
          { command: input, response: matches.join("    ") },
        ]);
      }
    }
  };
  return (
    <div className="terminal-scene fullscreen-shell">
      <div
        className="terminal mono"
        role="region"
        aria-label="Interactive portfolio terminal"
      >
        <div
          className="terminal-body"
          ref={bodyRef}
          tabIndex="0"
          aria-label="Terminal output, scroll to read history"
          onClick={(event) => {
            if (event.target === event.currentTarget) inputRef.current?.focus();
          }}
        >
          <div
            className="terminal-output"
            aria-live="polite"
            aria-relevant="additions"
          >
            {entries.map((entry, index) => (
              <div className="terminal-entry" key={index}>
                <p>
                  <span className="prompt" aria-hidden="true">
                    {prompt}
                  </span>
                  {entry.command}
                </p>
                <div className="command-response">
                  {typeof entry.response === "string" ? (
                    <p>{entry.response}</p>
                  ) : (
                    entry.response
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="sr-only" id="terminal-instructions">
            Type help for commands. Use arrow keys for history and Tab to
            complete a command. Scroll down to explore the portfolio.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              run(input);
            }}
          >
            <label
              className="prompt"
              htmlFor="terminal-input"
              aria-hidden="true"
            >
              {prompt}
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              aria-label="Terminal command"
              aria-describedby="terminal-instructions"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="help"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
