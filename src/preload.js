// preload.js

const { desktopCapturer, contextBridge } = require("electron");
const { readFileSync } = require("fs");
const { join } = require("path");
const { selectSource } = require("./share-screen-layout");

// inject renderer.js into the web page
window.addEventListener("DOMContentLoaded", () => {
  const rendererScript = document.createElement("script");
  rendererScript.text = readFileSync(join(__dirname, "renderer.js"), "utf8");
  document.body.appendChild(rendererScript);
});

contextBridge.exposeInMainWorld("getDisplayMedia", async (sourceId) => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  const selectedSource = sources.find(source => source.id === sourceId);
  return selectedSource;
});


contextBridge.exposeInMainWorld("getAllAvailableSources", async () => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  const result = []
  sources.forEach(source => {
    const thumbnail = source.thumbnail.toDataURL();
    result.push({...source, thumbnail});
  })
  return result;
});