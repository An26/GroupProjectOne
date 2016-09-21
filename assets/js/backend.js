
//
var valiseUser = null;
var loginUser = '';
//<script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
function User(name, city, country, date) {
	this.name = name;
	this.city = city;
	this.country = country;
	this.date = date;
	this.toDoList = [];
}

// Initialize Firebase

function initializeFireBase () {
	var config = {
    	apiKey: "AIzaSyCxOHLv_eX3M4kSkbVwxXbNjcmtlwen6Mc",
   		authDomain: "valise-e4cc8.firebaseapp.com",
    	databaseURL: "https://valise-e4cc8.firebaseio.com",
    	storageBucket: "valise-e4cc8.appspot.com",
    	messagingSenderId: "808529771284"
  	};
  	firebase.initializeApp(config);
}

function addFBListenter(endpoint, action, fn) {
	var ref;
	if (endpoint == '') {
		ref = firebase.database().ref();
	} else {
		ref = firebase.database().ref(endpoint);
	}

	ref.on(action, fn);
	//ref.on(action).then(fn);
}


function userChildAdded(childSnapshot, prevChildKey) {
	if (childSnapshot.val() == null) return;
	var userObj = childSnapshot.val();
	var key = childSnapshot.key;
	console.log(childSnapshot.val());
	console.log(childSnapshot.key);

	//var localUserKey = localStorage.getItem("valiseUser:" + childSnapshot.val().name);
/*
	if (localUserKey == null) {
		valiseUser = userObj;
		localStorage.setItem("valiseUser:" + userObj.name, key);
		console.log(valiseUser);
	} else if (localUserKey == key) {
			valiseUser = userObj;
			console.log(valiseUser);
	}
*/
	updateUIChildAdded();

}

function userChildRemoved(childSnapshot, prevChildKey) {
	
}

function userChildChanged(childSnapshot, prevChildKey) {
	
}
// Helper Function
function getValiseUser() {
	return Object.assign({}, valiseUser);
}
function setValiseUser(userObj) {
	valiseUser = userObj;
}
// Add User
function addUser(userObj) {

	firebase.database().ref('/user/' + loginUser.uid).set(userObj);
}
/*
function deleteUser() {
	valiseUser = null;
	firebase.database().ref('/user/' + loginUser.uid).set(null);
}
*/
function removeUser(valiseUser) {

}

function changeUser(valiseUser) {

}


