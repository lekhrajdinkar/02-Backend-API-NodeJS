const express  = require('express');
const router = express.Router();
const Joi = require('joi');

const fundController = require('./Controller/fund-controller');



//=================================================
//  This router is get/put funds with MongoDatabase - CRUD
//=================================================
router.use(express.json());

//1 GET 
router.get("/get-all-funds/", fundController.getAll); //1.1 get all Funds frm DB
router.get("/get-latest-fund/", fundController.getLatest); //1.1 get all Funds frm DB

//2 POST 
router.post("/add-fund/",fundController.addFund ); // 2.1 add New fund in DB

//3PUT


//4Delete




module.exports = router ;

//=================
/*

JOI result  :  { error: null,
  value: { num: '11000016', abbr: 'abbr16' },
  then: [Function: then],
  catch: [Function: catch] }

*/