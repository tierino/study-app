const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/users", "/auth/google", "/account", "/follows", "/posts"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
