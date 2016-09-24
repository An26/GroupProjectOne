
//
var valiseUser = null;
var loginUser = null;
var toDoList = {list: []};
//<script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
function User(name, city, country, date) {
	this.name = name;
	this.city = city;
	this.country = country;
	this.date = date;
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

function getRef(endpoint) {
	var ref;
	if (endpoint == '') {
		ref = firebase.database().ref();
	} else {
		ref = firebase.database().ref(endpoint);
	}
	return ref;
}
function addFBListenter(endpoint, action, fn) {
	var ref = getRef(endpoint);
	ref.on(action, fn);
}
function removeFBListener(endpoint, action, fn) {
	var ref = getRef(endpoint);
	ref.off(action, fn);
}
// Firebase Listeners
function getUserValue(snapshot) {
	console.log('getUserValue');
	// when the user sign up first time, no snapshot.val()
	// is defined. Do nothing.
	if (snapshot.val() == null) return;

	console.log('snapshot.key: ' + snapshot.key);

	setValiseUser(snapshot.val());
	// Update UI
	updateUIGetUserValue(getValiseUser());
 
}
function getToDoListValue(snapshot) {
	console.log('getToDoListValue');
	if (snapshot.val() == null) return;
	console.log('snapshot.key: ' + snapshot.key);
	console.log(snapshot.val());
	toDoList = snapshot.val();
	updateUIGetToDoListValue(getValiseToDoList());
}

// Helper Function, e.g. called by click Listeners
function getValiseUser() {
	return Object.assign({}, valiseUser);
}
function setValiseUser(userObj) {
	valiseUser = userObj;
}
function setValiseToDoList(index, item) {
	toDoList.list[index] = item;	
}
function addValiseToDoList(item) {
	toDoList.list.push(item);
}
function deleteValiseToDoList(index) {
	toDoList.list.splice(index, 1);
}
function getValiseToDoList() {
	return toDoList.list;
}
function setUser(userObj) {

	firebase.database().ref('/user/' + loginUser.uid).set(userObj);
}
function setFBList() {
	firebase.database().ref('/toDoList/' + loginUser.uid).set(toDoList);
}

