// MWE for try-catch template if using async--await syntax
// it wll avoid writing try-catch everytime.

module.exports = (handler) => {
    //retun asyn function, as mwe accepts asyn fn with 3 arg
    return async (req, resp, next) => {

        //try catch template
        try{
            await handler(req, resp, next)
        }
        catch(error){
                //error.message = err;
                error.data = { initial: req.body.initial, signup_status : "FAILED"}
                next(error);
        }
    }
}