//get current db instance.
const tactMongoDB = require('./../util/mongoDB').db;


//Class - Fund
class Fund {
    constructor(abbr, num){
        this.abbr = abbr;
        this.num = num;
    }
}
//------------

//GET
 getAllFunds = () => {

}

//ADD FUND
addFund = (fund) => {
    console.log(fund);
    const db = tactMongoDB();
    db.collection('funds').insertOne(fund).then(()=> {}).catch((err) => {});
}

//----------------
module.exports = {
 getAll : getAllFunds,
 add : addFund,
 Fund : Fund
}