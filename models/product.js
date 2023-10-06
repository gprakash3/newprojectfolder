db=require('../util/database');

const Cart = require('./cart');


module.exports = class Product {
  //creating new product
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
     return db.execute('Insert Into products (title, price,imageUrl,description) Values (? , ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
  }


  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  //finding product having specific ID in product file
  static findById(id) {
    return db.execute('select * from products where products.id=?',[id]);
  }

  //Deleting product by id from product file as well as from cart
  static deleteProductById(id) {
    return db.execute('delete from products where products.id=?',[id]);
  }

};
