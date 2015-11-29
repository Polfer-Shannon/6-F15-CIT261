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