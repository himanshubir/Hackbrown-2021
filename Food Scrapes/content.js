// import JSSoup from 'jssoup'

// alert('injected content')
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    sendResponse({'item': document.querySelector("#menuItem > fieldset > div:nth-child(2) > div > h1").innerText})
})