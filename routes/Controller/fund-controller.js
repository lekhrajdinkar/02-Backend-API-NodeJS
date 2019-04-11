const Joi = require('joi');
const config = require('config');
//const sgt = require('nodemailer-sendgrid-transport');
//const nm = require('nodemailer');
const fundModel = require('./../../model/fund-model');
const ufModel = require('./../../model/underlying-fund-model')


//---Email- nodemailer
// const transporter = nm.createTransport(sendgridTransport({
//     auth:{
//         api_key:config.get('sendgrid-api-key')
//     }
// }));



getAll = (req,resp,next)=> {
    fundModel.getAll(req,resp);
}

getLatest = (req,resp,next)=> {
    fundModel.getLatest(resp);
}

getByUser = (req,resp,next)=> {
    fundModel.getByUser(req,resp);
}

getById  = (req,resp,next)=> {
    fundModel.getById(req,resp);
}

addFund = (req,resp,next)=> {
    
    console.log('adding fund ',req.body.abbr, req.body.num );

    // JOI-validate http request body
    const result = Joi.validate(req.body, schema);
    //console.log('JOI result  : ', result);
    if(result.error) {
        let err = new Error();
        err.status = 422 ;
        err.message = "fund data is incorrect"
        err.data = result.error.details;
        return next(err);
    }

    //Store  in Mongo
    fundModel.add(new fundModel.Fund (req.body.abbr, req.body.num, req.body.created_by) );

    //send response
    resp.status(200).json({status:'Created'});
}

deleteById = (req,resp,next)=> {
    fundModel.deleteById(req,resp);
}

updateById = (req,resp,next)=> {
    fundModel.updateById(req,resp);
}

//UF
getAllUnderlyingFunds = (req,resp,next)=> {
    ufModel.getAllUnderlyingFunds(req,resp);
}

addUF = (req,resp,next)=> {
    let uf = new ufModel.UnderlyingFund(req.body.abbr, req.body.num, req.body.created_by, req.body.fof_id, req.body.t1,req.body.t2);
    ufModel.addUF(uf);
    //send response
    resp.status(200).json({status:'UF Created'});
}

//----------- JOI Validator ----------

const schema = { 
    abbr: Joi.string().min(5).required(),
    num : Joi.string().min(8).max(8).required(),
    created_by : Joi.string().min(3)
}

module.exports = {
    addFund : addFund
    ,getAll : getAll
    ,getLatest : getLatest
    ,getByUser : getByUser
    ,getById :getById
    ,deleteById : deleteById
    ,updateById : updateById


    //UF
    ,getAllUnderlyingFunds : getAllUnderlyingFunds
    ,addUF: addUF
}