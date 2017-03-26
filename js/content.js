//content.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "addListener") {

        var inputEls = Array.from(document.getElementsByTagName('input'));
        var textareas = Array.from(document.getElementsByTagName('textarea'));

        var inputs = inputEls.concat(textareas);
        for (var i = 0; i < inputs.length; i++) {
            if ((inputs[i].type === 'text' || inputs[i].type === 'textarea')) {
                inputs[i].addEventListener('input', function (event) {
                    var value = event.target.value;
                    if (value.substring(value.length - 1) === ' ') {
                        // console.log(value);
                        chrome.runtime.sendMessage({
                            "text": value
                        }, {}, function(response) {
                            console.log(response);

                            if (response) {
                                event.target.value = response;
                            }
                        });
                    }
                });
            }
        }
    }
});