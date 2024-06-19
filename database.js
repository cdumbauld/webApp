const { createPool } = require('mysql2');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Chance17121157!",
    database:"soccerdrills",
    port:3306,
    connectionLimit:10
});

pool.query(`select * from code`,(err,result,fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});