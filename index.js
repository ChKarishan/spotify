import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import path from "path"
import authRoutes from "./routes/auth.js";
import spotifyRoutes from "./routes/spotify.js";
import { fileURLToPath } from "url";
// import SpotifyWebApi from 'spotify-web-api-node';
// import { createProxyMiddleware } from 'http-proxy-middleware';


// var client_id = '864ee56edc404d7a830dbe880b1370ce'; // your clientId
// var client_secret = '5437bbfcf66147e6b1a453bf75f77833'; // Your secret
// var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

// var access_token = '';
// var refresh_token = '';
// var me = '';
// var playlists = '';

// const scopes = [
//     'ugc-image-upload',
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-read-currently-playing',
//     'streaming',
//     'app-remote-control',
//     'user-read-email',
//     'user-read-private',
//     'playlist-read-collaborative',
//     'playlist-modify-public',
//     'playlist-read-private',
//     'playlist-modify-private',
//     'user-library-modify',
//     'user-library-read',
//     'user-top-read',
//     'user-read-playback-position',
//     'user-read-recently-played',
//     'user-follow-read',
//     'user-follow-modify'
//   ];

//   var spotifyApi = new SpotifyWebApi({
//     clientId: '864ee56edc404d7a830dbe880b1370ce',
//     clientSecret: '5437bbfcf66147e6b1a453bf75f77833',
//     redirectUri: 'http://localhost:8888/callback'
//   });

// const generateRandomString = (length) => {
//   return crypto
//   .randomBytes(60)
//   .toString('hex')
//   .slice(0, length);
// }

// var stateKey = 'spotify_auth_state';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

var app = express();

app.use("/auth", authRoutes);
app.use("/spotify", spotifyRoutes);

// Use the rotateProxy middleware for all routes
// app.use(rotateProxy);

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

//    app.get('/login', (req, res) => {
//     res.redirect(spotifyApi.createAuthorizeURL(scopes));
//   });
  
//   app.get('/callback', (req, res) => {
//     const error = req.query.error;
//     const code = req.query.code;
//     const state = req.query.state;
  
//     if (error) {
//       console.error('Callback Error:', error);
//       res.send(`Callback Error: ${error}`);
//       return;
//     }
  
//     spotifyApi
//       .authorizationCodeGrant(code)
//       .then(data => {
//         me = data;
//         access_token = data.body['access_token'];
//         refresh_token = data.body['refresh_token'];
//         const expires_in = data.body['expires_in'];
  
//         spotifyApi.setAccessToken(access_token);
//         spotifyApi.setRefreshToken(refresh_token);
  
//         console.log('access_token:', access_token);
//         console.log('refresh_token:', refresh_token);
  
//         console.log(
//           `Sucessfully retreived access token. Expires in ${expires_in} s.`
//         );
//         res.send('Success! You can now close the window.');
  
//         setInterval(async () => {
//           const data = await spotifyApi.refreshAccessToken();
//            access_token = data.body['access_token'];
  
//           console.log('The access token has been refreshed!');
//           console.log('access_token:', access_token);
//           spotifyApi.setAccessToken(access_token);
//         }, expires_in / 2 * 1000);
//       })
//       .catch(error => {
//         console.error('Error getting Tokens:', error);
//         res.send(`Error getting Tokens: ${error}`);
//       });
//   });

//do not uncomment this login
// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
// //   var scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scopes,
//       redirect_uri: redirect_uri,
//       state: state
//     }));

// // res.redirect(spotifyApi.createAuthorizeURL(scopes));

// });

// app.get('/callback', function(req, res) {

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//             access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };


//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });

// app.get('/refresh_token', function(req, res) {

//   refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 
//       'content-type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         access_token = body.access_token,
//         refresh_token = body.refresh_token;
//       res.send({
//         'access_token': access_token,
//         'refresh_token': refresh_token
//       });
//     }
//   });
// });

// app.get('/getDetailData', function(req, res){
//     console.log(access_token);
//     spotifyApi.setAccessToken(access_token);
//     (async () => {
//         me = await spotifyApi.getMe();
//         console.log(me.body);
//         res.json(me.body);
//       })().catch(e => {
//         console.error(e);
//       });
// });

// app.get('/getUserPlaylists', function(req, res){
//     const userName = me.body.id;
//     console.log(userName);
//     console.log(access_token);
//     spotifyApi.setAccessToken(access_token);
//     (async () => {

//         var ret_playlist = '';
//         const data = await spotifyApi.getUserPlaylists(userName)
//         console.log("---------------+++++++++++++++++++++++++")
//         for (let playlist of data.body.items) {
//             console.log(playlist.name + " " + playlist.id)
//             ret_playlist = ret_playlist + playlist.name + " " + playlist.id + "........";
//         }
//         playlists = data.body.items;
//         res.json(ret_playlist);

//       })().catch(e => {

//         console.error(e);

//       });
// });

// app.get('/getPlaylistTracks/:id', function(req, res){
//     const userName = me.body.id;
//     console.log(userName);
//     console.log(access_token);
//     spotifyApi.setAccessToken(access_token);
//     (async () => {

//         const playlistId = req.params.id;
//         const data = await spotifyApi.getPlaylistTracks(playlistId, {
//             offset: 1,
//             limit: 100,
//             fields: 'items'
//           })
//           let tracks = [];
//           console.log("---------------+++++++++++++++++++++++++")

//         for (let track_obj of data.body.items) {
//             const track = track_obj.track
//             tracks.push(track.name);
//             console.log(track.name + " : " + track.id)
//         }
//         console.log("---------------+++++++++++++++++++++++++")
//         // res.json(tracks);
//        res.send(tracks);

//     })().catch(e => {

//         console.error(e);

//       });
// });

// app.post('/addTracksToPlaylist', function(req, res){
//     console.log(req.body);
//     console.log(access_token);
//     spotifyApi.setAccessToken(access_token);
//     (async () => {
//         const playlistId = req.body.playlistId;
//         const trackId = req.body.trackId;
//         const trackInfo = await spotifyApi.getTrack(trackId);
//         const trackUri = trackInfo.body.uri;

//         spotifyApi.addTracksToPlaylist(playlistId, [trackUri])
//         .then((data) => {
//           res.json('Track added to playlist:', data);
//         })
//         .catch((error) => {
//           res.status(500).json('Error adding track to playlist:', error);
//         });

//     })().catch(e => {

//         console.error(e);

//       });
// });

// app.get('/play/:trackId', async (req, res) => {
//     const { trackId } = req.params;
//     spotifyApi.setAccessToken(access_token);

//     try {
//       await spotifyApi.play({ uris: [`spotify:track:${trackId}`] });
  
//       res.send(`Playing track with id ${trackId}`);
//     } catch (error) {
//       console.error('Error playing track:', error);
//       res.status(500).send('Error playing track');
//     }
//   });

console.log(`Listening on : ${PORT}`);
app.listen(process.env.PORT);