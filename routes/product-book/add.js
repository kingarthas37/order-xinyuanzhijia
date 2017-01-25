'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var ProductBook = AV.Object.extend('ProductBook');

var data = extend(config.data, {
    title: '产品预订记录-编辑',
    currentPage: 'product-book'
});


router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data, {
        user: req.currentUser
    });

    res.render('product-book/add', data);

});


router.post('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var customerId = parseInt(req.body['customer-id']);
    var customerName = req.body['customer-name'];
    var comment = req.body['comment'];
    let pay = req.body['pay'];
    let productName = typeof req.body['product-name'] === 'object' ? req.body['product-name'] : [req.body['product-name']] ;
    let productCount = typeof req.body['product-count'] === 'object' ? req.body['product-count'] : [req.body['product-count']];
    let productState = typeof req.body['product-state'] === 'object' ? req.body['product-state'] : [req.body['product-state']];
    
    var productBook = new ProductBook();

    productBook.save({
        customerId,
        customerName,
        comment,
        pay,
        productName,
        productCount,
        productState
    }).then(()=> {
        req.flash('success', '添加预定记录成功!');
        res.redirect('/product-book');
    });

});


module.exports = router;