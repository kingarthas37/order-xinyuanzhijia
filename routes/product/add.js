'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

var config = require('../../lib/config');

//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('ProductCategory');
var Banner = AV.Object.extend('ProductBanner');


var data = extend(config.data,{
    title:'产品编辑-添加产品',
    currentPage:'product'
});



//添加产品页
router.get('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data,{
        flash:{success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user
    });

    async.series([

        function (cb) {

            var query = new AV.Query(Category);
            query.find({
                success: function (results) {
                    data = extend(data, {
                        category: results
                    });
                    cb();
                }
            });

        }, function (cb) {

            var query = new AV.Query(Banner);
            query.find({
                success: function (results) {
                    data = extend(data, {
                        banner: results
                    });
                    cb();
                }
            });

        }, function () {
            res.render('product/add', data);
        }

    ]);

});


//添加产品页
router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var mdCodeInfo = req.body['md-code-info'] || '';
    var mdCodeBanner = req.body['md-code-banner'] || '';
    var mdCodeVideo = req.body['md-code-video'] || '';
    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeProperty = req.body['md-code-property'] || '';
    var mdCodeInstruction = req.body['md-code-instruction'] || '';
    var mdCodeDetail = req.body['md-code-detail'] || '';
    var mdCodeImage = req.body['md-code-image'] || '';
    var categoryId = parseInt(req.body['select-category']) || 1;
    
    var productLink = req.body['product-link'];
    var shopLink = req.body['shop-link'];
    var taobaoLink = req.body['taobao-link'];

    var product = new Product();

    product.set('info', mdCodeInfo);
    product.set('banner', mdCodeBanner);
    product.set('video', mdCodeVideo);
    product.set('name', mdCodeName);
    product.set('review', mdCodeReview);
    product.set('property', mdCodeProperty);
    product.set('instruction', mdCodeInstruction);
    product.set('detail', mdCodeDetail);
    product.set('image', mdCodeImage);
    product.set('categoryId', categoryId);
    product.set('productLink',productLink);
    product.set('shopLink',shopLink);
    product.set('taobaoLink',taobaoLink);

    product.save(null, {
        success: function () {

            var query = new AV.Query(Category);
            query.find({
                success: function () {
                    req.flash('success', '添加商品成功!');
                    res.redirect('/product');
                }
            });

        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;