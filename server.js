const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Log every incoming request to track if requests are being received
app.use('/', (req, res, next) => {
  console.log(`Incoming request to: ${req.url}`);
  next();
});

// Proxy configuration with logging and timeout for responses
app.use('/', createProxyMiddleware({
  target: 'https://kour.io',    // Target Kour.io
  changeOrigin: true,              // Ensure the origin is set correctly
  secure: false,                   // Disable SSL verification (only if needed)
  timeout: 30000,                  // Timeout after 30 seconds if no response
  onProxyReq: (proxyReq, req, res) => {
    // Log request headers or any additional info
    console.log(`Proxying request for: ${req.url}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log the status code of the response from Kour
    console.log(`Response from Krunker: ${proxyRes.statusCode} for ${req.url}`);
  },
}));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
const axios = require('axios');
const axios = require('axios');
