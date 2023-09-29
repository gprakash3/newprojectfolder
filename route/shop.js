const express=require('express');

//create router
const router=express.Router();

//To return page on route /shop get request
router.get('/shop' , (req,res,next) => {
    res.send('<h1>hello from node JS</h1><br><p>This is shop file</p>')
})

module.exports = router;