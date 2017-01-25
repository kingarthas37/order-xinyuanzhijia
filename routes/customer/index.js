'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var Customer = AV.Object.extend('Customer');
var Order = AV.Object.extend('OrderTrack');

//lib
var pager = require('../../lib/component/pager-str');

var data =  extend(config.data,{
    title: '收货人管理-首页',
    currentPage: 'customer'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var search = req.query['customer-search'] ? req.query['customer-search'].trim() : '';

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.currentUser,
        search:search
    });

    async.series([

        function(cb) {
            
            var query = new AV.Query(Customer);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        customerPager:pager(page,limit,count),
                        customerCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(Customer);

            query.skip((page - 1) * limit);
            query.limit(limit);
            
            if(order === 'asc') {
                query.ascending("customerId");
            } else {
                query.descending('customerId');
            }

            if(search) {
                query.contains('name',search);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        customer: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('customer', data);
        }

    ]);

});


router.post('/remove/:customerId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    let customerId = parseInt(req.params.customerId);
    let query = new AV.Query(Order);
    query.equalTo('customerId',customerId);
    query.select('orderId');
    query.find().then(orders => {

        if(orders.length) {
            
            res.send({
                success:0
            });
            
        } else {
            
            let query = new AV.Query(Customer);
            query.equalTo('customerId',customerId);
            query.first().then(customer => {
                customer.destroy({
                    success: function () {
                        res.send({
                            success:1
                        });
                    }
                });
            });
            
        }
        
    });
    
    

    
});

module.exports = router;