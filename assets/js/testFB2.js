
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


function createListItem(item, index) {
	var parentDiv = $('<div>').addClass('input-group');
	var inputElement = $('<input>').attr('type', 'text').addClass('form-control').attr('id', 'item'+ index).attr('placeholder', 'To Do List').val(item);
	var span1 = $('<span>').addClass('input-group-btn');
	var btn1 = $('<button>').addClass('btn btn-primary editItem').attr('type', 'button').data('index', index);
	var glyph1 = $('<span>').addClass('glyphicon glyphicon-save').attr('aria-hidden', 'true');
	btn1.append(glyph1);
	span1.append(btn1);
	var span2 = $('<span>').addClass('input-group-btn');
	var btn2 = $('<button>').addClass('btn btn-primary deleteItem').attr('type', 'button').data('index', index);
	var glyph2 = $('<span>').addClass('glyphicon glyphicon-remove-circle').attr('aria-hidden', 'true');
	btn2.append(glyph2)
	span2.append(btn2);
	parentDiv.append(inputElement);
	parentDiv.append(span1);
	parentDiv.append(span2);
	$('#toDoList').append(parentDiv);
}
function displayToDoList(list) {
	$('#toDoList').empty();
	list.forEach(createListItem);
}
// rewrite these updateUI code
// Use exact function names
function updateUILogInSucess() {
}

function updateUILogOutSucess() {
	$('#toDoList').empty();
	$('#errMsg').html('Go Back To Landing Page!');
}
function updateUIGetUserValue(userObj) {
	// retrived from FB,
	// var obj = getValiseUser();
	displayForm(userObj);
}

function updateUIAuthErr(err) {
	displayErr(err);
}
function updateUIGetToDoListValue(list) {
	// retrived from FB,
	// var list = getValiseToDoList();
	displayToDoList(list);
}

//===============================

// Listeners

// Add your own button listeners
function addListener(sel, eve, fn) {
	$(document).on(eve, sel, fn);
}

function clickSignOutBtn() {
	//console.log('clickSignOutBtn');
	removeFBListener('user');
	removeFBListener('toDoList');

	signOut();
}

function clickAddToDoList() {
	console.log('clickAddToDoList');
	var item = $('#listItem').val().trim();
	console.log("item: " + item);
	// **
	addValiseToDoList(item); // ***
	$('#listItem').val('');
	setFBList(); // ***
}
function clickEditItem() {
	var index = $(this).data('index'); // ***
	var item =$('#item' + index).val().trim();
	console.log('index: ' + index + ' item: ' + item);
	var list = getValiseToDoList(); // ***
	if (list[index] == item) return; //***
	setValiseToDoList(index, item); //****
	setFBList(); //****
}
function clickDeleteItem() {
	var index = $(this).data('index'); //***
	console.log('index: ' + index);
	deleteValiseToDoList(index); // ***
	$('#toDoList').empty();
	setFBList(); //***
}
// Execution
$(document).ready(readyFn);

function readyFn() {
	console.log('Test Backend toDoList');

	initializeFireBase(); //***
	reLogin(true); //***

	addListener('#signOutBtn', 'click', clickSignOutBtn);

	addListener('#addToDoList', 'click', clickAddToDoList);
	addListener('.editItem', 'click', clickEditItem);
	addListener('.deleteItem', 'click', clickDeleteItem);


}
