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

contextBridge.exposeInMainWorld("myCustomGetDisplayMedia", async () => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });

  // you should create some kind of UI to prompt the user
  // to select the correct source like Google Chrome does
  // const selectedSource = sources[0]; // this is just for testing purposes
  // console.log(sources);
  // create UI to chooose 
  // wait for the user to select a source and return it
  let selectedSource = await selectSource(sources);

  return selectedSource;
});
