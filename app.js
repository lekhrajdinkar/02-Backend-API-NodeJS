const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const config = require('config');
const tactMongoDB = require('./util/mongoDB')

//local import
const tactRouteAuth = require('./routes/tact-auth');
const tactRouteFund = require('./routes/tact-fund');
const fundRoutes= require('./routes/fund-routes');
const swaggerDoc = require('./swagger-doc');

//express
const app = express();

//swagger-express-doc
swaggerDoc(app);

// config
console.log('Application name - ' , config.get('app-name'));
console.log( 'Developer name - ' , config.get('developer.name'), '| app email password reading from env var : ', config.get('email.password'));
//app.set('env', 'dev1');

app.set('view engine','pug'); app.set('view', './views'); // Configuring  template engine for express.

// Adding 3rd party mwe - morgan for development only.
const accesslogStream = fs.createWriteStream( path.join(__dirname,'access.log'), {flags: 'a'} );

if(app.get('env') !== 'production'){ //same as process.env.NODE_ENV
    app.use(morgan('combined',{stream :accesslogStream}));
    console.log('morgan enabled for ', app.get('env'));
}

//add express middleware.

//mwe1 - for all url
app.use((req,resp,next)=> {console.log('mwe-fn-1 > ', req.body, req.url, req.method); next();});

//mwe2 - CORS Cross Origin Resource Sharing
app.use((req,resp,next)=> {
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    resp.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//mwe3 - tact - app.use('/tact', tactRouteAuth, tactRouteFund);
app.use('/tact', tactRouteAuth, tactRouteFund);
// app.use('/tact', tactRouteAuth, tactRouteFund); app.use('/tact', tactRouteFund);

//TACT app with mongo
app.use('/tact2', fundRoutes);

app.use('/', (req,resp,next)=> {
    resp.send('<html><h1>status : TACT Server is running </h1></html>');
});

//If connected to DB then only start listen to backend server
tactMongoDB.connect( () => {
//adding dyanmic port
const port = process.env.PORT  || 5000 ;
app.listen(port);
console.log('TACT server running  on port - ', port);
//const server = http.createServer(app);
//server.listen(4000);
})


