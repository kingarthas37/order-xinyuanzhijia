'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Book = AV.Object.extend('Book');

var title = '电子书编辑-添加音乐';
var currentPage = 'book';


//添加产品页
router.get('/', function (req, res, next) {

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

    res.render('book/add', datas);

});


//添加产品页
router.post('/', function (req, res, next) {

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDescription = req.body['md-code-description'] || '';
    var mdCodeAuthor = req.body['md-code-author'] || '';
    var mdCodeCatalog = req.body['md-code-catalog'] || '';
    var mdCodeImage = req.body['md-code-image'] || '';

    var book = new Book();

    book.set('name', mdCodeName);
    book.set('review', mdCodeReview);
    book.set('description', mdCodeDescription);
    book.set('author', mdCodeAuthor);
    book.set('catalog', mdCodeCatalog);
    book.set('image', mdCodeImage);

    book.save(null, {
        success: function () {

            req.flash('info', '添加电子书成功!');
            res.redirect('/book');
            
        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;