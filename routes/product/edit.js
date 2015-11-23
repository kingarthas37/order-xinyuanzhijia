'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('Category');
var Banner = AV.Object.extend('Banner');

//lib
var pager = require('../../lib/pager');

var title = '产品编辑-编辑产品';
var currentPage = 'product';



//编辑产品页
router.get('/:productId', function (req, res, next) {

    var productId = parseInt(req.params.productId);

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info'),
        id: productId
    };

    async.series([

        function (cb) {

            var query = new AV.Query(Product);
            query.equalTo('productId', productId);
            query.first({
                success: function (results) {
                    datas = extend(datas, {
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
                    datas = extend(datas, {
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
                    datas = extend(datas, {
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
            res.render('product/edit', datas);
        }

    ]);


});

router.post('/:productId', function (req, res, next) {

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

    var productId = req.params.productId;

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

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
                    post.save(null, {
                        success: function (results) {
                            datas = extend(datas, {
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
                    datas = extend(datas, {
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

                    datas = extend(datas, {
                        category: results
                    });

                    req.flash('info', '编辑商品成功!');
                    res.render('product/edit', datas);

                }
            });

        }

    ]);


});

module.exports = router;