'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');
var utils = require('../../lib/utils');
var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Customer = AV.Object.extend('Customer');
var OrderTrack = AV.Object.extend('OrderTrack');

var data =  extend(config.data,{
    title:'转运订单编辑-编辑订单',
    currentPage:'ship-order'
});


//编辑产品页
router.get('/:orderId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var orderId = parseInt(req.params.orderId);
    let searchNotShipped = req.query['search-notshipped'];

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.currentUser,
        id: orderId,
        searchNotShipped
    });

    res.render('ship-order/edit', data);

});

module.exports = router;