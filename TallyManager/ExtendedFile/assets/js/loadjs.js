
function LoadJs(js, remotePath)
{
    
    if(window.dapp!=undefined && window.dapp.getFileContents!=undefined && js.indexOf("common.js")<0 && js.indexOf("dialog.js")<0)
    {
        var s = document.createElement('script');
        s.innerHTML = window.dapp.getFileContents(js);
        document.head.appendChild(s);
    }
    else
    {
        document.write("<script src='" + remotePath + js + "'><\/script>"); 
    }
}

function LoadCss(css, remotePath)
{
    if(window.dapp!=undefined && window.dapp.getFileContents!=undefined)
    {
        var s = document.createElement('style');
        s.innerHTML = window.dapp.getFileContents(css);
        document.head.appendChild(s);
    }
    else
    {
        document.write("<link rel='stylesheet' type='text/css' href='" + remotePath + css + "' />");
    }
}
//∏Ωº”…˘–ß
function AttachAudio()
{
}
