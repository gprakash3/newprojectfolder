const http = require('http');


const express=require('express');
const app=express();
//using body parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));

//importing router from files. It is also valid middleware
const loginrouter=require('./route/login')
const chatrouter=require('./route/chat');

//making /admin routes as a separate filter
app.use(loginrouter);
app.use(chatrouter);

//returning 404 page if no middleware handle request
app.use('/' , (req,res,next) => {
    res.status(404).send('<h1>page not found</h1>');
});

app.listen(3000);