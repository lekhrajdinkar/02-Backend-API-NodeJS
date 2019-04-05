const express = require('express');
const http = require('http');
const morgan = require('morgan');
const config = require('config');
const tactMongoDB = require('./util/mongoDB')

//local import
const tactRouteAuth = require('./routes/tact-auth');
const tactRouteFund = require('./routes/tact-fund');
const tactRouteFund2 = require('./routes/tact-fund-2');

//express
const app = express();

// config
console.log('Application name - ' , config.get('app-name'));
console.log( 'Developer name - ' , config.get('developer.name'), '| app email password reading from env var : ', config.get('email.password'));
//app.set('env', 'dev1');

app.set('view engine','pug'); app.set('view', './views'); // Configuring  template engine for express.

// Adding 3rd party mwe - morgan for development only.
if(app.get('env') !== 'development'){ //same as process.env.NODE_ENV
    app.use(morgan('tiny'));
    console.log('morgan enabled for ', app.get('env'));
}

//add express middleware.

//mwe1 - for all url
app.use((req,resp,next)=> {console.log('mwe-fn-1 > ', req.body, req.url, req.method); next();});

//mwe2 - dummy
app.use(
'/mwe2',
(req,resp,next)=> {console.log('mwe-fn-2.1 > '); next();}, 
(req,resp,next)=> {console.log('mwe-fn-2.2 > '); next();}
);

//mwe3 - tact - app.use('/tact', tactRouteAuth, tactRouteFund);
app.use('/tact', tactRouteAuth, tactRouteFund);
// app.use('/tact', tactRouteAuth, tactRouteFund); app.use('/tact', tactRouteFund);

//TACT app with mongo
app.use('/tact2', tactRouteFund2);


//If connected to DB then only start listen to backend server
tactMongoDB.connect( () => {
//adding dyanmic port
const port = process.env.PORT  || 5000 ;
app.listen(port);
console.log('TACT server running  on port - ', port);
//const server = http.createServer(app);
//server.listen(4000);
})


