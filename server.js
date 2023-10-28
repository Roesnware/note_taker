// require express and path
const express = require('express');
const path = require('path');

// set port
const PORT = process.env.port || 3001;

// import our modular routers for api 
const api = require('./routes/index.js');

// app instance
const app = express();

// middlewear
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// html routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listener 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
