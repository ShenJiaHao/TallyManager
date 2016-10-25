

//自定义弹出窗口，注意：该窗口模式一般支持单级弹出，最多支持二级弹出，如果在弹出窗口中还需要弹出，
//那么第一级弹出必须在本窗口（inMainFrame=false），第二级则必须是在顶级窗口（inMainFrame=true）
var _dialogTpl =
'<table class="erp_ui_border">' +
	'<tbody>' +
		'<tr id="_erp_ui_title_bar" class="erp_ui_title_bar">' +
			'<td class="erp_ui_title" valign="top"></td>' +
		    '<td class="erp_ui_title_buttons" valign="top">' +
			    '<a class="erp_ui_close" href="javascript:CloseErpDialog();" title="\u5173\u95ED"></a>' +
		    '</td>' +
		'</tr>' +
		'<tr>' +
			'<td colspan="2" class="erp_ui_content" valign="top"></td>' +
		'</tr>' +
	'</tbody>' +
'</table>';

//var _dialogTpl_Simple = "<table style='width:100%;height:100%;' border=0 cellpadding=0 cellspacing=0><tr><td class='erp_ui_content' valign='top'></td></tr></table>";
var _dialogTpl_Simple = '<div class="erp_ui_content"></div>';

var _EDI_LIST = null;
var _EDI = null;
var _EDI_IDX = "";
var _ErpParentWin = null;        //窗口对象
var _ErpParentWin_List = null;   //窗口数组
var _supportDrag = false;         //是否支持拖动(这里需要完善，在弹出窗口中再打开弹出窗口，那个新的弹出窗口就无法正常拖动了)
var _CurrentErpDialogDivId = null;
var _FullScreen = false;

