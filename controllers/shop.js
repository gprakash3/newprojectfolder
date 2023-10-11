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
    console.log('error in fibdByPk');
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
  req.user
  .getCart()
  .then(cart => {
    return cart
      .getProducts()
      .then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart() 
    .then(cart => {
      //To make cart available to overall function, we assign it to fetchedcart and use it later promises.
      fetchedCart = cart;
      //checking whether product already exist in cart or not
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      //check length of products we get from above promise
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      //here we are setting quantity feild which is there in cartItem table by 2nd argument.
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

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

exports.postCartDeleteProduct = (req,res,next) => {
  const prodId=req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where: {id:prodId}});
  })
  .then(products => {
    const product=products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};