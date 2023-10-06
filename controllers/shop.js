const db=require('../util/database');

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,feildData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};




exports.getProduct = (req, res, next) => {
  //here productId is name used in route as variable
  const prodId = req.params.productId;
  // console.log(req);
  console.log(prodId);
  // res.redirect('/');
  Product.findById(prodId)
  .then(([product]) =>{
    //here product is array of one element, hence assign product[0]
    res.render('shop/product-detail', { product: product[0], pageTitle: product.title, path: '/products' });
  })
  .catch(err => {
    console.log(err);
  })
    
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,feildData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    })

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