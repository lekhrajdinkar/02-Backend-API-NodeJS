const tactMongoDB = require('./../util/mongoDB').db;
const mongodb = require('mongodb');
const config = require('config');
const {check, body} = require('express-validator');
//const {body} = require('express-validator');

//=====================
class User {
    constructor(name,initial,role,loc,last_login_dt){
        this.name = name;
        this.initial = initial;
        this.role = role;
        this.loc = loc;
        this.last_login_dt = Date.now();
    }
}

//===================
addUser = (req, resp) => {
    let u  = new User(req.body.name, req.body.initial, req.body.role, req.body.loc, req.body.last_login_dt );

    //1. express validation
    tactMongoDB().collection('user').insertOne(u)
    .then(() => { 
        console.log('user added : ', u.name); 
        //resp.send(JSON.stringify(u));
        resp.json(u);
    })
    .catch((err) => { throw new Error(err) });
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

//Expresse validatot
validate = (req,next) => {
req
}
//==========================
module.exports = {
    addUser : addUser,
    login : login,
    deleteUser : deleteUser,
    logout : logout
}

