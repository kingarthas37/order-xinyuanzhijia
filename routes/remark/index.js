'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var Remark = AV.Object.extend('Remark');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '备忘录-首页',
    currentPage: 'remark'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var searchRemarkTitle = req.query['search-remark-title'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchRemarkTitle:searchRemarkTitle
    });
    
    var query = new AV.Query(Remark);
    async.series([

        function(cb) {
            
            if(searchRemarkTitle) {
                query.contains('title',searchRemarkTitle);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        remarkPager:pager(page,limit,count),
                        remarkCount:count
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
                query.ascending('remarkId');
            } else {
                query.descending('remarkId');
            }

            if(searchRemarkTitle) {
                query.contains('title',searchRemarkTitle);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        remark: results
                    });
                    res.render('remark', data);
                },
                error: function (err) {
                    next(err);
                }
            });
            
        }

    ]);

});


router.get('/remove/:remarkId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }

    var remarkId = req.params.remarkId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(Remark);
            query.equalTo('remarkId', parseInt(remarkId));
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
                    res.redirect('/remark');
                }
            });
        }

    ]);
});

module.exports = router;