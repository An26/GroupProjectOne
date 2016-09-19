//-------------testing user input/data------

var user =
	{	name: "Jane Doe",
	    city: 'Hess',
	    country: 'Germany',
	    date: "null",
	    toDoList: ['buy airline tickets', 'save $$', 'get passports'],
	};



// --------GOOGLE NEWS API-------------An Huynh-------------

function newsAPI() {

	var countrySearch = "india";
	//var APIKey	= "b590022778624bc6b7386999057a30ac";

	var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/news/?" + countrySearch;
//trying to find the right API URL in order to pull new articles with searchCountry as a topic/perameter

$.ajax({
	url: queryURL, 
	beforeSend: function(xhrObj){
                // Request headers -- copied from the website
                xhrObj.setRequestHeader("40b9d4577e39435fb301bd695db98c33","{f7a5f4560c984fe3b4534359f7b5a1bf}");
            },
	method: 'GET'
	})
	.done(function(response) {
		//var results = response.data;
		console.log(response);


		//appending articles to the newsBox section
		// for (var i = 0; i < results.,length; i++) {
		// 	var newArticle = $('<div class="article">');
		// 	newArticle.append(newsBox);
		// }

}); 

}

$(document).ready(function() {
	newsAPI();
});