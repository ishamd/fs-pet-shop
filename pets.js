const fs = require('fs');

const FILEPATH = 'pets.json';
const data = fs.readFileSync(FILEPATH, 'utf8');
const obj = JSON.parse(data);
const cmd = process.argv[2];

const options = {
  read() {
    if (process.argv[3] === undefined) {
      console.log(obj);
    } else {
      if (process.argv[3] >= obj.length || process.argv[3] < 0) {
        console.error('Usage: node pets.js read INDEX');
        process.exit(1);
      }
      console.log(obj[process.argv[3]]);
    }
  },
  create() {
    if (process.argv.length != 6) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1);
    } else if (isNaN(Number(process.argv[3]))) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1);
    } else {
      const pet = {
        age: Number(process.argv[3]),
        kind: process.argv[4],
        name: process.argv[5],
      };
      obj.push(pet);
      fs.writeFileSync(FILEPATH, JSON.stringify(obj));
      console.log(pet);
    }
  },
  update() {

  },
  destroy() {

  },
};


try {
  options[cmd]();
} catch (error) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
