'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;
var config = require('../../lib/config');

//class
var Music = AV.Object.extend('Music');

var data = extend(config.data,{
    title:'音乐编辑-添加音乐',
    currentPage:'music'
});

//添加产品页
router.get('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data,{
        user:req.AV.user,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    res.render('music/add', data);

});


//添加产品页
router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

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

            req.flash('success', '添加音乐成功!');
            res.redirect('/music');
            
        },
        error: function (err) {
            next(err);
        }
    });


});

module.exports = router;