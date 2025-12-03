import express from 'express';
import compression from 'compression';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 10000; // Render の環境変数 PORT を必ず使う

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

// 起動メッセージ
app.listen(PORT, () => {
  console.log(`ZCP Independent Proxy running on port ${PORT}`);
});
