var flightKeys = [];
var lodgingKeys = [];
var itineraryKeys = [];


function getFlightKeys() {
	return flightKeys;
}
function getLodgingKeys() {
	return lodgingKeys;
}
function getItineraryKeys() {
	return itineraryKeys;
}

// Firebase Listener
function getRef(endpoint) {
	var ref;
	if (endpoint == '') {
		ref = firebase.database().ref();
	} else {
		ref = firebase.database().ref('/' + endpoint + '/' + getCurrentUserUID());
	}
	return ref;
}
function addTravelPlanFBListenters(endpoint) {
	var ref = getRef(endpoint);
	if (endpoint == 'flight') {
		ref.on('child_added', getFlightChildAdded);
		ref.on('child_changed', getFlightChildChanged);
		ref.on('child_removed', getFlightChildRemoved);
	} else if (endpoint == 'lodging') {
		ref.on('child_added', getLodgingChildAdded);
		ref.on('child_changed', getLodgingChildChanged);
		ref.on('child_removed', getLodgingChildRemoved);
	} else if (endpoint == 'itinerary') {
		ref.on('child_added', getItineraryChildAdded);
		ref.on('child_changed', getItineraryChildChanged);
		ref.on('child_removed', getItineraryChildRemoved);
	}
}

function getFlightChildAdded(childSnapshot) {
	console.log('getFlightChildAdded');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	updateUIGetFlightChildAdded(childSnapshot.val());
	flightKeys.push(childSnapshot.key);
}
function getFlightChildChanged(childSnapshot) {
	console.log('getFlightChildChanged');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	var index = flightKeys.indexOf(childSnapshot.key);
	updateUIGetFlightChildChanged(index, childSnapshot.val());
}
function getFlightChildRemoved(childSnapshot) {
	console.log('getFlightChildRemoved');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	var index = flightKeys.indexOf(childSnapshot.key);
	updateUIGetFlightChildRemoved(index);
	flightKeys.splice(index, 1);
}
function getLodgingChildAdded(childSnapshot) {
	console.log('getLodgingChildAdded');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	updateUIGetLodgingChildAdded(childSnapshot.val());
	lodgingKeys.push(childSnapshot.key);
}
function getLodgingChildChanged(childSnapshot) {
	console.log('getLodgingChildChanged');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	var index = lodgingKeys.indexOf(childSnapshot.key);
	updateUIGetLodgingChildChanged(index, childSnapshot.val());
}
function getLodgingChildRemoved(childSnapshot) {
	console.log('getLodgingChildRemoved');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	var index = lodgingKeys.indexOf(childSnapshot.key);
	updateUIGetLodgingChildRemoved(index);
	lodgingKeys.splice(index, 1);
}
function getItineraryChildAdded(childSnapshot) {
	console.log('getItineraryChildAdded');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	updateUIGetItineraryChildAdded(childSnapshot.val());
	itineraryKeys.push(childSnapshot.key);
}
function getItineraryChildChanged(childSnapshot) {
	console.log('getItineraryChildChanged');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	var index = itineraryKeys.indexOf(childSnapshot.key);
	updateUIGetItineraryChildChanged(index, childSnapshot.val());
}
function getItineraryChildRemoved(childSnapshot) {
	console.log('getItineraryChildRemoved');
	if (childSnapshot.val() == null) return;
	console.log(childSnapshot.val());
	console.log('childSnapshot.key: ' + childSnapshot.key);
	var index = itineraryKeys.indexOf(childSnapshot.key);
	updateUIGetItineraryChildRemoved(index);
	ItineraryKeys.splice(index, 1);
}
// Called by UI Listeners to update Firebase
function pushData(endpoint, object) {
	// Add object to firebase
	var uid = getCurrentUserUID();
	firebase.database().ref('/' + endpoint + '/' + uid).push(object);
}
function setData(endpoint, key, object) {
	// Changed or remove object from firebase
	console.log('setData.key: ' + key);
	console.log(object);
	var uid = getCurrentUserUID();
	firebase.database().ref('/' + endpoint + '/'  + uid + '/' + key).set(object);
}
