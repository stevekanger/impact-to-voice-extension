import "../css/popup.scss";

function setEnabledStatus(isEnabled: boolean) {
  const statusText = document.getElementById(
    "statusText",
  ) as HTMLParagraphElement;

  if (isEnabled) {
    statusText.innerHTML = "Enabled";
  } else {
    statusText.innerHTML = "Disabled";
  }
}

async function toggleExtensionSwitchInit() {
  try {
    const { isEnabled } = await chrome.storage.local.get("isEnabled");

    const toggleExtensionSwitch = document.getElementById(
      "toggleExtensionSwitch",
    ) as HTMLInputElement;

    if (isEnabled) {
      toggleExtensionSwitch.checked = true;
    }

    toggleExtensionSwitch.addEventListener("change", () => {
      const isEnabled = toggleExtensionSwitch.checked;

      chrome.storage.local.set({ isEnabled }, () => {
        setEnabledStatus(isEnabled);
      });
    });
  } catch (error: any) {
    console.log(error);
  }
}

async function callFromRadiosInit() {
  try {
    const callFromRadios = document.querySelectorAll(".call-from");
    const { callFrom } = await chrome.storage.local.get("callFrom");

    callFromRadios.forEach((radio) => {
      const inputRadio = radio as HTMLInputElement;

      if (inputRadio.value === callFrom) {
        inputRadio.checked = true;
      }

      inputRadio.addEventListener("change", (e: Event) => {
        const input = e.target as HTMLInputElement;
        chrome.storage.local.set({ callFrom: input.value });
      });
    });
  } catch (error: any) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  toggleExtensionSwitchInit();
  callFromRadiosInit();
});
