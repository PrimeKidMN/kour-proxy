const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware to add delay before proxying requests (to mimic human-like behavior)
app.use('/', (req, res, next) => {
  const delay = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000); // Random delay between 1-2 seconds
  setTimeout(() => {
    next(); // Proceed to the next middleware (the proxy)
  }, delay);
});

// Set up the proxy to Krunker.io with custom headers to avoid being blocked
app.use('/', createProxyMiddleware({
  target: 'https://krunker.io', // Target Krunker.io
  changeOrigin: true,           // Set this to true to ensure the origin is changed
  secure: false,                // Set to false if Krunker uses self-signed certificates (optional)
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Mimic a browser
    'Referer': 'https://krunker.io', // Include a valid referer header
    'Accept-Language': 'en-US,en;q=0.9', // Mimic a browser's accepted languages
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can add more custom headers or log information here if needed
    console.log(`Proxying request for: ${req.url}`);
  }
}));

// Set the port for your server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
