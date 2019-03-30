const express = require('express');
const http = require('http');

//express
const app = express();

//add express middleware.
//mwe1
app.use((req,resp,next)=> {console.log('mwe function1'); next();});
//mwe2
app.use((req,resp,next)=> {console.log('mwe function2'); next();});
//mwe3
app.use((req,resp,next)=> {console.log('mwe function3')});



const server = http.createServer(app);
server.listen(4000);
