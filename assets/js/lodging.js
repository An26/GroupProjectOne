
var isLodgingErr = false;
// UI plugin functions for FB listerners 
function updateUIGetLodgingChildAdded(lodging) {
	// lodging is retrived from Firebase,
	// use it to add a new row.
	addLodgingRow(lodging);
}
function updateUIGetLodgingChildChanged(index, lodging) {
	//console.log('updateUIGetLodgingChildChanged:index: ' + index);
	//console.log(lodging);

	// lodging is retrived from Firebase
	// index is the index of the row to be chaged

	changeLodgingRow(index, lodging);
}
function updateUIGetLodgingChildRemoved(index) {
	// remove the row
	$('.lodgingRow').eq(index).remove();
	// set new index order
	$('.lodgingRow').each(function(i) {
		$(this).data('index', i);
	});

}


// Dom Manipulation
function addLodgingRow(lodging) {
	// lodgingKeys is an array, starting as [], it's 0 base indexing, so use length
	// to create index value
	var tr = $('<tr>').addClass('lodgingRow').data('index', getLodgingKeys().length);
	var i1 = $('<input>').attr('type', 'text').val(lodging.name);
	var td1 = $('<td>').append(i1);
	var i2 = $('<input>').attr('type', 'text').val(lodging.address);
	var td2 = $('<td>').append(i2);
	var i3 = $('<input>').attr('type', 'datetime-local').val(lodging.beginningTime);
	var td3 = $('<td>').append(i3);
	var i4 = $('<input>').attr('type', 'datetime-local').val(lodging.endTime);
	var td4 = $('<td>').append(i4);
	var i5 = $('<i>').addClass('material-icons lodgingRemoveBtn').html('remove_circle');
	var td5 = $('<td>').append(i5);
	tr.append(td1).append(td2).append(td3).append(td4).append(td5);
	tr.insertBefore($('#lodgingBody'));
}
function changeLodgingRow(index, lodging) {
	// get <tr>
	var tr = $('.lodgingRow').eq(index);
	// change ecah <td>'s <input> field
	tr.children().eq(0).find('input').val(lodging.name);
	tr.children().eq(1).find('input').val(lodging.address);
	tr.children().eq(2).find('input').val(lodging.beginningTime);
	tr.children().eq(3).find('input').val(lodging.endTime);
}
// Listeners
function enterLodgingInput(event) {
	if (isLodgingErr) {
		$('#lodgingErr').html('');
		isLodgingErr = false;
	}
	
	if (event.which == 13) {
		var name = $('#lodgingName').val().trim();
		var address = $('#lodgingAddress').val();
		var beginningTime = $('#beginningTime').val().trim();
		var endTime = $('#endTime').val();

		if (!name || !address || !beginningTime || !endTime) {
			isLodgingErr = true;
			displayUIErr('#lodgingErr', 'Some fields are missing!');
			return;
		}
		if (new Date(beginningTime) > new Date(endTime)) {
			isLodgingErr = true;
			displayUIErr('#lodgingErr', 'Beginning Time is later than End Time');
			return;
		}

		var lodging = {name: name,
					address: address,
					beginningTime: beginningTime,
					endTime: endTime};
		console.log(lodging);
		$('#lodgingName').val('');
		$('#lodgingAddress').val('');
		$('#beginningTime').val('');
		$('#endTime').val('');

		pushData('lodging', lodging);
		
	}
}
function getLodgingTableRow(tds) {
	var name, address, beginningTime, endTime;

	// get each <td>'s  <input> value
	name 			= tds.eq(0).find('input').val().trim();
	address 		= tds.eq(1).find('input').val();
	beginningTime   = tds.eq(2).find('input').val().trim();
	endTime   		= tds.eq(3).find('input').val();

	if (!name || !address || !beginningTime || !endTime) {
		isLodgingErr = true;
		displayUIErr('#lodgingErr', 'Some fields are missing!');
		return null;
	}
	if (new Date(beginningTime) >= new Date(endTime)) {
		isLodgingErr = true;
		displayUIErr('#lodgingErr', 'Beginning Time is later than End Time');
		return null;
	}
	var lodging = {name: name,
				address: address,
				beginningTime: beginningTime,
				endTime: endTime};
	//console.log(lodging);
	return lodging;
}
function enterLodgingRow(event) {
	if (isLodgingErr) {
		$('#lodgingErr').html('');
		isLodgingErr = false;
	}
	if (event.which == 13) {
		// <tr>'s children are <td>s
		var index = $(this).data('index');
		var tds = $(this).children();
		var lodging = getLodgingTableRow(tds);
		var keys = getLodgingKeys();
		if (lodging) {
			setData('lodging', keys[index], lodging);
		}
	}	
}
function clickLodgingRemoveBtn() {
	//console.log('clickRemoveBtn');
	var index = $(this).parents('.lodgingRow').data('index');
	var keys = getLodgingKeys();
	setData('lodging', keys[index], null);	
}

function addLodgingListeners() {
	addListener('#lodgingInput', 'keyup', enterLodgingInput);
	addListener('.lodgingRow', 'keyup', enterLodgingRow);
	addListener('.lodgingRemoveBtn', 'click', clickLodgingRemoveBtn);	
}
