async function findMedia() {
    const status = document.querySelector("#status");

    try {
        const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true
        });

        const currentTab = tabs[0];

        await browser.scripting.executeScript({
            target: {
                tabId: currentTab.id
            },
            files: ["content.js"]
        });

        const media = await browser.tabs.sendMessage(
            currentTab.id,
            {
                type: "find-media"
            }
        );

        if (media.length === 0) {
            status.textContent = "No media found.";
        } else {
            status.textContent = `Found ${media.length} media element(s).`;
        }
    } catch (error) {
        console.error(error);
        status.textContent = "Could not access this page.";
    }
}

findMedia();