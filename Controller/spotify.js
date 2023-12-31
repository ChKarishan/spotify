// import request from'request';
// import { Request } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';


var access_token = '';
var refresh_token = '';
var me = '';

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

  var client_id = '864ee56edc404d7a830dbe880b1370ce';
  var client_secret = '5437bbfcf66147e6b1a453bf75f77833';
  var redirect_uri = 'http://localhost:3000/dashboard/applied-proxy';

  var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
  });

  export var proxies = '';

    export async function login(req, res){
    res.send(spotifyApi.createAuthorizeURL(scopes));
     
    };


    export async function callback(req, res){
    // const error = req.query.error;
    console.log(req.query.code);
     const code = req.query.code.slice(6);;
    // res.send("sdS"S)
    // const state = req.query.state;
  
    // if (error) {
    //   console.error('Callback Error:', error);
    //   res.send(`Callback Error: ${error}`);
    //   return;
    // }
  






    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        me = data;
        access_token = data.body['access_token'];
        refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
           access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
    };


    // export async function refresh_token_func(req, res){

    // refresh_token = req.query.refresh_token;
    // var authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   headers: { 
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
    //   },
    //   form: {
    //     grant_type: 'refresh_token',
    //     refresh_token: refresh_token
    //   },
    //   json: true
    // };
  
    // request.post(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {
    //       access_token = body.access_token,
    //       refresh_token = body.refresh_token;
    //     res.send({
    //       'access_token': access_token,
    //       'refresh_token': refresh_token
    //     });
    //   }
    // });
    // };

    export async function getDetailData(req, res){
    console.log(access_token);
    spotifyApi.setAccessToken(access_token);
    (async () => {
        me = await spotifyApi.getMe();
        console.log(me.body);
        res.json(me.body);
      })().catch(e => {
        console.error(e);
      });
    };

    
    export async function getUserPlaylists(req, res){
    me = await spotifyApi.getMe();
    const userName = me.body.id;
    console.log(userName);
    console.log(access_token);
    // access_token = req.query.access_token;
    spotifyApi.setAccessToken(access_token);
    (async () => {

        var ret_playlist = [];
        const data = await spotifyApi.getUserPlaylists(userName)
        console.log("---------------+++++++++++++++++++++++++")
        // for (let playlist of data.body.items) {
        //     console.log(playlist.name + " " + playlist.id)
        //     ret_playlist = ret_playlist + playlist.name + " " + playlist.id + "........";
        // }
        // playlists = data.body.items;
        res.json(data.body.items);

      })().catch(e => {

        console.error(e);

      });
    };

    
    export async function getPlaylistTracks(req, res){
    const userName = me.body.id;
    console.log(userName);
    console.log(access_token);
    spotifyApi.setAccessToken(access_token);
    (async () => {

        const playlistId = req.params.id;
        const data = await spotifyApi.getPlaylistTracks(playlistId, {
            offset: 1,
            limit: 100,
            fields: 'items'
          })
          let tracks = [];
          console.log("---------------+++++++++++++++++++++++++")

        for (let track_obj of data.body.items) {
            const track = track_obj.track
            tracks.push(track.name);
            console.log(track.name + " : " + track.id)
        }
        console.log("---------------+++++++++++++++++++++++++")
        // res.json(tracks);
       res.send(tracks);

    })().catch(e => {

        console.error(e);

      });
    };




   export async function addTracksToPlaylist(req, res){

    console.log("bhai g")
    console.log(req.body);
    console.log(access_token);
    spotifyApi.setAccessToken(access_token);
    try{
        console.log(req.body);
        const {playlistId, trackId} = req.body;
        // track_id = track_url.split('/')[-1]
        const trackInfo = await spotifyApi.getTrack(trackId);
        const trackName = trackInfo.body.name;
        const trackUri = trackInfo.body.uri;

       const data = await spotifyApi.addTracksToPlaylist(playlistId, [trackUri]);
       console.log('return', trackInfo);
       res.json(trackName);

    }catch(error){

        console.error(error);

      }
    };


    export async function proxyfunc(req, res){
      try{
        console.log(req.body.proxies);
        proxies = req.body.proxies
        res.send({'status': 200, 'api': true});
      }catch(error){

        res.send(error);
        
      }
    };



    export async function play(req, res){
    const { trackId } = req.params;
    spotifyApi.setAccessToken(access_token);

    try {
      await spotifyApi.play({ uris: [`spotify:track:${trackId}`] });
  
      res.send(`Playing track with id ${trackId}`);
    } catch (error) {
      console.error('Error playing track:', error);
      res.status(500).send('Error playing track');
    }
    };