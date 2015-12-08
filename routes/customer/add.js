'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var flash = require('connect-flash');

//class
var Customer = AV.Object.extend('Customer');

var data =  extend(config.data,{
    title:'收货人管理-添加收货人',
    currentPage:'customer'
});

//添加产品页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    data = extend(data,{
        user:req.AV.user
    });
    
    res.render('customer/add', data);
});


//添加产品页
router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var name = req.body['name'] || '';
    var nickName = req.body['nickname'] || '';
    var taobao = req.body['taobao'] || '';
    var weixin = req.body['weixin'] || '';
    var address = req.body['address'] || '';
    
    var customer = new Customer();

    customer.set('name',name);
    customer.set('nickName',nickName);
    customer.set('taobao',taobao);
    customer.set('weixin',weixin);
    customer.set('address',address);

    customer.save(null, {
        success: function () {
            req.flash('success', '添加收货人成功!');
            res.redirect('/customer');
        },
        error: function (err) {
            next(err);
        }
    });
    
});

module.exports = router;