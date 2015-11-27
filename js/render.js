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
					calendar = '<div class="header">'
						+ '<button class="left" type="button" onclick="prevMonth()" title="Previous Month">'
						+ '<img src="./images/previous.png" width="60px" height="60px" alt="previous month button"/></button> &nbsp;&nbsp;';
				} else {
					calendar = '<div class="header"><div class="blank left">.</div> &nbsp;&nbsp;';
				}
				calendar += '<h1 class="left">' + month + '</h1> &nbsp;&nbsp; <h1 class="right">' + thisYear + '</h1> &nbsp;&nbsp;'
				+ '<button class="right" type="button" onclick="nextMonth()" title="Next Month">'
				+ '<img src="./images/next.png" width="60px" height="60px" alt="next month button"/></button></div>'
				+ '<table class="table-bordered center"><tr><td class="day text-center">Sun</td><td class="day text-center">Mon</td><td class="day text-center">Tue</td>'
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
				day = currDate.getDate();
					if(day == now.getDate() && currDate.getMonth() == now.getMonth()) {
						calendar += '<td class="today" onclick=(dayClick(\'' + day  +'\',\'today\'))>' + day + '</td>';
					} else if(currDate < now) {
						calendar += '<td class="past"><s>' + day + '</s></td>';
					} else if(j == 0) {
						calendar += '<td>' + day + '</day>';
					} else if(currDate.getMonth() > now.getMonth() && currDate.getYear() == now.getYear()
						|| currDate.getMonth() < now.getMonth() && currDate.getYear() < now.getYear()) {
						calendar += '<td class="moderate" onclick=(dayClick(\'' + day  +'\',\'nextmonth\'))>' + day + '</td>';
					} else { calendar += '<td class="light" onclick=(dayClick(\'' + day  +'\',\'thismonth\'))>' + day + '</td>'; }
				}
				calendar += '</tr>';
			}
			document.getElementById('calendar').innerHTML = calendar;
		}
                
        Date.prototype.addDays = function (n) {
			var time = this.getTime();
			var changedDate = new Date(time + (n * 24 * 60 * 60 * 1000));
			this.setTime(changedDate.getTime());
			return this;
	}

//send day clicked and it's data to schedule picker	
function dayClick(day, when) {
	console.log(day + '('+ when +') has been clicked');
	//TODO: call schedule page with this data here
}