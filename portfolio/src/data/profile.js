import { blogUrl } from "./site.js";
export const profile = {
  name: "Muhammad Sadegh Nematpour",
  handle: "MSNP",
  role: "Senior Software & AI Engineer",
  focus: "LLM agents, backend architecture, retrieval, and developer tools.",
  stack: [
    "Python",
    "FastAPI",
    "LangGraph",
    "LangChain",
    "PostgreSQL",
    "pgvector",
    "Redis",
    "MongoDB",
    "Docker",
  ],
  links: {
    github: "https://github.com/msnp1381",
    linkedin: "https://www.linkedin.com/in/msnp1381/",
    telegram: "https://t.me/CalledMSNP",
    blog: blogUrl(),
  },
};
export const projects = [
  {
    name: "Kaggle Agent",
    description:
      "Planning, code generation, execution, and reflection for ML challenges.",
    url: "https://github.com/MSNP1381/kaggle-Agent",
  },
  {
    name: "Cache-cool",
    description:
      "A configurable LLM caching proxy with Redis, MongoDB, and JSON backends.",
    url: "https://github.com/MSNP1381/cache-cool",
  },
];
export const commandHelp = {
  help: "Commands",
  whoami: "About me",
  resume: "View résumé",
  projects: "Projects",
  stack: "Stack",
  now: "Current focus",
  contact: "Links",
  github: "GitHub",
  blog: "Blog",
  ls: "Directory",
  cat: "Read file",
  cd: "Change directory",
  pwd: "Working directory",
  date: "Date / time",
  echo: "Print text",
  clear: "Clear screen",
};
