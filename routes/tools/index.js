'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

var data =  extend(config.data,{
    title: '工具库',
    currentPage: 'tools'
});

 
router.get('/', function (req, res) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user
    });


    res.render('tools', data);

});


 
 
module.exports = router;