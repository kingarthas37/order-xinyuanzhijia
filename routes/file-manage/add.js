'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var FileManage = AV.Object.extend('FileManage');

var data = extend(config.data, {
    title: '添加文件',
    currentPage: 'file-manage'
});


router.get('/', function (req, res, next) {
    
    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data, {
        user: req.AV.user
    });
    
    res.render('file-manage/add', data);
});


router.post('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let name = req.body['name'];
    let file = req.body['file'];
    let fileType = '';
    if(/\.[^\.]+$/.test(file)) {
        fileType = /\.([^\.]+)$/.exec(file)[1];
    }
    
    var fileManage = new FileManage();
    
    fileManage.save({
        name,
        file,
        fileType
    }).then(()=> {
        req.flash('success', '添加文件成功!');
        res.redirect('/file-manage');
    });

});


module.exports = router;