
var dba = require('mysql');
exports.photo = function (url) {
    var dd=dba.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'adb'
    });

    var insert='insert into photos values(?,?)';
    dd.query(insert,[null,url],function(er,results){
        if(er){
            console.log(er);
        }
        console.log('cc');
    });
    dd.end();
};