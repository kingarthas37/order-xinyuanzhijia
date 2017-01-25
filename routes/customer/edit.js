'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Customer = AV.Object.extend('Customer');
var OrderTrack = AV.Object.extend('OrderTrack');

var data =  extend(config.data,{
    title:'收货人管理-编辑收货人',
    currentPage:'customer'
});

router.get('/:customerId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var customerId = parseInt(req.params.customerId);
 
    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.currentUser,
        id: customerId
    });
    
    
    async.waterfall([
    
        function(cb) {
          
            let query = new AV.Query(OrderTrack);
            query.equalTo('customerId',customerId);
            query.descending('orderId');
            query.find().then(function(results) {
                if(results) {
                    data = extend(data, {
                        order: results
                    });
                }
                cb();
            });
            
        },
        
        function(cb) {

            var query = new AV.Query(Customer);
            query.equalTo('customerId', customerId);
            query.first().then(function(results) {

                data = extend(data, {
                    customer: results
                });

                res.render('customer/edit', data);
            
            });
        }
    
    ]);
    
});

router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var name = req.body['name'];
    var taobao = req.body['taobao'];
    var weixin = req.body['weixin'];
    var address = typeof(req.body['address']) === 'object' ? req.body['address'] : [req.body['address']];
    
    var customerId = req.body['customer-id'];
    
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    async.waterfall([

        function (cb) {

            var query = new AV.Query(Customer);
            query.equalTo('customerId', parseInt(customerId));
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
                success: function (customer) {
                    customer.set('name',name);
                    customer.set('taobao',taobao);
                    customer.set('weixin',weixin);
                    customer.set('address',address);
                    customer.save(null, {
                        success: function (results) {
                            data = extend(data, {
                                customer: results
                            });
                            
                            req.flash('success', '编辑收货人信息成功!');
                            res.redirect('/customer');
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