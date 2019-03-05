'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');
var utils = require('../../lib/utils');
var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var ShipOrder = AV.Object.extend('ShipOrder');

var data =  extend(config.data,{
    title:'转运订单编辑-编辑订单',
    currentPage:'ship-order'
});


//编辑产品页
router.get('/:orderId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var shipOrderId = parseInt(req.params.orderId);

    let shipOrder = new AV.Query(ShipOrder);
    shipOrder.equalTo('shipOrderId', shipOrderId);
    shipOrder.first().then(item=>{
        data = extend(data, {item:item});
        res.render('ship-order/edit', data);
    });
});

router.post('/:orderId', function (req, res, next) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let shipOrderId = parseInt(req.params.orderId);
    let transferOrderNumber = req.body['transferOrderNumber'];
    let trackingNumber = req.body['trackingNumber'];
    let remark = req.body['remark'];
    let count = req.body['count'];
    let realCount = req.body['realCount'] || 0;
    let shipOrder = new AV.Query(ShipOrder);
    shipOrder.equalTo('shipOrderId', shipOrderId);
    shipOrder.first().then(item=>{
        if (item) {
            item.set('transferOrderNumber', transferOrderNumber);
            item.set('trackingNumber', trackingNumber);
            item.set('remark', remark);
            shipOrder.set('count', count);
            shipOrder.set('realCount', realCount);
            item.save(null, {
                success: function () {
                    res.redirect('/ship-order?limit=500');
                },
                error: function (err) {
                    req.flash('error', '修改订单失败!');
                }
            });
        }
    });
});

module.exports = router;