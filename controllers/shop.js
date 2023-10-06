const sequelize=require('../util/database');

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
.then(products => {
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
})
.catch(err=>console.log(err));
};




exports.getProduct = (req, res, next) => {
  //here productId is name used in route as variable
  const prodId = req.params.productId;
 
  Product.findAll({where : {id:prodId}})
  .then(products => {
    res.render('shop/product-detail', { product: products[0], pageTitle: products[0].title, path: '/products' });
  })
  .catch(error => {
    console.log('error in findById');
    console.log(error);
  })
    
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
.then(products => {
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
})
.catch(err=>console.log(err));

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const proId = req.body.productId;
  Product.findById(proId, product => {
    Cart.addProduct(proId, product.price);
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};