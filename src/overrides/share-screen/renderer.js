navigator.mediaDevices.getDisplayMedia = async (sourceId) => {
  try {
    const selectedSource = await globalThis.getDisplayMedia(sourceId);
    if(!selectedSource) {
      throw new Error("No source selected");
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: selectedSource.id,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720,
        },
      },
    });

    return stream;
  } catch (error) {
    throw error;
  }
};

navigator.mediaDevices.getAllSources = async () => {
  try {
    const sources = await globalThis.getAllAvailableSources();
    return sources;
  } catch (error) {
    throw error;
  }
};

