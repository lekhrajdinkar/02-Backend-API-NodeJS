const mongodb = require('mongodb');
const config = require('config');
const mongoClient = mongodb.MongoClient;

let _db ;

//After connecting to Mongo Start Node server
mongoConnection = (cb) => {

    mongoClient.connect(config.get('mongo.url'))
    .then((res) => {
        _db = res.db();
        cb(); 
        console.log('connected to mongo database : ', _db.s.databaseName);
    })
    .catch((err) => { console.log(err) ; throw err ;})
}

getDB = () => {
    //return _db ;
    if(_db) return _db ;
    else throw 'TACT | Mongo DB error: No DataBase found' ;
}
module.exports = {
    connect : mongoConnection,
    db : getDB
}