const express  = require('express');
const router = express.Router();
const bp = require('body-parser');
const fundJsonData = require('../data/fund-data')


//-------------
//in-memory storage.
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
    console.log('/tact/funds get',req.body);
    //resp.redirect('./status2')
    //resp.send(JSON.stringify(funds)); 
    resp.send(funds); //same as above.
    // [{"fund_number":"11000014","fund_abbr":"abbr14"},{"fund_number":"11000020","fund_abbr":"abbr20"}]
});

router.post('/add-fund-1',(req,resp,next)=> {
    console.log('/tact/funds post',req.body);
    funds.push({fund_number : req.body.num, fund_abbr : req.body.abbr});
    resp.send(funds);
});

//below route would take input from form body which come as url-encoded string.
router.use(bp.urlencoded());
router.post('/add-fund-2',(req,resp,next)=> {
    console.log('/tact/funds post',req.body);
    funds.push({fund_number : req.body.num, fund_abbr : req.body.abbr});
    resp.send(funds);
});

router.get('/funds/:abbr/:num',(req,resp,next)=> {
    console.log('/funds/a/b get',req.body);
    funds.push({fund_number : req.params.num, fund_abbr : req.params.abbr});
    resp.send(funds);
});

//store in JSON file not in Mongo
router.get('/add-fund-data/:abbr/:num',(req,resp,next)=> {
    
    let f = new fundJsonData(req.params.abbr, req.params.num );
    console.log('writing to json file', f.abbr, f.num);
    f.save(f);
    resp.end();
});


module.exports = router ;