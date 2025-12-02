const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

// ←ここを追加
app.get('/', (req, res) => {
  res.send('ZCP Proxy Server is running!');
});

// 既存のプロキシルート
app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('URL required');

    request(url).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
