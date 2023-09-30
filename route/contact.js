const express=require('express');
const path = require('path');
const rootDir = require('../util/path');

//create router
const router=express.Router();

router.get('/contactus' , (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
})

router.use('/success' , (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
})

module.exports=router;