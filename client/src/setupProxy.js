const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // server ke home page ka link
      target: "https://https://blogapp-backend-production.up.railway.app",
      // target : "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
