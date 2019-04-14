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
    
    tactMongoDB().collection('user').deleteOne(u)
    .then(() => { })
    .catch((err) => { });
}

//Need to work on it
login = (req, resp) => {
   
    tactMongoDB().collection('user').insertOne(u)
    .then(() => { })
    .catch((err) => { });
}

//Need to work on it
logout = (req, resp) => {
    
    tactMongoDB().collection('user').insertOne(u)
    .then(() => { })
    .catch((err) => { });
}


getAll = (req,resp,next)=> {
    tactMongoDB().collection('user').find({}).toArray()
    .then((users) => { 
        resp.status(200).json(users);
    })
    .catch((err) => {  
        error = new Error();
        error.message = "Error while finding users in databse";
        error.data = err;
        next(error);
    })
}

getById = (req,resp,next)=> {

    tactMongoDB().collection('user').find({ _id: new mongodb.ObjectID(req.params._id)}).toArray()
    .then((user) => { 
        resp.status(200).json(user);
    })
    .catch((err) => {  
        error = new Error();
        error.message = "Error while finding user in databse";
        error.data = err;
        next(error);
    })
}

//==========================
module.exports = {
    addUser : addUser,
    login : login,
    deleteUser : deleteUser,
    logout : logout,

    getAll: getAll,
    getById: getById
}

