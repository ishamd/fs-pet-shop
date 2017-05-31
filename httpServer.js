

// const fs = require('fs');
// const path = require('path');
const http = require('http');
const routes = require('./httpRoutes');

// const petsPath = path.join(__dirname, 'pets.json');
const port = process.env.PORT || 8000;

const handleRequest = function (req, res) {
  if (routes[req.url] !== undefined) {
    routes[req.url](req, res);
  } else {
    res.end('404, no such route');
  }
};

const server = http.createServer(handleRequest);

server.listen(8000, () => {
  console.log('Listening...');
});

module.exports = server;
