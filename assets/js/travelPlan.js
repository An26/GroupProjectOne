
function updateUILogInSucess() {
}

function updateUILogOutSucess() {


}
function updateUIAuthErr(err) {
	displayErr(err);
}

function displayErr(err) {
	var p1 = $('<p>').html(err.code);
	var p2 = $('<p>').html(err.message);
	$('errMsg').append(p1);
	$('errMsg').append(p2);
}

function displayUIErr(sel, msg) {
	$(sel).html(msg);
}

function addListener(sel, eve, fn) {
	$(document).on(eve, sel, fn);
}

$(document).ready(readyFn);

function readyFn() {
	console.log('travel_plan');
	initializeFireBase();
	// Hard coded for testing purpose
	signIn('cccc@yahoo.com', '123456');
	//var user = firebase.auth().currentUser;
	//console.log(user);
	addFlightListeners();
	addLodgingListeners();
	addItineraryListeners();
}