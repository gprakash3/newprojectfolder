const express=require('express');
const path = require('path');

const rootDir = require('../util/path');

//create router
const router=express.Router();

//To add product
router.get('/add-product' , (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST">Name:<input type="text" name="title"><br>size:<input type="number" name="size"><br><button type="submit">Add product</button></form>')
    res.sendFile(path.join(rootDir, 'views', 'add_product.html'));
});

//To console log entered data and redirect to shop.js file
router.post('/add-product' ,  (req,res,next) => {
    console.log(req.body);
    res.redirect('/shop');
});

module.exports = router;