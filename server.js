'use strict';

// :::libraries:::

require('dotenv').config();
const express = require('express'); // for server
const app = express(); //using app fires off express
// const PORT = process.env.PORT || 3000;

// :::local files that hold error functions:::
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');

//:::routes:::

app.get('/', renderHome);
app.get('/data', renderData);
app.get('/bad', (req, res, next) => {
  next('having issues');
})

app.use('*', notFound);
app.use(errorHandler);

function renderHome(req, res) {
  res.status(200).send('Hello World')
}

function renderData(req, res, next) {
  const output = {
    "time": new Date()
  }
  res.status(200).json(output);
}

// :::turn on server:::
function start(PORT) {
  app.listen(PORT, () => console.log(`server is up on ${PORT}`))
}

module.exports = {
  app: app,
  start: start
}

