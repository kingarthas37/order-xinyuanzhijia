'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');

//class
var Product = AV.Object.extend('Product');

//删除产品
router.get('/:productId', function (req, res, next) {

    var productId = req.params.productId;

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
                    req.flash('success', '删除成功!');
                    res.redirect('/product');
                }
            });
        }

    ]);
});


module.exports = router;