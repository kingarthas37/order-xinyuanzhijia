'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var ProductBook = AV.Object.extend('ProductBook');

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
    
    var searchProductBookTitle = req.query['search-product-book-title'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchProductBookTitle:searchProductBookTitle
    });
    
    var query = new AV.Query(ProductBook);
    async.series([

        function(cb) {
            
            if(searchProductBookTitle) {
                query.contains('title',searchProductBookTitle);
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

            if(searchProductBookTitle) {
                query.contains('title',searchProductBookTitle);
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
    
    var id = parseInt(req.query.id);
    var checked = req.query.checked;

    
    var query = new AV.Query(ProductBook);
    
    query.equalTo('id',id);
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

module.exports = router;