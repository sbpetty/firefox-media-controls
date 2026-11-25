let mediaElements = [];

browser.runtime.onMessage.addListener((message) => {
    if (message.type === "find-media") {
        mediaElements = Array.from(
            document.querySelectorAll("video, audio")
        );

        return mediaElements.map((media, index) => {
            return {
                id: index,
                type: media.tagName.toLowerCase(),
                paused: media.paused,
                currentTime: media.currentTime,
                duration: media.duration
            };
        });
    }
});