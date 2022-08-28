const { createProxyMiddleware } = require('http-proxy-middleware');

const apiKey = process.env.REACT_APP_WEATHER_API

module.exports = function(app) {
    app.use(
    createProxyMiddleware('/api', {
        target: `https://api.openweathermap.org/data/2.5/group?id=1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265&appid=${apiKey}&lang=kr&units=metric`,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        })
    );
};