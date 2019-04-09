const jwt = require('jsonwebtoken');
const config = require('config');

//high level function of this module
module.exports = (req,resp,next) => {
    let token ;
    let decodedToken;

    //1. get auth header;
    const authHeader = req.get('Authorization')
    if(!authHeader){
        error = new Error();
        error.status = 401;
        error.message = 'Authentication failed : JWT verification failed';
        error.data = { cause: 'Authorization header not been set'};
        next(error);
    }

    //2. get jwt token from auth header and verify token
    try{
        token  = authHeader.split(' ')[1];
        decodedToken = jwt.verify(token, config.get('jwt.secret'))
        console.log('decodedToken : ', decodedToken)
    }
    catch(err){
        err.status = 500;
        err.data = err.message;
        err.message = "error while validating JWT token";      
        throw err;
    }

    //3 verificatin failed
    if(!decodedToken){
            error = new Error('Authentication Failed');
            error.status = 500;
            error.message = "JWT verification failed";
            //error.data = { initial: user_req, login_status : "FAILED"}
            next(error);
    }else{
        console.log('JWT authenticaton passed. user dont need to login again for each REST.');
        next();
    }
}