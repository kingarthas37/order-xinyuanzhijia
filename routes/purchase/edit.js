'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'purchase'
});


//编辑产品页
router.get('/:purchaseId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var purchaseId = parseInt(req.params.purchaseId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.currentUser,
        id: purchaseId
    });

    async.series([

        function (cb) {

            var query = new AV.Query(PurchaseTrack);
            query.equalTo('purchaseId', purchaseId);
            query.first({
                success: function (results) {
                    data = extend(data, {
                        purchase: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('purchase/edit', data);
        }

    ]);


});

router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var purchaseName = req.body['purchase-name'];
    var purchaseDescription = req.body['purchase-description'];
    var purchaseWebsite = req.body['purchase-website'];
    var purchaseOrderLink = req.body['purchase-order-link'];
    var purchaseMail = req.body['purchase-mail'];
    var purchaseAmount = req.body['purchase-amount'];
    var purchaseTrackingNumber = req.body['purchase-tracking-number'];
    var purchaseShippingCompany = req.body['purchase-shipping-company'];
    var purchasePaymentType = req.body['purchase-payment-type'];
    var purchasePaymentInfo = req.body['purchase-payment-info'];
    var purchaseShippingType = req.body['purchase-shipping-type'];
    var purchaseShippingStatus = req.body['purchase-shipping-status'];
    var purchaseComment = req.body['purchase-comment'];
    var purchaseImage = req.body['purchase-image'];
    var siteType = req.body['site-type'];

    var purchaseId = req.body['purchase-id'];
    
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    async.waterfall([

        function (cb) {

            var query = new AV.Query(PurchaseTrack);
            query.equalTo('purchaseId', parseInt(purchaseId));
            query.first({
                success: function (results) {
                    cb(null, results.id, query);
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function (objectId, query, cb) {
            
            query.get(objectId, {
                success: function (purchase) {
                    purchase.set('name',purchaseName);
                    purchase.set('description',purchaseDescription);
                    purchase.set('website',purchaseWebsite);
                    purchase.set('orderLink',purchaseOrderLink);
                    purchase.set('mail',purchaseMail);
                    purchase.set('amount',purchaseAmount);
                    purchase.set('trackingNumber',purchaseTrackingNumber);
                    purchase.set('shippingCompany',purchaseShippingCompany);
                    purchase.set('paymentType',purchasePaymentType);
                    purchase.set('paymentInfo',purchasePaymentInfo);
                    purchase.set('shippingType',purchaseShippingType);
                    purchase.set('shippingStatus',purchaseShippingStatus);
                    purchase.set('comment',purchaseComment);
                    purchase.set('image',purchaseImage);
                    purchase.set('siteType',siteType);
                    purchase.save(null, {
                        success: function (results) {
                            data = extend(data, {
                                purchase: results
                            });
                            
                            req.flash('info', '编辑订单成功!');
                            res.redirect('/purchase');
                        },
                        error: function (err) {
                            next(err);
                        }
                    });
                },
                error: function (err) {
                    next(err);
                }

            });

        }

    ]);

});

module.exports = router;