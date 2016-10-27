

window.dapp = {

GetWebRoot: function(){
    //alert("调用了dapp的getwebroot!");
    //return "csywhty2010.f3322.org:8005";
    return bridge_GetWebRoot();

    //bridge_GetWebRoot()
    //    .then(function(data){
    //        alert('mkmkmkmkmkmkmk');
    //        alert(data);
    //        return data;
    //    });

},

SetWebRoot: function(str){
    //alert("调用了dapp的getwebroot!");
    //return "csywhty2010.f3322.org:8005";
    return bridge_SetWebRoot(str);
},
    
LoadLocalUrl:function(url){
    //return null;

//    alert("调用了dapp的LoadLocalUrl!");
//    alert(url);

    return bridge_LoadLocalUrl(url);
},

CheckNetState:function(){


    //if(window.dapp.CheckNetState()
    //        .then(function(data){
    //            if(data == "0") {
    //                alert('mkmkmkmkmkmkmk');
    //                if(callback) {
    //                    callback();
    //                    return;
    //                }
    //            }
    //        })
    //);

    //bridge_CheckNetState()
    //    .then(function(data){
    //        alert('mkmkmkmkmkmkmk');
    //        if (callback){
    //            callback();
    //        }
    //        return data;
    //    });

    //alert("调用了dapp的CheckNetState!");

    return bridge_CheckNetState();
},

ShowToast:function(str){

//    alert("调用了dapp的ShowToast!");


    return bridge_ShowToast(str);
},

GetAppType:function(){

    return bridge_GetAppType();
},

AutoUpdate:function(){
    return bridge_AutoUpdate(data);
}

}


////
//function setupWebViewJavascriptBridge(callback) {
//
//    if (window.WebViewJavascriptBridge) {
//        //alert('xxxxxxxxxxxx');
//        return callback(WebViewJavascriptBridge);
//    }
//    if (window.WVJBCallbacks) {
//        //alert('************');
//        return window.WVJBCallbacks.push(callback);
//    }
//    //alert('------------');
//    window.WVJBCallbacks = [callback];
//    var WVJBIframe = document.createElement('iframe');
//    WVJBIframe.style.display = 'none';
//    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
//    document.documentElement.appendChild(WVJBIframe);
//    setTimeout(function() {
//        document.documentElement.removeChild(WVJBIframe)
//    }, 0)
//}
//
//function handler(handlerName) {
//    return function () {
//        //alert('ddddddd');
//        var args = arguments;
//        var bridge = window.WebViewJavascriptBridge;
//        if (bridge) {
//            bridge[handlerName].apply(this,args)
//        } else {
//            setupWebViewJavascriptBridge(function(bridge){
//                bridge[handlerName].apply(this,args)
//            });
//        }
//    }
//}
//
//var registerHandler = handler('registerHandler');
//var callHandler = handler('callHandler');
//
//
////
//var getAppVerison = function(data) {
//    //alert('huhuhuhu');
//    return new Promise(function (resolve, reject) {
//        callHandler('testObjcCallback', data, function (response) {
//            alert(response)
//            resolve(response)
//        })
//    })
//}
//
//var bridge_CheckNetState = function(data) {
//    alert('huhuhuhu');
//    return new Promise(function (resolve, reject) {
//        callHandler('bridge_CheckNetState', data, function (response) {
//            alert(response);
//            resolve(response)
//        })
//    })
//};
