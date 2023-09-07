export async function getCurrentTab() {
  try {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    return tab.id;
  } catch (error) {
    console.error("Error getting current tab:", error);
  }
}
