const express  = require('express');
const router = express.Router();
const Joi = require('joi');

const fundController = require('./Controller/fund-controller');



//=================================================
//  This router is get/put funds with MongoDatabase - CRUD
//=================================================
router.use(express.json());

//1 GET 
router.get("/get-funds", fundController.getFund); //1.1 get all Funds frm DB

//2 POST 
router.post("/add-fund/",fundController.addFund ); // 2.1 add New fund in DB

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