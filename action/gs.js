var dba = require('mysql');
exports.gist = function (req,res) { console.log(req.body.ris === "zhuce");
    var dd=dba.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'adb'
    });

if(req.body.ris === "zhuce"){
    var insert='insert into userchaxun values(?,?,?)';
    dd.query(insert,[null,req.body.user,req.body.passd],function(er,results){
        if(er){
            console.log(er);
        }
        res.write(req.body.user);
        res.end();
    });
}else{

    console.log(req.body.user);
    var select='select * from userchaxun where user = "'+req.body.user+'"';
    dd.query(select,function(er,results){
        if(er){
            console.log(er);
        }
        console.log(results[0]);



        if(results[0] !== undefined){
            res.write("此用户已被注册，请注册其他用户名！！！");
            res.end();
        }else{
            res.write("未被注册");
            res.end();
        }

    });

}

    dd.end();
};