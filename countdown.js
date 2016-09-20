 $(document).ready(function() {

    var travelDate;
    var userName;
    var travelCountry;
    var travelCity

     

     //click function for travel info form submit buton
      $('#travelSubmit').on('click', function() {

          travelDate = $('#arrivalDate').val().trim();
          userName = $('#userName').val().trim();
          travelCountry = $('#travelCountry').val().trim();
          console.log("I've been clicked");
          travelCity = $('#f_elem_city').val().trim();
          console.log("travel date is: " + travelDate);
          console.log("travel country is: " +travelCountry);
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


          }
          //Placing the countdown function in an interval that causes it to run every one second 
          var myCountdownInterval = setInterval(myCountdown, 1000);
          $('#arrivalDate').val("");
          $('#userName').val("");
          $('#f_elem_city').val("");


      })




  })

