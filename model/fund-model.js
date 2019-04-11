//get current db instance.
const tactMongoDB = require('./../util/mongoDB').db;
const mongodb = require('mongodb');
const config = require('config');

//EMAIL
const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(config.get('email.sendgrid-api-key'));
console.log(config.get('email.sendgrid-api-key'));
const msg = {
    to: 'lekhrajdinkar@gmail.com',
    from: 'lekhrajdinkarus@gmail.com',
    subject: 'TACT - Fund SetUp',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  //sgMail.send(msg);

//Class - Fund
class Fund {
    constructor(abbr, num, created_by) {
        this.abbr = abbr;
        this.num = num;
        this.create_tmstmp = Date.now();
        this.created_by = created_by;
    }
}
//------------

//GET
getAllFunds = (req, resp) => {
    const db = tactMongoDB();
    let pageNumber = req.query['pageNumber'] || 1 ;
    let pageSize = req.query['pageSize'] || 5;
    let sortBy = req.params['sortBy'] || 'num';

    db.collection('funds').find({})
//Pagination
    .skip(+pageNumber - 1)
    .limit(+pageSize)
    .sort({[sortBy] : 1}) //Sorting

    .toArray()
    .then((funds) => { 
    //QueryParam and pathParam   
    //console.log('qp : ' , req.params, req.query)
        resp.status(200).json(funds); //json() will automatically add content-type as json.
    })
    .catch((err) => { throw err ;});
}

getRecentFund = (resp) => {
    const db = tactMongoDB();
    db.collection('funds').find({}).next() // last element in cursor.
    .then((funds) => { 
       resp.send(funds);
    })
    .catch((err) => { });
}

getByUser = (req,resp) => {
    const db = tactMongoDB();
    //onsole.log('req.params.user', req.params.user);
    const filter = {created_by : req.params.user} ;
    db.collection('funds').find(filter).toArray()
    .then((funds) => { 
       resp.send(funds);
    })
    .catch((err) => { });
}

getById = (req,resp) => {
    const db = tactMongoDB();
    const filter = { _id : new mongodb.ObjectID(req.body._id)} ;
    db.collection('funds').find(filter).toArray()
    .then((funds) => { 
       resp.send(funds);
    })
    .catch((err) => { });
}

//ADD FUND
addFund = (fund) => {
    console.log(fund);
    const db = tactMongoDB();
    db.collection('funds').insertOne(fund)
    .then(() => { })
    .catch((err) => { });
}


//DELETE
deleteById = (req,resp) => {
    const db = tactMongoDB();
    const filter = { _id : new mongodb.ObjectID(req.body._id)} ;
    db.collection('funds').deleteOne(filter)
    .then((result) => { 
       console.log('Deleted ...', req.body._id); resp.send(result);
    })
    .catch((err) => { });
}

//PUT
updateById = (req,resp) => {
    const db = tactMongoDB();
    const filter = { _id : new mongodb.ObjectID(req.body._id)} ;
    db.collection('funds').updateOne(filter, {$set: {"abbr" : req.body.abbr, "num" : req.body.num } })
    .then((result) => { 
       console.log('updated ...', req.body._id); resp.send(result);
    })
    .catch((err) => { });
}

//----------------
module.exports = {
    getAll: getAllFunds, 
    getLatest: getRecentFund,
    getByUser : getByUser,
    add: addFund,
    Fund: Fund,
    getById : getById,
    deleteById : deleteById,
    updateById : updateById
}