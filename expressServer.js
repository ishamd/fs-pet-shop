

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;
const petsPath = path.join(__dirname, 'pets.json');

app.disable('x-powered-by');

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const id = parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});

app.use((req, res) => {
  // use says use this function as a piece of middleware
  res.sendStatus(404);
  // exits the stack/loop
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
