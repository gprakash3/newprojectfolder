const express=require('express');
const fs = require('fs');

//create router
const router=express.Router();

//To send message
router.post('/' , (req, res, next) => {
    var ndata;
    //add all data from file here
    fs.readFile('./message.txt', 'utf8', (err, data) => {
        
        res.send(`<body>${data}</body><br><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/storefile" method="POST"><input type="hidden" id="username" name="username"> Enter message:<input type="text" id="chat" name="chat"><br><button type="submit">send Message</button></form>`)
    });
    
});

router.get('/' , (req, res, next) => {
    var ndata;
    //add all data from file here
    fs.readFile('./message.txt', 'utf8', (err, data) => {
        
        res.send(`<body>${data}</body><br><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/storefile" method="POST"><input type="hidden" id="username" name="username"> Enter message:<input type="text" id="chat" name="chat"><br><button type="submit">send Message</button></form>`)
    });
    
});

//To console log entered data and redirect to shop.js file
router.post('/storefile' ,  (req,res,next) => {
    //storing username and chat to variable
    stri=req.body.username+':'+req.body.chat;
    //appending chat to file
    fs.appendFileSync('message.txt', stri);

    res.redirect('/');
});

module.exports = router;