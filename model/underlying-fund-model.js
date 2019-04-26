//get current db instance.
const tactMongoDB = require('../util/mongoDB').db;
const mongodb = require('mongodb');
const config = require('config');


class UnderlyingFund {
    constructor(abbr, num, created_by, parent_fund_id, t1,t2) {
        this.abbr = abbr;
        this.num = num;
        this.create_tmstmp = Date.now();
        this.created_by = created_by;
        this.fof_id = parent_fund_id
        this.target = [{bond : t1, equity: t2}]
    }
}
//------------

//GET
getAllUnderlyingFunds = (req, resp) => {
    const db = tactMongoDB();
    let pageNumber = req.query['pageNumber'] || 1 ;
    let pageSize = req.query['pageSize'] || 10;
    let sortBy = req.query['sortBy'] || 'num';

    db.collection('order-item').find({fof_id : req.params.fof_id})
//Pagination
    .skip(+pageNumber - 1)
    .limit(+pageSize)
    .sort({[sortBy] : 1}) //Sorting

    .toArray()
    .then((uf) => { 
        console.log('order-items : ' , uf);
        resp.status(200).json(uf); //json() will automatically add content-type as json.
    })
    .catch((err) => { throw err ;});
}


addUF = (uf) => {
    console.log(uf);
    const db = tactMongoDB();
    db.collection('order-item').insertOne(uf)
    .then(() => { })
    .catch((err) => { });
}

module.exports = {
    getAllUnderlyingFunds : getAllUnderlyingFunds,
    addUF : addUF,
    UnderlyingFund : UnderlyingFund
}