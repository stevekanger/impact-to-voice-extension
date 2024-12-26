let isEnabled = false;

function replaceNonNumbers(number) {
  return number.replace(/\D/g, "");
}

document.addEventListener("contextmenu", (e) => {
  if (!isEnabled) return;

  if (
    e.target.id === "phoneCallButton" ||
    e.target.closest("#phoneCallButton")
  ) {
    e.preventDefault();
    const href = document.getElementById("phoneCallButton").href;
    const phone = replaceNonNumbers(href);

    chrome.runtime.sendMessage({
      action: "callFromGoogleVoice",
      phone: "4028048752",
    });
  } else if (
    e.target.id === "cellPhCallButton" ||
    e.target.closest("#cellPhCallButton")
  ) {
    e.preventDefault();
    const href = document.getElementById("cellPhCallButton").href;
    const phone = replaceNonNumbers(href);

    chrome.runtime.sendMessage({
      action: "callFromGoogleVoice",
      phone: "4028048752",
    });
  }
});

// Load initial state
chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
  isEnabled = extensionEnabled || false;
});

// Listen for toggle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleCopyPasteTelLinksExtension") {
    isEnabled = message.enabled;
  }
});
