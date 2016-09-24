 // This is our API Key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({url: queryURL, method: 'GET'})

    // We store all of the retrieved data inside of an object called "response"
    .done(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $('.city').html("<h5>London Weather Details</h5>");
      $(".wind").html("Wind Speed: " + response.wind.speed +" mph");
      $(".humidity").html("Humidity: " + response.main.humidity +"&#37;");
      $(".temp").html("Temperature: " + response.main.temp + "&deg;F");

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);

    }); 
