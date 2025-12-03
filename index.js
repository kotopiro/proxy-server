const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.json());

// /proxy?url=TARGET で任意URLをプロキシ
app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://example.com",
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const target = req.query.url;
      return new URL(target).pathname + new URL(target).search;
    },
    router: (req) => {
      const url = req.query.url;
      return new URL(url).origin;
    },
    onProxyRes(proxyRes) {
      delete proxyRes.headers["x-frame-options"];
      proxyRes.headers["access-control-allow-origin"] = "*";
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ZCP Proxy running on ${port}`));
