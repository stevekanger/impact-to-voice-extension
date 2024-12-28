let isEnabled = false;

function sendMessage(action, payload) {
  chrome.runtime.sendMessage({
    action,
    payload,
  });
}

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
    sendMessage("makeCall", phone);
  } else if (
    e.target.id === "cellPhCallButton" ||
    e.target.closest("#cellPhCallButton")
  ) {
    e.preventDefault();
    const href = document.getElementById("cellPhCallButton").href;
    const phone = replaceNonNumbers(href);
    sendMessage("makeCall", phone);
  }
});

chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
  isEnabled = extensionEnabled || false;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
    isEnabled = message.isEnabled;
  }
});
