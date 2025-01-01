import type { Message } from "./types";

async function onInstalled() {
  try {
    const { callFrom } = await chrome.storage.local.get("callFrom");

    if (callFrom) return;

    chrome.storage.local.set({ isEnabled: false });
    chrome.storage.local.set({ callFrom: "googlevoice" });
  } catch (error: any) {
    console.log(error);
  }
}
chrome.runtime.onInstalled.addListener(onInstalled);

function setEnabledStatus(isEnabled: boolean) {
  if (isEnabled) {
    chrome.action.setIcon({ path: "../images/icon-16-enabled.png" });
  } else {
    chrome.action.setIcon({ path: "../images/icon-16-disabled.png" });
  }
}

chrome.storage.onChanged.addListener(({ isEnabled }, namespace) => {
  setEnabledStatus(isEnabled.newValue);
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("isEnabled", ({ isEnabled }) => {
    setEnabledStatus(isEnabled);
  });
});

function getCallFromPageUrl(callFrom: string) {
  switch (callFrom) {
    case "googlevoice":
      return "https://voice.google.com/*";
    case "textnow":
      return "https://www.textnow.com/messaging";
    default:
      return "https://voice.google.com/*";
  }
}

async function makeCall(message: Message) {
  try {
    const { callFrom } = await chrome.storage.local.get("callFrom");

    const tabs = await chrome.tabs.query({
      url: getCallFromPageUrl(callFrom),
    });

    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  } catch (error: any) {
    console.log(error);
  }
}

function onMessage(
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) {
  switch (message.type) {
    case "makeCall":
      makeCall(message);
      break;
    default:
      return;
  }
  if (message.type === "makeCall") {
    makeCall(message);
  }
}
chrome.runtime.onMessage.addListener(onMessage);
