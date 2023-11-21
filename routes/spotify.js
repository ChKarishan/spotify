import express from "express";
import { verifyToken } from '../Middleware/auth.js';
import { rotateProxy } from '../Middleware/proxyMiddleware.js';
import { login,  callback, getUserPlaylists,
    getDetailData, getPlaylistTracks,
    addTracksToPlaylist, play} from "../Controller/spotify.js";

const router = express.Router();

//verifyToken middleware on each route

router.get('/login', rotateProxy, login);
router.get('/callback', callback);
// router.get('/refresh_token', rotateProxy, refresh_token_func); //changing required
router.get('/getDetailData', verifyToken, getDetailData);  //done
router.get('/getUserPlaylists', verifyToken, getUserPlaylists); //done
router.get('/getPlaylistTracks/:id', verifyToken, getPlaylistTracks); //done
router.post('/addTracksToPlaylist', addTracksToPlaylist); //req.body undefined aa raha hai
router.get('/play/:trackId', verifyToken, play); //need premium

export default router;