'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");


//class
var Book = AV.Object.extend('Book');

//lib
var pager = require('../../lib/pager');

var title = '电子书编辑-首页';
var currentPage = 'book';

//首页
router.get('/', function (req, res, next) {
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var order = req.query.order || 'desc';
    
    var search = req.query['book-search'] ? req.query['book-search'].trim() : '';

    var datas = {
        title: title,
        currentPage: currentPage,
        search:search,
        info: req.flash('info')
    };

    async.series([

        function(cb) {
            
            var query = new AV.Query(Book);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    datas = extend(datas,{
                        bookPager:pager(page,limit,count)
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
                    datas = extend(datas, {
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
            res.render('book', datas);
        }

    ]);

});

 

module.exports = router;