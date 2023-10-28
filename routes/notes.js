// import modules
const note = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// get route to get curr notes
note.get('/', (req, res) => {

  // send all curr notes 
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// post to post new note
note.post('/', (req, res) => {

  // destruc req
  const {title, text} = req.body;

  // make new note obj
  const newNote = {
    title,
    text
  }

  // read and append curr notes with new notes added
  readAndAppend(newNote, './db/db.json');

  // build res obj 
  const response = {
    status: 'success',
    body: newNote,
  };

  // return res 
  res.json(response);
});

// export module 
module.exports = note;