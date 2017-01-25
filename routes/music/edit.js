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
    title:'音乐编辑-编辑音乐',
    currentPage:'music'
});

//编辑产品页
router.get('/:musicId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var musicId = parseInt(req.params.musicId);

    data = extend(data,{
        id: musicId,
        user:req.currentUser,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });
 

    async.series([

        function (cb) {

            var query = new AV.Query(Music);
            query.equalTo('musicId', musicId);
            query.first({
                success: function (results) {
                    data = extend(data, {
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
            res.render('music/edit', data);
        }

    ]);


});

router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDetail = req.body['md-code-detail'] || '';
    var mdCodeList = req.body['md-code-list'] || '';

    var musicId = req.body['music-id'];

    data = extend(data,{
        user:req.currentUser,
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

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
                            data = extend(data, {
                                music: results
                            });
                            
                            req.flash('success', '编辑音乐成功!');
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