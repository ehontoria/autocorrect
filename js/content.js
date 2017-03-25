chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "hi") {

        var input = document.getElementsByTagName('input');
        
        console.log(input);

        for (var i = 0; i < input.length; i++) {
            if (input[i].type === 'text' || input[i].type === 'textArea') {
                input[i].addEventListener('change', function (event) {
                    console.log(event.target.value);
                });
            }
        }
    }
});