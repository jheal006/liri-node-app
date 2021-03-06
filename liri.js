// Reference Required Nodes!
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//Capture User Command at Index 2
var action = process.argv[2];

///Bait and switch the fools!!!!! Just kidding, actually just use a switch statement to run different functions depending on the command.
switch (action) {
  // Command to display tweets
  case "my-tweets":
    my_tweets();
    break;

  // Command to Search Spotify
  case "spotify-this-song":
    var query = process.argv[3];
    if (query) {
      spotify_this_song(query);
    } else {
      query = "Ace of Base Happy Nation The Sign";
      spotify_this_song(query);
    }
    break;

  // Command to Search OMDB
  case "movie-this":
    var query = process.argv[3];
      if (query) {
        movie_this(query);
      } else {
        // If no movie is queried, return Mr. Nobody
        query = 'Mr. Nobody';
        movie_this(query);
      }
    break;

  case "do-what-it-says":
    fs.readFile('./random.txt', 'utf8', function(error, data){
      if (error) {
        console.log('File does not exist!')
      }
      // console.log(data);
      spotify_this_song(data);
    })
    break;
}


/////////////////////////////////
//      Search Twitter API     //
/////////////////////////////////

function my_tweets(){
  var client = new Twitter({
   consumer_key : keys.twitterKeys.consumer_key,
   consumer_secret : keys.twitterKeys.consumer_secret,
   access_token_key : keys.twitterKeys.access_token_key,
   access_token_secret : keys.twitterKeys.access_token_secret,
  });


var params = { screen_name: 'jheal006' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
          for (var i = 0; i < 20; i++)
            console.log(tweets[i].text);
        }
      console.log(error);
    });
};


/////////////////////////////////
// Search Spotify API Function //
/////////////////////////////////

function spotify_this_song(songQuery) {
  var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret,
  });
  spotify.search({ type: 'track', query: songQuery }, function (err, data) {

    if (err || songQuery === '') {
      return console.log('Error occurred: ' + err);
    }

    if (data.tracks.items[0].name) {
      var info = data.tracks.items[0];
      console.log('Artist: ' + data.tracks.items[0].artists[0].name);
      console.log('Song Name: ' + data.tracks.items[0].name);
      console.log('Album: ' + data.tracks.items[0].album.name);
      console.log('Link to track: ' + data.tracks.items[0].external_urls.spotify);
    }

  });
};


/////////////////////////
//Search OMDB Function //
/////////////////////////

function movie_this(movieQuery) {
  var omdbQuery = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=" + keys.omdbKey.api;

    request(omdbQuery, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoe: " + JSON.parse(body).Ratings[1].Value);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }

    })
};
