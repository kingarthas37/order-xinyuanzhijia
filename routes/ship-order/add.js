'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var utils = require('../../lib/utils');
var format = require('date-format');
var ShipOrder = AV.Object.extend('ShipOrder');

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

router.post('/', function (req, res, next) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let transferOrderNumber = req.body['transferOrderNumber'];
    var trackingNumber = req.body['trackingNumber'] || 0;
    let remark = req.body['remark'];
    let shipOrder = new ShipOrder();
    let count = req.body['count'];
    let realCount = req.body['realCount'] || 0;
    shipOrder.set('transferOrderNumber', transferOrderNumber);
    shipOrder.set('trackingNumber', trackingNumber);
    shipOrder.set('remark', remark);
    shipOrder.set('count', count);
    shipOrder.set('realCount', realCount);
    shipOrder.save(null, {
        success: function () {
            req.flash('success', '添加订单成功!');
            res.redirect('/ship-order');
        },
        error: function (err) {
            req.flash('error', '添加订单失败!');
        }
    });
});

module.exports = router;