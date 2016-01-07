'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var async = require('async');
var config = require('../../lib/config');
var format = require('date-format');

var flash = require('connect-flash');

//class
var Remark = AV.Object.extend('Remark');

var data = extend(config.data, {
    title: '备忘录-编辑备忘录',
    currentPage: 'remark'
});


router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }

    data = extend(data, {
        user: req.AV.user
    });

    res.render('remark/add', data);

});


router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }

    var title = req.body['title'];
    var content = req.body['content'];
    var isComplete = req.body['is-complete'] ? true : false;
    var type = req.body['type'];

    var remark = new Remark();

    async.waterfall([

        function (cb) {

            remark.set('title', title);
            remark.set('content', content);
            remark.set('isComplete', isComplete);
            remark.set('type',type);

            remark.save().then(function () {
                req.flash('success', '添加备忘录成功!');
                res.redirect('/remark');
            });
            
        }

    ]);


});

 

module.exports = router;