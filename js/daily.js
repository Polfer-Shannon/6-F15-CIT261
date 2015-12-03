// build the daily availability pane
var date;
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


function getDaily(month, day, year) {
	//var daily;
	date = new Date(year, month, day);

	var user = localStorage.getItem('user');
	if (user == null) {
		user = 'adam';
	}
	var jsonString = {
                      month: month,
					  day: day,
                      year: year,
                      user: user
                     };
console.log(jsonString);
console.log(JSON.stringify(jsonString));
	var stringified = JSON.stringify(jsonString);
	
    //call database to insert
    database(stringified, 'db/web_service.php');

//TODO: populate this object by ajax requests
	//document.getElementById('daily').innerHTML = daily;
	listTimes(month, day, year);
}

//call a php file that queries db, then display change on page
function database(stringified, url) {
  var http = new XMLHttpRequest(); 
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
    	//response
    	var data = (http.responseText);
    	console.log('DB: ' + data);
      }
  }
  http.send(stringified);
}

// schedule for hours of day
function listTimes(month, day, year) {
	var schedule = '<div class="header fadeIn"><button type="button" onclick="backHome()" title="Return to the calendar to choose another date">'
		+ '<img src="./images/return.jpg" width="195px" height="60px" alt="button for going back to the calendar"/></button></div>'
		+ '<div class="header fadeIn"><button class="left" type="button" onclick="prevDay()" title="Previous Day">'
		+ '<img src="./images/previous.png" width="60px" height="60px" alt="previous Day button"/></button> &nbsp;&nbsp;'
		+ '<h1>' + months[month] + ' ' + day + ', ' + year + '</h1> &nbsp;&nbsp;'
		+ '<button class="right" type="button" onclick="nextDay()" title="Next Day">'
		+ '<img src="./images/next.png" width="60px" height="60px" alt="next Day button"/></button></div>'
		+ '<div class="dayPanel fadeIn">';
			var appointmentHours = [ 
		  { time:'7am-8am' }, { time:'8am-9am' }, { time:'9am-10am' }, { time:'10am-11am' }
		, { time:'11am-12pm'}, { time:'12pm-1pm' },	{ time:'1pm-2pm' }, { time:'2pm-3pm' }
		, { time:'4pm-5pm' }, { time:'5pm-6pm' }
		];
		for (var i = 0; i < appointmentHours.length; i++) {
			//avail or unavail class
			var a = 'avail';
			schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn '
			+ a + '" onclick="form()">' + appointmentHours[i].time + '</div></a>';
		}
		schedule += '</div>';
		schedule += '<br>';
	
	document.getElementById('daily').innerHTML = schedule;

	document.getElementById('calendar').innerHTML = '';
}

function prevDay() {
	date.setTime( date.getTime() - 86400000 );
	getDaily(date.getMonth(), date.getDate(), date.getFullYear());
}

function nextDay() {
	date.setTime( date.getTime() + 86400000 );
	getDaily(date.getMonth(), date.getDate(), date.getFullYear());
}

// form for schedule
function form() {
	var form = '<form id="schedule_form" action="#" method="POST" enctype="multipart/form-data">';
	form += '<div class="row">';
		form += '<label for="name">Your name:</label><br />';
		form += '<input id="name" class="input" name="name" type="text" value="" size="30" autofocus /><br />';
	form += '</div>';
	form += '<div class="row">';
		form += '<label for="email">Your email:</label><br />';
		form += '<input id="email" class="input" name="email" type="text" value="" size="30" /><br />';
	form += '</div>';
	form += '<div class="row">';
		form += '<label for="message">Your message:</label><br />';
		form += '<textarea id="message" class="input" name="message" rows="7" cols="30"></textarea><br />';
	form += '</div>';
	form += '<input id="submit_button" type="submit" value="Schedule Appointment" />';
	form += '</form>'
	
	document.getElementById('form').innerHTML = form;
}
	