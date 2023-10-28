// require express
const express = require('express');

// import route to notes
const notesRouter = require('./notes.js');

// instance of express
const app = express();

// notes route
app.use('/notes', notesRouter);

// export app
module.exports = app;