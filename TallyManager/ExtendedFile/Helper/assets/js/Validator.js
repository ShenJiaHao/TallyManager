/*************************************************
验证脚本
*************************************************/

Validator = {
    Require : /.+/,
    Require0 : /^(?!0).+/,
    Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
    Mobile : /^[0-9]{11}$/, ///^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
    MobileEx : "this.IsMobileEx(value)",
    Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    IdCard : "this.IsIdCard(value)",
    IdCardEx : "this.IsIdCardEx(value)",
    Currency : /^\d+(\.\d+)?$/,
    Number : /^\d+$/,
    Zip : /^[1-9]\d{5}$/,
    QQ : /^[1-9]\d{4,8}$/,
    Integer : /^[-\+]?\d+$/,
    Integer0 : /^[1-9]\d*$/,
    Double : /^[-\+]?\d+(\.\d+)?$/,
    Double0 : /^[1-9]\d*(\.\d+)?$/,
    English : /^[A-Za-z]+$/,
    Chinese :  /^[\u0391-\uFFE5]+$/,
    Username : /^[a-z]\w{3,}$/i,
    UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
    IsSafe : function(str){return !this.UnSafe.test(str);},
    SafeString : "this.IsSafe(value)",
    Filter : "this.DoFilter(value, getAttribute('accept'))",
    Limit : "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
    LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
    Date : "this.IsDate(value, getAttribute('format'))",
    Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
    Range : "getAttribute('min') < (value|0) && (value|0) < getAttribute('max')",
    Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
    Custom : "this.Exec(value, getAttribute('regexp'))",
    Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
    
    //针对验证数组设定的过滤类型
    Filter_Ary : "this.DoFilter(value, accept)",
    Limit_Ary : "this.limit(value.length,min,max)",
    LimitB_Ary : "this.limit(this.LenB(value), min,max)",
    Repeat_Ary : "value == document.getElementsByName(to)[0].value",
    Range_Ary : "min < (value|0) && (value|0) < max",
    Compare_Ary : "this.compare(value,operator,to)",
    Custom_Ary : "this.Exec(value, regexp)",
    Group_Ary : "this.MustChecked(name, min, max)",
    
    ErrorItem : [document.forms[0]],
    ErrorMessage : ["以下原因导致提交失败：\t\t\t\t"],
    
    Validate : function(theForm, mode){
        var obj = theForm || event.srcElement;
        var count = obj.elements.length;
        this.ErrorMessage.length = 1;
        this.ErrorItem.length = 1;
        this.ErrorItem[0] = obj;
        for(var i=0;i<count;i++){
            if((obj.elements[i].style.display!=null 
                && obj.elements[i].style.display == "none")
                || (GetParentNode(obj.elements[i]).style.display!=null 
                && GetParentNode(obj.elements[i]).style.display == "none")
                || (GetParentNode(GetParentNode(obj.elements[i])).style.display!=null 
                && GetParentNode(GetParentNode(obj.elements[i])).style.display == "none"))
            {
                //首先要判断节点本身或其父级节点是可见的
            }
            else
            {
                with(obj.elements[i]){
                    var _dataType = getAttribute("dataType");
                    if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined") continue;
                    var _msg = getAttribute("msg");
                    if(_msg == undefined || _msg==null) continue;
                    this.ClearState(obj.elements[i]);
                    if(getAttribute("require") == "false" && value == "") continue;
                    switch(_dataType){
                        case "IdCard":
                        case "IdCardEx":
                        case "MobileEx":
                        case "Date":
                        case "Repeat":
                        case "Range":
                        case "Compare":
                        case "Custom":
                        case "Group": 
                        case "Limit":
                        case "LimitB":
                        case "SafeString":
                        case "Filter":
                            if(!eval(this[_dataType])){
                                this.AddError(i, getAttribute("msg"));
                            }
                            break;
                        default:
                            if(!this[_dataType].test(value)){
                                this.AddError(i, getAttribute("msg"));
                            }
                            break;
                    }
                }
            }
        }
        if(this.ErrorMessage.length > 1){
            mode = mode || 1;
            var errCount = this.ErrorItem.length;
            switch(mode){
            case 2:
                for(var i=1;i<errCount;i++)
                    this.ErrorItem[i].style.color = "red";
            case 1:
                alert(this.ErrorMessage.join("\n"));
                if(this.ErrorItem[1].type!="hidden")
                {
                    this.ErrorItem[1].focus();
                }
                break;
            case 3:
                for(var i=1;i<errCount;i++){
                    try{
                        var span = document.createElement("SPAN");
                        span.id = "__ErrorMessagePanel";
                        span.style.color = "red";
                        this.ErrorItem[i].parentNode.appendChild(span);
                        span.innerHTML = "<br style='clear:both;' />" + this.ErrorMessage[i].replace(/\d+:/,"*");
                    }
                    catch(e)
                    {
                        alert(e.description);
                    }
                }
                if(this.ErrorItem[1].type!="hidden" && this.ErrorItem[1].style.display!="none")
                {
                    this.ErrorItem[1].focus();
                }
                break;
            default :
                alert(this.ErrorMessage.join("\n"));
                break;
            }
            return false;
        }
        return true;
    },
    
    Validate_JQuery : function(theElement, mode){
        var obj = theElement || event.srcElement;
        var eles = obj.find("input,select");
        var count = eles.length;
        this.ErrorMessage.length = 1;
        this.ErrorItem.length = 1;
        this.ErrorItem[0] = obj;
        for(var i=0;i<count;i++){
            with(eles[i]){
                var _dataType = getAttribute("dataType");
                if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined") continue;
                var _msg = getAttribute("msg");
                if(_msg == undefined || _msg==null) continue;
                this.ClearState(eles[i]);
                if(getAttribute("require") == "false" && value == "") continue;
                switch(_dataType){
                    case "IdCard":
                    case "IdCardEx":
                    case "MobileEx":
                    case "Date":
                    case "Repeat":
                    case "Range":
                    case "Compare":
                    case "Custom":
                    case "Group": 
                    case "Limit":
                    case "LimitB":
                    case "SafeString":
                    case "Filter":
                        if(!eval(this[_dataType])){
                            this.AddError_JQuery(i, eles[i], getAttribute("msg"));
                        }
                        break;
                    default:
                        if(!this[_dataType].test(value)){
                            this.AddError_JQuery(i, eles[i], getAttribute("msg"));
                        }
                        break;
                }
            }
        }
        if(this.ErrorMessage.length > 1){
            mode = mode || 1;
            var errCount = this.ErrorItem.length;
            switch(mode){
            case 2:
                for(var i=1;i<errCount;i++)
                    this.ErrorItem[i].style.color = "red";
            case 1:
                alert(this.ErrorMessage.join("\n"));
                if(this.ErrorItem[1].type!="hidden")
                {
                    this.ErrorItem[1].focus();
                }
                break;
            case 3:
                for(var i=1;i<errCount;i++){
                    try{
                        var span = document.createElement("SPAN");
                        span.id = "__ErrorMessagePanel";
                        span.style.color = "red";
                        this.ErrorItem[i].parentNode.appendChild(span);
                        span.innerHTML = "<br style='clear:both;' />" + this.ErrorMessage[i].replace(/\d+:/,"*");
                    }
                    catch(e)
                    {
                        alert(e.description);
                    }
                }
                if(this.ErrorItem[1].type!="hidden" && this.ErrorItem[1].style.display!="none")
                {
                    this.ErrorItem[1].focus();
                }
                break;
            default :
                alert(this.ErrorMessage.join("\n"));
                break;
            }
            return false;
        }
        return true;
    },
    
    Validate_Ary : function(theElement, ary){
        var count = ary.length;
        this.ErrorMessage.length = 1;
        this.ErrorItem.length = 1;
        var obj = theElement || event.srcElement;
        this.ErrorItem[0] = obj;
        for(var i=0;i<count;i++){
            with(ary[i]){
                var _dataType = dataType;
                if(_dataType=="Filter" || _dataType=="Limit" || _dataType=="LimitB"
                    || _dataType=="Repeat" || _dataType=="Range" || _dataType=="Compare"
                    || _dataType=="Custom" || _dataType=="Group")
                {
                    _dataType = _dataType + "_Ary";
                }
                
                switch(_dataType){
                    case "IdCard":
                    case "IdCardEx":
                    case "MobileEx":
                    case "Date":
                    case "Repeat":
                    case "Range":
                    case "Compare":
                    case "Custom":
                    case "Group": 
                    case "Limit":
                    case "LimitB":
                    case "SafeString":
                    case "Filter":
                        if(!eval(this[_dataType])){
                            this.AddError(i, msg);
                        }
                        break;
                    default:
                        if(!this[_dataType].test(value)){
                            this.AddError(i, msg);
                        }
                        break;
                }
            }
        }
        if(this.ErrorMessage.length > 1){
            alert(this.ErrorMessage.join("\n"));
            return false;
        }
        return true;
    },

    limit : function(len,min, max){
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },

    LenB : function(str){
        return str.replace(/[^\x00-\xff]/g,"**").length;
    },

    ClearState : function(elem){
        with(elem){
            if(style.color == "red")
                style.color = "";
            var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
            if(lastNode.id == "__ErrorMessagePanel")
                parentNode.removeChild(lastNode);
        }
    },

    AddError : function(index, str){
        this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
        this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
    },
    
    AddError_JQuery : function(index, ele, str){
        this.ErrorItem[this.ErrorItem.length] = ele;
        this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
    },

    Exec : function(op, reg){
        return new RegExp(reg,"g").test(op);
    },

    compare : function(op1,operator,op2){
        var op22 = document.getElementById(op2).value;
        switch (operator) {
            case "NotEqual":
                return (op1 != op22);
            case "GreaterThan":
                return (op1 > op22);
            case "GreaterThanEqual":
                return (op1 >= op22);
            case "LessThan":
                return (op1 < op22);
            case "LessThanEqual":
                return (op1 <= op22);
            default:
                return (op1 == op22);
        }
    },

    MustChecked : function(name, min, max){
        var groups = document.getElementsByName(name);
        var hasChecked = 0;
        min = min || 1;
        max = max || groups.length;
        for(var i=groups.length-1;i>=0;i--)
            if(groups[i].checked) hasChecked++;
        return min <= hasChecked && hasChecked <= max;
    },
    
    DoFilter : function(input, filter){
        return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(input);
    },

    IsMobileEx : function(number){
        if(number.length == 0)
        {
            return true;
        }
        else if(number.length == 11)
        {
            return /^[0-9]{11}$/.test(number);
        }
        else
        {
            return false;
        }
    },
    
    IsIdCard : function(number){
//        var date, Ai;
//        var verify = "10x98765432";
//        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
//        var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
//        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
//        if(re == null) return false;
//        if(re[1] >= area.length || area[re[1]] == "") return false;
//        if(re[2].length == 12){
//            Ai = number.substr(0, 17);
//            date = [re[9], re[10], re[11]].join("-");
//        }
//        else
//        {
//            Ai = number.substr(0, 6) + "19" + number.substr(6);
//            date = ["19" + re[4], re[5], re[6]].join("-");
//        }

//        if(!this.IsDate(date, "ymd")) return false;
//        var sum = 0;
//        for(var i = 0;i<=16;i++){
//            sum += Ai.charAt(i) * Wi[i];
//        }
//        Ai +=  verify.charAt(sum%11);
//        return (number.length ==15 || number.length == 18 && number == Ai);
        
        
        return (number.length ==15 || number.length == 18);
    },
    
    IsIdCardEx : function(number){
        return (number.length ==15 || number.length == 18 || number.length == 0);
    },

    IsDate : function(op, formatString){
        formatString = formatString || "ymd";
        var m, year, month, day;
        switch(formatString){
            case "ymd" :
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                if(m == null ) return false;
                day = m[6];
                month = m[5]*1;
                year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            case "dmy" :
                m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                if(m == null ) return false;
                day = m[1];
                month = m[3]*1;
                year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                break;
            case "ymdhm" :
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})\\s\[0-2]{1}\[0-9]{1}:\[0-5]{1}\[0-9]{1}$"));
                if(m == null ) return false;
                day = m[6];
                month = m[5]*1;
                year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            default :
                break;
        }
        if(!parseInt(month)) return false;
        month = month==0 ?12:month;
        var date = new Date(year, month-1, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
        function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
    }
 }

function GetParentNode(src)
{
    if(src.parentElement)
    {
        return src.parentElement;
    }
    else
    {
        return src.parentNode;
    } 
}