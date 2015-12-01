//send day clicked and it's data to schedule picker	
function dayClick(day, month, year) {
	console.log(day + '/'+ month +'/' + year + ' has been clicked');
	//TODO: call schedule page with this data here
	//var url = 'db/daily.php?day='+day+'&when='+when;
	//window.location = url;
	getDaily(day, month, year);
}