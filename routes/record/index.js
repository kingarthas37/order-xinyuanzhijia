'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var config = require('../../lib/config');

//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('ProductCategory');

//lib
var pager = require('../../lib/pager');

var data = extend(config.data,{
    title: '产品编辑-首页',
    currentPage: 'product'
});

 

//首页
router.get('/', function (req, res, next) {
    
    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';

    var categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : '';
    
    var search = req.query['product-search'] ? req.query['product-search'].trim() : '';

    data = extend(data,{
        categoryId:categoryId,
        search:search,
        flash:{success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user
    });
    
    async.series([

        function(cb) {
            var query = new AV.Query(Product);
            
            if(categoryId) {
                query.equalTo('categoryId',categoryId);
            }
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        productPager:pager(page,limit,count),
                        productCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(Product);

            query.skip((page - 1) * limit);
            query.limit(limit);

            if(order === 'asc') {
                query.ascending('productId');
            } else {
                query.descending('productId');
            }

            if(categoryId) {
                query.equalTo('categoryId',categoryId);
            }

            if(search) {
                query.contains('name',search);
            }

            query.find({
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

            var query = new AV.Query(Category);
            query.find({
                success: function (results) {
                    data = extend(data,{
                        category:results
                    });
                    for (var i in data.product) {
                        data.product[i].set('categoryName', (function () {
                            for (var _i in results) {
                                if (results[_i].get('categoryId') === data.product[i].get('categoryId')) {
                                    return results[_i].get('categoryName');
                                }
                            }
                        })());
                    }
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('product', data);
        }

    ]);

});


router.get('/remove/:productId', function (req, res, next) {

    var productId = req.params.productId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(Product);
            query.equalTo('productId', parseInt(productId));
            query.first({

                success: function (object) {
                    cb(null, object);
                },

                error: function (err) {
                    next(err);
                }

            });
        },
        function (object, cb) {
            object.destroy({
                success: function () {
                    req.flash('success', '删除成功!');
                    res.redirect('/product');
                }
            });
        }

    ]);
});

module.exports = router;