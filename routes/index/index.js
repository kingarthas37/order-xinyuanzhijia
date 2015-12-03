'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var data = {
    title: '首页',
    currentPage: 'index',
    flash:{success:null,error:null},
    user:null
};

router.get('/',function(req,res,next) {
    
    if(!req.AV.user) {
        return res.redirect('/login');
    }
    
    data.user = req.AV.user;
    
    res.render('index',data);
});
 
module.exports = router;