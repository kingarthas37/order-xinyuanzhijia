'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");


//class
var Music = AV.Object.extend('Music');

//lib
var pager = require('../../lib/pager');

var title = '音乐编辑-首页';
var currentPage = 'music';

//首页
router.get('/', function (req, res, next) {
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var order = req.query.order || 'desc';
    
    var search = req.query['product-search'] ? req.query['product-search'].trim() : '';

    var datas = {
        title: title,
        currentPage: currentPage,
        search:search,
        info: req.flash('info')
    };

    async.series([

        function(cb) {
            
            var query = new AV.Query(Music);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    datas = extend(datas,{
                        musicPager:pager(page,limit,count)
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(Music);

            query.skip((page - 1) * limit);
            query.limit(limit);
            query.descending(order);

            if(search) {
                query.contains('name',search);
            }

            query.find({
                success: function (results) {
                    datas = extend(datas, {
                        music: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('music', datas);
        }

    ]);

});

 

module.exports = router;