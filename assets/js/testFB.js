
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
 
    $('#infoBox').hide();
    $('#msgForUser').hide();

}

function showNextStep() {
    $('#nameInput').val('');
    $('#f_elem_city').val('');
    $('#travelCountry').val('');
    $('#dateInput').val('');

    $('#infoBox').show();
 
    $('#signInBox').hide();
 
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
    //console.log(email);
    //console.log(password);
    $('#errMsg').empty();
    isSignIn = true;
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

    //console.log("I've been clicked");
    var travelDate = $('#dateInput').val();
    var userName = $('#nameInput').val().trim();
    var travelCountry = $('#travelCountry').children('input').attr('value');

    var travelCity = $('#f_elem_city').val().trim();
    //console.log("travel date is: " + travelDate);
    //console.log("travel country is: " + travelCountry);
    //console.log("travel city is: " + travelCity);
    //console.log("user Name is" + userName);

    //if((!travelDate) || (!userName) || (!travelCountry) || (!travelCity)){
     //       return;
     //   };


     //send info to fireBase
     var user = new User(userName, travelCity, travelCountry, travelDate);
    //console.log(user);
    //setValiseUser(user);
    setUser(user);

    


    $('#infoBox').hide();

    $('#text').hide();
    $('#msgForUser').show();

}

// Execution
$(document).ready(readyFn);

function readyFn() {
    //console.log('Test Backend');

    initializeFireBase();

    addListener('#signInBtn', 'click', clickSignInBtn);
    addListener('#signUpBtn', 'click', clickSignUpBtn);
    addListener('#signOutBtn', 'click', clickSignOutBtn);
    addListener('#submitBtn', 'click', clickSubmitBtn);
 
    hideNextStep();

}