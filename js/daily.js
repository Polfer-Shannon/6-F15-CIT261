// build the daily availability pane
var date;
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var selectedHours = {};

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

//load appointments
//call a php file that queries db, then display change on page
// SUGGEST renaming to setAppointment
function database(stringified, url) {
  var http = new XMLHttpRequest(); 
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
    	//response
    	var data = (http.responseText);
    	data = JSON.parse(data);
    	console.log(data);
    	for (var i = 0; i < data.times.length; i++) {
			var foundHour = data.times[i].hour;
			//change availability flag of hours diplay
			var hourView = document.getElementById('hour-'+foundHour);
			hourView.className = "timeSlot fadeIn unavail";
			hourView.parentNode.onclick = '';
			var disableCheckbox = document.getElementById('checkbox-'+foundHour);
			disableCheckbox.style.display = 'none';
    	}
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
		  { time:'7am-8am', mil:'7' }, { time:'8am-9am', mil:'8' }, { time:'9am-10am', mil:'9' }
		  , { time:'10am-11am', mil:'10' }, { time:'11am-12pm', mil:'11'}, { time:'12pm-1pm', mil:'12' }
		  ,	{ time:'1pm-2pm', mil:'13' }, { time:'2pm-3pm', mil:'14' }, { time:'3pm-4pm', mil:'15' }
		, { time:'4pm-5pm', mil:'16' }, { time:'5pm-6pm', mil:'17' }
		];
		for (var i = 0; i < appointmentHours.length; i++) {
			//avail or unavail class
			var a = 'avail';
			schedule += '<div id="hour-'+ appointmentHours[i].mil + '" class="timeSlot fadeIn '
			+ a + '" ><input id="checkbox-' + appointmentHours[i].mil + '" type="checkbox">' + appointmentHours[i].time + '</div>';
		}
		schedule += '</div>';
		schedule += '<br>';
	function toggleHour(hour) {
		selectedHours[hour] = !selectedHours[hour];
		var hours = [];
		for (var name in selectedHours) {
			if (selectedHours[name] === true) {
				hours.push(name);
			}
		}
		var checkBoxButton = '<p>Click <a href="#" class="timeFont" onclick="form('+month+','+day+','+year+',[' + hours + ']);event.preventDefault();"><button>HERE</button></a> to schedule appointment</p>';
		document.getElementById('toggle').innerHTML = checkBoxButton;
	}
	document.getElementById('daily').innerHTML = schedule;
	document.getElementById('calendar').innerHTML = '';
	appointmentHours.forEach(function (item) {
		document.getElementById('checkbox-' + item.mil).onclick = function () {
			toggleHour(item.mil);
		};
	});
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
function form(month, day, year, hoursClicked) {
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
		form += '<div class="row">';
		form += '<label for="location">Location:</label><br />';
		form += '<input id="location" class="input" name="location" type="text" value="" size="30" /><br />';
	form += '</div>';
	form += '<input id="submit_button" onclick="makeAppoint('+month+','+day+','+year+','+hoursClicked+');event.preventDefault();" type="button" value="Schedule Appointment" />';
	form += '</form>'
	
	document.getElementById('form').innerHTML = form;
	document.getElementById('toggle').innerHTML = '';
	
}

function makeAppoint(month, day, year, hours) {
	var user = localStorage.getItem('user');
	if (user == null) {
		user = 'adam';
	}
	var jsonString = {
                      month: month,
					  day: day,
                      year: year,
                      user: user,
                      location: document.getElementById('location').value,
					  // create object to store multiple hours.
                      hours: hours
                     };
	var stringified = JSON.stringify(jsonString);
	database(stringified, 'db/web_service.php');
	document.getElementById('form').innerHTML = 'Appointment Scheduled';// for ' + hour;
}
