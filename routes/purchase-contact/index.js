'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var PurchaseContact = AV.Object.extend('PurchaseContact');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title:'添加网站联系方式-首页',
    currentPage:'purchase-contact'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var search = req.query['purchase-contact-search'] ? req.query['purchase-contact-search'].trim() : '';

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        search:search
    });

    async.series([

        function(cb) {
            
            var query = new AV.Query(PurchaseContact);
            
            if(search) {
                query.contains('name',search);
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        purchaseContactPager:pager(page,limit,count),
                        purchaseContactCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(PurchaseContact);

            query.skip((page - 1) * limit);
            query.limit(limit);
            
            if(order === 'asc') {
                query.ascending("purchaseContactId");
            } else {
                query.descending('purchaseContactId');
            }

            if(search) {
                query.contains('name',search);
            }

            query.find({
                success: function (results) {
                    data = extend(data, {
                        purchaseContact: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('purchase-contact', data);
        }

    ]);

});



router.get('/remove/:purchaseContactId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var purchaseContactId = req.params.purchaseContactId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(PurchaseContact);
            query.equalTo('purchaseContactId', parseInt(purchaseContactId));
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
                    res.redirect('/purchase-contact');
                }
            });
        }

    ]);
});




module.exports = router;