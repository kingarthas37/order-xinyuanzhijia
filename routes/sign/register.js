'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var title = '注册';
var currentPage = 'sign';

router.get('/',function(req,res,next) {

    //注册不开放，跳转到登录
  //  return res.redirect('login');
    
    var datas = {
        title: title,
        currentPage: currentPage,
        error: req.flash('error')
    };
    
    res.render('sign/register',datas);

});


router.post('/',function(req,res,next) {

    var datas = {
        title: title,
        currentPage: currentPage
    };
    
    var username = req.body.username;
    var password = req.body.password;
    
    var user = new AV.User();
    user.set('username',username);
    user.set('password', password);
    
    user.signUp(null, {
        success: function(user) {

            console.info(user);
            
            req.flash('info', '注册成功!');
            res.redirect('/');
            
        },
        error: function(user, error) {
            req.flash('error',error.message);
            res.redirect('register');
        }
    });

});

module.exports = router;