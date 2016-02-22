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

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBrandId = parseInt(req.params.productBrandId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user,
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



router.post('/:productBrandId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBrandId = parseInt(req.body['product-brand-id']);

    var brandName = req.body['name'];

    var query = new AV.Query(ProductBrand);

    query.equalTo('brandId',productBrandId);
    query.first().then(function(result) {
        
        result.set('brandName',brandName);
        
        return result.save();
        
    }).then(function() {
        req.flash('success', '编辑产品分类成功!');
        res.redirect('/product-brand');
    });

});

module.exports = router;