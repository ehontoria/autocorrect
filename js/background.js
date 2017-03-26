//background.js

var initIsActive = function () {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get('typeCorrectActive', function (items) {
            isActive = items.typeCorrectActive;
            resolve(isActive);
        });
    })
};

initIsActive().then(function (isActive) {
    $.getJSON("../utilities/results.json", function (data) {
        var swears = data.swears;
        var dict = data.replace;

        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log("hello");
            
            if (isActive) {
                var returnString = helper(message, swears, dict);
                sendResponse(returnString);
            } else {
                console.log("something else");
            }
        })
    })
})


var helper = function (message, swears, dict) {
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
        }
    }

    var finalString = "";

    textSplit.map(function (currentValue, index, array) {
        finalString += currentValue + " ";
    })

    finalString = finalString.substr(0, finalString.length - 1);

    return finalString;
}

//var swears = ref.swears;
//var dict = ref.replace;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            'action': "addListener"
        });
    }
});