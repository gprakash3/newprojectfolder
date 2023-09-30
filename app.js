const http = require('http');
const path=require('path');

const express=require('express');
const app=express();

//using body parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));

const rootDir = require('./util/path');

app.use(express.static(path.join(rootDir, 'public')));

//importing router from files. It is also valid middleware
const adminrouter=require('./route/admin')
const shoprouter=require('./route/shop');
const contactrouter=require('./route/contact');

//making /admin routes as a separate filter
app.use('/admin',adminrouter);
app.use(shoprouter);
app.use(contactrouter);

//returning 404 page if no middleware handle request
app.use('/' , (req,res,next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));;
});

app.listen(3000);