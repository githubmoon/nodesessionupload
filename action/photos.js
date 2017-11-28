
var dba = require('mysql');

exports.photo = function (req,res) {
    var dd=dba.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'adb'
    });

    var select='select * from photos';
    dd.query(select,function(er,results){
        if(er){
            console.log(er);
        }
        var cc =JSON.stringify(results);
        console.log(cc);
        res.write(cc);
        res.end();
    });
    dd.end();
};