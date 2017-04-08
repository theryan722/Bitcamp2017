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
