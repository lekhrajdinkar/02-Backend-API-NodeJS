const express  = require('express');
const router = express.Router();
const Joi = require('joi');
const {check} = require('express-validator/check');
const authController = require('./Controller/auth-controller');

//================ TEST ============
router.use('/welcome',(req,resp,next)=> {
    if(req.session.currentUser)
        resp.send('<html><h1>welcome to TACT</h1></html>');
    else
        resp.send('<html><h1>login first</h1></html>');
});

router.use('/status2',(req,resp,next)=> {
    resp.send({status : 'running'});
});

router.post('/login',(req,resp,next)=> {
    //req.session.isloggedIN=true;
    
    //authenticate and on success store current user in session
    req.session.currentUser = { initial: req.body.initial, name : req.body.name};

    resp.redirect('./welcome')
});

//================ TACT ===========


//1 GET with express body validator --> it will set valiation error in req.error property
router.post("/add-user",
[check('name').trim().isLength({min : 5}).isAlphanumeric().withMessage("minimun enght is 5 and should be alphanumeric"),
check('initial').trim().isLength({min : 3}).custom((value, {req}) => {
    if(value === 'INYINY')  throw new Error("initial cant be INYINY"); else return true;ß
})],
authController.addUser); 

//router.get("/get-latest-fund/", fundController.getLatest); 
//router.get("/get-fund/:user/", fundController.getByUser); 
//router.post("/get-fund-by-Id/", fundController.getById); 

//2 POST 
//router.post("/add-fund/",fundController.addFund ); // 2.1 add New fund in DB

//3PUT
//router.put("/update-fund-byId/", fundController.updateById); 

//4Delete
//router.delete("/delete-fund-byId/", fundController.deleteById); 


//[check('name').trim().isLength({min : 5}).isAlphanumeric(),check('initial').trim().isLength({min : 3}),]

module.exports = router ;
