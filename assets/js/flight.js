
var isFlightErr = false;
// UI plugin functions for FB listerners 
function updateUIGetFlightChildAdded(flight) {
	// flight is retrived from Firebase,
	// use it to add a new row.
	addFlightRow(flight);
}
function updateUIGetFlightChildChanged(index, flight) {
	//console.log('updateUIGetFlightChildChanged:index: ' + index);
	//console.log(flight);

	// flight is retrived from Firebase
	// index is the index of the row to be chaged

	changeFlightRow(index, flight);
}
function updateUIGetFlightChildRemoved(index) {
	// remove the row
	$('.flightRow').eq(index).remove();
	// set new index order
	$('.flightRow').each(function(i) {
		$(this).data('index', i);
	});

}


// Dom Manipulation
function addFlightRow(flight) {
	// flightKeys is an array, starting as [], it's 0 base indexing, so use length
	// to create index value

	var tr = $('<tr>').addClass('flightRow').data('index', getFlightKeys().length);
	var i1 = $("<input>").attr('type', 'text').val(flight.departureCity);
	var td1 = $('<td>').append(i1);
	var i2 = $('<input>').attr('type', 'datetime-local').val(flight.departureTime);
	var td2 = $('<td>').append(i2);
	var i3 = $('<input>').attr('type', 'text').val(flight.arrivalCity);
	var td3 = $('<td>').append(i3);
	var i4 = $('<input>').attr('type', 'datetime-local').val(flight.arrivalTime);
	var td4 = $('<td>').append(i4);
	var i5 = $('<i>').addClass('material-icons flightRemoveBtn').html('remove_circle');
	var td5 = $('<td>').append(i5);
	var finalBody =tr.append(td1).append(td2).append(td3).append(td4).append(td5);
	finalBody.insertBefore($('#flightInput'));
}
function changeFlightRow(index, flight) {
	// get <tr>
	var tr = $('.flightRow').eq(index);
	// change ecah <td>'s <input> field
	tr.children().eq(0).find('input').val(flight.departureCity);
	tr.children().eq(1).find('input').val(flight.departureTime);
	tr.children().eq(2).find('input').val(flight.arrivalCity);
	tr.children().eq(3).find('input').val(flight.arrivalTime);
}
// Listeners
function enterFlightInput(event) {
	if (isFlightErr) {
		$('#flightErr').html('');
		isFlightErr = false;
	}
	
	if (event.which == 13) {
		var departureCity = $('#departureCity').val().trim();
		var departureTime = $('#departureTime').val();
		var arrivalCity = $('#arrivalCity').val().trim();
		var arrivalTime = $('#arrivalTime').val();

		if (!departureCity || !departureTime || !arrivalCity || !arrivalTime) {
			isFlightErr = true;
			displayUIErr('#flightErr', 'Some fields are missing!');
			return;
		}
		if (new Date(departureTime) >= new Date(arrivalTime)) {
			isFlightErr = true;
			displayUIErr('#flightErr', 'Departure Time is later than or equal to Arrival Time');
			return;
		}

		var flight = {departureCity: departureCity,
					departureTime: departureTime,
					arrivalCity: arrivalCity,
					arrivalTime: arrivalTime};
		//console.log(flight);
		$('#departureCity').val('');
		$('#departureTime').val('');
		$('#arrivalCity').val('');
		$('#arrivalTime').val('');

		pushData('flight', flight);
		
	}
}
function getFlightTableRow(tds) {
	var departureCity, departureTime, arrivalCity, arrivalTime;

	// get each <td>'s  <input> value
	departureCity = tds.eq(0).find('input').val().trim();
	departureTime = tds.eq(1).find('input').val();
	arrivalCity   = tds.eq(2).find('input').val().trim();
	arrivalTime   = tds.eq(3).find('input').val();

	if (!departureCity || !departureTime || !arrivalCity || !arrivalTime) {
		isFlightErr = true;
		displayUIErr('#flightErr', 'Some fields are missing!');
		return null;
	}
	if (new Date(departureTime) >= new Date(arrivalTime)) {
		isFlightErr = true;
		displayUIErr('#flightErr', 'Departure Time is later than or equal to Arrival Time');
		return null;
	}
	var flight = {departureCity: departureCity,
				departureTime: departureTime,
				arrivalCity: arrivalCity,
				arrivalTime: arrivalTime};
	//console.log(flight);
	return flight;
}
function enterFlightRow(event) {
	if (isFlightErr) {
		$('#flightErr').html('');
		isFlightErr = false;
	}
	if (event.which == 13) {
		// <tr>'s children are <td>s
		var index = $(this).data('index');
		var tds = $(this).children();
		var flight = getFlightTableRow(tds);
		var keys = getFlightKeys();
		if (flight) {
			setData('flight', keys[index], flight);
		}
	}	
}
function clickFlightRemoveBtn() {
	//console.log('clickRemoveBtn');
	var index = $(this).parents('.flightRow').data('index');
	var keys = getFlightKeys();
	setData('flight', keys[index], null);
	
}

function addFlightListeners() {
	addListener('#flightInput', 'keyup', enterFlightInput);
	addListener('.flightRow', 'keyup', enterFlightRow);
	addListener('.flightRemoveBtn', 'click', clickFlightRemoveBtn);	
}
