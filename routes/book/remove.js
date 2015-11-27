'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Book = AV.Object.extend('Book');


var title = '电子书编辑-删除电子书';
var currentPage = 'book';


//删除音乐
router.get('/:bookId', function (req, res, next) {

    var bookId = req.params.bookId;

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

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
                    req.flash('info', '删除成功!');
                    res.redirect('/book');
                }
            });
        }

    ]);
});


module.exports = router;