'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var utils = require('../../lib/utils');
var format = require('date-format');

var flash = require('connect-flash');

//class
var OrderTrack = AV.Object.extend('OrderTrack');
var Customer = AV.Object.extend('Customer');

var data =  extend(config.data,{
    title:'转运订单编辑-添加订单',
    currentPage:'ship-order'
});



router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    let searchNotShipped = req.query['search-notshipped'];

    data = extend(data,{
        user:req.currentUser,
        currentDate:format('yyyy-MM-dd',new Date()),
        searchNotShipped
    });

    res.render('ship-order/add', data);

});

module.exports = router;