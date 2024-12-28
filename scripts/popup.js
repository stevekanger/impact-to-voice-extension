let callFrom = "googlevoice";

function sendMessage(action, payload) {
  chrome.runtime.sendMessage({
    action,
    payload,
  });
}

function setEnabledStatus(isEnabled) {
  const statusText = document.getElementById("statusText");

  if (isEnabled) {
    statusText.innerHTML = "Enabled";
  } else {
    statusText.innerHTML = "Disabled";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const callFromRadios = document.querySelectorAll(".call-from");
  const toggleExtensionSwitch = document.getElementById(
    "toggleExtensionSwitch",
  );

  // Load the current state from storage
  chrome.storage.sync.get(
    ["extensionEnabled", "callFrom"],
    ({ extensionEnabled, callFrom }) => {
      toggleExtensionSwitch.checked = extensionEnabled || false;

      callFromRadios.forEach((radioInput) => {
        if (radioInput.value === callFrom) {
          radioInput.checked = true;
        }
      });

      setEnabledStatus(extensionEnabled);
    },
  );

  // Save state and notify the background script when toggled
  toggleExtensionSwitch.addEventListener("change", () => {
    const isEnabled = toggleExtensionSwitch.checked;

    chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
      setEnabledStatus(isEnabled);
      sendMessage("toggleExtension", isEnabled);
    });
  });

  // Update callFrom when radio changes
  callFromRadios.forEach((radioInput) => {
    radioInput.addEventListener("change", (e) => {
      chrome.storage.sync.set({ callFrom: e.target.value });
      sendMessage("updateCallFrom", e.target.value);
    });
  });
});
