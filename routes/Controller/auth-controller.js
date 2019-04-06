const userModel = require('./../../model/user-model');

addUser = (req,resp,next)=> {
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