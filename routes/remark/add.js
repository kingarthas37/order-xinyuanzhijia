'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var Remark = AV.Object.extend('Remark');

var data =  extend(config.data,{
    title:'备忘录-编辑备忘录',
    currentPage:'remark'
});



router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    data = extend(data,{
        user:req.AV.user,
        currentDate:format('yyyy-MM-dd',new Date())
    });
    
    res.render('order/add', data);
    
});




router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var orderName = req.body['order-name'];
    var customerId = parseInt(req.body['customer-name-id']);
    var description = req.body['description'];
    var shippingDate = req.body['shipping-date'];
    var shippingCompany = req.body['shipping-company'];
    var trackingNumber = req.body['tracking-number'];
    var shippingStatus = req.body['shipping-status'];
    var comment = req.body['comment'];
    var paymentType = req.body['payment-type'];
    var customerName = req.body['customer-name'];
    var newCustomer = req.body['new-customer'];
    var shippingAddress = req.body['shipping-address'];
    var newAddress = req.body['new-address'];
    var taobao = req.body['taobao'];
    
    var customer = new Customer();
    var orderTrack = new OrderTrack();
    
    async.waterfall([
        
        function(cb) {
            
            //如果是新用户，注册customer
            if(newCustomer && !customerId) {
                customer.set('name',customerName);
                customer.set('taobao',taobao);
                customer.set('address',shippingAddress);
                
                customer.save().then(function(customer) {
                    
                    var query = new AV.Query(Customer);
                    query.get(customer.id,{
                        success:function(customer) {
                            
                            //获取新的customerId，重新赋值
                            customerId = customer.get('customerId');
                            cb(null);
                        },
                        error:function(err) {
                            next(err);
                        }
                    });
                    
                });
                
            } else {
                
                //如果是新地址,则保存地址
                if(newAddress) {
                    var query = new AV.Query(Customer);
                    query.equalTo('customerId',customerId);
                    query.first()
                        .then(function(customer) {
                            customer.set('address',customer.get('address') + '|' + shippingAddress);
                            return customer.save();
                        })
                        .then(function() {
                            cb(null);
                        });
                } else {
                    cb(null);
                }
            }
            
        },
    
        //取到新的customerId,如果有customerId,则保存到order，否则保存已有的customerId
        function() {

            orderTrack.set('orderName',orderName);
            orderTrack.set('description',description);
            orderTrack.set('customerId',customerId);
            orderTrack.set('customerName',customerName);
            orderTrack.set('taobaoName',taobao);
            orderTrack.set('paymentType',paymentType);
            orderTrack.set('shippingDate',new Date(shippingDate));
            orderTrack.set('shippingAddress',shippingAddress);
            orderTrack.set('shippingCompany',shippingCompany);
            orderTrack.set('trackingNumber',trackingNumber);
            orderTrack.set('shippingStatus',shippingStatus);
            orderTrack.set('comment',comment);
            
            orderTrack.save(null, {
                success: function () {
                    req.flash('success', '添加订单成功!');
                    res.redirect('/order');
                },
                error: function (err) {
                    next(err);
                }
            });
        
        }
    
    ]);


});



//查找收件人/客户名称
router.get('/search-customer', function (req, res, next) {

    if(!req.AV.user) {
        return res.json([{
            "error":config.error.NOT_SUCCESS
        }]);
    }

    var name = req.query.name || '';

    var query = new AV.Query(Customer);
    query.startsWith('name',name);

    var jsonData = [];

    query.find({
        success:function(results) {
            for(var i=0;i<results.length;i++) {
                var obj = {
                    "value":results[i].get('name'),
                    "customerId":results[i].get('customerId'),
                    "address":results[i].get('address'),
                    "taobao":results[i].get('taobao')
                };
                jsonData.push(obj);
            }
            return res.json(jsonData);
        },
        error:function(err) {
            next(err);
        }
    });

});


module.exports = router;