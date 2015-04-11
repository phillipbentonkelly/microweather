var geo = {
	apis: {
		googlemaps: {
			key: 'AIzaSyD26TygPzZlw5ORPgSqg8sZ6sGfwA22uPg',
			baseUrl: 'https://maps.googleapis.com/maps/api/geocode/json'
		},
		forcast: {
			key: 'e45ac05b1efd43347562b3fa5092f397',
			baseUrl: 'https://api.forecast.io/forecast/'
		}
	},
	weather: {
		current: {
			summary: '',
			temp: '',
			feelsLike: '',
			windSpeed: '',
			icon: ''
		},
		icons: {
			'partly-cloudy-day': 'wi-day-cloudy',
			'clear-day': 'wi-day-sunny',
			'rain': 'wi-umbrella',
			'partly-cloudy-night': 'wi-night-cloudy',
			'snow': 'wi-snow'
		}
	}
};

$(document).ready(function() {
	geo.eventHandlers();
	geo.locateUser();
});

geo.eventHandlers = function() {
	// get location data from user input
	$('.get-json').click(function() {
		geo.getLocation();
	});
};

geo.locateUser = function() {
	var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
};

function geo_success(position) {
	var time = Date.now();
	geo.getForcast(position.coords.latitude, position.coords.longitude, time);
}

function geo_error() {
	alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

// retrieves event geolocation from address
geo.getLocation = function() {
	var eventAddress;
	eventAddress = $('.event-location').val();
	var reqUrl = geo.apis.googlemaps.baseUrl + '?address=' + eventAddress + '&key=' + geo.apis.googlemaps.key;
	$.get(reqUrl).done(function(data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		geo.getForcast(lat, lng);
		console.log('Lat and Long', lat, lng);
	});
};

// retrieves event weather info from latitude and longitude
geo.getForcast = function(lat, lng, timee) {
	var reqUrl;
	var time = Date.now();
	if(time !== 'undefined') {
		reqUrl = geo.apis.forcast.baseUrl + geo.apis.forcast.key + '/' + lat + ',' + lng + time;
	} else {
		reqUrl = geo.apis.forcast.baseUrl + geo.apis.forcast.key + '/' + lat + ',' + lng;
	}

	$.ajax({
		url: reqUrl,
		jsonpCallback: 'geo.parseForcast',
		dataType: 'jsonp',
	});
};

// parses event's weather data
geo.parseForcast = function(data) {
	console.log(data);
	var currentForcast = geo.weather.current;

	currentForcast.summary = data.currently.summary;
	currentForcast.temp = data.currently.temperature;
	currentForcast.feelsLike = data.currently.apparentTemperature;
	currentForcast.windSpeed = data.currently.windSpeed;
	currentForcast.icon = geo.getWeatherIcon(data.currently.icon);
	debugger;
	// console.log('summary', currentForcast.summary);
	// console.log('temp',currentForcast.temp);
	// console.log('feels like',currentForcast.feelsLike);
	// console.log('wind speed',currentForcast.windSpeed);	
	// console.log('weather icon SHould be.....',data.currently.icon);
};

geo.getWeatherIcon = function(icon) {
	for(var i = 0; i < Object.keys(geo.weather.icons).length; i++) {
		console.log(Object.keys(geo.weather.icons)[i]);
		if(Object.keys(geo.weather.icons)[i] === icon) {
			return geo.weather.icons[Object.keys(geo.weather.icons)[i]];
		}
	}
};





