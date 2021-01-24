chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    let selector = document.querySelector("#menuItem > fieldset > div:nth-child(2) > div > h1");
    sendResponse({'item': (selector == null ? undefined : selector.innerText)})
})