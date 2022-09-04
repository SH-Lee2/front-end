const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
    createProxyMiddleware('/api', {
        target: 'https://api.openweathermap.org/data/2.5/group',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        })
    );
};