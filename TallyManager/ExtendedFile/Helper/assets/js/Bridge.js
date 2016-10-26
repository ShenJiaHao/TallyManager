/**
 * Created by sense on 16/10/12.
 */


//export let CALL_HANDLER_GET_USER_INFO = 'userInfoCallback'
//
//// call out login panel
//export let CALL_HANDLER_CALL_OUT_LOGIN_PANEL = 'calloutLogin'
//
//export let CALL_HANDLER_CALL_OUT_NATIVE_HOME_PANEL = 'redirectToHome'
//export let CALL_HANDLER_REDIRECT_TO_NEXT = 'redirectToNext'
//
////notify app to checkout
//export let CALL_HANDLER_CHECKOUT = 'checkoutCallback'
//
//// share to social circle
//export let  CALL_HANDLER_SHARE = 'shareInfoCallback'


function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//setupWebViewJavascriptBridge(function(bridge) {
//    var uniqueId = 1;
//
//    function log(message, data) {
//        var log = document.getElementById('log');
//        var el = document.createElement('div');
//        el.className = 'logLine';
//        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data);
//        if (log.children.length) {
//            log.insertBefore(el, log.children[0])
//        }
//        else {
//            log.appendChild(el)
//        }
//    }
//
//    bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
//        log('ObjC called testJavascriptHandler with', data);
//        var responseData = {'Javascript Says': 'Right back atcha!'};
//        log('JS responding with', responseData);
//        responseCallback(responseData);
//    })
//
//    bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function (response) {
//        log('JS got response', response)
//    })
//})

function handler(handlerName) {
    return function () {
        var args = arguments;
        var bridge = window.WebViewJavascriptBridge;
        if (bridge) {
            bridge[handlerName].apply(this,args)
        } else {
            setupWebViewJavascriptBridge(function(bridge){
                bridge[handlerName].apply(this,args)
            });
        }
    }
}

var registerHandler = handler('registerHandler');
var callHandler = handler('callHandler');


//
var bridge_GetWebRoot = function(data) {

//    alert('js调用OC方法:GetWebRoot');
    return new Promise(function (resolve, reject) {
        callHandler('bridge_GetWebRoot', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};

var bridge_CheckNetState = function(data) {

//    alert('js调用OC方法:CheckNetState');

    return new Promise(function (resolve, reject) {
        callHandler('bridge_CheckNetState', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};

var bridge_ShowToast = function(data) {

//    alert('js调用OC方法:ShowToast');

    return new Promise(function (resolve, reject) {
        callHandler('bridge_ShowToast', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};

var bridge_GetAppType = function(data) {

//    alert('js调用OC方法:GetAppType');

    return new Promise(function (resolve, reject) {
        callHandler('bridge_GetAppType', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};

var bridge_LoadLocalUrl = function(data) {

//    alert('js调用OC方法:LoadLocalUrl');


    return new Promise(function (resolve, reject) {
        callHandler('bridge_LoadLocalUrl', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};

var bridge_SetWebRoot = function(data) {

//    alert('js调用OC方法:SetWebRoot');

    return new Promise(function (resolve, reject) {
        callHandler('bridge_SetWebRoot', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};


var bridge_AutoUpdate = function(data) {
    //alert('js调用OC方法:AutoUpdate');
    return new Promise(function (resolve, reject) {
        callHandler('bridge_AutoUpdate', data, function (response) {
            //alert(response);
            resolve(response)
        })
    })
};