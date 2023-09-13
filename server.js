//Changed dir for JS scirpt and css in html files.

const express = require('express')
let db = require('./db/db.json')
const path = require('path');
const fs = require ('fs');

const { v4: uuidv4 } = require('uuid'); //creates ID
const PORT =  3001;
const app = express();
app.use(express.json());
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });


  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
})

app.post('/api/notes', (req, res) => { //Updates new notes
 const {title, text} =req.body;
 const newNote ={
  title,
  text,
  id: uuidv4(),
 };
 db.push(newNote);
 fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
 err
   ? console.error(err)
   : res.json(newNote)
);

})



app.delete('/api/notes/:id', (req, res) => { // Deletes notes using thier ID
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let d = JSON.parse(data)
    let d1 = []
    for (const e of d) {
      if(e['id']!==req.params.id){
        d1.push(e);
      }
    }
    fs.writeFile('./db/db.json', JSON.stringify(d1), (err) =>
    err
      ? console.error(err)
      : res.json(d1)
   );
  })

})

app.listen(PORT, () => {
    console.log(`Server ${PORT} is running.`);
  });