async function makeCall(phone: string) {
  try {
    const { isEnabled } = await chrome.storage.local.get("isEnabled");

    if (!isEnabled) return;

    const gvInputField = document.querySelector(
      'input[placeholder="Enter a name or number"]',
    ) as HTMLInputElement;

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
  } catch (error: any) {
    console.log(error);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "makeCall") {
    makeCall(message.payload);
  }
});
