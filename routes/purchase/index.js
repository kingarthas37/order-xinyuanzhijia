'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

//lib
var pager = require('../../lib/component/pager-str');

var data =  extend(config.data,{
    title: '订单跟踪编辑-首页',
    currentPage: 'purchase'
});


//首页
router.get('/', function (req, res, next) {
    
    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var siteType = req.query['site-type'];
    var search = req.query['purchase-search'] ? req.query['purchase-search'].trim() : '';
    let shippingType = req.query['shipping'];
    let notArrived = req.query['notarrived'];
    
    data = extend(data,{
        flash: {success:req.flash('success'),error:req.flash('error')},
        user:req.currentUser,
        search,
        siteType,
        notArrived,
        shippingType
    });

    
    async.series([

        function(cb) {
            
            var query = new AV.Query(PurchaseTrack);
            
            if(siteType) {
                query.equalTo('siteType',siteType);
            }
            
            if(search) {
                query.contains('name',search);
            }
            
            if(shippingType) {
                query.equalTo('shippingType',shippingType);
            }
            
            if(notArrived) {
                query.equalTo('shippingStatus','notarrived');
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        purchasePager:pager(page,limit,count),
                        purchaseCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(PurchaseTrack);

            query.skip((page - 1) * limit);
            query.limit(limit);
            
            if(order === 'asc') {
                query.ascending("purchaseId");
            } else {
                query.descending('purchaseId');
            }
            
            if(siteType) {
                query.equalTo('siteType',siteType);
            }

            if(shippingType) {
                query.equalTo('shippingType',shippingType);
            }

            if(search) {
                query.contains('name',search);
            }

            if(notArrived) {
                query.equalTo('shippingStatus','notarrived');
            }

            query.find({
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
            res.render('purchase', data);
        }

    ]);

});


router.get('/remove/:purchaseId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var purchaseId = req.params.purchaseId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(PurchaseTrack);
            query.equalTo('purchaseId', parseInt(purchaseId));
            query.first({
                success: function (object) {
                    cb(null, object);
                },
                error: function (err) {
                    next(err);
                }
            });
        },
        function (object, cb) {
            object.destroy({
                success: function () {
                    req.flash('success', '删除成功!');
                    res.redirect('/purchase');
                }
            });
        }

    ]);
});

router.get('/shipping-status',(req,res)=> {
    let purchaseId = parseInt(req.query.purchaseId);
    let status = req.query.status;
    
    let query = new AV.Query(PurchaseTrack);
    query.equalTo('purchaseId',purchaseId);
    query.first().done(item=> {
        item.set('shippingStatus',status);
        return item.save();
    }).done(()=> {
        res.send({success:1});
    });
     
});


module.exports = router;