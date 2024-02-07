navigator.mediaDevices.getDisplayMedia = async () => {
    try {
      const selectedSource = await globalThis.myCustomGetDisplayMedia();
  
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
      console.error("Error accessing screen:", error);
      throw error; // Rethrow the error for further handling, if necessary
    }
  };
  