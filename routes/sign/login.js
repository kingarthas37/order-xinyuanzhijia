'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');
var extend = require('xtend');
var config = require('../../lib/config');

var data = extend(config.data,{
    title: '登录',
    currentPage: 'sign',
    flash:{success:null,error:null},
    user:null
});


router.get('/',function(req,res,next) {

    if(req.currentUser) {
        return res.redirect('/');
    }
    
    data = extend(data,{
        flash:{error:req.flash('error')}
    });
    
    res.render('sign/login',data);
    
});


router.post('/',function(req,res,next) {

    if(req.currentUser) {
        return res.redirect('/');
    }

    var returnUrl = req.query.return;
    var username = req.body.username;
    var password = req.body.password;
    
    AV.User.logIn(username, password, {
        success: function(user) {
            res.saveCurrentUser(user);
            res.redirect(returnUrl ? decodeURIComponent(returnUrl) : '/');
        },
        error: function(user, error) {
            req.flash('error',error.message);
            res.redirect('/login');
        }
    });

});

module.exports = router;