import { replaceNonNumbers, sendMessage } from "./utils";

let isEnabled = false;

chrome.storage.local.get("isEnabled", ({ isEnabled: storedIsEnabled }) => {
  isEnabled = storedIsEnabled;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.isEnabled) {
    const { newValue } = changes.isEnabled;
    isEnabled = newValue;
  }
});

function onContextMenu(e: MouseEvent) {
  if (!isEnabled) return;

  const target = e.target as HTMLAnchorElement;

  if (
    target.id === "phoneCallButton" ||
    target.id === "cellPhCallButton" ||
    target.closest("#phoneCallButton") ||
    target.closest("#cellPhCallButton")
  ) {
    e.preventDefault();

    const href = target.href;
    const phone = replaceNonNumbers(href);

    sendMessage({
      type: "makeCall",
      payload: phone,
    });
  }
}

document.addEventListener("contextmenu", onContextMenu);
