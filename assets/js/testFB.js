
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
// rewrite these updateUI code
// Use exact function names
function updateUIChildAdded() {
	//console.log('updateUIChildAdded');
	var user = getValiseUser();
	displayForm(user);	
}
function updateUIAuthErr(err) {
	var p1 = $('<p>').html(err.code);
	var msg = err.message;
	if (err.code == 'auth/user-not-found') {
		msg += ' Or user is not created yet.';
	}
	var p2 = $('<p>').html(msg);
	$('#errMsg').append(p1);
	$('#errMsg').append(p2);
}
function loginSuccess() {
	console.log('loginSuccess');
	// update UI
	showNextStep();
	// Trigger initial load
	addFBListenter('/user/' + loginUser.uid, 'value', getUserValue);	
}
function getUserValue(snapshot) {
	console.log('getUserValue');
	if (snapshot.val() == null) {
		consol.log('snapshot.val(): ' + snapshot.val());
		return;
	}
	setValiseUser(snapshot.val());
	displayForm(getValiseUser());
}
function updateUISignUpSuccess() {
	//console.log('updateUISignUpSuccess');
	loginSuccess();
}
function updateUISignInSuccess() {
	//console.log('updateUISignInSuccess');
	loginSuccess();
}
function updateUISignOutSuccess() {
	hideNextStep();
}
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
	signOut();
}
function clickSubmitBtn() {
	var name = $('#nameInput').val().trim();
	var city = $('#cityInput').val().trim();
	var country = $('#countryInput').val().trim();
	var date = $('#dateInput').val();
	//console.log(name);
	//console.log(city);
	//console.log(country);
	//console.log(date);

	// Initialize User object
	var user = new User(name, city, country, date);

	addUser(user);

	return false;

}
/*
function clickSubmitBtn() {
	$('#nameInput').val("");
	$('#cityInput').val("");
	$('#countryInput').val("");
	$('#dateInput').val("");
	deleteUser();
}
*/
// Helper Functions
function hideNextStep() {
	$('#infoBox').hide();
	$('#toDoListBox').hide();
	$('#signOutBox').hide();
	$('#signInBox').show();
}
function showNextStep() {
	$('#infoBox').show();
	$('#toDoListBox').show();
	$('#signOutBox').show();
	$('#signInBox').hide();
	$('#infoBox').addClass('col-sm-offset-4');
}


// Execution
$(document).ready(readyFn);

function readyFn() {
	console.log('Test Backend');

	initializeFireBase();
	//addFBListenter('user', 'child_added', userChildAdded);
	addListener('#signInBtn', 'click', clickSignInBtn);
	addListener('#signUpBtn', 'click', clickSignUpBtn);
	addListener('#signOutBtn', 'click', clickSignOutBtn);
	addListener('#submitBtn', 'click', clickSubmitBtn);
	//addListener('#deleteBtn', 'click', clickDeleteBtn);
	hideNextStep();

}
