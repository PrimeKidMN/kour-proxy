const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Correct way to import the method

const app = express();

// Set up the proxy to Krunker.io
app.use('/', createProxyMiddleware({
  target: 'https://krunker.io',
  changeOrigin: true,
  secure: false,
  gzip: true,  // Enable gzip compression
}));


// Set the port for your server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
