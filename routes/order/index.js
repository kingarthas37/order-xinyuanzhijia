'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var OrderTrack = AV.Object.extend('OrderTrack');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '发货订单编辑-首页',
    currentPage: 'order'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var order = req.query.order || 'desc';
    
    var search = req.query['order-search'] ? req.query['order-search'].trim() : '';

    data = extend(data,{
        flash: {success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user,
        search:search
    });

    async.series([

        function(cb) {
            
            var query = new AV.Query(OrderTrack);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        orderPager:pager(page,limit,count)
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(OrderTrack);

            query.skip((page - 1) * limit);
            query.limit(limit);
            
            if(order === 'asc') {
                query.ascending("orderId");
            } else {
                query.descending('orderId');
            }

            if(search) {
                query.contains('name',search);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        order: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('order', data);
        }

    ]);

});

module.exports = router;