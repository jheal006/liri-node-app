var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');



var client = new Twitter({
 consumer_key : keys.twitterKeys.consumer_key,
 consumer_secret : keys.twitterKeys.consumer_secret,
 access_token_key : keys.twitterKeys.access_token_key,
 access_token_secret : keys.twitterKeys.access_token_secret,
});

var action = process.argv[2];


var songQuery = 'Palaces of Montezuma';
var movieQuery = 'Tombstone';

switch (action) {
  case "my-tweets":
    total();
    break;

  case "spotify-this-song":
    var query = process.argv[3];
    spotify_this_song(query);
    break;

  case "movie-this":
    // movie-this();
    break;

  case "do-what-it-says":
    // do-what-it-says();
    break;

}


function omdbQuery() {
"http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=" + omdbKey;

  request(omdbQuery, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].value);
      console.log("Rotten Tomatoe: " + JSON.parse(body).Ratings[1].value);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }

  })
};


    
    function spotify_this_song(songQuery) {
      var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret,
      });
      spotify.search({ type: 'track', query: songQuery }, function (err, data) {
        var trackInfo = [];


        if (err) {
          spotify.search({ type: 'track', query: 'Ace of Base Happy Nation The Sign' }, function (err, data) {
            var info = data.tracks.items[0];

            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('Link to track: ' + data.tracks.items[0].external_urls.spotify);
            // console.join(' ,');
            // err = '';
          });
          // return console.log('Error occurred: ' + err);
          return
        }


        if (data.tracks.items[0].name) {
          var info = data.tracks.items[0];
          console.log('Artist: ' + data.tracks.items[0].artists[0].name);
          console.log('Song Name: ' + data.tracks.items[0].name);
          console.log('Album: ' + data.tracks.items[0].album.name);
          console.log('Link to track: ' + data.tracks.items[0].external_urls.spotify);
          // console.join(' ,');
          // console.log(trackInfo);
        }

      });
    };

// spotify_this_song();

    // my-tweets
    //
    // spotify-this-song
    //
    // movie-this
    //
    // do-what-it-says;
