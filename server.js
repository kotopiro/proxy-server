const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('URL required');

  try {
    const response = await axios.get(target, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    // ヘッダ改変
    res.set('X-Frame-Options', 'ALLOWALL');
    res.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'");
    res.set('Content-Type', response.headers['content-type'] || 'text/html');

    res.send(response.data);
  } catch (err) {
    res.status(500).send('Proxy Error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
