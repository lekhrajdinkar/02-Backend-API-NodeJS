const express  = require('express');
const path = require('path');
const router = express.Router();
const bp = require('body-parser');
const fundModel = require('./../model/fund-model')


//=================================================
//  This router is get/put funds with MongoDatabase - CRUD
//=================================================
router.use(express.json());

//1 GET
//1.1 get all Funds
router.get("/get-funds", (req,resp,next)=> {
    fundModel.getAll();
});

//2POST
//2.1 get all Funds
router.post("/add-fund/", (req,resp,next)=> {
    console.log('adding fund ',req.body.abbr, req.body.num );
    fundModel.add(new fundModel.Fund (req.body.abbr, req.body.num) );
    resp.send('success...');
});

//3PUT


//4Delete

module.exports = router ;