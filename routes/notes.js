// import modules
const note = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtil.js');
let currData = require('../db/db.json');

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
    text,
    id: uuidv4()
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

// delete route 
// post to post new note
note.delete('/:id', (req, res) => {

  // read curr notes with specific id
  let found = currData.some(note => note.id === req.params.id);

  //console.log(found);

  // if no note with id err
  if(!found){
    res.status(401).json({message: "note not found"});
  } else { 
    // filter out array note from notes
    let responseArray = currData.filter(note => note.id !== req.params.id);

    // rewrite file with new data
    writeToFile('./db/db.json', responseArray);

    // build resp obj
    const response = {
      status: 'success',
      message: "Note successgully deleted",
    };

    // return new array without specificed note
    res.json(response);
  }
});

// export module 
module.exports = note;