const path = require('path');
const fs = require('fs');

module.exports = class FundData
{
    constructor(abbr, num){
        this.abbr = abbr;
        this.num = num;
    }

     static fetchAll(){
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'fund-data.json');

         let ret = fs.readFile(p, (err, content) => {
            if(err) console.log(err);
            else {
                let temp = JSON.parse(content);
                console.log('json file after parse', temp);
                //cb(temp);
            }

        })
    }

    save(f){
        //1.get json file
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'fund-data.json');
        console.log(p);

        //2. read json data
        fs.readFile(p, function(err, content){
            let temp = [];
            console.log('content : ',content);
            if(!err) {
                //3. convert json into js array
                temp = JSON.parse(content); //json to array/js object
                //console.log('JSON.parse(content) : ',temp, f);
             }
             //4. push ciurrent item in array
             temp.push(f);
             //console.log('after push: ',temp);

             //store  array into json file
             fs.writeFile(p,JSON.stringify(temp), (err)=> console.log(err));
        })
    }
}


