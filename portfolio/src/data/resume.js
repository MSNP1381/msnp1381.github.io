import { profile, projects } from "./profile.js";
export function downloadResume() {
  const text = `# ${profile.name}\n\n${profile.role}\n\n${profile.focus}\n\n## Engineering focus\n\n${profile.stack.join(" · ")}\n\n## Selected open source\n\n${projects.map((p) => `### ${p.name}\n${p.description}\n${p.url}`).join("\n\n")}\n\n## Education\n\nIran University of Science and Technology · 2020–2025\n\n## Find me\n\n${Object.entries(
    profile.links,
  )
    .map(([name, url]) => `${name}: ${url}`)
    .join(
      "\n",
    )}\n\nConcise portfolio résumé. LinkedIn contains the full experience record.\n`;
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/markdown;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "Muhammad-Sadegh-Nematpour-Resume.md";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
