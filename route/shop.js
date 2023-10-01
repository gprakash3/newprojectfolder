const express=require('express');

const productController= require('../controllers/product');

//create router
const router=express.Router();

//To return page on route /shop get request
router.get('/' , productController.getViewProduct);

//used here because added main page as shop hence if someone just give address /, it not give error page
router.get('/' , (req,res,next) => {
    res.redirect('/shop');
})

module.exports = router;