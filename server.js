const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

// Set up the proxy to Krunker.io
app.use('/', httpProxy.createProxyServer({
  target: 'https://krunker.io', // Target Krunker.io
  changeOrigin: true,           // Set this to true to ensure the origin is changed
  secure: false                 // Set to false if Krunker uses self-signed certificates (optional)
}));

// Set the port for your server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
