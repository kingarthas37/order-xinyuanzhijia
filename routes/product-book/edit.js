'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var ProductBook = AV.Object.extend('ProductBook');
var Customer = AV.Object.extend('Customer');

var data =  extend(config.data,{
    title:'预定记录-编辑预定记录',
    currentPage:'product-book'
});

//编辑产品页
router.get('/:productBookId', function (req, res) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBookId = parseInt(req.params.productBookId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });

    let query = new AV.Query(ProductBook);
    query.equalTo('productBookId', productBookId);
    
    query.first().then(result => {
        data = extend(data, {
            productBook: result
        });
        let query1 = new AV.Query(Customer);
        query1.equalTo('customerId',result.get('customerId'));
        return query1.first();
        
    }).then(customer => {
        data = extend(data,{
            customer
        });
        res.render('product-book/edit', data);
    });

});

router.post('/:productBookId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let productBookId = parseInt(req.params['productBookId']);
    var customerId = parseInt(req.body['customer-id']);
    var customerName = req.body['customer-name'];
    var comment = req.body['comment'];
    let pay = req.body['pay'];
    let productName = typeof req.body['product-name'] === 'object' ? req.body['product-name'] : [req.body['product-name']] ;
    let productCount = typeof req.body['product-count'] === 'object' ? req.body['product-count'] : [req.body['product-count']];
    let productState = typeof req.body['product-state'] === 'object' ? req.body['product-state'] : [req.body['product-state']];
    
    var query = new AV.Query(ProductBook);

    query.equalTo('productBookId',productBookId);
    query.first().then(function(result) {
        return result.save({
            customerId,
            customerName,
            comment,
            pay,
            productName,
            productCount,
            productState
        });
    }).then(function() {
        req.flash('success', '编辑预定记录成功!');
        res.redirect('/product-book');
    });

});

module.exports = router;