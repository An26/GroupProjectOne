function updateUILogInSucess (){
  // Do nothing 
}


function updateUIGetUserValue(userObj) {
  // userObj is retrieved from Firebase at this point of time
  weatherAPI(userObj);
  newsAPI(userObj);
  var myCountdownInterval = setInterval(myCountdown, 1000);

};

function updateUIAuthErr(err) {
    //displayErr(err);
    console.log(err);
};

function updateUILogOutSucess() {
  location.href = "index.html";
}


function displayUIErr(sel, msg) {
  $(sel).html(msg);
}


function clickSignOutBtn() {
 signOut();
}

function addListener(sel, eve, fn) {
  $(document).on(eve, sel, fn);
}

$(document).ready(readyFn);



function readyFn() {

$('.parallax').parallax();

  console.log('Test Backend toDoList');

  initializeFireBase(); //***
  reLogin(true); //***


  addListener('#signOutBtn', 'click', clickSignOutBtn);

  addFlightListeners();
  addLodgingListeners();
  addItineraryListeners();

  // Listeners for To Do List
  addListener('#addTodo', 'keyup', enterAddToDo);
  addListener('.toDoTextBtn', 'click', clickToDoTextBtn);

};

function weatherAPI(user) {
    
    console.log(user);
    var travelCity = user.city; 
     console.log(travelCity);
    var userName = user.name;
    var travelDate = user.date;
    var travelCountry = user.country; 


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
              if (response.wind) { // Sometime wind is missing
                $(".wind").html("Wind Speed: " + response.wind.speed + " mph");
              }
              $(".humidity").html("Humidity: " + response.main.humidity + "&#37;");
              $(".temp").html("Temperature: " + response.main.temp + "&deg;F");

              //------------adding weather icons: an---------
        $('.weatherIcon').html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.' height='70px' width='70px'>");

              // Log the data in the console as well
              console.log("Wind Speed: " + response.wind.speed);
              console.log("Humidity: " + response.main.humidity);
              console.log("Temperature (F): " + response.main.temp);

 
              return false

})};

//Countdown function to find the difference between the current date and the travel date 

function myCountdown() {

              var user = getValiseUser();
              var travelDate = user.date;
              // var travelDate = '11232016';
              var travelCity = user.city;
              var userName = user.name;
              var travelCountry = user.country; 

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


              //var diffInTimeFromNow = userName + "&#39;s " + travelCountry + " Travel Begins In: " + days + " " + "Days" + " : " + hours + " " + "Hours " + ": " + minutes + " " + "Minutes " + ": " + seconds + " " + "Seconds";

              //console.log(diffInTimeFromNow);
              //var diffInTimeFromNow = $('<div id="text13">' + userName + "&#39;s " + travelCountry + " Travel Begins In: " +
               //'</div>');
              //var diffInTimeFromNow2 = $('<span class="countDown">' + days + "Days" + '</span>'+'<span>'+ ":" + '</span>' + '<span class="countDown">' + hours +  "Hrs" + '</span>'+'<span>'+ ":" + '</span>' +  '<span class="countDown">' + minutes + "Mins" + '</span>'+'<span>'+ ":" + '</span>' + '<span class="countDown">' + seconds + "Secs" + '</span>');

              var diffInTimeFromNow = days + " " + "Days" + " : " + hours + " " + "Hours " + ": " + minutes + " " + "Minutes " + ": " + seconds + " " + "Seconds";

             //var diffInTimeFromNowFinal =  $(diffInTimeFromNow).append(diffInTimeFromNow2);

              $("#display").html(diffInTimeFromNow);

              $("#travelPlans").html(userName + "'s"+ " Travel Plans");
              $("#userCountry").html("For Upcoming " + travelCountry + " Travel");

}
          //Placing the countdown function in an interval that causes it to run every one second 
          //$('#arrivalDate').val("");
          //$('#userName').val("");
          //$('#f_elem_city').val("");
          //$('#addTravelInfo').addClass("hide");
         // $('.travelInfoButton').removeClass("hide");



/*$('.travelInfoButton').on('click', function(){
    $('#addTravelInfo').removeClass("hide");
    console.log("I've also been clicked");
    $('.travelInfoButton').addClass("hide");
  });*/



// --------GOOGLE NEWS API-------------An Huynh-------------

function newsAPI(user) {

  var countrySearch = user.city;
  //var APIKey  = "b590022778624bc6b7386999057a30ac";

  var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + countrySearch + "&count=10&offset=0&mkt=en-us&safeSearch=Moderate";

  //trying to find the right API URL in order to pull new articles with searchCountry as a topic/perameter


$.ajax({
  url: queryURL, 
  beforeSend: function(info){
            // Request headers -- copied from the website
            info.setRequestHeader("Ocp-Apim-Subscription-Key","06ba1169d8414cc5b5af23f9147631f9");
        },
    method: 'GET'
  })
  .done(function(response) {
    var results = response.value;
    console.log(response);


    //appending articles to the newsBox section
     for (var i = 0; i < results.length; i++) {
      if (!results[i].image) continue; // Sometime image is missing, skip it
      var newArticle = $('<div class="article">');
      var articleUrlWithImage = $('<a class="articleURL">').attr('target', "_blank").attr('href', results[i].url).html($('<img class="articleThumbnail">').attr('src', results[i].image.thumbnail.contentUrl));

      var articleTitle = $('<p class="urlTitle">').html(results[i].name);

      newArticle.append(articleTitle); 
      newArticle.append(articleUrlWithImage);  
      newArticle.appendTo($('.newsBox'));
     }

}); 

}


  
