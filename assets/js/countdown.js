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
  //$('#toDoListBox').show();
  //$('#signOutBox').show();
  $('#signInBox').hide();
  //$('#infoBox').addClass('col-sm-offset-4');
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
function updateUIGetToDoListValue(list) {
  displayToDoList(list);
}
/*
function updateUIChildAdded() {
  //console.log('updateUIChildAdded');
  var user = getValiseUser();
  displayForm(user);  
}
*/
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
  console.log(email);
  console.log(password);
  $('#errMsg').empty();
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
  //console.log('clickSignOutBtn');
  removeFBListener('/user/' + loginUser.uid, 'value', getUserValue);
  signOut();
}
/*function clickSubmitBtn() {
  var name = $('#nameInput').val().trim();
  var city = $('#f_elem_city').val().trim();
  var country = $('travelCountry').val().trim();
  var date = $('#dateInput').val();

  // Initialize User object
  var user = new User(name, city, country, date);

  
setUser(user);

  return false;

} */
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
  var item =$('#item' + index).val().trim();
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
  //addFBListenter('user', 'child_added', userChildAdded);
  addListener('#signInBtn', 'click', clickSignInBtn);
  addListener('#signUpBtn', 'click', clickSignUpBtn);
  addListener('#signOutBtn', 'click', clickSignOutBtn);
  //addListener('#submitBtn', 'click', clickSubmitBtn);
  //addListener('#addToDoList', 'click', clickAddToDoList);
  //addListener('.editItem', 'click', clickEditItem);
  //addListener('.deleteItem', 'click', clickDeleteItem);
  hideNextStep();









 $(document).ready(function() {

    var travelDate;
    var userName;
    var travelCountry;
    var travelCity

     

     //click function for travel info form submit buton
      $('#submitBtn').on('click', function() {

          travelDate = $('#dateInput').val();
          userName = $('#nameInput').val().trim();
          travelCountry = $('#travelCountry').val().trim();
          console.log("I've been clicked");
          travelCity = $('#f_elem_city').val().trim();
          console.log("travel date is: " + travelDate);
          console.log("travel country is: " + travelCountry);
          console.log("travel city is: " + travelCity);

        if((!travelDate) || (!userName) || (!travelCountry) || (!travelCity)){
            return;
        }

          //Get the travel info from form when submit button is clicked 
         

          // This is our API Key
          var APIKey = "166a433c57516f51dfab1f7edaed8413";

          // Here we are building the URL we need to query the database
          var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + travelCity + "&units=imperial&appid=" + APIKey;

          // Here we run our AJAX call to the OpenWeatherMap API
          $.ajax({
              url: queryURL,
              method: 'GET'
          })

          // We store all of the retrieved data inside of an object called "response"
          .done(function(response) {

              // Log the queryURL
              console.log(queryURL);

              // Log the resulting object
              console.log(response);

              // Transfer content to HTML
              $('.city').html("<h3>" + travelCity + '<br>' + " Weather Details</h3>");
              $(".wind").html("Wind Speed: " + response.wind.speed + " mph");
              $(".humidity").html("Humidity: " + response.main.humidity + "&#37;");
              $(".temp").html("Temperature: " + response.main.temp + "&deg;F");

              // Log the data in the console as well
              console.log("Wind Speed: " + response.wind.speed);
              console.log("Humidity: " + response.main.humidity);
              console.log("Temperature (F): " + response.main.temp);

              // Initialize User object
            var user = new User(userName, travelCity, travelCountry, travelDate);

              setUser(user);
              return false;

          });



          //Countdown function to find the difference between the current date and the travel date 

          function myCountdown() {


              // var travelDate = '11232016';

              var formatTravelDate = moment(travelDate, 'YYYY-MM-DD');

              //console.log("Travel Date Is: " + travelDate);
              //console.log("Formatted Travel Date Is: " + formatTravelDate);
              // console.log("Type: " + typeof(formatTravelDate));

              var now = moment();

              var diff = moment.duration(moment(formatTravelDate).diff(moment(now)));

              //console.log(diff);

              var days = parseInt(diff.asDays());

              var hours = parseInt(diff.asHours());

              var hours = hours - days * 24;

              var minutes = parseInt(diff.asMinutes());

              var minutes = minutes - (days * 24 * 60 + hours * 60);

              var seconds = parseInt(diff.asSeconds());

              var seconds = seconds - (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);


              var diffInTimeFromNow = userName + "&#39;s " + travelCountry + " Travel Begins In: " + days + " " + "Days" + " : " + hours + " " + "Hours " + ": " + minutes + " " + "Minutes " + ": " + seconds + " " + "Seconds";

              //console.log(diffInTimeFromNow);

              $("#display").html(diffInTimeFromNow);


          };
          //Placing the countdown function in an interval that causes it to run every one second 
          var myCountdownInterval = setInterval(myCountdown, 1000);
          $('#arrivalDate').val("");
          $('#userName').val("");
          $('#f_elem_city').val("");
          $('#addTravelInfo').addClass("hide");
          $('.travelInfoButton').removeClass("hide");

});


$('.travelInfoButton').on('click', function(){
    $('#addTravelInfo').removeClass("hide");
    console.log("I've also been clicked");
    $('.travelInfoButton').addClass("hide");

  });

function readyFn() {

  initializeFireBase();
  //addFBListenter('user', 'child_added', userChildAdded);
  addListener('#signInBtn', 'click', clickSignInBtn);
  addListener('#signUpBtn', 'click', clickSignUpBtn);
  addListener('#signOutBtn', 'click', clickSignOutBtn);
  addListener('#submitBtn', 'click', clickSubmitBtn);
  //addListener('#addToDoList', 'click', clickAddToDoList);
  //addListener('.editItem', 'click', clickEditItem);
  //addListener('.deleteItem', 'click', clickDeleteItem);
  hideNextStep();

}


  })
