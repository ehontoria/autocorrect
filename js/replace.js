chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        $('input[type=text]').change(function () {
            if (this.value[this.value.length - 1] === ' ') {
                console.log(this.value);
            }
        })
    }
});