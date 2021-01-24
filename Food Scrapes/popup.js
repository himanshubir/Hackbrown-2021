document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click',
        onClick, false)

    function onClick() {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'bears test 123', setCount)
        })
    }

    // Once we have nutrition infromation, upload a model to the frontend
    function setCount (res) {
        // alert(`response in popup.js: ${res}`)
        const div = document.createElement('div')
        div.textContent = res === undefined ? 0 :`${res.count} bears`
        document.body.appendChild(div)
    }

}, false)