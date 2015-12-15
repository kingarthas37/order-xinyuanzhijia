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
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '订单跟踪编辑-首页',
    currentPage: 'purchase'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var search = req.query['purchase-search'] ? req.query['purchase-search'].trim() : '';

    data = extend(data,{
        flash: {success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user,
        search:search
    });

    async.series([

        function(cb) {
            
            var query = new AV.Query(PurchaseTrack);
            
            if(search) {
                query.contains('name',search);
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

            if(search) {
                query.contains('name',search);
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

    if(!req.AV.user) {
        return res.redirect('/login');
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


module.exports = router;