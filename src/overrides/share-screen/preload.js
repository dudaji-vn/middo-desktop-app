const { contextBridge, desktopCapturer, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("getDisplayMedia", async (sourceId) => {
  const sources = await ipcRenderer.invoke("get-available-sources");
  const selectedSource = sources.find((source) => source.id === sourceId);
  return selectedSource;
});

contextBridge.exposeInMainWorld("getAllAvailableSources", async () => {
  const sources = await ipcRenderer.invoke("get-available-sources");
  console.log({sources});
  return sources;
});
