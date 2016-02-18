'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var extend = require("xtend");

var config = require('../../lib/config');

//class
var Product = AV.Object.extend('Product');
var ProductBrand = AV.Object.extend('ProductBrand');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '品牌管理-首页',
    currentPage: 'product-brand'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var searchProductBrandName = req.query['search-product-brand-name'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchProductBrandName:searchProductBrandName
    });
    
    var query = new AV.Query(ProductBrand);
    if(searchProductBrandName) {
        query.contains('brandName',searchProductBrandName);
    }
    
    query.count().then((count)=> {
        
        data = extend(data,{
            productBrandPager:pager(page,limit,count),
            productBrandCount:count
        });

        query.skip((page - 1) * limit);
        query.limit(limit);

        if(order === 'asc') {
            query.ascending('productBrandId');
        } else {
            query.descending('productBrandId');
        }

        if(searchProductBrandName) {
            query.contains('brandName',searchProductBrandName);
        }
        
        return query.find();
        
    }).then((results) => {

        data = extend(data, {
            productBrand: results
        });
        res.render('product-brand', data);
        
    });
    
     
});



router.get('/remove/:productBrandId', function (req,res) {

    if(!req.AV.user) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }

    var brandId = parseInt(req.params.productBrandId);
    
    
    var queryProduct = new AV.Query(Product);
    queryProduct.equalTo('brandId',brandId);
    queryProduct.first().then(function(result) {
        
        if(result) {
            res.json({
                success:0,
                msg:'此分类已绑定产品,无法删除,请先更改产品相关分类再删除'
            });
            return AV.Promise.error('此分类已绑定产品,无法删除,请先更改产品相关分类再删除');
        }

        var query = new AV.Query(ProductBrand);
        query.equalTo('brandId',brandId );
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