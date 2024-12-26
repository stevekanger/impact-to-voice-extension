async function onMessage(message, sender, sendResponse) {
  console.log(message);

  if (message.action === "toggleCopyPasteTelLinksExtension") {
    const tabs = await chrome.tabs.query({});

    tabs.forEach(async (tab) => {
      chrome.tabs.sendMessage(tab.id, message);
    });
  } else if (message.action === "callFromGoogleVoice") {
    const tabs = await chrome.tabs.query({
      url: "https://voice.google.com/*",
    });

    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  }
}

chrome.runtime.onMessage.addListener(this.onMessage);
