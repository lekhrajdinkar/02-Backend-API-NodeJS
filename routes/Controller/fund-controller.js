const Joi = require('joi');
const fundModel = require('./../../model/fund-model')

getFund = (req,resp,next)=> {
    fundModel.getAll();
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
    fundModel.add(new fundModel.Fund (req.body.abbr, req.body.num) );

    //send response
    resp.send('success...');
}

module.exports = {
    addFund : addFund,
    getFund : getFund
}