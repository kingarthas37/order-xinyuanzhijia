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
    title:'电子书编辑-添加音乐',
    currentPage:'book'
});

//添加产品页
router.get('/', function (req, res, next) {
    
    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data,{
        user:req.currentUser,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });
    res.render('book/add',data);
});


//添加产品页
router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

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
            req.flash('success', '添加电子书成功!');
            res.redirect('/book');
            
        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;