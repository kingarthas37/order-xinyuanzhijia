'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Music = AV.Object.extend('Music');


var title = '音乐编辑-添加音乐';
var currentPage = 'music';


//添加产品页
router.get('/', function (req, res, next) {

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

    res.render('music/add', datas);

});


//添加产品页
router.post('/', function (req, res, next) {

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDetail = req.body['md-code-detail'] || '';
    var mdCodeList = req.body['md-code-list'] || '';

    var music = new Music();

    music.set('name', mdCodeName);
    music.set('review', mdCodeReview);
    music.set('detail', mdCodeDetail);
    music.set('list', mdCodeList);

    music.save(null, {
        success: function (data) {

            req.flash('info', '添加音乐成功!');
            res.redirect('/music');
            
        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;