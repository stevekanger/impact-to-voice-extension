import { pollForElement } from "./utils";

async function makeCall(phone: string) {
  try {
    const { isEnabled } = await chrome.storage.local.get("isEnabled");

    if (!isEnabled) return;

    const newCallBtn = document.getElementById("newCall") as HTMLButtonElement;

    newCallBtn.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    );

    await pollForElement("#newCallRecipients");

    const callInputField = document.getElementById(
      "newCallRecipients",
    ) as HTMLInputElement;
    const callBtn = document.getElementById("callButton") as HTMLButtonElement;

    callInputField.value = phone;

    callInputField.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true }),
    );

    await pollForElement("#newCallRecipients.valid-recipient");

    callBtn.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    );
  } catch (error: any) {
    console.error(error);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "makeCall") {
    makeCall(message.payload);
  }
});
