function setEnabledStatus(isEnabled) {
  const statusText = document.getElementById("statusText");

  if (isEnabled) {
    statusText.innerHTML = "Enabled";
  } else {
    statusText.innerHTML = "Disabled";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");

  // Load the current state from storage
  chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
    toggleSwitch.checked = extensionEnabled || false;

    if (extensionEnabled) {
      setEnabledStatus(true);
    } else {
      setEnabledStatus(false);
    }
  });

  // Save state and notify the background script when toggled
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked;

    chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
      if (isEnabled) {
        setEnabledStatus(true);
      } else {
        setEnabledStatus(false);
      }

      // Notify serviceWorker.js
      chrome.runtime.sendMessage({
        action: "toggleExtension",
        isEnabled,
      });
    });
  });
});
