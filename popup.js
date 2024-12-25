document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const statusText = document.getElementById("statusText");

  // Load the current state from storage
  chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
    toggleSwitch.checked = extensionEnabled || false;

    if (extensionEnabled) {
      statusText.innerHTML = "Enabled";
    }
  });

  // Save state and notify the background script when toggled
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked;

    chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
      if (isEnabled) {
        statusText.innerHTML = "Enabled";
      } else {
        statusText.innerHTML = "Disabled";
      }
    });

    // Notify extension.js
    chrome.runtime.sendMessage({
      action: "toggleCopyPasteTelLinksExtension",
      enabled: isEnabled,
    });
  });
});
