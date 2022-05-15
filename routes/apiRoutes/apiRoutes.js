const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const db = path.join(__dirname, '../../db/db.json');

var notesArray = [];

router.get('/notes',  (req, res) => {
    res.sendFile(db);
    fs.readFile(db, 'utf-8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.map(({title, text, id})=>{
            let previousNote = {
                title: `${title}`,
                text: `${text}`,
                id: `${id}`
            }
            notesArray.push(previousNote);
        });
    })
});


router.post('/notes', (req, res) => {
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random()* 100)
    }
    notesArray.push(note)
    content = JSON.stringify(notesArray);

    fs.writeFile(db, content, function (err) {
        if (err) throw err;
    });

    res.json(db);
});

module.exports = router;