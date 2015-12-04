'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");


//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('ProductCategory');
var Banner = AV.Object.extend('ProductBanner');

//lib
var pager = require('../../lib/pager');

var data = {
    title: '产品编辑-首页',
    currentPage: 'product',
    info:{success:null,error:null},
    user:null
};

//首页
router.get('/', function (req, res, next) {
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var order = req.query.order || 'desc';

    var categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : '';
    
    var search = req.query['product-search'] ? req.query['product-search'].trim() : '';

    var datas = {
        title: title,
        currentPage: currentPage,
        categoryId:categoryId,
        search:search,
        info: req.flash('info')
    };

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
                    datas = extend(datas,{
                        productPager:pager(page,limit,count)
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

            var query = new AV.Query(Category);
            query.find({
                success: function (results) {
                    datas = extend(datas,{
                        category:results
                    });
                    for (var i in datas.product) {
                        datas.product[i].set('categoryName', (function () {
                            for (var _i in results) {
                                if (results[_i].get('categoryId') === datas.product[i].get('categoryId')) {
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
            res.render('product', datas);
        }

    ]);

});

 

module.exports = router;