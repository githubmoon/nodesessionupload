
var dba = require('mysql'),cc;

exports.user = function (req,res) {
    var dd=dba.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'adb'
    });
    var select='select passd from userchaxun where user ="'+req.query.username+'"';
    dd.query(select,function(er,results){
        if(er){
            console.log(er);
        }

        if(results[0] !== undefined) {


            if (results[0].passd === req.query.password) {
                var user = {
                    name: req.query.username,
                    age: "22",
                    address: "bj"
                }
                req.session.user = user;
                res.render('index', {title: 'Express'});
            } else {
                res.send("密码错误！！！");
            }

        }else{
            console.log(req.query.username);
            if(req.query.username ===undefined){
                res.send("请先登录！！！<br><a href='login'>登录</a>");
            }else{
                res.send("请先注册账号！！！<br><a href='register.html'>注册</a>");
            }

        }
    });
    dd.end();
};
