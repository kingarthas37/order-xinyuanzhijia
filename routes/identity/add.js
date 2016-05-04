'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var RecordCategory = AV.Object.extend('RecordCategory');

var data = extend(config.data, {
    title: '产品收录分类-编辑',
    currentPage: 'record-category'
});


router.get('/', function (req, res, next) {
    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    data = extend(data, {
        user: req.AV.user
    });
    res.render('record-category/add', data);
});


router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let name = req.body['name'];
    var recordCategory = new RecordCategory();

    recordCategory.set('name', name);
    
    recordCategory.save().then(()=> {
        req.flash('success', '添加产品分类成功!');
        res.redirect('/record-category');
    });

});


module.exports = router;