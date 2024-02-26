require("./overrides/share-screen/index");
window.addEventListener("DOMContentLoaded", () => {
  // override css
  const style = document.createElement("style");
  style.textContent = readFileSync(join(__dirname, "style.css"), "utf8");
  document.head.appendChild(style);
});
