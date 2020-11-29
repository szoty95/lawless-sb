const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://152.66.211.202:9090",
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: "localhost",
    })
  );
};
