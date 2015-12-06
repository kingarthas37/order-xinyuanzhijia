'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Customer = AV.Object.extend('Customer');

var data =  extend(config.data,{
    title:'收货人管理-编辑收货人',
    currentPage:'customer'
});

router.get('/:customerId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }
    
    var customerId = parseInt(req.params.customerId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user,
        id: customerId
    });

    async.series([

        function (cb) {

            var query = new AV.Query(Customer);
            query.equalTo('customerId', customerId);
            query.first({
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
            res.render('customer/edit', data);
        }

    ]);
    
});

router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }

    var name = req.body['name'] || '';
    var nickName = req.body['nickname'] || '';
    var taobao = req.body['taobao'] || '';
    var weixin = req.body['weixin'] || '';
    var address = req.body['address'] || '';
 

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
                    customer.set('nickName',nickName);
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