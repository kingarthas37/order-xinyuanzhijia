'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('Category');
var Banner = AV.Object.extend('Banner');


var title = '产品编辑-删除产品';
var currentPage = 'product';



//删除产品
router.get('/:productId', function (req, res, next) {

    var productId = req.params.productId;

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

    async.waterfall([

        function (cb) {
            var query = new AV.Query(Product);
            query.equalTo('productId', parseInt(productId));
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
                    req.flash('info', '删除成功!');
                    res.redirect('/product');
                }
            });
        }

    ]);
});


module.exports = router;