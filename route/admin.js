const express=require('express');

//Importing controller file
const productController= require('../controllers/product');

//create router
const router=express.Router();

//To add product
router.get('/add-product' ,  productController.getAddProduct);

//To console log entered data and redirect to shop.js file
router.post('/add-product' ,  productController.postAddProduct);

module.exports = router;