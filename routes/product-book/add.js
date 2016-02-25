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
    title: '客户预定记录-编辑',
    currentPage: 'product-book'
});


router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data, {
        user: req.AV.user
    });

    res.render('product-book/add', data);

});


router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var title = req.body['title'];
    var customerId = parseInt(req.body['customer-id']);
    var customerName = req.body['customer-name'];
    var comment = req.body['comment'];
    var isComplete = req.body['is-complete'] ? true : false;

    var productBook = new ProductBook();

    productBook.set('title', title);
    productBook.set('customerId',customerId);
    productBook.set('customerName',customerName);
    productBook.set('comment', comment);
    productBook.set('isComplete', isComplete);

    productBook.save().then(function () {
        req.flash('success', '添加预定记录成功!');
        res.redirect('/product-book');
    });

});


module.exports = router;