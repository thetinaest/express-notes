const fs = require('fs');
const path = require('path');
const router = require('express').Router();
// let db = require('../../db/db.json');
const db = path.join(__dirname, '../../db/db.json');

var notesArray = [];

router.get('/notes',  (req, res) => {
    res.sendFile(db);
    console.log(res);
});

router.post('/notes', (req, res) => {
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: JSON.stringify(notesArray.length)
    }
    notesArray.push(note)
    content = JSON.stringify(notesArray);

    fs.writeFile(db, content, function (err) {
        if (err) throw err;
    });

    res.json(db);
});

module.exports = router;