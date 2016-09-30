// --------GOOGLE NEWS API-------------An Huynh-------------

function newsAPI() {

	var countrySearch = "india";
	//var APIKey	= "45af58c725b840eba04e6b3d1594f45d";

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