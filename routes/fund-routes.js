const express  = require('express');
const router = express.Router();
const Joi = require('joi');
const jwtMwe = require('./../util/mwe/jwt-mwe')

const fundController = require('./Controller/fund-controller');



//=================================================
//  This router is get/put funds with MongoDatabase - CRUD
//=================================================

//1 GET 
router.get("/get-all-funds/", fundController.getAll); 
router.get("/get-latest-fund/", fundController.getLatest); 
router.get("/get-fund/:user/", fundController.getByUser); 
router.post("/get-fund-by-Id/", fundController.getById); 

//2 POST 
router.post("/add-fund/"
, jwtMwe // restricting this path with JWT
, fundController.addFund ); // 2.1 add New fund in DB

//3PUT
router.put("/update-fund-byId/", fundController.updateById); 

//4Delete
router.delete("/delete-fund-byId/", fundController.deleteById); 


module.exports = router ;

//=================
/*

JOI result  :  { error: null,
  value: { num: '11000016', abbr: 'abbr16' },
  then: [Function: then],
  catch: [Function: catch] }

*/