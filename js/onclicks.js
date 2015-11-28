//send day clicked and it's data to schedule picker	
function dayClick(day, when) {
	console.log(day + '('+ when +') has been clicked');
	//TODO: call schedule page with this data here
	var url = 'db/daily.php?day='+day+'&when='+when;
	window.location = url;
}