const path = require('path');
const sequelize=require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const Product=require('./models/product');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user=> {
        req.user=user;
        next();
    })
    .catch(err => console.log(err));
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//user created product
Product.belongsTo(User, {constraints:true, onDelete: 'CASCADE'});
//one user can add more than one product
User.hasMany(Product);

//force: true will not be using while production as it will overwrite all data
sequelize.sync()
.then(result => { 
    //may need to change this code
    // User.findAll({where : {id:1}})
    // .then(user=> {
    //     console.log(user[0]);
    //     console.log('user found here');
    //     return user[0];
    // })
    return User.findByPk(1);
})
.then(user => {
    console.log('this is user here' + user);
    if(!user){
        console.log(user);
        return User.create({name: 'testname', email: 'test@test.com'});
    }
    return user;
})

.then(user => {
    console.log(user);
    app.listen(3000);
})
.catch(err=>console.log(err));


