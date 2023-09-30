const express=require('express');
const path = require('path');
const rootDir = require('../util/path');

//create router
const router=express.Router();

//To return page on route /shop get request
router.get('/shop' , (req,res,next) => {
    // res.send('<h1>hello from node JS</h1><br><p>This is shop file</p>')
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
})

//used here because added main page as shop hence if someone just give address /, it not give error page
router.get('/' , (req,res,next) => {
    res.redirect('/shop');
})

module.exports = router;