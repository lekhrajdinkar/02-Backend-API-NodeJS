const express  = require('express');
const router = express.Router();
const Joi = require('joi');
const {check} = require('express-validator/check');
const authController = require('./Controller/auth-controller');
const tactMongoDB = require('./../util/mongoDB').db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtMwe = require('./../util/mwe/jwt-mwe')

//================ TEST ============ START
router.use('/welcome',(req,resp,next)=> {
    if(req.session.currentUser)
        resp.send('<html><h1>welcome to TACT</h1></html>');
    else{
        error = new Error();
            error.message = "Please login first";
            error.data = { initial: req.body.initial, login_status : "FAILED"}
            next(error);
    }
});

router.use('/status2',(req,resp,next)=> {
    resp.send({status : 'running'});
});


//====== LOGIN /LOGUT/ SIGNUP=========
router.get('/logout',(req,resp,next)=> {
    req.session.destroy();
    resp.status(200).json({ initial: req.body.initial, logout_status : "SUCCESSFUL" })
});

router.post('/login',(req,resp,next)=> {
    let user_temp;
    const user_req = req.body.initial || 'AAXL';
    const pswd_req = req.body.password || '123456';

    tactMongoDB().collection('login').find({ initial: user_req}).toArray()
    .then((user) => {
        user_temp = user[0];
        if(user[0]) 
            return bcrypt.compare(pswd_req, user[0].password) //compare
    })
    .then((match) => {
        if(match){
            req.session.currentUser = { initial: user_req};

            //=== JWT ===
            //1. Generate JWT
            const jwtToken = jwt.sign({
                initial: user_req,
                _id : user_temp._id,
                dt: Date.now()
            }, 
            config.get('jwt.secret'),
            {expiresIn:'1h'}
            );
            //req.session.jwt  = jwtToken;

            //2. send JWT to client inresponse.
            resp.status(200).json({jwt: jwtToken, initial: user_req, login_status : "SUCCESSFUL"});

            //3. NEW MWE to validate JWT token before processing request. check app.js.

        }else{
            error = new Error();
            error.status = 401;
            error.message = "incorrect login credential";
            error.data = { initial: user_req, login_status : "FAILED"}
            next(error);
        }
    })
    .catch((err) => { 
        console.log(err);
        resp.json({ initial: user_req, login_status : "FAILED" }); 
    });
});

//===== SIGNUP ==========
router.post('/signup',(req,resp,next)=> {
    tactMongoDB().collection('login').find({ initial: req.body.initial}).toArray()
    .then((user) => {
       if(user[0]){
           console.log('user already exist : ', user[0]);
           return Promise.reject("User already exist")
       }
       else
            return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedpswd) => {
        tactMongoDB().collection('login').insertOne({ initial: req.body.initial, password : hashedpswd})
    })
    .then(() => { 
        console.log('signup successfully... : ', req.body.initial); 
        resp.status(201).json({ initial: req.body.initial, signup_status : "SUCCESS" });
    })
    .catch((err) => { 
        error = new Error();
        error.message = err;
        error.data = { initial: req.body.initial, signup_status : "FAILED"}
        next(error);
    });

});
//================ TEST ============ END


//================ TACT APP===========


//1 GET with express body validator --> it will set valiation error in req.error property
router.post(
    "/add-user",
    jwtMwe, //adding middleware
[
    check('name').trim().isLength({min : 3}).isAlphanumeric().withMessage("minimun lenght is 3 and should not be alphanumeric"),
    check('initial').trim().isLength({min : 3}).custom((value, {req}) => {
    if(value === 'INY')
        throw new Error("initial cant be INY"); //EV will handle it.
    else 
        return true;
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
