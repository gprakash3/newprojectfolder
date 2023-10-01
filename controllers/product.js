const path=require('path');
const rootDir = require('../util/path');

//Importing file from models
const Product= require('../models/product');

exports.getAddProduct = (req, res, next) => {
       res.sendFile(path.join(rootDir, 'views', 'add_product.html'));
}

exports.postAddProduct = (req,res,next) => {
    //making Product object
    const product = new Product(req.body);
    //calling save method
    product.save();  

    res.redirect('/');
}

exports.getViewProduct = (req,res,next) => {
    //passing function on fetchAll
    Product.fetchAll((products) => {
        console.log(products);
        res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    });  
}