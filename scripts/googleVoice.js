let isEnabled = false;

async function makeCall(number) {
  if (!isEnabled) return;

  const gvInputField = document.querySelector(
    'input[placeholder="Enter a name or number"]',
  );

  gvInputField.value = number;
  gvInputField.dispatchEvent(
    new Event("input", { bubbles: true, cancelable: true }),
  );

  const gvCallBtn = document.querySelector(".call-button");
  gvCallBtn.click();
}

document.addEventListener("contextmenu", (e) => {
  if (!isEnabled) return;

  if (e.target.matches('input[placeholder="Enter a name or number"]')) {
    e.preventDefault();
    makeCall();
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
  } else if (message.action === "callFromGoogleVoice") {
    makeCall(message.phone);
  }
});
