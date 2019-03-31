const express = require('express');
const http = require('http');


//local import
const tactRouteAuth = require('./routes/tact-auth');
const tactRouteFund = require('./routes/tact-fund');

//express
const app = express();

//add express middleware.

//mwe1 - for all url
app.use((req,resp,next)=> {console.log('mwe function 1', req.body, req.url); next();});

//mwe2 - dummy
app.use(
'/mwe2',
(req,resp,next)=> {console.log('mwe function 2.1'); next();}, 
(req,resp,next)=> {console.log('mwe function 2.2'); next();}
);

//mwe3 - tact
app.use('/tact', tactRouteAuth, tactRouteFund);

//adding dyanmic port
const port = process.env.PORT  || 4000 ;
app.listen(port);
//const server = http.createServer(app);
//server.listen(4000);
