

const http = require('http');
const routes = require('./httpRoutes');

const port = process.env.PORT || 8000;

const handleRequest = function (req, res) {
  if (routes[req.url] !== undefined) {
    routes[req.url](req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
};

const server = http.createServer(handleRequest);

server.listen(8000, () => {
  console.log('Listening...');
});

module.exports = server;
