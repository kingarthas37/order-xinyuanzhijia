'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var flash = require('connect-flash');

//class
var orderTrack = AV.Object.extend('orderTrack');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'order'
});

//添加产品页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    data = extend(data,{
        user:req.AV.user
    });
    
    res.render('order/add', data);
});


//添加产品页
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

    var orderTrack = new orderTrack();

    orderTrack.set('name',orderName);
    orderTrack.set('description',orderDescription);
    orderTrack.set('website',orderWebsite);
    orderTrack.set('orderLink',orderOrderLink);
    orderTrack.set('mail',orderMail);
    orderTrack.set('amount',orderAmount);
    orderTrack.set('trackingNumber',orderTrackingNumber);
    orderTrack.set('paymentType',orderPaymentType);
    orderTrack.set('paymentInfo',orderPaymentInfo);
    orderTrack.set('shippingType',orderShippingType);
    orderTrack.set('shippingState',orderShippingState);
    orderTrack.set('comment',orderComment);

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

module.exports = router;