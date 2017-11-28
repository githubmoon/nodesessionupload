var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//form表单需要的中间件。
var session = require('express-session');
var mutipart= require('connect-multiparty');
var fs = require('fs');

var mutipartMiddeware = mutipart();

var login = require('./routes/login');
var main = require('./routes/index');
var users = require('./routes/users');
var photos = require('./action/photos');
var gs = require('./action/gs');
var savephotos = require('./action/savephotos');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
//文件保存位置
app.use(mutipart({uploadDir:'./linshi'}));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
      secret: '0',
      name: 'appq',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
      // cookie: {maxAge: 10000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
      resave: false,
      saveUninitialized: true,
     }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/main', main);
app.use('/users', users);
app.post('/photos',photos.photo);
app.post('/gist',function(req,res){
    gs.gist(req,res)
});
app.get('/outoff',function(req,res){
    //gs.gist(req,res)
    req.session.destroy();
    console.log("out");
    res.render('login', { title: 'Express' });
});
app.post('/upload',mutipartMiddeware,function (req,res) {
    //这里打印可以看到接收到文件的信息。
    console.log(req.files);
    /*//do something
    * 成功接受到浏览器传来的文件。我们可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径 。等等。
    *
    *
    * */

    // 获得文件的临时路径
    var tmp_path = req.files.thumbnail.path;
    // 指定文件上传后的目录 - 示例为"images"目录。
    var target_path = '../public/image/upload/' + req.files.thumbnail.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件,
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            savephotos.photo(req.files.thumbnail.name);
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes'+'<p>[<a href=""javascript:history.back();"">返回</a>]</p>');
        });
    });
console.log("ssss");
    //给浏览器返回一个成功提示。
  //  res.send('upload success!');
});

app.get('/awesome', function(req, res){

         if(req.session.lastPage) {
                console.log('Last page was: ' + req.session.lastPage + ".");
            }
    req.session.lastPage = '/awesome'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
         res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);
});

 app.get('/tubular', function(req, res){
        if (req.session.lastPage){
                console.log("Last page was: " + req.session.lastPage + ".");
            }
        req.session.lastPage = '/tubular';
        res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge);
    });

app.use(function(req, res, next) {
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("sssssssssssssssssssssssss");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log("zzzzzzzzzzzzzzzz");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
