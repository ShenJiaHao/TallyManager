/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */
;(function($){
	
	/**
	 * Displays loading mask over selected element.
	 *
	 * @param label Text message that will be displayed on the top of a mask besides a spinner (optional). 
	 * 				If not provided only mask will be displayed without a label or a spinner.  	
	 */
	$.fn.mask = function(label){
		
//		this.unmask();
//		if(this.css("position") == "static") {
//			this.addClass("masked-relative");
//		}
		this.addClass("masked");
		
		var maskDiv = $('<div class="loadmask"></div>');
		
		//auto height fix for IE
		if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
			maskDiv.height(this.height() + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")));
			maskDiv.width(this.width() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")));
		}
		
		//fix for z-index bug with selects in IE6
//		if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
//			this.find("select").addClass("masked-hidden");
//		}
		
		this.append(maskDiv);
		
		if(typeof label == "string") {
			var maskMsgDiv = $('<div class="loadmask-msg"></div>');
			maskMsgDiv.append('<div>' + label + '</div>');
			this.append(maskMsgDiv);
			//maskMsgDiv.show();
		}
		
	};
	
	/**
	 * Removes mask from the element.
	 */
	$.fn.unmask = function(label){
		this.find(".loadmask-msg,.loadmask").remove();
		this.removeClass("masked");
		//this.removeClass("masked-relative");
		//this.find("select").removeClass("masked-hidden");
	};
 
})(jQuery);