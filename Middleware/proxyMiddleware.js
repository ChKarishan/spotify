// Define a list of proxy IP addresses
const proxyIPs = ['http://proxy1.example.com', 'http://proxy2.example.com', 'http://proxy3.example.com'];
let currentProxyIndex = 0;

// Middleware function to rotate through proxy IP addresses and log the current IP
const rotateProxy = (req, res, next) => {
    // Log the current proxy IP address
    console.log(`Current Proxy IP: ${proxyIPs[currentProxyIndex]}`);
  
    // Assign the current proxy to the request
    req.headers['x-forwarded-for'] = proxyIPs[currentProxyIndex];
  
    // Rotate to the next proxy
    currentProxyIndex = (currentProxyIndex + 1) % proxyIPs.length;
  
    // Continue to the next middleware or route handler
    next();
  };
  