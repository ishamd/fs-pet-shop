const fs = require('fs');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const routes = {
  '/pets': function (req, res) {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  },

  '/pets/0': function (req, res) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }
      res.setHeader('Content-Type', 'application/json');
      const parsed = JSON.parse(data);
      const petsJSON = JSON.stringify(parsed[0]);
      res.end(petsJSON);
    });
  },

  '/pets/1': function (req, res) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }
      res.setHeader('Content-Type', 'application/json');
      const parsed = JSON.parse(data);
      const petsJSON = JSON.stringify(parsed[1]);
      res.end(petsJSON);
    });
  },

  '/pets/2': function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  },

  '/pets/-1': function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  },
};

module.exports = routes;
