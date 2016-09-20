  $(document).ready(function(){

//click function for travel info form submit buton 

$('#travelSubmit').on('click', function(){

//Get the travel date info from form when submit button is clicked 
 var travelDate = $('#arrivalDate').val().trim();
 var userName = $('#userName').val().trim();
 console.log("I've been clicked");
 console.log(travelDate);

//Countdown function to find the difference between the current date and the travel date 

function myCountdown() {


   // var travelDate = '11232016';

    var formatTravelDate = moment(travelDate, 'YYYY-MM-DD');
    
    console.log("Travel Date Is: " + travelDate);
    console.log("Formatted Travel Date Is: " + formatTravelDate);
    console.log("Type: " + typeof(formatTravelDate));

    var now = moment();

    var diff = moment.duration(moment(formatTravelDate).diff(moment(now)));

    console.log(diff);
  
    var days = parseInt(diff.asDays()); 
    
    var hours = parseInt(diff.asHours()); 

    var hours = hours - days*24;  
   
    var minutes = parseInt(diff.asMinutes()); 
  
    var minutes = minutes - (days*24*60 + hours*60); 
 
    var seconds = parseInt(diff.asSeconds()); 
   
    var seconds = seconds - (days*24*60*60 + hours*60*60 + minutes*60); 
  
 
    var diffInTimeFromNow ="Countdown To " + userName + "&#39;s Travel: " + days + " " + "Days" + " : " + hours + " " + "Hours " + ": " + minutes + " " + "Minutes " + ": " + seconds + " " + "Seconds";

    console.log(diffInTimeFromNow);

    $("#display").html(diffInTimeFromNow);

}
//Placing the countdown function in an interval that causes it to run every one second 
 var myCountdownInterval = setInterval(myCountdown, 1000); 
 $('#arrivalDate').val("");
 $('#userName').val("");

  
})












  })


