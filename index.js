const axios = require('axios');
axios.get('https://target-website.com', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(response => console.log(response.data));
