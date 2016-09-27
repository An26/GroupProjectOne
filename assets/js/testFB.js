
// DOM Manipulation
function displayForm(user) {
	//if (user == null) {
		//console.log(user);
		$('#nameInput').val(user.name);
		$('#cityInput').val(user.city);
		$('#countryInput').val(user.country);
		$('#dateInput').val(user.date);
	//}

}

function displayErr(err) {
	var p1 = $('<p>').html(err.code);
	var p2 = $('<p>').html(err.message);
	$('#errMsg').append(p1);
	$('#errMsg').append(p2);
}
function hideNextStep() {
	$('#emailInput').val('');
	$('#passwordInput').val('');
	
	$('#infoBox').hide();
	$('#signOutBox').hide();
	$('#signInBox').show();
}
function showNextStep() {
	$('#nameInput').val('');
	$('#cityInput').val('');
	$('#countryInput').val('');
	$('#dateInput').val('');

	$('#infoBox').show();
	$('#signOutBox').show();
	$('#signInBox').hide();
	$('#infoBox').addClass('col-sm-offset-4');
}

// rewrite these updateUI code
// Use exact function names
function updateUILogInSucess() {
	showNextStep();
}
function updateUILogOutSucess() {
	$('#toDoList').empty();
	hideNextStep();
}
function updateUIGetUserValue(userObj) {
	displayForm(userObj);
}

function updateUIAuthErr(err) {
	displayErr(err);
}

//===============================

// Listeners

// Add your own button listeners
function addListener(sel, eve, fn) {
	$(document).on(eve, sel, fn);
}
function clickSignInBtn() {
	//console.log('clickSignInBtn');
	var email = $('#emailInput').val();
	var password = $('#passwordInput').val();
	//console.log(email);
	//console.log(password);
	$('#errMsg').empty();
	signIn(email, password);

	return false;
}
function clickSignUpBtn() {
	//console.log('clickSignUpBtn');
	var email = $('#emailInput').val();
	var password = $('#passwordInput').val();
	//console.log(email);
	//console.log(password);
	$('#errMsg').empty();
	signUp(email, password);

	return false;
}
function clickSignOutBtn() {
	//console.log('clickSignOutBtn');
	removeFBListeners();
	signOut();
}
function clickSubmitBtn() {
	var name = $('#nameInput').val().trim();
	var city = $('#cityInput').val().trim();
	var country = $('#countryInput').val().trim();
	var date = $('#dateInput').val();

	// Initialize User object
	var user = new User(name, city, country, date);

	setUser(user);

	return false;

}
function clickWeatherPageBtn() {
	console.log('clickWeatherPageBtn');
	//location.ref = '../../testFB1.html';
}
// Execution
$(document).ready(readyFn);

function readyFn() {
	console.log('Test Backend');

	initializeFireBase();

	addListener('#signInBtn', 'click', clickSignInBtn);
	addListener('#signUpBtn', 'click', clickSignUpBtn);
	addListener('#signOutBtn', 'click', clickSignOutBtn);
	addListener('#submitBtn', 'click', clickSubmitBtn);
	addListener('#weatherPageBtn', 'click', clickWeatherPageBtn);

	hideNextStep();

}
