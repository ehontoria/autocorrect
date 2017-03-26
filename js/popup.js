//popup.js

$('#switch').on('change', function (event) {
    chrome.storage.sync.set({
        'typeCorrectActive': this.checked
    }, function () {
        // Notify that we saved.
        console.log('Settings saved');

    });

    console.log(this.ownerDocument.defaultView.chrome.extension.getBackgroundPage());
    this.ownerDocument.defaultView.chrome.extension.getBackgroundPage().isActive = this.checked;


});

console.log(this);

$(document).ready(function () {
    chrome.storage.sync.get('typeCorrectActive', function (items) {
        $('#switch').prop('checked', items.typeCorrectActive);
        console.log(items);

        console.log($('#switch').is(':checked'));
        console.log($);
    });

});