'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var Identity = AV.Object.extend('Identity');

var data = extend(config.data, {
    title: '添加身份证',
    currentPage: 'identity'
});


router.get('/', function (req, res, next) {
    
    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data, {
        user: req.AV.user
    });
    
    res.render('identity/add', data);
});


router.post('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let name = req.body['name'];
    let cardNo = req.body['card-no'];
    let cardAddress = req.body['card-address'];
    let shippingAddress = req.body['shipping-address'];
    let phone = req.body['phone'];
    let cardImageFront = req.body['card-image-front'];
    let cardImageBack = req.body['card-image-back'];
    let cardImageAll = req.body['card-image-all'];
    let isOften = req.body['is-often'] ? true : false;
    
    var identity = new Identity();
    
    identity.save({
        name:name,
        cardNo:cardNo,
        cardAddress:cardAddress,
        shippingAddress:shippingAddress,
        phone:phone,
        cardImageFront:cardImageFront,
        cardImageBack:cardImageBack,
        cardImageAll:cardImageAll,
        isOften:isOften
    }).then(()=> {
        req.flash('success', '添加身份证成功!');
        res.redirect('/identity');
    });

});


module.exports = router;