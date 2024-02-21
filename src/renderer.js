navigator.mediaDevices.getDisplayMedia = async () => {
  try {
    const selectedSource = await globalThis.getDisplayMedia();

    // create MediaStream
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