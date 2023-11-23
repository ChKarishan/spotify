// import http from 'http';
// import httpProxy from  'http-proxy';
import {proxies} from '../Controller/spotify.js'  

// // Middleware function to rotate through proxy IP addresses and log the current IP
export const rotateProxy = (req, res, next) => {
  
    // Assign the current proxy to the request
    req.headers['x-forwarded-for'] = proxies;
  
    // Continue to the next middleware or route handler
    next();
  };
  