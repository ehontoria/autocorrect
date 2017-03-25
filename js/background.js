//background.js

var ref;

$.getJSON("../utilities/results.json", function(data) {
    console.log(data);
    
    var swears = data.swears;
    var dict = data.replace;
    
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log(message);
        var textSplit = message.text.split(" ");
        var replacements = [];
    
        for (var i = 0; i < textSplit.length; i++) {
            var word = textSplit[i].toLowerCase();
            if (swears.includes(word)) {
                var startsWith = word.charAt(0);
                var repArray = dict[startsWith];
    
                var randomIdx = Math.floor(Math.random() * repArray.length);
                var newWord = repArray[randomIdx];
                
                textSplit[i] = newWord.toLowerCase();
    
//                replacements.push({
//                    "swear": word,
//                    "replacement": newWord
//                });
            }
        }
        
        console.log(textSplit);
        var finalString = "";
        
        textSplit.map(function(currentValue, index, array) {
            finalString += currentValue + " ";
        })
        
        finalString = finalString.substr(0, finalString.length - 1);
        
        console.log(finalString);

        sendResponse(finalString);
    });
})

//var swears = ref.swears;
//var dict = ref.replace;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            'action': "addListener"
        });
    }
});

