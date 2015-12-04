'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Music = AV.Object.extend('Music');


//删除音乐
router.get('/:musicId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }

    var musicId = req.params.musicId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(Music);
            query.equalTo('musicId', parseInt(musicId));
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
                    res.redirect('/music');
                }
            });
        }

    ]);
});


module.exports = router;