const http = require('http');
const fs = require('fs');

const express=require('express');
const app=express();

//using body parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));



app.use('/add-product' , (req, res, next) => {
    res.send('<form action="/product" method="POST">Name:<input type="text" name="title"><br>size:<input type="number" name="size"><br><button type="submit">Add product</button></form>')
    
});

app.post('/product' ,  (req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/' , (req,res,next) => {
    res.send('<h1>hello from node JS</h1>')
})

app.listen(3000);