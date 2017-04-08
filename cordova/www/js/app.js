document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBackKeyDown, false);

//Device is ready
function onDeviceReady() {
    //
}

//Handle android back key
function onBackKeyDown() {
    mainView.router.back();
}

//Load the contents of the drawer
loadElementHtml('#drawer', 'draweritems.html', undefined);

//Load the contents of the url into the specified id
function loadElementHtml(element, url, callback = undefined) {
    $$.get(url, undefined, function (data) {
        $$(element).html(data);
        if (typeof callback !== 'undefined') { callback(); }
    });
}
