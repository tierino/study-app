const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/users", "/auth", "/account", "/units"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
