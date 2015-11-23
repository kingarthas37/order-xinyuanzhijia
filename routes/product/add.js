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

var title = '产品编辑-添加产品';
var currentPage = 'product';



//添加产品页
router.get('/', function (req, res, next) {

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

    async.series([

        function (cb) {

            var query = new AV.Query(Category);
            query.find({
                success: function (results) {
                    datas = extend(datas, {
                        category: results
                    });
                    cb();
                }
            });

        }, function (cb) {

            var query = new AV.Query(Banner);
            query.find({
                success: function (results) {
                    datas = extend(datas, {
                        banner: results
                    });
                    cb();
                }
            });

        }, function () {
            res.render('product/add', datas);
        }

    ]);

});


//添加产品页
router.post('/', function (req, res, next) {

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

    product.save(null, {
        success: function (data) {


            var query = new AV.Query(Category);
            query.find({
                success: function (results) {

                    req.flash('info', '添加商品成功!');
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