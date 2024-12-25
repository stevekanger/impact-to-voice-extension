chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const tabs = await chrome.tabs.query({});

  if (message.action === "toggleCopyPasteTelLinksExtension") {
    tabs.forEach(async (tab) => {
      chrome.tabs.sendMessage(tab.id, message);
    });
  }
});
