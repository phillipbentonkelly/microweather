var MicroWeather_Controller = {};
var microWeather_cont_Obj = {};

(function( win, $, undefined){
	'use strict';

	MicroWeather_Controller = function(){
		if( ! (this instanceof MicroWeather_Controller))
			return new MicroWeather_Controller();
	};

	var _data = {};

	MicroWeather_Controller.prototype = {
		eventHandlers: function(){

		},
		init: function(){
			console.log("INIT: MicroWeather_Controller");
		}
	};
})(window, jQuery);