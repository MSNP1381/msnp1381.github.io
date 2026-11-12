// The existing blog remains live during development; Pages deploys it at /blog/.
const blogBase = (
  import.meta.env.VITE_BLOG_BASE_URL || "https://msnp1381.github.io/"
).replace(/\/+$/, "");
export function blogUrl(path = "") {
  return `${blogBase}/${path.replace(/^\/+/, "")}`;
}