function ShowErpDialog(url, title, width, height, callbackFun, parentWin)
{
    if(_EDI!=null)
    {
        //如果当前窗口不为空，则应该将当前窗口压入窗口数组，并将当前窗口设置为null
        if(_EDI_LIST==null)
        {
            _EDI_LIST = new Array();
        }
        _EDI_LIST.push(_EDI);
        _EDI = null;
        //return;
    }
    if(_ErpParentWin!=null)
    {
        //如果当前窗口不为空，则应该将当前窗口压入窗口数组，并将当前窗口设置为null
        if(_ErpParentWin_List==null)
        {
            _ErpParentWin_List = new Array();
        }
        _ErpParentWin_List.push(_ErpParentWin);
        _ErpParentWin = null;
    }
    
    if(parentWin!=undefined)
    {
        _ErpParentWin = parentWin;
    }
    else
    {
        _ErpParentWin = window;
    }
    
    if(_EDI_LIST==null)
    {
        _EDI_IDX = "";
    }
    else
    {
        _EDI_IDX = _EDI_LIST.length;
    }
    
    //是否全屏
    if(width==1 && height==1)
    {
        _FullScreen = true;
    }
    else
    {
        _FullScreen = false;
    }
    
    //手机版无论如何都是全屏
    _FullScreen = true;
    
    if(_FullScreen==false)
    {
        //遮罩
        var maskDiv = $('<div id="DialogMask' + _EDI_IDX + '" style="z-index:20000;position: absolute;top:0px;left:0px;-moz-opacity: 0.5;opacity:.50;background-color:rgb(102, 102, 102);zoom:1;"></div>');
        maskDiv.height($(document).height());
        maskDiv.width($(document).width());
        $("body").append(maskDiv);
    }
    
    //设置窗口禁止滚动
    $("html").css("overflow", "hidden");
    $("body").css("overflow", "hidden");
	
    if(callbackFun!=undefined)
    {
        if(url.indexOf("?")<0)
        {
            url = url + "?callback=" + callbackFun;
        }
        else
        {
            url = url + "&callback=" + callbackFun;
        }
    }
    if(_FullScreen==false)
    {
        _EDI = $("<div id='DialogWin" + _EDI_IDX + "' class='erp_ui_op' style='position:absolute;z-index:20001;'></div>");
        _EDI.html(_dialogTpl);
    }
    else
    {
        _EDI = $("<div id='DialogWin" + _EDI_IDX + "' class='erp_ui_op' style='position:absolute;z-index:20001;padding:0px;width:100%;height:100%;top:0px;left:0px;'></div>");
        _EDI.html(_dialogTpl_Simple);
    }
    
    var th = 36;
    
    //这里开始处理宽度和高度(如果宽、高都小于1，表示用的可视宽度的百分比)
    if(width<=1)
    {
        width = parseInt(width * $(window).width(),10);
    }
    if(height<=1)
    {
        height = parseInt(height * $(window).height(),10);
    }
    if(_FullScreen)
    {
//        _EDI.css("width", $(window).width() + "px");
//        _EDI.css("height", $(window).height() + "px");
          _EDI.css("top", $(window).scrollTop()+"px");
//        _EDI.css("left", "0px");
//        _EDI.find(".erp_ui_title").html(title);
    }
    else
    {
        _EDI.css("width", width + "px");
        _EDI.css("height", (height + th) + "px");
        _EDI.css("top", ($(window).height() / 2 - (height + th) / 2 + $(window).scrollTop())+"px");
        _EDI.css("left", ($(window).width() / 2 - width / 2)+"px");
        _EDI.find(".erp_ui_title").html(title);
    }
    
    //将对话框添加到窗口
    $("body").append(_EDI);
    
    if(_FullScreen==false)
    {
        _EDI.find("#_erp_ui_title_bar").attr("class", "");
    }
    
    if(url.indexOf(".")>=0)
    {
        //如果是IFrame形式，则将当前DivID设置为null
        _CurrentErpDialogDivId = null;
        _EDI.find(".erp_ui_content").html("<iframe id='_edi" + _EDI_IDX + "' name='_edi" + _EDI_IDX + "' scrolling=auto frameborder='0' width='100%' height='100%' src=\"" 
            + url + "\" onload='RemoveContentBackgroudImage()'></iframe>");
    }
    else
    {
        //记录当前DivID，便于在关闭的时候移除（如果不移除就直接把界面中这个div给移除了，下次就无法弹出了）
        _CurrentErpDialogDivId = url;
        $("#" + url).css("display", "");
        if(_FullScreen==false)
        {
            $("#" + url).css("width", (width - 4) + "px");
            $("#" + url).css("height", (height - 8) + "px");
            _EDI.find(".erp_ui_content").append($("#" + url));
        }
        else
        {
            $("#" + url).css("width", $(window).width() + "px");
            $("#" + url).css("height", $(window).height() + "px");
            _EDI.find(".erp_ui_content").append($("#" + url));
        }
        RemoveContentBackgroudImage();
    }
    
    //通知一下客户端，当前有弹出窗口
    if(window.dapp!=undefined)
    {
        if(window.dapp.SetPopup!=undefined)
        {
            window.dapp.SetPopup();
        }
    }
    
    return undefined;
}
function RemoveContentBackgroudImage()
{
    if(_EDI)
    {
        _EDI.find(".erp_ui_content").css("backgroundImage", "none");
    }
}
function CloseErpDialog()
{
    //通知一下客户端，当前已经没有弹出窗口
    if(window.dapp!=undefined)
    {
        if(window.dapp.SetPopupClose!=undefined)
        {
            window.dapp.SetPopupClose();
        }
    }
    if(_EDI)
    {
        if(_CurrentErpDialogDivId!=null)
        {
            $("#" + _CurrentErpDialogDivId).css("display", "none");
            $("body").append($("#" + _CurrentErpDialogDivId));
            _CurrentErpDialogDivId = null;
        }
        else
        {
            //首先移除内部的iframe
            _EDI.find("iframe").remove();
        }
        _EDI.remove();
        if(_FullScreen==false)
        {
            $("#DialogMask" + _EDI_IDX).remove();
        }
        
        
        //恢复窗口禁止滚动
        $("html").css("overflow", "");
        $("body").css("overflow", "");
        
        _EDI = null;
        
        //将窗口数组压出
        if(_EDI_LIST!=null)
        {
            _EDI = _EDI_LIST.pop();
            if(_EDI_LIST!=null && _EDI_LIST.length==0)
            {
                _EDI_LIST = null;
            }
            if(parseInt(_EDI_IDX,10)>0)
            {
                _EDI_IDX = parseInt(_EDI_IDX,10) - 1;
            }
            if(parseInt(_EDI_IDX,10)==0)
            {
                _EDI_IDX = "";
            }
            if(_supportDrag)
            {
                oMsgbox = _EDI[0];
            }
        }
        
        //将窗口数组压出
        if(_ErpParentWin_List!=null)
        {
            _ErpParentWin = _ErpParentWin_List.pop();
            if(_ErpParentWin_List!=null && _ErpParentWin_List.length==0)
            {
                _ErpParentWin_List = null;
            }
        }
    }
}
