$(document).ready(readyFn);


function readyFn() {
  console.log('Test Backend toDoList');

  initializeFireBase(); //***
  reLogin(true); //***

  //addListener('#signOutBtn', 'click', clickSignOutBtn);

  //addListener('#addToDoList', 'click', clickAddToDoList);
  //addListener('.editItem', 'click', clickEditItem);
  //addListener('.deleteItem', 'click', clickDeleteItem);


}

    var user =  getValiseUser();
    
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
              return false

})

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


          }
          //Placing the countdown function in an interval that causes it to run every one second 
          var myCountdownInterval = setInterval(myCountdown, 1000);
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

function newsAPI() {

  var countrySearch = travelCountry;
  //var APIKey  = "b590022778624bc6b7386999057a30ac";

  var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + countrySearch + "&count=10&offset=0&mkt=en-us&safeSearch=Moderate";

  //trying to find the right API URL in order to pull new articles with searchCountry as a topic/perameter


$.ajax({
  url: queryURL, 
  beforeSend: function(info){
            // Request headers -- copied from the website
            info.setRequestHeader("Ocp-Apim-Subscription-Key","f7a5f4560c984fe3b4534359f7b5a1bf");
        },
    method: 'GET'
  })
  .done(function(response) {
    var results = response.value;
    console.log(response);


    //appending articles to the newsBox section
     for (var i = 0; i < results.length; i++) {
      var newArticle = $('<div class="article">');
      var articleUrlWithImage = $('<a class="articleURL">').attr('target', "_blank").attr('href', results[i].url).html($('<img class="articleThumbnail">').attr('src', results[i].image.thumbnail.contentUrl));

      var articleTitle = $('<p class="urlTitle">').html(results[i].name);

      newArticle.append(articleTitle); 
      newArticle.append(articleUrlWithImage);  
      newArticle.appendTo($('.newsBox'));
     }

}); 

}


newsAPI();
  
