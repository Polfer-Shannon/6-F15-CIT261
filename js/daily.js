// build the daily availability pane
function getDaily(day, month, year) {
	//var daily;

	var user = localStorage.getItem('user');
	if (user == null) {
		user = 'adam';
	}
	var jsonString = {day: day,
                      month: month,
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
    	console.log(data);
        document.getElementById('daily').innerHTML = data;
      }
  }
  http.send(stringified);
}

// schedule for hours of day
function listTimes(day, month, year) {
	var schedule = '<button type="button" class="sbutton" onclick="backHome()">Return To Month View</button>';
		schedule += '<br>'
		schedule += '<button onclick="previous()">Previous</button>';
		schedule += day + '/' + month + '/' + year;
		schedule += '<button onclick="next()">Next</button>';
		schedule += '<div class="dayPanel fadeIn">';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">7am-8am</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn unavail" onclick="form()">8am-9am</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">9am-10am</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">8am-9am</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">9am-10am</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">10am-11am</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn unavail" onclick="form()">11am-12pm</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn unavail" onclick="form()">12pm-1pm</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn unavail" onclick="form()">1pm-2pm</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">2pm-3pm</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn avail" onclick="form()">3pm-4pm</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn unavail" onclick="form()">4pm-5pm</div></a>';
		schedule += '<a href="#" onclick="form();event.preventDefault();"><div class="timeSlot fadeIn unavail" onclick="form()">5pm-6pm</div></a>';
	schedule += '</div>';
		schedule += '<br>';
	console.log("here");
	
	document.getElementById('daily').innerHTML = schedule;

	document.getElementById('calendar').innerHTML = '';
	
}

// form for schedule
function form() {
	var form = '<form id="schedule_form" action="#" method="POST" enctype="multipart/form-data">';
	form += '<div class="row">';
		form += '<label for="name">Your name:</label><br />';
		form += '<input id="name" class="input" name="name" type="text" value="" size="30" /><br />';
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
	