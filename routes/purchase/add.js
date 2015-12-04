'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var flash = require('connect-flash');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'purchase'
});

//添加产品页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    data = extend(data,{
        user:req.AV.user
    });
    
    res.render('purchase/add', data);
});


//添加产品页
router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var purchaseName = req.body['purchase-name'] || '';
    var purchaseDescription = req.body['purchase-description'] ||'';
    var purchaseWebsite = req.body['purchase-website'] || '';
    var purchaseOrderLink = req.body['purchase-order-link'] || '';
    var purchaseMail = req.body['purchase-mail'] || '';
    var purchaseAmount = req.body['purchase-amount'] || '';
    var purchaseTrackingNumber = req.body['purchase-tracking-number'] || '';
    var purchasePaymentType = req.body['purchase-payment-type'] || '';
    var purchasePaymentInfo = req.body['purchase-payment-info'] || '';
    var purchaseShippingType = req.body['purchase-shipping-type'] || '';
    var purchaseShippingState = req.body['purchase-shipping-state'] || '';
    var purchaseComment = req.body['purchase-comment'] || '';

    var purchaseTrack = new PurchaseTrack();

    purchaseTrack.set('name',purchaseName);
    purchaseTrack.set('description',purchaseDescription);
    purchaseTrack.set('website',purchaseWebsite);
    purchaseTrack.set('orderLink',purchaseOrderLink);
    purchaseTrack.set('mail',purchaseMail);
    purchaseTrack.set('amount',purchaseAmount);
    purchaseTrack.set('trackingNumber',purchaseTrackingNumber);
    purchaseTrack.set('paymentType',purchasePaymentType);
    purchaseTrack.set('paymentInfo',purchasePaymentInfo);
    purchaseTrack.set('shippingType',purchaseShippingType);
    purchaseTrack.set('shippingState',purchaseShippingState);
    purchaseTrack.set('comment',purchaseComment);

    purchaseTrack.save(null, {
        success: function () {
            req.flash('success', '添加订单成功!');
            res.redirect('/purchase');
        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;