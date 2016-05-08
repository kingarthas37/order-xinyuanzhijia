'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

var data =  extend(config.data,{
    title:'电子书阅读说明',
    currentPage:'taobao-read'
});


router.get('/', function (req, res) {
    let type = req.query.type || 'baiduyun';
    res.render('mail/taobao-read-' + type, data);
});


module.exports = router;