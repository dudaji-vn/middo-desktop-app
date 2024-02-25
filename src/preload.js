const { readFileSync } = require("fs");
const { join } = require("path");

require("./overrides/share-screen/index");
window.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = readFileSync(join(__dirname, "style.css"), "utf8");
  document.body.appendChild(style);
});
