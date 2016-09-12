'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var config = require('../../lib/config');

//class
var Book = AV.Object.extend('Book');

//lib
var pager = require('../../lib/component/pager-str');

var data = extend(config.data,{
    title:'电子书编辑-首页',
    currentPage:'book'
});

//首页
router.get('/', function (req, res, next) {
    
    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var search = req.query['book-search'] ? req.query['book-search'].trim() : '';

    data = extend(data,{
        search:search,
        user:req.AV.user,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    async.series([

        function(cb) {
            
            var query = new AV.Query(Book);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        bookPager:pager(page,limit,count),
                        bookCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(Book);

            query.skip((page - 1) * limit);
            query.limit(limit);
            
            if(order === 'asc') {
                query.ascending("bookId");
            } else {
                query.descending('bookId');
            }

            if(search) {
                query.contains('name',search);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        book: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('book', data);
        }

    ]);

});


router.get('/remove/:bookId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var bookId = req.params.bookId;

    async.waterfall([
        function (cb) {
            var query = new AV.Query(Book);
            query.equalTo('bookId', parseInt(bookId));
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
                    res.redirect('/book');
                }
            });
        }

    ]);
});
 

module.exports = router;