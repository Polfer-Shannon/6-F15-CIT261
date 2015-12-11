var CALENDAR = {};
var appointments = {};

var calendarIncrement = 0;
		
function prevMonth() {
	calendarIncrement -= 30;
	getCalendar();
}
		
function nextMonth() {
	calendarIncrement += 30;
	getCalendar();
}
		
function getCalendar() {
	getAppointments();
	var now = new Date();
	var thisMonth;
	var thisYear;
	if(now.getMonth() + (calendarIncrement / 30) < 12) {
		thisMonth = now.getMonth() + (calendarIncrement / 30);
		thisYear = now.getFullYear();
	} else {
		thisMonth = now.getMonth() + (calendarIncrement / 30);
		thisYear = now.getFullYear();
		while(thisMonth >= 12) {
			thisMonth -= 12;
			++thisYear;
		}
	}
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var month = months[thisMonth];
	var firstDay = new Date(thisYear, thisMonth, 1, 24, 0, 0, 0);
	var firstDayOfWeek = firstDay.addDays(-firstDay.getDay()); // get the first date of the 5-week calendar
	var calendar = "";
	if(calendarIncrement > 0) {
		calendar = '<div class="header fadeIn">'
			+ '<button class="left" type="button" onclick="prevMonth()" title="Previous Month">'
			+ '<img src="./images/previous.png" width="60px" height="60px" alt="previous month button"/></button> &nbsp;&nbsp;';
	} else {
		calendar = '<div class="header fadeIn"><div class="blank left">.</div> &nbsp;&nbsp;';
	}
	calendar += '<h1 class="left">' + month + '</h1> &nbsp;&nbsp; <h1 class="right">' + thisYear + '</h1> &nbsp;&nbsp;'
		+ '<button class="right" type="button" onclick="nextMonth()" title="Next Month">'
		+ '<img src="./images/next.png" width="60px" height="60px" alt="next month button"/></button></div>'
		+ '<table class="table-bordered center fadeIn"><tr><td class="day text-center">Sun</td><td class="day text-center">Mon</td><td class="day text-center">Tue</td>'
		+ '<td class="day text-center">Wed</td> <td class="day text-center">Thu</td> <td class="day text-center">Fri</td> <td class="day text-center">Sat</td> </tr> ';
	var calMonth = new Array(6); // least amount that will contain an entire month every time
	calMonth[0] = new Array(7); // each week contains 7 days
	calMonth[1] = new Array(7);
	calMonth[2] = new Array(7);
	calMonth[3] = new Array(7);
	calMonth[4] = new Array(7);
	calMonth[5] = new Array(7);
	for(var i = 0; i < 6; i++) {
		for(var j = 0; j < 7; j++) {
			calMonth[i][j] = new Date(firstDayOfWeek); // input each date for the calendar into the array
			firstDayOfWeek = new Date(firstDayOfWeek.addDays(1));
		}
	}
	for(var i = 0; i < 6; i++) {
		calendar += '<tr>';
		for(var j = 0; j < 7; j++) {
			var currDate = new Date(calMonth[i][j]);
			var currDay = currDate.getDate();
			var currMonth = currDate.getMonth();
			var currYear = currDate.getFullYear();
			var appts = {};
			
			for(var appt in appointments){
				if(appt.day == currDay && appt.month == currMonth && appt.year == currYear) {
					appts = appt;
					break;
				}
			}
			
			if(currDay == now.getDate() && currDate.getMonth() == now.getMonth() && currDate.getFullYear() == now.getFullYear()) {
				calendar += '<td class="today" onclick=(getDaily("' + currMonth +'","' + currDay + '","' + currYear + '")) title="';
				calendar += appts !== {}? '"' + appts.appts + ' Appointments"' : '"No Appointments Yet"';
				calendar += '>' + currDay + '</td>';
			} else if(j == 0) {
				calendar += '<td>' + currDay + '</td>';
			} else if(currDate < now) {
				calendar += '<td class="past">' + currDay + '</td>';
			} else if(Object.keys(appts).length === 0 || Object.keys(appts).length > 0 && appts.appts <= 6){
				calendar += '<td class="light" onclick=(getDaily("' + currMonth +'","' + currDay + '","' + currYear + '")) title="';
				calendar += Object.keys(appts).length > 0? '"' + appts.appts + ' Appointments"' : '"No Appointments Yet"';
				calendar += '>' + currDay + '</td>';
			} else if(Object.keys(appts).length > 0 && appts.appts < 11){
				calendar += '<td class="moderate" onclick=(getDaily("' + currMonth +'","' + currDay + '","' + currYear + '")) title="'
				+ appts.appts + ' Appointments">' + currDay + '</td>';
			} else if(appts !== {}) {
				calendar += '<td class="heavy" title="No Appointments Available' +
				'" onclick=(getDaily("' + currMonth +'","' + currDay + '","' + currYear + '"))>' + currDay + '</td>';
			}
		}
		calendar += '</tr>';
	}
	document.getElementById('calendar').innerHTML = calendar;
	
}

function getAppointments() {
  var http = new XMLHttpRequest();
  var url = 'db/calendar.php'
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
    	//response
    	var data = (http.responseText);
    	appointments = JSON.parse(data);
    	console.log(data);
      }
  }
  http.send();
}
                
Date.prototype.addDays = function (n) {
	var time = this.getTime();
	var changedDate = new Date(time + (n * 24 * 60 * 60 * 1000));
	this.setTime(changedDate.getTime());
	return this;
}

// Temporary submit button on times panel
function backHome() {
    getCalendar();
	document.getElementById('daily').style.display = 'none';
	document.getElementById('form').style.display = 'none';
	document.getElementById('toggle').style.display = 'none';
}