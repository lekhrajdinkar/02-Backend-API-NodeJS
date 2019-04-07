const express = require('express');
const fs = require('fs');
const path = require('path');

const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

const morgan = require('morgan');
const config = require('config');
const tactMongoDB = require('./util/mongoDB')

//const logger = require('./util/winston-logger');
const winston = require('winston');
require('winston-mongodb');


//local import
const authRoutes = require('./routes/auth-routes');
const tactRouteFund = require('./routes/tact-fund');
const fundRoutes= require('./routes/fund-routes');
const swaggerDoc = require('./swagger-doc');

//Express
const app = express();
//For REST not needed - template Engine for express + Expression session
//app.set('view engine','pug'); app.set('view', './views'); // Configuring  template engine for express.

winston.add(new winston.transports.File({filename : config.get('log.app')}));
winston.add(new winston.transports.MongoDB({db : config.get('mongo-tact.express-store-uri')}));

//MWE - express session with mongoDB store
const mongoSessionstore = new mongoDBStore({ 
    uri : config.get('mongo-tact.express-store-uri'), 
    collection:"tact-sessions"
})

options =  {
        secret : "my secret",
        resave: false,
        saveUninitialized: false,
        store: mongoSessionstore
}

app.use(session(options));

//swagger-express-doc - Not working
swaggerDoc(app);

//body parser
app.use(express.json());
app.use(express.urlencoded());

//MWE - to print url, req body,etc
app.use((req,resp,next)=> {console.log('log REQ body MWE :  > ', req.body, req.url, req.method); next();});

// config pkg - testing
console.log('Application name - ' , config.get('app-name'));
//console.log( 'Developer name - ' , config.get('developer.name'), '| app email password reading from env var : ', config.get('email.password'));
//app.set('env', 'dev1');

//MWE - morgan for development only.
const accesslogStream = fs.createWriteStream( path.join(__dirname,'access.log'), {flags: 'a'} );
if(app.get('env') == 'dev1'){ //same as process.env.NODE_ENV
    app.use(morgan('combined',{stream :accesslogStream}));
    console.log('morgan enabled for ', app.get('env'));
}

//MWE - Fixing - CORS Cross Origin Resource Sharing error.
app.use((req,resp,next)=> {
    console.log('Setting CORS header...');
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    resp.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//MWE - TEST TACT
app.use('/tact',tactRouteFund);
// app.use('/tact', tactRouteAuth, tactRouteFund); 
//app.use('/tact', tactRouteFund);

//MWE - REAL TACT app with mongo - all routes
app.use('/tact2', authRoutes);
app.use('/tact2', fundRoutes);

//MWE - Central Error Handling - Special MWE by express.
app.use((error, req, resp, next)=> {
    console.log('GLOBAL ERROR Handling...',error);
   
    const status = error.status || 500 ;
    const message = error.message;
    const data = error.data

    winston.log(config.get('log.level'),message, error); //log error

    resp.status(status).json({message: message, data: data});
});

//======= INIT : NODE SERVER + MONGODB =============START


//If connected to DB then only start listen to backend server
tactMongoDB.connect( () => {
//adding dyanmic port
const port = process.env.PORT  || 5000 ;
app.listen(port);
console.log('TACT server running  on port - ', port);
//const server = http.createServer(app);
//server.listen(4000);
})

//======= INIT : NODE SERVER + MONGODB =============END



