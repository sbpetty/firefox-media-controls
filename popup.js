async function findMedia() {
    const status = document.querySelector("#status");

    try {
        const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true
        });

        const currentTab = tabs[0];
        
        const results = await browser.scripting.executeScript({
            target: {
                tabId: currentTab.id
            },
            
            func: () => {
                const mediaElements = Array.from(
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
            
        const media = results[0].result ?? [];

        const mediaList = document.querySelector("#media-list");

        if (media.length === 0) {
            status.textContent = "No media found.";
        } else {
            status.textContent = `Found ${media.length} media element(s).`;

            media.forEach((item, index) => {
                const listItem = document.createElement("li");

                const state = item.paused ? "paused" : "playing";

                listItem.textContent =
                    `${index + 1}: ${item.type}, ${state}`;

                mediaList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error(error);
        status.textContent = "This page cannot be controlled.";
    }
}

findMedia();