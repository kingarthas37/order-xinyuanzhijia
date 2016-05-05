'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var Identity = AV.Object.extend('Identity');

var data = extend(config.data, {
    title: '添加身份证',
    currentPage: 'identity'
});


router.get('/', function (req, res, next) {
    
    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data, {
        user: req.AV.user
    });
    
    res.render('identity/add', data);
});


router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let name = req.body['name'];
    var recordCategory = new Identity();

    recordCategory.set('name', name);
    
    recordCategory.save().then(()=> {
        req.flash('success', '添加产品分类成功!');
        res.redirect('/identity');
    });

});


module.exports = router;