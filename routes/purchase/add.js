'use strict';

var router
    = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var flash = require('connect-flash');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');
var PurchaseContact = AV.Object.extend('PurchaseContact');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'purchase'
});

//添加产品页
router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let siteType = req.query['site-type'];
    
    data = extend(data,{
        user:req.currentUser,
        siteType:siteType
    });
    
    res.render('purchase/add', data);
});


//添加产品页
router.post('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var purchaseName = req.body['purchase-name'];
    var purchaseDescription = req.body['purchase-description'];
    var purchaseWebsite = req.body['purchase-website'];
    var purchaseOrderLink = req.body['purchase-order-link'];
    var purchaseMail = req.body['purchase-mail'];
    var purchaseAmount = req.body['purchase-amount'];
    var purchaseShippingCompany = req.body['purchase-shipping-company'];
    var purchaseTrackingNumber = req.body['purchase-tracking-number'];
    var purchasePaymentType = req.body['purchase-payment-type'];
    var purchasePaymentInfo = req.body['purchase-payment-info'];
    var purchaseShippingType = req.body['purchase-shipping-type'];
    var purchaseshippingStatus = req.body['purchase-shipping-status'];
    var purchaseComment = req.body['purchase-comment'];
    var purchaseImage = req.body['purchase-image'];
    var siteType = req.body['site-type'];
    var shippingStatus = req.body['shipping-status'];

    var purchaseTrack = new PurchaseTrack();

    purchaseTrack.set('name',purchaseName);
    purchaseTrack.set('description',purchaseDescription);
    purchaseTrack.set('website',purchaseWebsite);
    purchaseTrack.set('orderLink',purchaseOrderLink);
    purchaseTrack.set('mail',purchaseMail);
    purchaseTrack.set('amount',purchaseAmount);
    purchaseTrack.set('trackingNumber',purchaseTrackingNumber);
    purchaseTrack.set('shippingCompany',purchaseShippingCompany);
    purchaseTrack.set('paymentType',purchasePaymentType);
    purchaseTrack.set('paymentInfo',purchasePaymentInfo);
    purchaseTrack.set('shippingType',purchaseShippingType);
    purchaseTrack.set('shippingStatus',purchaseshippingStatus);
    purchaseTrack.set('comment',purchaseComment);
    purchaseTrack.set('image',purchaseImage);
    purchaseTrack.set('siteType',siteType);
    purchaseTrack.set('shippingStatus',shippingStatus);

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


router.get('/website-desc',function(req,res,next) {

    if(!req.currentUser) {
        return res.json([{
            "error":config.error.NOT_SUCCESS
        }]);
    }
    
    var name = req.query.name;
    var siteType = req.query['site-type'];
    
    var query = new AV.Query(PurchaseContact);
    query.equalTo('siteType',siteType);
    query.contains('name',name);
    
    var jsonData = [];
    
    query.find().then(function(results) {
        for(var i=0;i<results.length;i++) {
            var obj = {
                "value":results[i].get('name'),
                "website":results[i].get('website'),
                "shop":results[i].get('shop'),
                "email":results[i].get('email'),
                "image":results[i].get('imageUrl')
            };
            jsonData.push(obj);
        }
        return res.json(jsonData);
    });
    
    
});

module.exports = router;