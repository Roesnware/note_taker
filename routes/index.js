// require express
const express = require('express');

// import our modular routers for /notes 
const notesRouter = require('./notes.js');

// app instance
const app = express();

// middlewear
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/notes', notesRouter);

// listener 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
