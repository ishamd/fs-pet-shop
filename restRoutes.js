
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const petsPath = path.join(__dirname, 'pets.json');


router.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

router.get('/pets/:id', (req, res) => {
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

router.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);
    const name = req.body.name;
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;

    if (!name || Number.isNaN(age) || !kind) {
      return res.sendStatus(400);
    }

    const pet = {
      name,
      age,
      kind,
    };

    pets.push(pet);

    const updatedPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, updatedPetsJSON, (err) => {
      if (err) {
        return next(err);
      }

      res.send(pet);
    });
  });
});

router.patch('/pets/:id', (req, res) => {
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

    const age = Number.parseInt(req.body.age);
    const name = req.body.name;
    const kind = req.body.kind;

    if (!Number.isNaN(age)) {
      pets[id].age = age;
    }

    if (name) {
      pets[id].name = name;
    }

    if (kind) {
      pets[id].kind = kind;
    }

    const updatedPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, updatedPetsJSON, (err) => {
      if (err) {
        return next(err);
      }

      res.send(pets[id]);
    });
  });
});

router.delete('/pets/:id', (req, res) => {
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

    const deletedPet = pets.splice(id, 1)[0];

    const updatedPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, updatedPetsJSON, (err) => {
      if (err) {
        return next(err);
      }

      res.send(deletedPet);
    });
  });
});

router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
