//content.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "addListener") {

        var inputs = document.getElementsByTagName('input');
        
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'text' || inputs[i].type === 'textArea') {
                inputs[i].addEventListener('change', function (event) {
                    var value = event.target.value;
                    console.log(value);
                    chrome.runtime.sendMessage({
                        "text": value
                    }, {}, function(response) {
                        console.log(response);
                    });
                });
            }
        }
    }
});