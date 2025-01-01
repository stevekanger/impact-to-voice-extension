import { Message } from "./types";

export async function sendMessage(message: Message) {
  try {
    const response = await chrome.runtime.sendMessage(message);
  } catch (error) {
    console.log("error sending message to service worker: ", error);
  }
}

export function replaceNonNumbers(number: string) {
  return number.replace(/\D/g, "");
}

export function pollForElement(selector: string) {
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
