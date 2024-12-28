function setEnabledStatus(isEnabled) {
  if (isEnabled) {
    chrome.action.setIcon({ path: "../images/icon-16-enabled.png" });
  } else {
    chrome.action.setIcon({ path: "../images/icon-16-disabled.png" });
  }
}

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
    isEnabled = extensionEnabled || false;
    setEnabledStatus(isEnabled);
  });
});

async function onMessage(message, sender, sendResponse) {
  if (message.action === "toggleExtension") {
    const tabs = await chrome.tabs.query({
      url: [
        "https://voice.google.com/*",
        "https://mobile.impact.ailife.com/Lead/*",
      ],
    });

    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message);
    });

    setEnabledStatus(message.isEnabled);
  } else if (message.action === "callFromGoogleVoice") {
    const tabs = await chrome.tabs.query({
      url: "https://voice.google.com/*",
    });

    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  }
}

chrome.runtime.onMessage.addListener(onMessage);
