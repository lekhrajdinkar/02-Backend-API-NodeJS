//get current db instance.
const tactMongoDB = require('./../util/mongoDB').db;


//Class - Fund
class Fund {
    constructor(abbr, num) {
        this.abbr = abbr;
        this.num = num;
    }
}
//------------

//GET
getAllFunds = (resp) => {
    const db = tactMongoDB();
    db.collection('funds').find().toArray()
    .then((funds) => { 
        console.log('ALL FUNDS - CRUD - READ : ' ,funds) ; 
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

//----------------
module.exports = {
    getAll: getAllFunds,
    add: addFund,
    Fund: Fund
}