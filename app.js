const http = require('http');
const fs = require('fs');

const express=require('express');

const app=express();

app.use((req, res, next) => {
    console.log('in the middleware...');
   
    next();
});

app.use((req, res, next) => {
   
    console.log('In another middleware....');
    res.send('<h1>hello to node JS</h1>');
});

app.listen(3000);