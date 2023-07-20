chrome.runtime.onInstalled.addListener(function() {
  console.log("Google Search Translator installed.");
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("status: " + changeInfo.status)
  console.log("Tab updated: " + tab.url)
  if (changeInfo.status === "complete" && tab.url.includes("google.com")) {
    console.log("Injecting content script")
    chrome.tabs.executeScript(tabId, { file: "content.js" });
  }
});
