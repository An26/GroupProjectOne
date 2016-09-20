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

$(document).ready(function() {
	newsAPI();
});