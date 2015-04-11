var MicroWeather_UI = {};
var microWeather_ui_Obj = {};

(function( win, $, undefined){
	'use strict';

	MicroWeather_UI = function(){
		if( ! (this instanceof MicroWeather_UI))
			return new MicroWeather_UI();
	};

	var _data = {};

	MicroWeather_UI.prototype = {
		eventHandlers: function(){

		},
		init: function(){
			console.log("INIT: MicroWeather_UI");
		}
	};
})(window, jQuery);