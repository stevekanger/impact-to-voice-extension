let isEnabled = false;

function makeCall(phone) {
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
      keyCode: 13,
      bubbles: true,
      cancelable: true,
    }),
  );
}

chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
  isEnabled = extensionEnabled || false;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "toggleExtension":
      isEnabled = message.payload;
      break;
    case "makeCall":
      makeCall(message.payload);
      break;
    default:
      return;
  }
});
