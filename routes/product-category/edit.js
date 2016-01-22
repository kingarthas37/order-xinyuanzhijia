'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var ProductCategory = AV.Object.extend('ProductCategory');

var data =  extend(config.data,{
    title:'产品分类-编辑产品分类',
    currentPage:'productCategory'
});


//编辑产品页
router.get('/:productCategoryId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productCategoryId = parseInt(req.params.productCategoryId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user,
        productCategoryId: productCategoryId
    });

    var query = new AV.Query(ProductCategory);
    query.equalTo('categoryId', productCategoryId);
    query.first().then(function(result) {
        data = extend(data, {
            productCategory: result
        });
        res.render('product-category/edit', data);
    });

});



router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productCategoryId = parseInt(req.body['product-category-id']);

    var categoryName = req.body['name'];

    var query = new AV.Query(ProductCategory);

    query.equalTo('categoryId',productCategoryId);
    query.first().then(function(result) {
        
        result.set('categoryName',categoryName);
        
        return result.save();
        
    }).then(function() {
        req.flash('success', '编辑产品分类成功!');
        res.redirect('/product-category');
    });

});

module.exports = router;