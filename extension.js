let isEnabled = false;

async function makeCall() {
  if (!isEnabled) return;

  const clipboardValue = await navigator.clipboard.readText();

  if (!clipboardValue) {
    console.log("No clipboard value");
    return;
  }

  const gvInputField = document.querySelector(
    'input[placeholder="Enter a name or number"]',
  );

  gvInputField.value = clipboardValue.replace(/\D/g, "");

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
  } else if (
    e.target.id === "phoneCallButton" ||
    e.target.closest("#phoneCallButton")
  ) {
    e.preventDefault();
    const href = document.getElementById("phoneCallButton").href;
    navigator.clipboard.writeText(href);
  } else if (
    e.target.id === "cellPhCallButton" ||
    e.target.closest("#cellPhCallButton")
  ) {
    e.preventDefault();
    const href = document.getElementById("cellPhCallButton").href;
    navigator.clipboard.writeText(href);
  }
});

// Load initial state
chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
  isEnabled = extensionEnabled || false;
});

// Listen for toggle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
    isEnabled = message.enabled;
  }
});
