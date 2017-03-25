//background.js

var ref = $.getJSON("../utilities/results.json");
var swears = ref.swears;
var dict = ref.replace;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            'action': "addListener"
        });
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    var textSplit = message.text.split(" ");
    var replacements = [];

    for (var i = 0; i < textSplit.length; i++) {
        var word = textSplit[i];
        if (swears.includes(word)) {
            var startsWith = word.charAt(0);
            var repArray = dict[startsWith];

            var randomIdx = Math.floor(Math.random() * repArray.length);
            var newWord = repArray[randomIdx];

            replacements.push({
                "swear": word,
                "replacement": newWord
            });
        }
    }
    
//    sendResponse(replacements);
});