const Joi = require('joi');
const fundModel = require('./../../model/fund-model')

getAll = (req,resp,next)=> {
    fundModel.getAll(resp);
}
getLatest = (req,resp,next)=> {
    fundModel.getLatest(resp);
}
getByUser = (req,resp,next)=> {
    fundModel.getByUser(req,resp);
}

addFund = (req,resp,next)=> {
    
    console.log('adding fund ',req.body.abbr, req.body.num );

    // JOI-validate http request body
    const result = Joi.validate(req.body, schema);
    console.log('JOI result  : ', result);
    if(result.error) {
        resp.status(400).send(result.error.details[0].message); return;
    }

    //Store  in Mongo
    fundModel.add(new fundModel.Fund (req.body.abbr, req.body.num, req.body.created_by) );

    //send response
    resp.send('success...');
}


//----------- JOI Validator ----------

const schema = { 
    abbr: Joi.string().min(5).required(),
    num : Joi.string().min(8).max(8).required()
}

module.exports = {
    addFund : addFund
    ,getAll : getAll
    ,getLatest : getLatest
    ,getByUser : getByUser
}