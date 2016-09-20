
// DOM Manipulation
function displayForm(user) {
	if (user == null) {
		$('#nameInput').html('yyy');
		$('#cityInput').html('zzz');
		$('#countryInput').html('ttt');
		$('#dateInput').html(user.date);
	}

}
// rewrite these updateUI code
// Use exact function names
function updateUIChildAdded() {
	console.log('updateUIChildAdded');
	var user = getValiseUser();
	displayForm(user);	
}

// Listeners

// Add your own button listeners
function addListener(sel, eve, fn) {
	$(sel).on(eve, fn);
}
function clickLoginBtn() {
	var email = $('#emailInput').val();
	var password = $('#passwordInput').val();
	console.log(email);
	console.log(password);
	return false;
}
function clickAddBtn() {
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


$(document).ready(readyFn);

function readyFn() {
	console.log('Test Backend');

	initializeFireBase();
	addFBListenter('user', 'child_added', userChildAdded);
	addListener('#loginBtn', 'click', clickLoginBtn);
	addListener('#addBtn', 'click', clickAddBtn);

}

var userData = [
{
	name: 'Damilola',
	city: 'Paris',
	country: 'France',
	date: moment(new Date()).format('X'),
	toDoList: ['Passport', 'Ticket', 'Shopping']
},
{
	name: 'An',
	city: 'Tokyo',
	country: 'Japan',
	date: moment(new Date()).format('X'),
	toDoList: ['Passport', 'Ticket', 'Shopping']
},
{
	name: 'Chin-Long',
	city: 'Moscow',
	country: 'Russia',
	date: moment(new Date()).format('X'),
	toDoList: ['Passport', 'Ticket', 'Shopping']
}

];
