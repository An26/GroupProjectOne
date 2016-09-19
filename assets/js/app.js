//-------------jquery testing info

var user = [    
	{	name: "Jane Doe",
	    city: 'Hess',
	    country: 'Germany',
	    date: "null",
	    toDoList: ['buy airline tickets', 'save $$', 'get passports'],
	},];





// --------GOOGLE NEWS API-------------An Huynh-------------

var searchCountry = "india";

var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/news/?Category=" + searchCountry;
//trying to find the right API URL in order to pull new articles with searchCountry as a topic/perameter

$.ajax({url: queryURL, method: 'GET'})
 .done(function(response) {
     console.log(response);
}); 
