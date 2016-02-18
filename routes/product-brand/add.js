'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var ProductCategory = AV.Object.extend('ProductCategory');

var data = extend(config.data, {
    title: '产品分类-编辑产品分类',
    currentPage: 'remark'
});


router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data, {
        user: req.AV.user
    });

    res.render('product-category/add', data);

});


router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var categoryName = req.body['name'];

    var productCategory = new ProductCategory();

    async.waterfall([
        function (cb) {
            productCategory.set('categoryName', categoryName);
            productCategory.save().then(function () {
                req.flash('success', '添加产品分类成功!');
                res.redirect('/product-category');
            });
        }
    ]);


});


module.exports = router;