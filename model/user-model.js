const tactMongoDB = require('./../util/mongoDB').db;
const mongodb = require('mongodb');
const config = require('config');
const {check, body} = require('express-validator');
//const {body} = require('express-validator');

//=====================
class User {
    constructor(name,initial,role,loc){
        this.name = name;
        this.initial = initial;
        this.role = role;
        this.loc = loc;
        this.create_dt = Date.now();
    }
}

//===================
addUser = (req, resp) => {
    let u  = new User(req.body.name, req.body.initial, req.body.role, req.body.loc);

    tactMongoDB().collection('user').insertOne(u)
    .then((result) => { 
        //console.log('user added : ', user.name, user._id); 
        resp.status(200).json({status: "CREATED", data : u });
    })
    .catch((err) => {  
        error = new Error();
        error.message = "Error while insertinf user in databse";
        error.data = err;
        next(error);
    });
}

deleteUser = (req, resp) => {
    console.log(u);
    tactMongoDB().collection('user').insertOne(u)
    .then(() => { })
    .catch((err) => { });
}

login = (req, resp) => {
    console.log(u);
    tactMongoDB().collection('user').insertOne(u)
    .then(() => { })
    .catch((err) => { });
}

logout = (req, resp) => {
    console.log(u);
    tactMongoDB().collection('user').insertOne(u)
    .then(() => { })
    .catch((err) => { });
}

//==========================
module.exports = {
    addUser : addUser,
    login : login,
    deleteUser : deleteUser,
    logout : logout
}

