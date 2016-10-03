
var isSignIn = false;

// DOM Manipulation

function displayForm(user) {
    //if (user == null) {
    //console.log(user);
    $('#nameInput').val(user.name);
    $('#f_elem_city').val(user.city);
    $('#travelCountry').val(user.country);
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
    //$('#emailInput').val('');
    //$('#passwordInput').val('');

    $('#infoBox').hide();
    $('#msgForUser').hide();
    //$('#toDoListBox').hide();
    //$('#signOutBox').hide();
    //$('#signInBox').show();
}

function showNextStep() {
    $('#nameInput').val('');
    $('#f_elem_city').val('');
    $('#travelCountry').val('');
    $('#dateInput').val('');

    $('#infoBox').show();
 
    $('#signInBox').hide();
 
}

function createListItem(item, index) {
    var parentDiv = $('<div>').addClass('input-group');
    var inputElement = $('<input>').attr('type', 'text').addClass('form-control').attr('id', 'item' + index).attr('placeholder', 'To Do List').val(item);
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
    if (isSignIn) {

        location.href="main.html";

    } else {
        showNextStep();
    }
    
}

function updateUILogOutSucess() {
 
   location.href="index.html";

}

function updateUIGetUserValue(userObj) {
    displayForm(userObj);
}

function updateUIAuthErr(err) {
    displayErr(err);
}

function updateUIGetToDoListValue(list) {
    displayToDoList(list);
}

//===============================

// Listeners

// Add your own button listeners
function addListener(sel, eve, fn) {
    $(document).on(eve, sel, fn);
}

function clickSignInBtn() {
    //console.log('clickSignInBtn');
    var email = $('#emailInput1').val();
    var password = $('#passwordInput1').val();
    console.log(email);
    console.log(password);
    $('#errMsg').empty();
    isSignIn = true;
    signIn(email, password);

    return false;
}

function clickSignUpBtn() {
    //console.log('clickSignUpBtn');
    var email = $('#emailInput').val();
    var password = $('#passwordInput').val();
    console.log(email);
    console.log(password);
    $('#errMsg').empty();
    signUp(email, password);

    return false;
}

function clickSignOutBtn() {
    console.log('clickSignOutBtn');
    //removeFBListener('/user/' + loginUser.uid, 'value', getUserValue);
    signOut();
}

 	
function clickSubmitBtn() {

    console.log("I've been clicked");
    travelDate = $('#dateInput').val();
    userName = $('#nameInput').val().trim();
    travelCountry = $('#travelCountry').children('input').attr('value');

    var travelCity = $('#f_elem_city').val().trim();
    console.log("travel date is: " + travelDate);
    console.log("travel country is: " + travelCountry);
    console.log("travel city is: " + travelCity);
    console.log("user Name is" + userName);

    //if((!travelDate) || (!userName) || (!travelCountry) || (!travelCity)){
     //       return;
     //   };


     //send info to fireBase
     var user = new User(userName, travelCity, travelCountry, travelDate);
    console.log(user);
    //setValiseUser(user);
    setUser(user);

    


    $('#infoBox').hide();

    $('#text').hide();
    $('#msgForUser').show();

   }



function clickAddToDoList() {
    console.log('clickAddToDoList');
    var item = $('#listItem').val().trim();
    console.log("item: " + item);
    addValiseToDoList(item);
    $('#listItem').val('');
    setFBList();
}

function clickEditItem() {
    var index = $(this).data('index');
    var item = $('#item' + index).val().trim();
    console.log('index: ' + index + ' item: ' + item);
    var list = getValiseToDoList();
    if (list[index] == item) return;
    setValiseToDoList(index, item);
    setFBList();
}

function clickDeleteItem() {
    var index = $(this).data('index');
    console.log('index: ' + index);
    deleteValiseToDoList(index);
    $('#toDoList').empty();
    setFBList();
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
 
    hideNextStep();

}