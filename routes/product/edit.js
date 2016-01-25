'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('ProductCategory');
var Banner = AV.Object.extend('ProductBanner');

//lib
var config = require('../../lib/config');

var data = extend(data,{
    title:'产品编辑-编辑产品',
    currentPage:'product'
});


//编辑产品页
router.get('/:productId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productId = parseInt(req.params.productId);

    data = extend(data,{
        id: productId,
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });
   

    async.series([

        function (cb) {

            var query = new AV.Query(Product);
            query.equalTo('productId', productId);
            query.first({
                success: function (results) {
                    data = extend(data, {
                        product: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function (cb) {

            var query = new AV.Query(Banner);
            query.find({
                success: function (results) {
                    data = extend(data, {
                        banner: results
                    });
                    cb();
                }
            });

        },

        function (cb) {

            var query = new AV.Query(Category);
            query.find({
                success: function (results) {
                    data = extend(data, {
                        category: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('product/edit', data);
        }

    ]);


});

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
    var comment = req.body['comment'];

    productLink = utils.urlCompleting(productLink);
    shopLink = utils.urlCompleting(shopLink);
    taobaoLink = utils.urlCompleting(taobaoLink);

    var productId = req.body['product-id'];

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });

    async.waterfall([

        function (cb) {

            var query = new AV.Query(Product);
            query.equalTo('productId', parseInt(productId));
            query.first({
                success: function (results) {
                    cb(null, results.id, query);
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function (objectId, query, cb) {
            
            query.get(objectId, {
                success: function (post) {
                    post.set('info', mdCodeInfo);
                    post.set('banner', mdCodeBanner);
                    post.set('video', mdCodeVideo);
                    post.set('name', mdCodeName);
                    post.set('review', mdCodeReview);
                    post.set('property', mdCodeProperty);
                    post.set('instruction', mdCodeInstruction);
                    post.set('detail', mdCodeDetail);
                    post.set('image', mdCodeImage);
                    post.set('categoryId', categoryId);
                    post.set('productLink',productLink);
                    post.set('shopLink',shopLink);
                    post.set('taobaoLink',taobaoLink);
                    post.set('comment',comment);
                    post.save(null, {
                        success: function (results) {
                            data = extend(data, {
                                product: results
                            });
                            cb(null);
                        },
                        error: function (err) {
                            next(err);
                        }
                    });
                },
                error: function (err) {
                    next(err);
                }

            });

        },
        function (cb) {

            var query = new AV.Query(Banner);
            query.find({
                success: function (results) {
                    data = extend(data, {
                        banner: results
                    });
                    cb();
                }
            });

        },
        function (cb) {
            var query = new AV.Query(Category);
            query.find({
                success: function (results) {
                    data = extend(data, {
                        category: results
                    });
                    req.flash('success', '编辑商品成功!');
                    res.redirect('/product');
                }
            });

        }

    ]);

});

module.exports = router;