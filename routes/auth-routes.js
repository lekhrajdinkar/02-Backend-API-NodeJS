const express  = require('express');
const router = express.Router();
const Joi = require('joi');
const authController = require('./Controller/auth-controller');

//================ TEST ============
router.use('/status',(req,resp,next)=> {
    //resp.redirect('./status2')
    resp.send('<html><h1>status : TACT Server is running</h1></html>');
});

router.use('/status2',(req,resp,next)=> {
    resp.send({status : 'running'});
});

//================ TACT ===========


//1 GET 
router.post("/add-user", authController.addUser); 
//router.get("/get-latest-fund/", fundController.getLatest); 
//router.get("/get-fund/:user/", fundController.getByUser); 
//router.post("/get-fund-by-Id/", fundController.getById); 

//2 POST 
//router.post("/add-fund/",fundController.addFund ); // 2.1 add New fund in DB

//3PUT
//router.put("/update-fund-byId/", fundController.updateById); 

//4Delete
//router.delete("/delete-fund-byId/", fundController.deleteById); 


module.exports = router ;
