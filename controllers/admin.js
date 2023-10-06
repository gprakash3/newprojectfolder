const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      console.log('data added');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  //Finding product using ID
  Product.findAll({ where: { id: prodId } })
    .then(products => {
      //If no product found
      if (!products[0]) {
        console.log("product not found")
        return res.redirect('/');
      }
      //If product found
      res.render('admin/edit-product', {
        product: products[0], pageTitle: 'Edit Product', path: '/admin/edit-product', editing: editMode,
      });
    })
    .catch(error => {
      console.log('error in findById');
      console.log(error);

    });
}


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findAll()
    .then(products => {
      products[0].title = updatedTitle;
      products[0].price = updatedPrice;
      products[0].imageUrl = updatedImageUrl;
      products[0].description = updatedDesc;
      return products[0].save();
    })
    //handle success for save()
    .then(result => {
      console.log('Updated data');
      res.redirect('/admin/products');
    })
    //handle error for findAll() and save()
    .catch(err => {
      console.log(err);
    });

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
  //for findAll()
  .then(products => {
    return products[0].destroy()
  })
  //for destry()
  .then(result => {
    console.log('Product deleted');
    res.redirect('/admin/products');
  })
  //to handle error for findAll() and destroy()
    .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
}

