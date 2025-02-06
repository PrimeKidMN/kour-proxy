const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Log every incoming request to track if requests are being received
app.use('/', (req, res, next) => {
  console.log(`Incoming request to: ${req.url}`);
  next();
});

// Proxy configuration with browser headers, logging, and timeout for responses
app.use('/', createProxyMiddleware({
  target: 'https://kour.io',    // Target Kour.io
  changeOrigin: true,              // Ensure the origin is set correctly
  secure: false,                   // Disable SSL verification (only if needed)
  timeout: 30000,                  // Timeout after 30 seconds if no response
  onProxyReq: (proxyReq, req, res) => {
    // Add browser-like headers to the proxy request
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    proxyReq.setHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.5');
    proxyReq.setHeader('Accept-Encoding', 'gzip, deflate, br');
    proxyReq.setHeader('Connection', 'keep-alive');

    // Log request headers or any additional info
    console.log(`Proxying request for: ${req.url}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log the status code of the response from Kour
    console.log(`Response from Kour: ${proxyRes.statusCode} for ${req.url}`);
  },
}));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
const axios = require('axios');
const axios = require('axios');
