const userModel = require('./../../model/user-model');
const {check, validationResult} = require('express-validator/check');

addUser = (req,resp,next)=> {

    //1. catch valiation error first
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        error = new Error();
        error.message = "Express Validator : FAILED, Entered data is incorrect";
        error.data = errors.array();
        next(error);
    }
    //2. if no error then proceed.
    userModel.addUser(req,resp);
}

login = (req,resp,next)=> {
    userModel.getAll(req,resp);
}

deleteUser = (req,resp,next)=> {
    userModel.getAll(req,resp);
}

logout = (req,resp,next)=> {
    userModel.getAll(req,resp);
}

module.exports = {
    addUser : addUser,
    login : login,
    deleteUser : deleteUser,
    logout : logout,
}