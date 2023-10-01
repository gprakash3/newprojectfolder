const path=require('path');
const rootDir = require('../util/path');


exports.getAddProduct = (req, res, next) => {
       res.sendFile(path.join(rootDir, 'views', 'add_product.html'));
}

exports.postAddProduct = (req,res,next) => {
    console.log(req.body);
    res.redirect('/');
}

exports.getViewProduct = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}