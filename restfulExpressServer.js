

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const petRoutes = require('./restRoutes');

const app = express();

app.set('port', process.env.PORT || 8000);
app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(petRoutes);

app.listen(app.get('port'), () => {
  console.log('Listening on', app.get('port'));
});

module.exports = app;
