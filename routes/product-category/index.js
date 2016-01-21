'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var ProductCategory = AV.Object.extend('ProductCategory');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '产品分类管理-首页',
    currentPage: 'product-category'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var searchProductCategoryName = req.query['search-product-category-name'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchProductCategoryName:searchProductCategoryName
    });
    
    var query = new AV.Query(ProductCategory);
    async.series([

        function(cb) {
            
            if(searchProductCategoryName) {
                query.contains('categoryName',searchProductCategoryName);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        productCategoryPager:pager(page,limit,count),
                        productCategoryCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {
            
            query.skip((page - 1) * limit);
            query.limit(limit);
            
            if(order === 'asc') {
                query.ascending('categoryId');
            } else {
                query.descending('categoryId');
            }

            if(searchProductCategoryName) {
                query.contains('categoryName',searchProductCategoryName);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        productCategory: results
                    });
                    res.render('product-category', data);
                },
                error: function (err) {
                    next(err);
                }
            });
            
        }

    ]);

});


module.exports = router;