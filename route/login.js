const express=require('express');

//create router
const router=express.Router();

//local storage importing
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

//storing username to local storage
router.get('/login' , (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST">Username:<input type="text" id="username" name="username"><br><button type="submit">Login</button></form>')
});

module.exports = router;