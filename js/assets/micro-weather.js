var MicroWeather = {};
var microWeatherObj = {};

(function( win, $, undefined){
	'use strict';

	MicroWeather = function(){
		if( ! (this instanceof MicroWeather))
			return new MicroWeather();
	};

	var _data = {
		'initParams': {},
		'unInittedPlugins': [],
		'independantPlugins': [],
		'dependantPlugins': [],
		'mappedPlugins': []
	};

	MicroWeather.prototype = {
		eventHandlers: function(){

		},
		init: function( params ){
            _data.initParams = params;
            this.eventHandlers();

			if(typeof(params.plugins) !== 'undefined' && params.plugins.length > 0){
                _data.unInittedPlugins = params.plugins;

                for(var i = 0; i < _data.unInittedPlugins.length; i++){
                    if(_data.unInittedPlugins[i].initOnPlayersReady === false){
                        _data.independantPlugins.push(_data.unInittedPlugins[i]);
                    }else{
                        _data.dependantPlugins.push(_data.unInittedPlugins[i]);
                    }
                }
                thisRef.regStandAlonePlugins();
            }
		},
		// intializes plugins not related to Brightcove players
        regStandAlonePlugins: function(){
            for(var i = 0; i < _data.independantPlugins.length; i++){
                this.setPlugin(_data.independantPlugins[i], 'independantPlugins');
            }

            this.initPlugin( _data.independantPlugins );
        },
        regDependedPlugins: function(){
            for(var i = 0; i < _data.dependantPlugins.length; i++){
                this.setPlugin(_data.dependantPlugins[i], 'dependantPlugins');
            }

            this.initPlugin( _data.dependantPlugins );
        },
        // stores a reference to plusgins that need to be initialized
        // and in what array they belong to (player dependant or not)
        setPlugin: function( pluginObj, dataArrRef ){
            try{
                var thisRef = this;
                var fn = window[pluginObj.name];
                window[pluginObj.winName] = fn();

                _data.mappedPlugins[pluginObj.name] = {
                    'initObj': pluginObj,
                    'func': window[pluginObj.winName],
                    'initted': false
                };

                _data.pluginsRefsArr.push(pluginObj.name);
            }catch(err){}
        },
        // intializes plugins on the page
        initPlugin: function( objArr ){
            for(var i = 0; i < objArr.length; i++){
                if(typeof(_data.mappedPlugins[objArr[i].name].func.init) !== 'undefined'){
                    _data.mappedPlugins[objArr[i].name].func.init(_data.mappedPlugins[objArr[i].name].initObj.initParams);
                    _data.mappedPlugins[objArr[i].name].initted = true;
                }
            }
        },

        // GETTERS:
        accessPlugins: function( pluginName ){
            return pluginName, _data.mappedPlugins[pluginName];
        },
        getObjData: function(){
            return _data;
        }
	};
})(window, jQuery);