'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');
var extend = require('xtend');

var data = {
    title: '注册',
    currentPage: 'sign',
    flash:{success:null,error:null},
    user:null
};

router.get('/',function(req,res,next) {

    //注册不开放，跳转到登录
 //   return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    
    data = extend(data,{
        flash:{error:req.flash('error')}
    });
    
    res.render('sign/register',data);

});


router.post('/',function(req,res,next) {
    
    var username = req.body.username;
    var password = req.body.password;
    
    var user = new AV.User();
    user.set('username',username);
    user.set('password', password);
    
    user.signUp(null, {
        success: function(user) {
            req.flash('success', '注册成功!');
            res.redirect('/');
        },
        error: function(user, error) {
            req.flash('error',error.message);
            res.redirect('/register');
        }
    });

});

module.exports = router;