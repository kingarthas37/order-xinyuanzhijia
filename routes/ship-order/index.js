'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var ShipOrder = AV.Object.extend('ShipOrder');
let aliExpress = require('../../lib/models/ali-express').createNew();

//lib
var pager = require('../../lib/component/pager-str');

var data = extend(config.data, {
    title: '转运订单编辑-首页',
    currentPage: 'ship-order'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    //let limit = 50;
    var order = req.query.order || 'desc';

    var searchTransferOrderNumber = req.query['search-transfer-order-number'] || '';
    var searchTrackingNumber = req.query['search-tracking-number'] || '';
    data = extend(data, {
        flash: {
            success: req.flash('success'),
            // error: req.flash('error')
        },
        user: req.currentUser,
        limit,
        searchTransferOrderNumber,
        searchTrackingNumber,
    });
    let shipOrder = new AV.Query(ShipOrder);
    if (searchTransferOrderNumber) {
        shipOrder.contains('transferOrderNumber', searchTransferOrderNumber);
    }
    if (searchTrackingNumber) {
        shipOrder.contains('trackingNumber', searchTrackingNumber);
    }
    shipOrder.limit(limit);
    shipOrder.addDescending('createdAt');
    shipOrder.count().then(count=> {
        if (count > 0) {
            shipOrder.find().then(items=> {
                items.forEach( n => {
                    n.createdAt = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.createdAt.getMonth() + 1}/${n.createdAt.getDate()}`;
                    n.updatedAt = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.updatedAt.getMonth() + 1}/${n.updatedAt.getDate()}`;
                });
                data = extend(data, {
                    orderPager:pager(page,limit, count),
                    orderCount:count,
                    // pager: pager.init(page, limit, count),
                    // pagerHtml: pager.initHtml({
                    //     page, limit, count,
                    //     url: '/ship-order/index',
                    //     serialize: {
                    //         page,
                    //         searchTransferOrderNumber,
                    //         searchTrackingNumber,
                    //     }
                    // }),
                    'items': items});
                res.render('ship-order/index', data);
            });
        } else {
            data = extend(data, {'items': []});
            res.render('ship-order/index', data);
        }
    });
});

router.post('/updateOrderStatus/:id/:type/:value', function(req, res) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let shipOrderId = parseInt(req.params.id);
    let shipOrder = new AV.Query(ShipOrder);
    let type = req.params.type;
    let value = req.params.value == 'true' ? true : false;
    console.log(type,value);
    shipOrder.equalTo('shipOrderId', shipOrderId);
    shipOrder.first().then(item=>{
        if (item) {
            if (type == 'isHaiguan') {
                item.set('isHaiguan', value);
            } else if (type == 'isArrived') {
                item.set('isArrived', value);
            }
            item.save().then(()=> {
                res.send({success:1});
            });
        }
    });
});

router.post('/copy/:id/', function(req, res) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let shipOrderId = parseInt(req.params.id);
    let shipOrder = new AV.Query(ShipOrder);
    shipOrder.equalTo('shipOrderId', shipOrderId);
    shipOrder.first().then(item=>{
        if (item) {
            let newShipOrder = new ShipOrder();
            newShipOrder.set('transferOrderNumber', item.get('transferOrderNumber') + '(复制)');
            newShipOrder.set('remark', item.get('remark'));
            newShipOrder.save(null, {
                success: function () {
                    req.flash('success', '复制订单成功!');
                    res.redirect('/ship-order');
                },
                error: function (err) {
                    req.flash('error', '复制订单失败!');
                }
            });
        }
    });
});

router.post('/remove/:id/', function(req, res) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let shipOrderId = parseInt(req.params.id);
    let query = new AV.Query(ShipOrder);
    query.equalTo('shipOrderId',shipOrderId);
    query.first().then(item => {
        item.destroy().then(()=> {
            res.send({success: 1});
        });
    });
});

router.post('/edit-tracking/:id', function(req, res) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let shipOrderId = parseInt(req.params.id);
    let value = req.body.value || '';
    let query = new AV.Query(ShipOrder);
    query.equalTo('shipOrderId',shipOrderId);
    query.first().then(item => {
        item.set('trackingNumber', value);
        item.save(null, {
            success: function () {
                res.send({
                    success:1
                });
            },
            error: function (err) {

            }
        });
    });
});

router.post('/edit-remark/:id', function(req, res) {
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    let shipOrderId = parseInt(req.params.id);
    let value = req.body.value || '';
    let query = new AV.Query(ShipOrder);
    query.equalTo('shipOrderId',shipOrderId);
    query.first().then(item => {
        item.set('remark', value);
        item.save(null, {
            success: function () {
                res.send({
                    success:1
                });
            },
            error: function (err) {

            }
        });
    });
});

router.get('/express/:number/:type', (req, res) => {
    let number = req.params.number;
    let com = req.params.type || '';
    console.log(number);
    if (!number || !com) {
        res.send({'list':null, 'msg':'系统繁忙请稍后重新进行查询'});
    } else {
        aliExpress.getExpressInfo(number, com).then(result => {
            res.send(result);
        });
    }
});

module.exports = router;