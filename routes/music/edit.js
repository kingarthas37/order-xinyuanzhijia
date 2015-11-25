'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Music = AV.Object.extend('Music');

var title = '音乐编辑-编辑音乐';
var currentPage = 'music';


//编辑产品页
router.get('/:musicId', function (req, res, next) {

    var musicId = parseInt(req.params.musicId);

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info'),
        id: musicId
    };

    async.series([

        function (cb) {

            var query = new AV.Query(Music);
            query.equalTo('musicId', musicId);
            query.first({
                success: function (results) {
                    datas = extend(datas, {
                        music: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('music/edit', datas);
        }

    ]);


});

router.post('/', function (req, res, next) {

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDetail = req.body['md-code-detail'] || '';
    var mdCodeList = req.body['md-code-list'] || '';

    var musicId = req.body['music-id'];

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

    async.waterfall([

        function (cb) {

            var query = new AV.Query(Music);
            query.equalTo('musicId', parseInt(musicId));
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
                    post.set('detail', mdCodeDetail);
                    post.set('list', mdCodeList);
                    post.save(null, {
                        success: function (results) {
                            datas = extend(datas, {
                                music: results
                            });
                            
                            req.flash('info', '编辑音乐成功!');
                            res.redirect('/music');
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