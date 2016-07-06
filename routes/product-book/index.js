'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var ProductBook = AV.Object.extend('ProductBook');
var Customer = AV.Object.extend('Customer');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '客户预定-首页',
    currentPage: 'product-book'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var searchProduct = req.query['search-product'];
    var searchName = req.query['search-name'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchProduct,
        searchName
    });
    
    var query = new AV.Query(ProductBook);
    
    async.series([

        function(cb) {
            
            if(searchProduct) {
                query.contains('productTitle',searchProduct);
            }

            if(searchName) {
                let query1 = new AV.Query(ProductBook);
                query1.contains('name',searchName);
                let query2 = new AV.Query(ProductBook);
                query2.contains('taobao',searchName);
                let query3 = new AV.Query(ProductBook);
                query3.contains('weixin',searchName);
                query = new AV.Query.or(query1,query2,query3);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        productBookPager:pager(page,limit,count),
                        productBookCount:count
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
                query.ascending('id');
            } else {
                query.descending('id');
            }

            if(searchProduct) {
                query.contains('productTitle',searchProduct);
            }

            if(searchName) {
                let query1 = new AV.Query(ProductBook);
                query1.contains('name',searchName);
                let query2 = new AV.Query(ProductBook);
                query2.contains('taobao',searchName);
                let query3 = new AV.Query(ProductBook);
                query3.contains('weixin',searchName);
                query = new AV.Query.or(query1,query2,query3);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        productBook: results
                    });
                    res.render('product-book', data);
                },
                error: function (err) {
                    next(err);
                }
            });
            
        }

    ]);

});


router.get('/remove/:id', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var id = req.params.id;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(ProductBook);
            query.equalTo('id', parseInt(id));
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
                    res.redirect('/producb-book');
                }
            });
        }

    ]);
});


router.get('/complete',function(req,res) {

    if(!req.AV.user) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }
    
    var productBookId = parseInt(req.query.productBookId);
    var checked = req.query.checked;
    
    var query = new AV.Query(ProductBook);
    
    query.equalTo('productBookId',productBookId);
    query.first().then(function(result) {
        
        result.set('isComplete',(checked === 'true' ? true : false));
        return result.save();
        
    }).then(function(result) {
        res.json({
            success:1,
            result:result
        });
    });
    
});


router.get('/get-customer-name',(req,res)=> {

    if(!req.AV.user) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }

    let name = req.query.name;

    let queryName = new AV.Query(Customer);
    queryName.startsWith('name',name);
    
    let queryTaobao = new AV.Query(Customer);
    queryTaobao.startsWith('taobao',name);
    
    let queryWeixin = new AV.Query(Customer);
    queryWeixin.startsWith('weixin',name);
    
    let query = AV.Query.or(queryName,queryTaobao,queryWeixin);
    
    let jsonData = [];

    query.find().then((results) => {
        
        for(let i=0;i<results.length;i++) {
            let obj = {
                "value":results[i].get('name'),
                "taobao":results[i].get('taobao'),
                "weixin":results[i].get('weixin'),
                "customerId":results[i].get('customerId')
            };
            jsonData.push(obj);
        }
        return res.json(jsonData);
    });
    
});

module.exports = router;