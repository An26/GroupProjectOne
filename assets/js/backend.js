//
var valiseUser = null;
//var loginUser = null;
var toDoList = {list: []};

function User(name, city, country, date) {
	this.name = name;
	this.city = city;
	this.country = country;
	this.date = date;
}

// Initialize Firebase

function initializeFireBase () {
   var config = {
    apiKey: "AIzaSyAzp0E8md_beDyn3zNC3-jOEiVcQBuwEOg",
    authDomain: "valise-wonder.firebaseapp.com",
    databaseURL: "https://valise-wonder.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "964994980671"
  };
  firebase.initializeApp(config);
}

function getRef(endpoint) {
	var ref;
	if (endpoint == '') {
		ref = firebase.database().ref();
	} else {
		ref = firebase.database().ref('/' + endpoint + '/' + getCurrentUserUID());
	}
	return ref;
}
function addFBListenter(endpoint) {
	var ref = getRef(endpoint);
	if (endpoint == 'user') {
		ref.on('value', getUserValue);
	} else if (endpoint == 'toDoList') {
		ref.on('value', getToDoListValue);
	} else {
		// something very wrong
		console.error('addFBListenter: Incorrect endpoint: ' + endpoint);
	}

}
function removeFBListener(endpoint) {
	var ref = getRef(endpoint);
	if (endpoint == 'user') {
		ref.off('value', getUserValue);
	} else if (endpoint == 'toDoList') {
		ref.off('value', getToDoListValue);
	} else {
		// something very wrong
		console.error('removeFBListenter: Incorrect endpoint: ' + endpoint);
	}
}
function removeFBListeners() {
	var uid = firebase.auth().currentUser.uid;
	console.log('uid: ' + uid);
	removeFBListener('user'); 
	removeFBListener('toDoList');
}
// Firebase Listeners
function getUserValue(snapshot) {
	console.log('getUserValue');
	// when the user sign up first time, no snapshot.val()
	// is defined. Do nothing.
	if (snapshot.val() == null) return;

	console.log('snapshot.key: ' + snapshot.key);
	console.log(snapshot.val());
	setValiseUser(snapshot.val());
	// Update UI
	updateUIGetUserValue(getValiseUser());
 
}
function getToDoListValue(snapshot) {
	console.log('getToDoListValue');
	if (snapshot.val() == null) {
		updateUIGetToDoListValue([]);
		return;
	}
	console.log('snapshot.key: ' + snapshot.key);
	console.log(snapshot.val());
	toDoList = snapshot.val();
	updateUIGetToDoListValue(toDoList.list);
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
function filterValiseToDoList(filter) {
	var list = toDoList.list;
	var filteredList = list.filter(function(item) {
		if (item != filter) {
			return true;
		} else {
			return false;
		}
	})
	toDoList.list = filteredList;
}
function setUser(userObj) {
	var uid = getCurrentUserUID();
	firebase.database().ref('/user/' + uid).set(userObj);
}
function setFBList() {
	var uid = getCurrentUserUID();
	firebase.database().ref('/toDoList/' + uid).set(toDoList);
}
