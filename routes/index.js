var express = require('express');
var userchaxun = require('../action/userchaxun');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.user){
        res.render('index', { title: 'Express' });
    }else{
     userchaxun.user(req,res);
    }

});

module.exports = router;
