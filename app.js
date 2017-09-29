var request = require("request");
var Twitter = require("twitter");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var args = process.argv;
var temp = args.splice(3);


function liri() {
	switch (args[2]) {
		case "my-tweets": 
			function myTweets(tweets=20, screen_name="DannyBofHouseB") {

				console.log("Latest tweets")

			  var client = new Twitter({
			    consumer_key: keys.twitterKeys.consumer_key,
			    consumer_secret: keys.twitterKeys.consumer_secret,
			    access_token_key: keys.twitterKeys.access_token_key,
			    access_token_secret: keys.twitterKeys.access_token_secret
			  })

			  let params = {
			    "screen_name": screen_name,
			    "count": tweets
			  }

			  client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  	if (error) {
			  		console.log(error);
			  	}
			  	for (i = 0; i < tweets.length; i++) {
			  		console.log("             @}--")
			  		console.log((i + 1) + ": " + tweets[i].text);
			  	}
			    
			  });		
			};
			myTweets(tweets=20, screen_name="DannyBofHouseB")
			break;		
		case "spotify-this-song":
			var song;
			if (temp) {
				song = temp.join(" ");
			} else {
				song = "The Sign";
				console.log("or wait, what song?")
			}
			var spotify = new Spotify({
	  		id: keys.spotKeys.id,
	  		secret: keys.spotKeys.secret
			});

			spotify.search({ type: 'track', query: song }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
    		};
    		var here = data.tracks.items[0]
    		console.log("Artist: " + here.artists[0].name + "\nTitle: " + here.name + "\nAlbum: " + here.album.name + "\nCan be found: " + here.external_urls.spotify)

    	});
			break;
		case "movie-this":
			var movie = temp.join("+");
			if (temp.length === 0) {
				movie = "mr+nobody";
			};

			var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
			request(queryURL, function(error, response, body) {
	 			if (!error && response.statusCode === 200) {
	   		console.log("\nTitle: " + JSON.parse(body).Title + "\n\nYear: " + JSON.parse(body).Year + "\n\nImdb rating: " + JSON.parse(body).Ratings[0].Value + "\n\nRotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n\nCountry of Production: " + JSON.parse(body).Country + "\n\nLanguage: " + JSON.parse(body).Language + "\n\nPlot: " + JSON.parse(body).Plot + "\n\nActors: " + JSON.parse(body).Actors);
	 			};
	 		});	
			break;
		case "do-what-it-says":
			fs.readFile("random.txt", "utf8", 
				function(error, data) {
					if (error) {
						console.log(error);
					}
					var dataArr = data.split(",");
					temp = dataArr[1].split(" ");
					args[2] = dataArr[0];
					liri();
				});
			break;
		default:
			console.log("I'm sorry, that's not a command I know");
			console.log("Use one of these commands: \n  my-tweets \n  spotify-this-song \n  movie-this\n  do-what-it-says");
		
	}
}

liri();