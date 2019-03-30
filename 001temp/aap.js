const http = require('http');

//creating server
const server = http.createServer( (req, resp) => {
    console.log(req);
})

server.listen();