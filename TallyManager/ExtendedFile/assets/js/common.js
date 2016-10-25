
//解决单击延迟300MS的问题
window.addEventListener( "load", function() {
    //FastClick.attach( document.body );
}, false );

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};
String.prototype.trim=function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


var ScrollWrapForInput_H;
var ScrollWrapForInput_MarginHeight;
var ScrollWrapForInput_TopMargin;
var ScrollWrapForInput_WrapName;
//焦点控件自动滚动出来，为了解决输入控件被遮住的问题
function InitWrapForInputScroll(wrapName, marginHeight, topMargin, headerName)
{
    ForbidEnterSubmit(wrapName, topMargin);
}
function ScrollWrapForInput()
{
    $("#" + ScrollWrapForInput_WrapName).css("height", $(window).height() - ScrollWrapForInput_H - ScrollWrapForInput_MarginHeight);
    $("#" + ScrollWrapForInput_WrapName).scrollTop(document.activeElement.offsetTop - ScrollWrapForInput_TopMargin);
    document.activeElement.focus();
}


//禁止回车提交页面，转出跳转到下一个控件(仅针对webkit内核)
function ForbidEnterSubmit(wrapName, topMargin)
{
    window.document.onkeydown=function(e){
        var evt = window.event || e;
        if(evt.keyCode==13){
            var el = evt.srcElement || evt.target;
            if(el.tagName!="TEXTAREA")
            {
                el = nextCtl(el);
                if(el!=null)
                {
                    el.focus();
                    if(($(window).height()-topMargin)<=document.activeElement.offsetTop)
                    {
                        $("#" + wrapName)[0].scrollTop = document.activeElement.offsetTop - topMargin;
                    }
                }
                evt.preventDefault();
            }
        }
    }
}
function nextCtl(ctl) 
{
    var form = ctl.form;
    for (var i = 0; i < form.elements.length - 1; i++) {
        if (ctl == form.elements[i]) {
            for(var j=i+1;j<form.elements.length;j++)
            {
                if(form.elements[j]!=null && form.elements[j]!=undefined && $(form.elements[j]).attr("disabled")!="disabled")
                {
                    return form.elements[j];
                }
            }
            return null;
        }
    }
    return null;
}

// 格式化日期的表示 
function FormatDate(date,str) 
{ 
    str=str.replace(/yyyy|YYYY/,date.getFullYear());   
    var Month = date.getMonth() + 1;
    str=str.replace(/MM/,Month>9?Month.toString():'0' + Month);   
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
    return str; 
} 

