'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var OrderTrack = AV.Object.extend('OrderTrack');
var Customer = AV.Object.extend('Customer');
let Product = AV.Object.extend('Product');
let pro = require('../../lib/models/product').createNew();

//lib
var pager = require('../../lib/component/pager-str');

var data = extend(config.data, {
    title: '转运订单编辑-首页',
    currentPage: 'ship-order'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    let skip = (page - 1) * limit;
    var order = req.query.order || 'desc';

    var searchOrderName = req.query['search-order-name'];
    var searchCustomerName = req.query['search-customer-name'];
    let searchAddress = req.query['search-address'];
    let searchNotShipped = req.query['search-not-shipped'];
    let searchShipping = req.query['search-shipping'];
    let searchIsNewShop = req.query['search-is-new-shop'];

    data = extend(data, {
        flash: {
            success: req.flash('success'),
            error: req.flash('error')
        },
        user: req.currentUser,
        limit,
        searchOrderName,
        searchCustomerName,
        searchAddress,
        searchNotShipped,
        searchShipping,
        searchIsNewShop
    });

    res.render('ship-order', data);

});

module.exports = router;