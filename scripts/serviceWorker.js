let callFrom = "googlevoice";
let isEnabled = false;

function getCallFromPageUrl() {
  switch (callFrom) {
    case "googlevoice":
      return "https://voice.google.com/*";
    case "textnow":
      return "https://www.textnow.com/messaging";
    default:
      return "https://voice.google.com/*";
  }
}

function setEnabledStatus(isEnabled) {
  if (isEnabled) {
    chrome.action.setIcon({ path: "../images/icon-16-enabled.png" });
  } else {
    chrome.action.setIcon({ path: "../images/icon-16-disabled.png" });
  }
}

function getInitialOptions() {
  chrome.storage.sync.get(
    ["extensionEnabled", "callFrom"],
    ({ extensionEnabled, callFrom: storedCallFrom }) => {
      isEnabled = extensionEnabled || false;
      callFrom = storedCallFrom || "googlevoice";
      setEnabledStatus(isEnabled);
    },
  );
}

chrome.runtime.onStartup.addListener(() => getInitialOptions());
chrome.runtime.onInstalled.addListener(() => getInitialOptions());

async function onMessage(message, sender, sendResponse) {
  if (message.action === "toggleExtension") {
    const tabs = await chrome.tabs.query({
      url: [
        "https://voice.google.com/*",
        "https://www.textnow.com/messaging",
        "https://mobile.impact.ailife.com/Lead/*",
      ],
    });

    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message);
    });

    setEnabledStatus(message.payload);
  } else if (message.action === "makeCall") {
    const tabs = await chrome.tabs.query({
      url: getCallFromPageUrl(),
    });

    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  } else if (message.action === "updateCallFrom") {
    callFrom = message.payload;
  }
}

chrome.runtime.onMessage.addListener(onMessage);
