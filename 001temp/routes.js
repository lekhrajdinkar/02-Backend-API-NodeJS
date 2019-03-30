const fs = require('fs');

module.exports = (req, res) => {

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
}