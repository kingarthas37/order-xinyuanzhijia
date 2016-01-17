'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;
var config = require('../../lib/config');

//class
var Book = AV.Object.extend('Book');

var data = extend(config.data,{
    title:'电子书编辑-编辑音乐',
    currentPage:'book'
});


//编辑产品页
router.get('/:bookId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var bookId = parseInt(req.params.bookId);

    data = extend(data,{
        id: bookId,
        user:req.AV.user,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    async.series([

        function (cb) {

            var query = new AV.Query(Book);
            query.equalTo('bookId', bookId);
            query.first({
                success: function (results) {
                    data = extend(data, {
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
            res.render('book/edit', data);
        }

    ]);


});

router.post('/', function (req, res, next) {
    
    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDescription = req.body['md-code-description'] || '';
    var mdCodeCatalog = req.body['md-code-catalog'] || '';
    var mdCodeAuthor = req.body['md-code-author'] || '';
    var mdCodeImage = req.body['md-code-image'] || '';

    var bookId = req.body['book-id'];
    
    data = extend(data,{
        user:req.AV.user,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

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
                            data = extend(data, {
                                book: results
                            });
                            
                            req.flash('success', '编辑电子书成功!');
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