'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var ProductBrand = AV.Object.extend('ProductBrand');

var data =  extend(config.data,{
    title:'产品品牌-编辑产品品牌',
    currentPage:'productBrand'
});


//编辑产品页
router.get('/:productBrandId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBrandId = parseInt(req.params.productBrandId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.currentUser,
        productBrandId: productBrandId
    });

    var query = new AV.Query(ProductBrand);
    query.equalTo('productBrandId', productBrandId);
    query.first().then(function(result) {
        data = extend(data, {
            productBrand: result
        });
        res.render('product-brand/edit', data);
    });

});



router.post('/:productBrandId', function (req, res) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBrandId = parseInt(req.params['productBrandId']);

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

    var query = new AV.Query(ProductBrand);

    query.equalTo('productBrandId',productBrandId);
    query.first().then((result) => {

        result.set('name', name);
        result.set('authorName',authorName);
        result.set('authorImage',authorImage);
        result.set('authorIntro',mdAuthorIntro);
        result.set('authorIntroEn',mdAuthorIntroEn);
        result.set('brandName',brandName);
        result.set('brandImage',brandImage);
        result.set('brandIntro',mdBrandIntro);
        result.set('brandIntroEn',mdBrandIntroEn);
        result.set('productImages',productImages);
        
        return result.save();
        
    }).then(() => {
        req.flash('success', '编辑产品品牌成功!');
        res.redirect('/product-brand');
    });
    
});

module.exports = router;