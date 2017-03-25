$('#switch').on('change', function () {
        chrome.storage.sync.set({'typeCorrectActive': this.checked}, function() {
            // Notify that we saved.
            console.log('Settings saved');
        });
});

$(document).ready(function () {
    chrome.storage.sync.get('typeCorrectActive', function (items) {
        $('#switch').prop('checked', items.typeCorrectActive);
        console.log(items);
    });
});