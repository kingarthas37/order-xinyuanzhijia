'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Customer = AV.Object.extend('Customer');
var OrderTrack = AV.Object.extend('OrderTrack');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'order'
});


//编辑产品页
router.get('/:orderId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var orderId = parseInt(req.params.orderId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user,
        id: orderId
    });

    async.series([

        function (cb) {

            var query = new AV.Query(OrderTrack);
            query.equalTo('orderId', orderId);
            query.first({
                success: function (results) {
                    data = extend(data, {
                        order: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('order/edit', data);
        }

    ]);


});

router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var orderId = parseInt(req.body['order-id']);
    
    var orderName = req.body['order-name'];
    var customerId = parseInt(req.body['customer-name-id']);
    var description = req.body['description'];
    var shippingDate = req.body['shipping-date'];
    var shippingCompany = req.body['shipping-company'];
    var trackingNumber = req.body['tracking-number'];
    var shippingStatus = req.body['shipping-status'];
    var comment = req.body['comment'];

    var customerName = req.body['customer-name'];
    var shippingAddress = req.body['shipping-address'];
    var taobao = req.body['taobao'];

    var customer = new Customer();
    
    async.waterfall([
        //取到新的customerId,如果有customerId,则保存到order，否则保存已有的customerId
        function() {

            var query = new AV.Query(OrderTrack);
            query.equalTo('orderId',orderId);
            query.first().then(function(orderTrack){

                orderTrack.set('orderName',orderName);
                orderTrack.set('description',description);
                orderTrack.set('customerId',customerId);
                orderTrack.set('customerName',customerName);
                orderTrack.set('taobaoName',taobao);
                orderTrack.set('shippingDate',new Date(shippingDate));
                orderTrack.set('shippingAddress',shippingAddress);
                orderTrack.set('shippingCompany',shippingCompany);
                orderTrack.set('trackingNumber',trackingNumber);
                orderTrack.set('shippingStatus',shippingStatus);
                orderTrack.set('comment',comment);

                orderTrack.save(null, {
                    success: function () {
                        req.flash('success', '添加订单成功!');
                        res.redirect('/order');
                    },
                    error: function (err) {
                        next(err);
                    }
                });
                
            });
            
        }
    
    ]);
    
 

});

module.exports = router;