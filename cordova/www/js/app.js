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

function takePicture() {
  navigator.camera.getPicture(onPictureSuccess, onPictureFail, { quality: 100, destinationType: Camera.DestinationType.FILE_URI });
}

function onPictureSuccess(imageURI) {
    $$('#resimg').attr('src', imageURI);
}

function onPictureFail(message) {
    app.alert('There was an error attempting to scan the document.', 'Error');
}

$$('#pictureButton').on('click', function (e) {
	$$('#glasses').transform('translateY(100px)');
	$$('#glasses').transition(1000);
	$$('#glasses').animate(
		{
	
			'opacity': 1
		},
		{
			duration: 700,
			easing: 'linear'

		}
	)
});