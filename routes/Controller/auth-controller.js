const userModel = require('./../../model/user-model');
const {check, validationResult} = require('express-validator/check');

addUser = (req,resp,next)=> {
    //catch valiation error.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array());
        resp.status(422).json({
            message:"Validation failed, entered data is incorrect",
            errors: errors.array()
        }) ;
    }

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
    logout : logout
}