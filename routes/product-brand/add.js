'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var ProductBrand = AV.Object.extend('ProductBrand');

var data = extend(config.data, {
    title: '产品分类-编辑产品分类',
    currentPage: 'product-brand'
});


router.get('/', function (req, res, next) {
    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    data = extend(data, {
        user: req.AV.user
    });
    res.render('product-brand/add', data);
});



router.post('/', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let name = req.body['name'];
    let authorName = req.body['author-name'];
    let authorImage = req.body['author-image'];
    let mdAuthorIntro = req.body['md-author-intro'];
    let mdAuthorIntroEn = req.body['md-author-intro-en'];
    let brandName = req.body['brand-name'];
    let brandImage = req.body['brand-image'];
    let mdBrandIntro = req.body['md-brand-intro'];
    let mdBrandIntroEn = req.body['md-brand-intro-en'];
    let productImages = req.body['product-images'];
    

    var productBrand = new ProductBrand();

    productBrand.set('name', name);
    productBrand.set('authorName',authorName);
    productBrand.set('authorImage',authorImage);
    productBrand.set('authorIntro',mdAuthorIntro);
    productBrand.set('authorIntroEn',mdAuthorIntroEn);
    productBrand.set('brandName',brandName);
    productBrand.set('brandImage',brandImage);
    productBrand.set('brandIntro',mdBrandIntro);
    productBrand.set('brandIntroEn',mdBrandIntroEn);
    productBrand.set('productImages',productImages);
    
    productBrand.save().then(()=>{
        req.flash('success', '添加品牌成功!');
        res.redirect('/product-brand');
    });


});


module.exports = router;