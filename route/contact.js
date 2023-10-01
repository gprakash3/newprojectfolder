const express=require('express');

const contactController = require('../controllers/contact');

//create router
const router=express.Router();

router.get('/contactus' , contactController.getContact);

router.use('/success' , contactController.successmsg);

module.exports=router;