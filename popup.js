document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");

  // Load the current state from storage
  chrome.storage.sync.get("extensionEnabled", ({ extensionEnabled }) => {
    toggleSwitch.checked = extensionEnabled || false;

    console.log(extensionEnabled);
  });

  // Save state and notify the background script when toggled
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked;
    chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
      console.log(`Extension enabled: ${isEnabled}`);
    });

    // Notify extension.js
    chrome.runtime.sendMessage({
      action: "toggleExtension",
      enabled: isEnabled,
    });
  });
});
