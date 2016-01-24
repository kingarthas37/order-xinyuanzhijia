'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var Product = AV.Object.extend('Product');
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



router.get('/remove/:productCategoryId', function (req,res) {

    if(!req.AV.user) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }

    var categoryId = parseInt(req.params.productCategoryId);
    
    
    var queryProduct = new AV.Query(Product);
    queryProduct.equalTo('categoryId',categoryId);
    queryProduct.first().then(function(result) {
        
        if(result) {
            res.json({
                success:0,
                msg:'此分类已绑定产品,无法删除,请先更改产品相关分类再删除'
            });
            return AV.Promise.error('此分类已绑定产品,无法删除,请先更改产品相关分类再删除');
        }

        var query = new AV.Query(ProductCategory);
        query.equalTo('categoryId',categoryId );
        return query.first();
        
    }).then(function(result) {
        result.destroy({
            success: function () {
                req.flash('success', '删除成功!');
                return res.json({
                    success:1
                });
            }
        });
    });
 
});



module.exports = router;