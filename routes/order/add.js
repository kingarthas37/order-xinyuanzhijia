'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var utils = require('../../lib/utils');
var format = require('date-format');

var flash = require('connect-flash');

//class
var OrderTrack = AV.Object.extend('OrderTrack');
var Customer = AV.Object.extend('Customer');

var data =  extend(config.data,{
    title:'订单编辑-编辑订单',
    currentPage:'order'
});



router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    let searchNotShipped = req.query['search-notshipped'];
    
    data = extend(data,{
        user:req.currentUser,
        currentDate:format('yyyy-MM-dd',new Date()),
        searchNotShipped
    });
    
    res.render('order/add', data);
    
});




router.post('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var name = typeof req.body['name'] === 'object' ? req.body['name'] : [req.body['name']];
    var shippingCount = typeof req.body['shipping-count'] === 'object' ? req.body['shipping-count'] : [req.body['shipping-count']];
    let isGift = typeof req.body['is-gift'] === 'object' ? req.body['is-gift'] : [req.body['is-gift']];
    isGift = isGift.map(item => parseInt(item) ? true : false);
    let isShipping = typeof req.body['is-shipping'] === 'object' ? req.body['is-shipping'] : [req.body['is-shipping']];
    isShipping = isShipping.map(item => parseInt(item) ? true : false);
    var customerId = parseInt(req.body['customer-name-id']);
    var client = req.body['client'].trim();
    let clientAddress = req.body['client-address'].trim();
    let shopOrderLink = req.body['shop-order-link'].trim();
    shopOrderLink = utils.urlCompleting(shopOrderLink);
    var shippingDate = req.body['shipping-date'];
    var shippingCompany = req.body['shipping-company'].trim();
    var trackingNumber = req.body['tracking-number'].trim();
    var shippingStatus = req.body['shipping-status'];
    var comment = req.body['comment'].trim();
    var customerName = req.body['customer-name'].trim();
    var newCustomer = req.body['new-customer'];
    var shippingAddress = req.body['shipping-address'].trim();
    var newAddress = req.body['new-address'];
    var taobao = req.body['taobao'].trim();
    let isNewShop = req.body['is-new-shop'];
    let isTaobaoUser = req.body['is-taobao-user'];

    var customer = new Customer();
    var orderTrack = new OrderTrack();
    
    async.waterfall([
        
        function(cb) {
            
            //如果是新用户，注册customer
            if(newCustomer && !customerId) {

                customer.set('name',customerName);
                customer.set('taobao',taobao);
                customer.set('address',[shippingAddress]);
                customer.set('isTaobaoUser',isTaobaoUser === 'on' ? true:false);
                
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
                            customer.add('address',shippingAddress);
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

            //productId shipping
            let productId = [];
            for(let i=0;i<name.length;i++) {
                if(/\{id\:\d+\}/.test(name[i])) {
                    productId.push(/\{id\:(\d+)\}/.exec(name[i])[1]);
                }else {
                    productId.push("");
                }
            }
            
            //shipping count
            shippingCount = shippingCount.map(item => parseInt(item));
            
            orderTrack.set('name',name);
            orderTrack.set('productId',productId);
            orderTrack.set('isGift',isGift);
            orderTrack.set('isShipping',isShipping);
            orderTrack.set('shippingCount',shippingCount);
            orderTrack.set('client',client);
            orderTrack.set('clientAddress',clientAddress);
            orderTrack.set('shopOrderLink',shopOrderLink);
            orderTrack.set('customerId',customerId);
            orderTrack.set('customerName',customerName);
            orderTrack.set('taobaoName',taobao);
            orderTrack.set('shippingDate',new Date(shippingDate));
            orderTrack.set('shippingAddress',shippingAddress);
            orderTrack.set('shippingCompany',shippingCompany);
            orderTrack.set('trackingNumber',trackingNumber);
            orderTrack.set('shippingStatus',shippingStatus);
            orderTrack.set('comment',comment);
            orderTrack.set('isNewShop',isNewShop ==='on'?true:false);
            orderTrack.set('isNewCustomer',newCustomer === 'on' ? true : false);
            orderTrack.set('isTaobaoUser',isTaobaoUser === 'on' ? true:false);
            
            orderTrack.save(null, {
                success: function () {
                    let notshipped = req.query['search-notshipped'] === 'on' ? '?search-notshipped=on' : '';
                    req.flash('success', '添加订单成功!');
                    res.redirect(`/order${notshipped}`);
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

    if(!req.currentUser) {
        return res.json([{
            "error":config.error.NOT_SUCCESS
        }]);
    }

    var name = req.query.name;
    
    let queryName = new AV.Query(Customer);
    queryName.contains('name',name);

    let queryTaobao = new AV.Query(Customer);
    queryTaobao.contains('taobao',name);

    let queryWeixin = new AV.Query(Customer);
    queryWeixin.contains('weixin',name);

    let query = AV.Query.or(queryName,queryTaobao,queryWeixin);

    var jsonData = [];

    query.find({
        success:function(results) {
            for(var i=0;i<results.length;i++) {
                var obj = {
                    "value":results[i].get('taobao') || results[i].get('name'),
                    "customerId":results[i].get('customerId'),
                    "address":results[i].get('address'),
                    "taobao":results[i].get('taobao'),
                    'isTaobaoUser':results[i].get('isTaobaoUser')
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