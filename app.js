const express = require('express');
const http = require('http');
const bp = require('body-parser');
const tactRouteAuth = require('./routes/tact-auth');

//express
const app = express();

//add express middleware.

app.use(bp.urlencoded()); //bp will parse body and create json object.

//mwe1 - for all url
app.use((req,resp,next)=> {console.log('mwe function 1', req.body, req.url); next();});

//mwe2 - dummy
app.use(
'/mwe2',
(req,resp,next)=> {console.log('mwe function 2.1'); next();}, 
(req,resp,next)=> {console.log('mwe function 2.2'); next();}
);

//mwe3 - tact
app.use('/tact', tactRouteAuth);


app.listen(4000);
//const server = http.createServer(app);
//server.listen(4000);
