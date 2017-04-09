var app = new Framework7();
var $$ = Dom7; //DOM Library

var mainView = app.addView('.view-main', {
    uniqueHistory: true,
    domCache: true,
    pushState: true,
    material: true,
    tapHold: true,
    modalTitle: 'SmartStudy',
    onAjaxStart: function (xhr) {
        app.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        app.hideIndicator();
    }
});