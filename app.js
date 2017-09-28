var request = require("request");
var Twitter = require("twitter");
var keys = require("./keys.js");
var spotkey = require("./spotKey.js");
var Spotify = require("node-spotify-api");

var args = process.argv;
var temp = args.splice(3,args.length - 2);
var choice = temp.join(" ");
console.log(choice);
console.log(args[2]);

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
		if (args[3]) {
			song = args[3];
		} else {
			song = "The Sign"
		}
		var spotify = new Spotify({
  		id: keys.spotKeys.id,
  		secret: keys.spotKeys.secret
		});

		spotify.search({ type: 'track', query: 'Hey Jude' })
	  .then(function(response) {
	    console.log(response);
	  })
	  .catch(function(err) {
	    console.log(err);
	  });
		break;
	case "movie-this":

		break;
	case "do-what-it-says":
		break;
	default:
		console.log("I'm sorry, that's not a command I know");
		console.log("Use one of these commands: \n  my-tweets \n  spotify-this-song \n  movie-this\n  do-what-it-says");
	
}