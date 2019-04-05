const express  = require('express');
const path = require('path');
const router = express.Router();
const bp = require('body-parser');
const Joi = require('joi');

const fundModel = require('./../model/fund-model')


//=================================================
//  This router is get/put funds with MongoDatabase - CRUD
//=================================================
router.use(express.json());

//1 GET
//1.1 get all Funds frm DB
router.get("/get-funds", (req,resp,next)=> {
    fundModel.getAll();
});

//2POST
//2.1 add New fund in DB
router.post("/add-fund/", (req,resp,next)=> {
    
    console.log('adding fund ',req.body.abbr, req.body.num );

    // JOI-validate http request body
    const result = Joi.validate(req.body, schema);
    console.log('JOI result  : ', result);
    if(result.error) {
        resp.status(400).send(result.error.details[0].message); return;
    }

    //Store  in Mongo
    fundModel.add(new fundModel.Fund (req.body.abbr, req.body.num) );

    //send response
    resp.send('success...');
});

//3PUT


//4Delete


//----------- JOI Validator ----------

const schema = { 
    abbr: Joi.string().min(5).required(),
    num : Joi.string().min(8).max(8).required()
}

module.exports = router ;

//=================
/*

JOI result  :  { error: null,
  value: { num: '11000016', abbr: 'abbr16' },
  then: [Function: then],
  catch: [Function: catch] }

*/