//日期格式化
Date.prototype.format = function(format) {
	var o =
		{
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(),    //day
			"h+": this.getHours(),   //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
			"S": this.getMilliseconds() //millisecond
		};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

/** 
* 格式化数字显示方式 
* 用法 
* formatNumber(12345.999,'#,##0.00'); 
* formatNumber(12345.999,'#,##0.##'); 
* formatNumber(123,'000000'); 
* @param num 
* @param pattern 
*/  
function formatNumber(num,pattern){   
  var strarr = num?num.toString().split('.'):['0'];   
  var fmtarr = pattern?pattern.split('.'):[''];   
  var retstr='';   
  
  // 整数部分   
  var str = strarr[0];   
  var fmt = fmtarr[0];   
  var i = str.length-1;     
  var comma = false;   
  for(var f=fmt.length-1;f>=0;f--){   
    switch(fmt.substr(f,1)){   
      case '#':   
        if(i>=0 ) retstr = str.substr(i--,1) + retstr;   
        break;   
      case '0':   
        if(i>=0) retstr = str.substr(i--,1) + retstr;   
        else retstr = '0' + retstr;   
        break;   
      case ',':   
         comma = true;   
         retstr=','+retstr;   
        break;   
     }   
   }   
  if(i>=0){   
    if(comma){   
      var l = str.length;   
      for(;i>=0;i--){   
         retstr = str.substr(i,1) + retstr;   
        if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;   
       }   
     }   
    else retstr = str.substr(0,i+1) + retstr;   
   }   
   retstr = retstr+'.';   

  // 处理小数部分   
   str=strarr.length>1?strarr[1]:'';   
   fmt=fmtarr.length>1?fmtarr[1]:'';   
   i=0;   
  for(var f=0;f<fmt.length;f++){   
    switch(fmt.substr(f,1)){   
      case '#':   
        if(i<str.length) retstr+=str.substr(i++,1);   
        break;   
      case '0':   
        if(i<str.length) retstr+= str.substr(i++,1);   
        else retstr+='0';   
        break;   
     }   
   }   
  return retstr.replace(/^,+/,'').replace(/\.$/,'');   
}   

//四舍五入
function  FourSubFiveAdd(num,v)  {
    var vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
}

//===========================数字输入框按钮事件处理===============================
//ctrl：数字输入框对象，注意是jquery对象
//callback：增减数字后的回调事件
//减
function SNum(ctrl, callback)
{
    var n = ctrl.val();
    if(n=="")
    {
        n = "0";
    }
    if(parseFloat(n)>=1)
    {
        n = parseFloat(n)-1;
    }
    else
    {
        n = 0;
    }
    ctrl.val(n);
    if(callback)
    {
        callback();
    }
}
//加
function ANum(ctrl, callback)
{
    var n = ctrl.val();
    if(n=="")
    {
        n = "0";
    }
    n = parseFloat(n)+1;
    ctrl.val(n);
    if(callback)
    {
        callback();
    }
}
//===========================数字输入框按钮事件处理===============================


function CheckAll(checkbox)
{
	var elements = checkbox.form.elements;
	for(var i = 0;i < elements.length;i++)
	{  
		//if(elements[i].type == "checkbox" && elements[i].name.substring(0,3)=="sel")  
		if(elements[i].type == "checkbox")  
		{                    
			if(elements[i].disabled==true)
			{
			    elements[i].checked = false;
			}
			else
			{
			    elements[i].checked = checkbox.checked;
			}
		}
	} 
}


//===========================本地化处理===============================
//判断数据是否存在
function CheckLocalItem(itemName)
{
    if(localStorage!=undefined && localStorage!=null)
    {
        var data = localStorage.getItem(itemName);
        if(data!=undefined && data!=null)
        {
            return true;
        }
        return false;
    }
    return false;
}
//获取数据
function GetLocalItem(itemName)
{
    if(localStorage!=undefined && localStorage!=null)
    {
        return localStorage.getItem(itemName);
    }
    return null;
}
//保存数据
function SetLocalItem(itemName, itemValue)
{
    if(localStorage!=undefined && localStorage!=null)
    {
        localStorage.removeItem(itemName);
        localStorage.setItem(itemName, itemValue);
    }
}
//===========================本地化处理===============================


//获取系统基本参数(记得在正式发布的时候，这个默认值需要去掉)
var __url = "http://" + window.location.host;
var __userId = "";
var __userName = "";
var __manageId = "";
var __shopId = "";
var __shopName = "";
var __powerFDBH = "";
var __roleType = "1";
var __roleName = "理货员";
var __appName = "D咨询门店通";
if(window.dapp!=undefined)
{
    /******* sense add **********/
    bridge_GetWebRoot()
        .then(function(data){
            //alert('mkmkmkmkmkmkmk');
            //alert(data);

            __url = "http://" + data;
            //alert('__url : '+ __url);
        });
    /******* sense over **********/

    //__url = "http://" + window.dapp.GetWebRoot();         //

}

$().ready(function(){


    //初始化本地数据
    InitFromLocalStorage();
    
    //判断是否登录(在线页面不判断)
    if(window.location.href.toLowerCase().indexOf(".aspx")<=0)
    {
        //alert('ready1');
        if(__userId=="")
        {
            //alert('ready2');
            //alert(window.location.href);
            //alert(window.location.href.toLowerCase());
            if(window.location.href.toLowerCase().indexOf("login.html")<=0)
            {
                //alert('ready3');
                //alert('__url : '+ __url);
                LoadUrl(__url + "/Mobile/Login.html", "Login.html");
            }
        }
    }
});


//存储到本地
function SaveToLocalStorage(__url, __userId, __manageId, __shopId, __appName, __powerFDBH, __roleType, __userName, __shopName, __roleName)
{
    SetLocalItem("__url", __url);
    SetLocalItem("__userId", __userId);
    SetLocalItem("__manageId", __manageId);
    SetLocalItem("__shopId", __shopId);
    
    if(__appName!=null)
    {
        SetLocalItem("__appName", __appName);
    }
    
    SetLocalItem("__powerFDBH", __powerFDBH);
    SetLocalItem("__roleType", __roleType);
    SetLocalItem("__userName", __userName);
    SetLocalItem("__shopName", __shopName);
    SetLocalItem("__roleName", __roleName);
}
//从本地存储读取
function InitFromLocalStorage()
{
    //alert('从localstorage拿数据');
    if(CheckLocalItem("__url"))
    {
        __url = GetLocalItem("__url");
    }
    if(CheckLocalItem("__userId"))
    {
        __userId = GetLocalItem("__userId");
    }
    if(CheckLocalItem("__manageId"))
    {
        __manageId = GetLocalItem("__manageId");
    }
    if(CheckLocalItem("__shopId"))
    {
        __shopId = GetLocalItem("__shopId");
    }
    if(CheckLocalItem("__appName"))
    {
        __appName = GetLocalItem("__appName");
    }
    if(CheckLocalItem("__powerFDBH"))
    {
        __powerFDBH = GetLocalItem("__powerFDBH");
    }
    if(CheckLocalItem("__roleType"))
    {
        __roleType = GetLocalItem("__roleType");
    }
    if(CheckLocalItem("__userName"))
    {
        __userName = GetLocalItem("__userName");
    }
    if(CheckLocalItem("__shopName"))
    {
        __shopName = GetLocalItem("__shopName");
    }
    if(CheckLocalItem("__roleName"))
    {
        __roleName = GetLocalItem("__roleName");
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function LoadUrl(relativeUrl, absoluteUrl)
{
    //alert('跳到LoadUrl了');
    //alert(relativeUrl);
    //alert(absoluteUrl);
    if(window.dapp!=undefined)
    {
        window.dapp.LoadLocalUrl(absoluteUrl);
    }
    else
    {
        window.location.href = relativeUrl;
    }
    //window.location.href = relativeUrl;
}

function CheckNet(callback, callbackTimeout)
{

    //if(window.dapp!=undefined) {
    //    //监测网络状态
    //    if (window.dapp.CheckNetState() == "0") {
    //        if (callback) {
    //            callback();
    //            return;
    //        }
    //    }
    //}

        /******* sense add **********/
        if(window.dapp.CheckNetState()
                .then(function(data){
                    if(data == "0") {
                        //alert('mkmkmkmkmkmkmk');
                        if (callback) {
                            callback();
                            return;
                        }
                    }
                })
        );
        /******* sense over *********/

        /************** 这个 不要删 **************/
        //getAppVerison()
        //    .then(function(data){
            //    if(data == "0"){
            //        if(callback) {
            //　　　          callback();
            //　　　          return;
            //　　　      }
            //    }
            //    alert(data);
            //})
        /************** 这个 不要删 **************/

    //监测是否连接服务器
    $.ajax ({

        type:"post",
        url:__url + "/Mobile/Api/SysService.ashx",
        dataType:"html",
        data:"action=heart",
        timeout:2000,
        success:function(data){
            //alert('来到ajax了----callback')
            if(callback)
            {
　　　          callback();
　　　       }
        },
        error: function (XHR, textStatus, erroThrown) {
            //alert('来到ajax了----callbackTimeout ---- error')
            if(callbackTimeout)
            {
　　　          callbackTimeout();
　　　      }
　　　      XHR = null;
        },

        complete: function (XHR, TS) {
            //alert('来到ajax了----callbackTimeout')
            //alert('status:' + status)
            //alert('url:'+ __url + "/Mobile/Api/SysService.ashx");
            if(status=='timeout'){

                if(callbackTimeout)
                {
 　　　　　         callbackTimeout();
 　　　　　     }
　　　　    }
            XHR = null;
        }
    });
}

function ShowAlert(msg)
{
    if(window.dapp!=undefined)
    {
        window.dapp.ShowToast(msg);
    }
    else
    {
        alert(msg);
    }
}

