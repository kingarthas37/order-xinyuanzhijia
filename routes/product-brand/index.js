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
var pager = require('../../lib/component/pager-str');

var data =  extend(config.data,{
    title: '品牌管理-首页',
    currentPage: 'product-brand'
});


//首页
router.get('/', function (req, res, next) {
    
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var searchName = req.query['search-name'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.currentUser,
        searchName:searchName
    });
    
    var query = new AV.Query(ProductBrand);
    if(searchName) {
        query.contains('name',searchName);
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

        if(searchName) {
            query.contains('name',searchName);
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

    if(!req.currentUser) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }
    let productBrandId = parseInt(req.params.productBrandId);
    let query = new AV.Query(ProductBrand);
    query.equalTo('productBrandId',productBrandId);
    query.first().then((result) => {
        return result.destroy();
    }).then(() => {
        req.flash('success', '删除成功!');
        return res.redirect('/product-brand');
    });
 
});


module.exports = router;