import express from "express";
import { verifyToken } from '../Middleware/auth.js';
import { rotateProxy } from '../Middleware/proxyMiddleware.js';
import { login,  callback, } from "../Controller/spotify.js";

const router = express.Router();

router.get('/login', [verifyToken, rotateProxy], login);
router.get('/callback', verifyToken, callback);
router.get('/refresh_token', [verifyToken, rotateProxy], refresh_token);
router.get('/getDetailData', verifyToken, getDetailData);
router.get('/getUserPlaylists', verifyToken, getUserPlaylists);
router.get('/getPlaylistTracks/:id', verifyToken, getPlaylistTracks);
router.post('/addTracksToPlaylist', verifyToken, addTracksToPlaylist);
router.get('/play/:trackId', verifyToken, play);

export default router;