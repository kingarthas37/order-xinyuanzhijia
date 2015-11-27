'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Book = AV.Object.extend('Book');

var title = '电子书编辑-编辑音乐';
var currentPage = 'book';


//编辑产品页
router.get('/:bookId', function (req, res, next) {

    var bookId = parseInt(req.params.bookId);

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info'),
        id: bookId
    };

    async.series([

        function (cb) {

            var query = new AV.Query(Book);
            query.equalTo('bookId', bookId);
            query.first({
                success: function (results) {
                    datas = extend(datas, {
                        book: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('book/edit', datas);
        }

    ]);


});

router.post('/', function (req, res, next) {

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDescription = req.body['md-code-description'] || '';
    var mdCodeCatalog = req.body['md-code-catalog'] || '';
    var mdCodeAuthor = req.body['md-code-author'] || '';
    var mdCodeImage = req.body['md-code-image'] || '';

    var bookId = req.body['book-id'];

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
                success: function (results) {
                    cb(null, results.id, query);
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function (objectId, query, cb) {
            
            query.get(objectId, {
                success: function (post) {
                    post.set('name', mdCodeName);
                    post.set('review', mdCodeReview);
                    post.set('detail', mdCodeDescription);
                    post.set('author', mdCodeAuthor);
                    post.set('catalog', mdCodeCatalog);
                    post.set('image', mdCodeImage);
                    post.save(null, {
                        success: function (results) {
                            datas = extend(datas, {
                                book: results
                            });
                            
                            req.flash('info', '编辑电子书成功!');
                            res.redirect('/book');
                        },
                        error: function (err) {
                            next(err);
                        }
                    });
                },
                error: function (err) {
                    next(err);
                }

            });

        }

    ]);


});

module.exports = router;