var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret,
});


var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;
var omdbKey = keys.omdbKey.api;

var action = process.argv[2];

var songQuery = 'Mother Of Pearl';

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

var omdbQuery = "http://www.omdbapi.com/?t=" + 'Tombstone' + "&y=&plot=short&apikey=" + omdbKey;

request(omdbQuery, function(error, response, body){
  if (!error && response.statusCode === 200) {
      console.log("Release Year: " + JSON.parse(body).Year);  }

});



// spotify.search({ type: 'track', query: songQuery }, function(err, data) {
//   var trackInfo = [];
//
//
//   if (err) {
//     spotify.search({ type: 'track', query: 'Ace of Base Happy Nation The Sign' }, function(err, data) {
//       var info = data.tracks.items[0];
//
//       trackInfo.push(data.tracks.items[0].artists[0].name);
//       trackInfo.push(data.tracks.items[0].name);
//       trackInfo.push(data.tracks.items[0].album.name);
//       trackInfo.push(data.tracks.items[0].external_urls.spotify);
//       trackInfo.join(' ,');
//       // err = '';
//       return console.log(trackInfo);
//     });
//     // return console.log('Error occurred: ' + err);
//     return
//   }
//
//   if (data.tracks.items[0].name) {
//     var info = data.tracks.items[0];
//     trackInfo.push(data.tracks.items[0].artists[0].name);
//     trackInfo.push(data.tracks.items[0].name);
//     trackInfo.push(data.tracks.items[0].album.name);
//     trackInfo.push(data.tracks.items[0].external_urls.spotify);
//     trackInfo.join(' ,');
//     console.log(trackInfo);
//   }
//
// });



    // my-tweets
    //
    // spotify-this-song
    //
    // movie-this
    //
    // do-what-it-says;
