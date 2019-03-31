const express  = require('express');
const router = express.Router();

//-------------
const funds = [
{fund_number : '11000014', fund_abbr : 'abbr14'}, 
{fund_number : '11000020', fund_abbr : 'abbr20'}
] ;

//const funds1= 'abc'
//const funds2 = 20 ;
//const funds3 = {p1 : 1 , p2: 2};

//-------------
router.use(express.json());

router.get('/fund-status',(req,resp,next)=> {
    //resp.redirect('./status2')
    //resp.send('<html><h1>status : Fund Services is running</h1></html>');
    resp.send({status : 'running'});
});

router.get('/funds',(req,resp,next)=> {
    //resp.redirect('./status2')
    //resp.send(JSON.stringify(funds)); 
    resp.send(funds); //same as above.
    // [{"fund_number":"11000014","fund_abbr":"abbr14"},{"fund_number":"11000020","fund_abbr":"abbr20"}]
});

router.get('/fund/:abbr/:num',(req,resp,next)=> {
    funds.push({fund_number : req.params.num, fund_abbr : req.params.abbr});
    resp.send(funds);
});

router.post('/fund',(req,resp,next)=> {
    funds.push({fund_number : req.body.num, fund_abbr : req.body.abbr});
    resp.send(funds);
});

module.exports = router ;