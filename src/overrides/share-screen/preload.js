const { desktopCapturer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("getDisplayMedia", async (sourceId) => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  const selectedSource = sources.find((source) => source.id === sourceId);
  return selectedSource;
});

contextBridge.exposeInMainWorld("getAllAvailableSources", async () => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  const result = [];
  sources.forEach((source) => {
    const thumbnail = source.thumbnail.toDataURL();
    result.push({ ...source, thumbnail });
  });
  return result;
});
