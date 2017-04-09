document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', onBackKeyDown, false);
var restext = '';

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

app.onPageInit('results', function (page) {
	$$('#resmsg').html(restext);
})

function takePicture() {
	navigator.camera.getPicture(setOCRPicture, onPictureFail, { quality: 100, destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.CAMERA });
	$$('body').animate({'opacity': 1},{duration: 700,easing: 'linear'});
	$$('#glasses').animate({'opacity': 0},{duration: 0,easing: 'linear'});
}

function takePictureEx() {
	$$('body').animate({'opacity': 1},{duration: 700,easing: 'linear'});
	$$('#glasses').animate({'opacity': 0},{duration: 0,easing: 'linear'});
	//setOCRPicture('img/example.png');
	$$('#image').attr('src', 'img/example.png');
	
}

function imgLoaded() {
	app.showIndicator();
	readText(document.getElementById('image'), function (res) {
		$$('body').animate({'opacity': 1},{duration: 700,easing: 'linear'});
		$$('#glasses').animate({'opacity': 0},{duration: 0,easing: 'linear'});
		summarizeText(res, function (sumText) {
			restext = sumText;
			app.hideIndicator();
			mainView.router.loadPage('pages/results.html');
		});
	});
}

function setOCRPicture(imdata) {
	$$('#image').attr('src', imdata);
}

function readText(image, callback) {
	var canvas = document.getElementById("canvas");
	canvas.width = image.naturalWidth;
	canvas.height = image.naturalHeight;
	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0);

	callback(OCRAD(context));

};

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
	setTimeout(function(){
		$$('body').animate(
		{
			'opacity': 0
		},
		{
			duration: 1000,
			easing: 'linear'
		}
		)
	}, 1000);
	setTimeout(function(){
		$$('body').animate({'opacity': 1},{duration: 1000, easing: 'linear'});
		$$('#glasses').animate({'opacity': 1},{duration: 1000, easing: 'linear'});
	}, 3000);
	setTimeout(takePictureEx(), 3000);

	
});

function translateText(text, langTo, callback) {
	var yandexapikey = 'trnsl.1.1.20170408T133105Z.d4530df6647e87d9.b327f61621892a66e873914986f97f5262b2a08d';
	$$.get('https://translate.yandex.net/api/v1.5/tr/translate?key=' + yandexapikey + '&text=' + text + '&lang=en-' + langTo, undefined, function (data) {
		callback(data);
	});
}

function getTextFromImage(myImage, callback) {
	var strres = OCRAD(myImage);
	callback(strres);
}

function summarizeText(stext, callback) {
	var summarizer = new JsSummarize();
	var summary = summarizer.summarize('', stext);
	var sr = "";
		summary.forEach(function(sentence)
	{
		sr += sentence + " ";
	});
	callback(sr);
}

function translateResult() {
	app.showIndicator();
	translateText(restext, $$('#langsel').val(), function (tres) {
		$$('#trmsg').html(tres);
		app.hideIndicator();
	});
}

function clearResults() {
	$$('#resmsg').html('');
	$$('#trmsg').html('');
	app.alert('Results successfully cleared!', 'Clear Success');
}
