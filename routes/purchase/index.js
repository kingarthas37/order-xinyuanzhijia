'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");


//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

//lib
var pager = require('../../lib/pager');

var title = '订单跟踪编辑-首页';
var currentPage = 'purchase';

//首页
router.get('/', function (req, res, next) {
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var order = req.query.order || 'desc';
    
    var search = req.query['purchase-search'] ? req.query['purchase-search'].trim() : '';

    var datas = {
        title: title,
        currentPage: currentPage,
        search:search,
        info: req.flash('info')
    };

    async.series([

        function(cb) {
            
            var query = new AV.Query(PurchaseTrack);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    datas = extend(datas,{
                        purchasePager:pager(page,limit,count)
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
            res.render('purchase', datas);
        }

    ]);

});

module.exports = router;