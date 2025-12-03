import express from 'express';
import compression from 'compression';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(compression());

// プロキシエンドポイント
app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing URL');
  try {
    const response = await fetch(target);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, () => console.log(`Independent Proxy running on port ${PORT}`));
