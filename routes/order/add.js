'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var flash = require('connect-flash');

//class
var OrderTrack = AV.Object.extend('OrderTrack');
var Customer = AV.Object.extend('Customer');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'order'
});


router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    data = extend(data,{
        user:req.AV.user,
        currentDate:new Date().toLocaleDateString()
    });
    
    res.render('order/add', data);
});




router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var orderName = req.body['order-name'] || '';
    var orderDescription = req.body['order-description'] ||'';
    var orderWebsite = req.body['order-website'] || '';
    var orderOrderLink = req.body['order-order-link'] || '';
    var orderMail = req.body['order-mail'] || '';
    var orderAmount = req.body['order-amount'] || '';
    var orderTrackingNumber = req.body['order-tracking-number'] || '';
    var orderPaymentType = req.body['order-payment-type'] || '';
    var orderPaymentInfo = req.body['order-payment-info'] || '';
    var orderShippingType = req.body['order-shipping-type'] || '';
    var orderShippingState = req.body['order-shipping-state'] || '';
    var orderComment = req.body['order-comment'] || '';

    var OrderTrack = new OrderTrack();

    OrderTrack.set('name',orderName);
    OrderTrack.set('description',orderDescription);
    OrderTrack.set('website',orderWebsite);
    OrderTrack.set('orderLink',orderOrderLink);
    OrderTrack.set('mail',orderMail);
    OrderTrack.set('amount',orderAmount);
    OrderTrack.set('trackingNumber',OrderTrackingNumber);
    OrderTrack.set('paymentType',orderPaymentType);
    OrderTrack.set('paymentInfo',orderPaymentInfo);
    OrderTrack.set('shippingType',orderShippingType);
    OrderTrack.set('shippingState',orderShippingState);
    OrderTrack.set('comment',orderComment);

    OrderTrack.save(null, {
        success: function () {
            req.flash('success', '添加订单成功!');
            res.redirect('/order');
        },
        error: function (err) {
            next(err);
        }
    });


});



//查找收件人/客户名称
router.get('/search-customer', function (req, res, next) {

    if(!req.AV.user) {
        return res.json([{
            "error":config.error.NOT_SUCCESS
        }]);
    }

    var name = req.query.name || '';

    var query = new AV.Query(Customer);
    query.startsWith('name',name);

    var jsonData = [];

    query.find({
        success:function(results) {
            for(var i=0;i<results.length;i++) {
                var obj = {
                    "value":results[i].get('name'),
                    "customerId":results[i].get('customerId'),
                    "address":results[i].get('address'),
                    "taobao":results[i].get('taobao')
                };
                jsonData.push(obj);
            }
            return res.json(jsonData);
        },
        error:function(err) {
            next(err);
        }
    });

});


module.exports = router;