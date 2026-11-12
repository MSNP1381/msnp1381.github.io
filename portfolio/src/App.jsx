import { blogUrl } from "./data/site.js";
import { useRef } from "react";
import Terminal from "./components/Terminal.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import CurrentState from "./components/CurrentState.jsx";
import Writing from "./components/Writing.jsx";
import Contact from "./components/Contact.jsx";
import ResumeDialog from "./components/ResumeDialog.jsx";
import "./styles/main.scss";
export default function App() {
  const dialogRef = useRef(null);
  const openResume = () => dialogRef.current?.showModal();
  const closeOnBackdrop = (event) => {
    if (event.target === dialogRef.current) {
      const r = event.target.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        event.target.close();
    }
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main">
        <section
          className="terminal-landing"
          id="terminal"
          aria-label="Full-screen portfolio terminal"
        >
          <Terminal onResume={openResume} />
          <a className="terminal-scroll mono" href="#about">
            <span>SCROLL</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>
        <div className="portfolio-content">
          <header className="site-header wrap">
            <a className="wordmark" href="#" aria-label="MSNP home">
              <img
                className="brand-logo"
                src="/assets/msnp-dark.png"
                width="112"
                height="44"
                alt="MSNP"
              />
            </a>
            <nav aria-label="Main navigation">
              <a href="#experience">Work</a>
              <a href="#about">Intro</a>
              <a href="#work">Projects</a>
              <a href={blogUrl()} target="_blank" rel="noreferrer">
                Blog ↗
              </a>
            </nav>
            <a
              className="header-contact"
              href="https://t.me/CalledMSNP"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let’s talk <span>↗</span>
            </a>
          </header>
          <About />
          <Experience />
          <Projects />
          <CurrentState />
          <Writing />
          <Contact />
        </div>
      </main>
      <footer className="site-footer wrap mono">
        <a href="#" className="footer-logo">
          <img
            className="brand-logo"
            src="/assets/msnp-dark.png"
            width="92"
            height="36"
            alt="MSNP"
          />
        </a>
        <span>
          © <span>{new Date().getFullYear()}</span> MUHAMMAD SADEGH NEMATPOUR
        </span>
        <a href="#">BACK TO TOP ↑</a>
      </footer>
      <ResumeDialog dialogRef={dialogRef} onBackdrop={closeOnBackdrop} />
    </>
  );
}
