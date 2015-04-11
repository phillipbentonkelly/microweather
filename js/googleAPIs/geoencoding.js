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
	}
};

$(document).ready(function() {
	geo.eventHandlers();
});

geo.eventHandlers = function() {
	// get location data from user input
	$('.get-json').click(function() {
		geo.getLocation();
	});
}

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
geo.getForcast = function(lat, lng) {
	var reqUrl = geo.apis.forcast.baseUrl + geo.apis.forcast.key + '/' + lat + ',' + lng;
	console.log(reqUrl);
	$.ajax({
		url: reqUrl,
		jsonpCallback: 'geo.parseForcast',
		dataType: 'jsonp',
	});
}

// parses event's weather data
geo.parseForcast = function(data) {
	console.log(data);
};






