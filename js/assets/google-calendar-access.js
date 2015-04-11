// Custom Events
var evt_fetchedCalendar = document.createEvent('Event');
    evt_fetchedCalendar.initEvent('fetchedCalendar', true, true);

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '535042335480-opmv90sbhuu2rjmecvg38ljjp8c5jr9g.apps.googleusercontent.com';

// This quickstart only requires read-only scope, check
// https://developers.google.com/google-apps/calendar/auth if you want to
// request write scope.
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load Calendar client library.
    authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 20,
    'orderBy': 'startTime'
  });

    // request.execute(function(resp) {
    //     var $calendarContainer = $('.calendar');
    //     var markup;
        
    //     for(var i = 0; i < resp.items.length; i++) {
    //         // markup = ['<div class="dayone">',
    //         //                 '<div class="dates">',
    //         //                     '<span class="month">Apr.</span><br>',
    //         //                     '<span class="date">12</span>',
    //         //                 '</div>',
    //         //                 '<div class="events">' + resp.items[i].summary + '</div>',
    //         //             '</div>'];
    //                     // console.log(markup);
    //       markup = $('<div class="something">' + resp.items[i].summary + ' @ ' + Date(resp.items[i].start.dateTime).toString('dddd, MMMM ,yyyy') + '</div>');
    //     }
    //     // debugger;
    //     // markup.join('');
    //     $calendarContainer.prepend(markup);
    // });

  request.execute(function(resp) {
    var events = resp.items;
        microWeatherObj.getObjData().upcomingEvents = resp.items;

        console.log(microWeatherObj.getObjData().upcomingEvents);
    
    document.dispatchEvent(evt_fetchedCalendar);

    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')');
      }
    } else {
      appendPre('No upcoming events found.');
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}