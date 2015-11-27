'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

var title = '订单跟踪-添加新订单';
var currentPage = 'purchase';


//添加产品页
router.get('/', function (req, res, next) {

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

    res.render('purchase/add', datas);

});


//添加产品页
router.post('/', function (req, res, next) {
    
    var purchaseName = req.body['purchase-name'] || '';
    var purchaseDescription = req.body['purchase-description'] ||'';
    var purchaseWebsite = req.body['purchase-website'] || '';
    var purchaseOrderLink = req.body['purchase-order-link'] || '';
    var purchaseMail = req.body['purchase-mail'] || '';
    var purchaseAmount = req.body['purchase-amount'] || '';
    var purchaseTrackingNumber = req.body['purchase-tracking-number'] || '';
    var purchasePaymentType = req.body['purchase-payment-type'] || '';
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
    purchaseTrack.set('shippingType',purchaseShippingType);
    purchaseTrack.set('shippingState',purchaseShippingState);
    purchaseTrack.set('comment',purchaseComment);

    purchaseTrack.save(null, {
        success: function () {

            req.flash('info', '添加订单成功!');
            res.redirect('/purchase');
            
        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;