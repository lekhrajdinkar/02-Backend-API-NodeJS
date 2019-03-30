const http = require('http');
const fs = require('fs');

//creating server
const server = http.createServer( (req, res) => {

    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/welcome'){
        console.log("--- 1 ---");
        console.log(req.headers, req.url, req.method, req.body)
        fs.writeFileSync("./001temp/welcome.txt", );
        res.write('<html><body><h1>Welome to NodeJs welcome page </h1></body></html>');
        res.end();
    }

    if (req.url === '/'){
        console.log("--- 2 ---");
        console.log(req.headers, req.url, req.method, req.body)
        fs.writeFileSync("./001temp/root.txt", 'sssssssssss');
        res.write('<html><body><h1>Welome to NodeJs</h1></body></html>');
        res.end();
    }
})

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