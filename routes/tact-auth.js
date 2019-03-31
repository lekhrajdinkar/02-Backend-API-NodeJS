const express  = require('express');
const router = express.Router();

router.use('/status',(req,resp,next)=> {
    console.log(req.body);
    resp.send('<html><h1>status : TACT Server is running</h1></html>');
});

module.exports = router ;


