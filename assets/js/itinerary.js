
var isItineraryErr = false;
// UI plugin functions for FB listerners 
function updateUIGetItineraryChildAdded(itinerary) {
	// itinerary is retrived from Firebase,
	// use it to add a new row.
	addItineraryRow(itinerary);
}
function updateUIGetItineraryChildChanged(index, itinerary) {
	//console.log('updateUIGetItineraryChildChanged:index: ' + index);
	//console.log(itinerary);

	// itinerary is retrived from Firebase
	// index is the index of the row to be chaged

	changeItineraryRow(index, itinerary);
}
function updateUIGetItineraryChildRemoved(index) {
	// remove the row
	$('.itineraryRow').eq(index).remove();
	// set new index order
	$('.itineraryRow').each(function(i) {
		$(this).data('index', i);
	});

}


// Dom Manipulation
function addItineraryRow(itinerary) {
	// ItineraryKeys is an array, starting as [], it's 0 base indexing, so use length
	// to create index value
	var tr = $('<tr>').addClass('itineraryRow').data('index', getItineraryKeys().length);
	var i1 = $('<input>').attr('type', 'date').val(itinerary.date);
	var td1 = $('<td>').append(i1);
	var i2 = $('<input>').attr('type', 'time').val(itinerary.time);
	var td2 = $('<td>').append(i2);
	var i3 = $('<input>').attr('type', 'text').val(itinerary.activity);
	var td3 = $('<td>').append(i3);
	var i4 = $('<input>').attr('type', 'number').attr('step', '0.01').val(itinerary.fee);
	var td4 = $('<td>').append(i4);
	var i5 = $('<i>').addClass('material-icons itineraryRemoveBtn').html('remove_circle');
	var td5 = $('<td>').append(i5);
	tr.append(td1).append(td2).append(td3).append(td4).append(td5);
	tr.insertBefore($('#itineraryBody'));
}
function changeItineraryRow(index, itinerary) {
	// get <tr>
	var tr = $('.itineraryRow').eq(index);
	// change ecah <td>'s <input> field
	tr.children().eq(0).find('input').val(itinerary.date);
	tr.children().eq(1).find('input').val(itinerary.time);
	tr.children().eq(2).find('input').val(itinerary.activity);
	tr.children().eq(3).find('input').val(itinerary.fee);
}
// Listeners
function enterItineraryInput(event) {
	if (isItineraryErr) {
		$('#itineraryErr').html('');
		isItineraryErr = false;
	}
	
	if (event.which == 13) {
		var date = $('#itineraryDate').val();
		var time = $('#itineraryTime').val();
		var activity = $('#activity').val().trim();
		var fee = $('#fee').val();

		if (!date || !time || !activity || !fee) {
			isItineraryErr = true;
			displayUIErr('#itineraryErr', 'Some fields are missing!');
			return;
		}
		
		var itinerary = {date: date,
					time: time,
					activity: activity,
					fee: fee};
		console.log(itinerary);
		$('#itineraryDate').val('');
		$('#itineraryTime').val('');
		$('#activity').val('');
		$('#fee').val('');

		pushData('itinerary', itinerary);
		
	}
}
function getItineraryTableRow(tds) {
	var date, time, activity, fee;

	// get each <td>'s  <input> value
	date 		= tds.eq(0).find('input').val();
	time 		= tds.eq(1).find('input').val();
	activity   	= tds.eq(2).find('input').val();
	fee			= tds.eq(3).find('input').val();

	if (!date || !time || !activity || !fee) {
		isItineraryErr = true;
		displayUIErr('#itineraryErr', 'Some fields are missing!');
		return null;
	}

	var itinerary = {date: date,
				time: time,
				activity: activity,
				fee: fee};
	//console.log(itinerary);
	return itinerary;
}
function enterItineraryRow(event) {
	if (isItineraryErr) {
		$('#itineraryErr').html('');
		isItineraryErr = false;
	}
	if (event.which == 13) {
		// <tr>'s children are <td>s
		var index = $(this).data('index');
		var tds = $(this).children();
		var itinerary = getItineraryTableRow(tds);
		var keys = getItineraryKeys();
		if (itinerary) {
			setData('itinerary', keys[index], itinerary);
		}
	}	
}
function clickItineraryRemoveBtn() {
	//console.log('clickRemoveBtn');
	var index = $(this).parents('.itineraryRow').data('index');
	var keys = getItineraryKeys();
	setData('itinerary', keys[index], null);
	
}

function addItineraryListeners() {
	addListener('#itineraryInput', 'keyup', enterItineraryInput);
	addListener('.itineraryRow', 'keyup', enterItineraryRow);
	addListener('.itineraryRemoveBtn', 'click', clickItineraryRemoveBtn);	
}