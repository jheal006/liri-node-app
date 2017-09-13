var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');


var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret,
});

var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;


var action = process.argv[2];

var songQuery = 'jadksfja990ahsdf';

switch (action){
  case "my-tweets":
    total();
    break;

  case "spotify-this-song":
    // spotify-this-song();
    break;

  case "movie-this":
    // movie-this();
    break;

  case "do-what-it-says":
    // do-what-it-says();
    break;

}

spotify.search({ type: 'track', query: songQuery }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
var trackInfo = [];
var info = data.tracks.items[0];

  if (data.tracks.items[0].name) {
    trackInfo.push(data.tracks.items[0].artists[0].name);
    trackInfo.push(data.tracks.items[0].name);
    trackInfo.push(data.tracks.items[0].album.name);
    trackInfo.push(data.tracks.items[0].external_urls.spotify);
    trackInfo.join(' ,');
    console.log(trackInfo);
  } else if (data.tracks.items[0] === null || data.tracks.items[0] === "undefined") {
    console.log('No Dice');
  }


});



    // my-tweets
    //
    // spotify-this-song
    //
    // movie-this
    //
    // do-what-it-says;
