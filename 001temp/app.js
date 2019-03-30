const http = require('http');
const fs = require('fs');
const route = require('./routes')


//creating server
//more cleaner code because of route
const server = http.createServer( route )

console.log('--- First node prg ----');
server.listen(3000);

/*
{ host: 'localhost:3000',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  'user-agent':
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
  accept:
   'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*;q=0.8',
   'accept-encoding': 'gzip, deflate, br',
   'accept-language': 'en-US,en;q=0.9' } '/temp' undefined
*/