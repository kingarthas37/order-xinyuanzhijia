'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var ProductBook = AV.Object.extend('ProductBook');

var data =  extend(config.data,{
    title:'预定记录-编辑预定记录',
    currentPage:'product-book'
});

//编辑产品页
router.get('/:productBookId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBookId = parseInt(req.params.productBookId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user,
        productBookId: productBookId
    });

    async.series([

        function (cb) {

            var query = new AV.Query(ProductBook);
            query.equalTo('productBookId', productBookId);
            query.first({
                success: function (results) {
                    data = extend(data, {
                        productBook: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('product-book/edit', data);
        }

    ]);


});

router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var productBookId = parseInt(req.body['product-book-id']);

    var title = req.body['title'];
    var comment = req.body['comment'];
    var isComplete = req.body['is-complete'] ? true : false;
    
    var query = new AV.Query(ProductBook);

    query.equalTo('productBookId',productBookId);
    query.first().then(function(result) {
        result.set('title',title);
        result.set('comment',comment);
        result.set('isComplete',isComplete);
        return result.save();
    }).then(function() {
        req.flash('success', '编辑预定记录成功!');
        res.redirect('/product-book');
    });

});

module.exports = router;