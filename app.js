const express = require('express');
const http = require('http');


//local import
const tactRouteAuth = require('./routes/tact-auth');
const tactRouteFund = require('./routes/tact-fund');

//express
const app = express();

//add express middleware.

//mwe1 - for all url
app.use((req,resp,next)=> {console.log('mwe-fn-1 > ', req.body, req.url, req.method); next();});

//mwe2 - dummy
app.use(
'/mwe2',
(req,resp,next)=> {console.log('mwe-fn-2.1 > '); next();}, 
(req,resp,next)=> {console.log('mwe-fn-2.2 > '); next();}
);

//mwe3 - tact
app.use('/tact', tactRouteAuth, tactRouteFund);
//app.use('/tact', tactRouteFund);

//adding dyanmic port
const port = process.env.PORT  || 4000 ;
app.listen(port);
//const server = http.createServer(app);
//server.listen(4000);
