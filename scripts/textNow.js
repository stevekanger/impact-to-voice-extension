let isEnabled = false;

function pollForElement(selector) {
  return new Promise((resolve, reject) => {
    const timeout = Date.now() + 5000;

    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(true);
      } else if (Date.now() > timeout) {
        clearInterval(interval);
        reject();
      }
    }, 100);
  });
}

async function makeCall(phone) {
  if (!isEnabled) return;

  try {
    const newCallBtn = document.getElementById("newCall");

    newCallBtn.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    );

    await pollForElement("#newCallRecipients");

    const callInputField = document.getElementById("newCallRecipients");
    const callBtn = document.getElementById("callButton");

    callInputField.value = phone;

    callInputField.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true }),
    );

    await pollForElement("#newCallRecipients.valid-recipient");

    callBtn.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    );
  } catch (error) {
    console.error(err);
  }
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
