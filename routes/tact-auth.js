const express  = require('express');
const router = express.Router();

router.use('/status',(req,resp,next)=> {
    //resp.redirect('./status2')
    resp.send('<html><h1>status : TACT Server is running</h1></html>');
});


router.use('/status2',(req,resp,next)=> {
    resp.send({status : 'running'});
});

module.exports = router ;


