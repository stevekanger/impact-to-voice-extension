let isEnabled = false;

async function makeCall(phone) {
  if (!isEnabled) return;

  const gvInputField = document.querySelector(
    'input[placeholder="Enter a name or number"]',
  );

  gvInputField.value = phone;

  gvInputField.dispatchEvent(
    new Event("input", { bubbles: true, cancelable: true }),
  );

  gvInputField.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13, // Deprecated
      bubbles: true,
      cancelable: true,
    }),
  );
}

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
