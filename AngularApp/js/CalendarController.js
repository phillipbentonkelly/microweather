

var microweatherApp = angular.module('microweatherApp', ['ngRoute']);

microweatherApp.controller('MainController', function($scope) {
	$scope.setDay = function(newDay) {
		console.log( 'setting day to ', newDay);
		$scope.currentDay = newDay;
	};
});

microweatherApp.controller('CalendarController', ['$scope', 'getWeekEvents', function($scope, getWeekEvents) {
	$scope.week = { 
		sunday: {
			weekIndex: 1,
			name: 'sunday',
			events: ['Build a sick Angular app', 'Take a walk to the beach']
		},
		monday: {
			weekIndex: 2,
			name: 'monday',
			events: []
		},
		tuesday: {
			weekIndex: 3,
			name: 'tuesday',
			events: ['Finish Video Ecosystem', 'Go out to dinner with homies', 'Stock up on the groceries']
		},
		wednesday: {
			weekIndex: 4,
			name: 'wednesday',
			events: ['Goto the symphony at 8pm', 'eat Chicken Floretine']
		},
		thursday: {
			weekIndex: 5,
			name: 'thursday',
			events: ['Party at the Banshee with coworkers']
		},
		friday: {
			weekIndex: 6,
			name: 'friday',
			events: ['Goto the symphony at 8pm', 'Take out the trash', 'Turn Up']
		},
		saturday: {
			weekIndex: 7,
			name: 'saturday',
			events: ['Pick up some sweet kicks', 'Call mother', 'Pick up dry cleaning at 3pm']
		}
	};

	$scope.weekEvents = function() {
		console.log( getWeekEvents() );
	};

	$scope.removeItem = function(day, index) {
		$scope.week[day].events.splice([index], 1);
	};

}]);

microweatherApp.factory('getWeekEvents', function(){

	var getWeekEvents = function() {
		// Your Client ID can be retrieved from your project in the Google
		// Developer Console, https://console.developers.google.com

		// This quickstart only requires read-only scope, check
		// https://developers.google.com/google-apps/calendar/auth if you want to
		// request write scope.
		var CLIENT_ID = '535042335480-opmv90sbhuu2rjmecvg38ljjp8c5jr9g.apps.googleusercontent.com';
		var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
		var self = this;
		// Check if current user has authorized this application.
			
		this.checkAuth = function() {
			// return 'MESSAGESSS';
			// gapi.auth.authorize({
			// 	'client_id': this.CLIENT_ID,
			// 	'scope': this.SCOPES,
			// 	'immediate': true
			// }, this.handleAuthResult);
			// return msg;
			self.handleAuth()
		}

		this.handleAuth = function() {
			return 'Ethan is logged in';
		}

		this.checkAuth();

		// // Handle response from authorization server.
		// // @param {Object} authResult Authorization result.
		// handleAuthResult = function(authResult) {
		//   var authorizeDiv = document.getElementById('authorize-div');
		//   if (authResult && !authResult.error) {
		//     // Hide auth UI, then load Calendar client library.
		//     authorizeDiv.style.display = 'none';
		//     loadCalendarApi();
		//   } else {
		//     // Show auth UI, allowing the user to initiate authorization by
		//     // clicking authorize button.
		//     authorizeDiv.style.display = 'inline';
		//   }
		// },

		// // Initiate auth flow in response to user clicking authorize button.
		// // @param {Event} event Button click event.
		// handleAuthClick = function(event) {
		//   gapi.auth.authorize(
		//     {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
		//     handleAuthResult);
		//   return false;
		// },

		// // Load Google Calendar client library. List upcoming events
		// // once client library is loaded.
		// loadCalendarApi = function() {
		//   gapi.client.load('calendar', 'v3', listUpcomingEvents);
		// },

		// // Print the summary and start datetime/date of the next ten events in
		// // the authorized users calendar. If no events are found an
		// // appropriate message is printed.
		// listUpcomingEvents = function() {
		//   var request = gapi.client.calendar.events.list({
		//     'calendarId': 'primary',
		//     'timeMin': (new Date()).toISOString(),
		//     'showDeleted': false,
		//     'singleEvents': true,
		//     'maxResults': 20,
		//     'orderBy': 'startTime'
		//   });
		//   request.execute(function(resp) {
		//     var events = resp.items;
	 //        microWeatherObj.getObjData().upcomingEvents = resp.items;

	 //        console.log(microWeatherObj.getObjData().upcomingEvents);
		    
		//     document.dispatchEvent(evt_fetchedCalendar);

		//     appendPre('Upcoming events:');

		//     if (events.length > 0) {
		// 		for (i = 0; i < events.length; i++) {
		// 			var event = events[i];
		// 			var when = event.start.dateTime;
		// 			if (!when) {
		// 				when = event.start.date;
		// 			}
		// 			appendPre(event.summary + ' (' + when + ')');
		// 		}
		// 	} else {
		//     	appendPre('No upcoming events found.');
		//     }

		//   });
		// },

		// // Append a pre element to the body containing the given message
		// // as its text node.
		// // @param {string} message Text to be placed in pre element.
		// appendPre = function(message) {
		// 	var pre = document.getElementById('output');
		// 	var textContent = document.createTextNode(message + '\n');
		// 	pre.appendChild(textContent);
		// }
	}

	return getWeekEvents;

});

microweatherApp.config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'CalendarController'
		})
		.when('/week', {
			templateUrl: 'templates/weekly.html',
			controller: 'CalendarController'
		})
		.when('/week/:day', {
			templateUrl: 'templates/daily.html',
			controller: 'CalendarController'
		})
		.otherwise({
			templateUrl: 'templates/weekly.html'
		})
});


