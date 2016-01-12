'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var ResourcesDownload = AV.Object.extend('ResourcesDownload');


var data =  extend(config.data,{
    title:'资源下载管理',
    currentPage:'resources-download'
});



//首页
router.get('/', function (req, res, next) {


    if (!req.AV.user) {
        return res.redirect('/login');
    }



});







module.exports = router;