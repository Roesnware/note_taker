// require express and path
const express = require('express');
const path = require('path');

// set port
const port = process.env.port || 3001;

// import our modular routers for api 
const api = require('./routes/index.js');

// app instance
const app = express();

// middlewear
app.use(express.static('public'));

// repsonse middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for api routes
app.use('/api', api);

// html routes
// get route for /notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get route for all other url links 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listener 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${port}`)
);
