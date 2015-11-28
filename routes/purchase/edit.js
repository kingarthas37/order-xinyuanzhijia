'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

var title = '订单编辑-编辑订单';
var currentPage = 'purchase';


//编辑产品页
router.get('/:purchaseId', function (req, res, next) {

    var purchaseId = parseInt(req.params.purchaseId);

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info'),
        id: purchaseId
    };

    async.series([

        function (cb) {

            var query = new AV.Query(PurchaseTrack);
            query.equalTo('purchaseId', purchaseId);
            query.first({
                success: function (results) {
                    datas = extend(datas, {
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
            res.render('purchase/edit', datas);
        }

    ]);


});

router.post('/', function (req, res, next) {

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

    var purchaseId = req.body['purchase-id'];
    
    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

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
                    purchase.set('paymentType',purchasePaymentType);
                    purchase.set('paymentInfo',purchasePaymentInfo);
                    purchase.set('shippingType',purchaseShippingType);
                    purchase.set('shippingState',purchaseShippingState);
                    purchase.set('comment',purchaseComment);
                    purchase.save(null, {
                        success: function (results) {
                            datas = extend(datas, {
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