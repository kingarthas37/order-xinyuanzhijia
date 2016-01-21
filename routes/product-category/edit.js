'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Remark = AV.Object.extend('Remark');

var data =  extend(config.data,{
    title:'备忘录-编辑备忘录',
    currentPage:'remark'
});


//编辑产品页
router.get('/:remarkId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var remarkId = parseInt(req.params.remarkId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user,
        id: remarkId
    });

    async.series([

        function (cb) {

            var query = new AV.Query(Remark);
            query.equalTo('remarkId', remarkId);
            query.first({
                success: function (results) {
                    data = extend(data, {
                        remark: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('remark/edit', data);
        }

    ]);


});

router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var remarkId = parseInt(req.body['remark-id']);

    var title = req.body['title'];
    var content = req.body['content'];
    var isComplete = req.body['is-complete'] ? true : false;
    var type = req.body['type'];
    

    var query = new AV.Query(Remark);

    query.equalTo('remarkId',remarkId);
    query.first().then(function(result) {
        result.set('title',title);
        result.set('content',content);
        result.set('type',type);
        result.set('isComplete',isComplete);
        return result.save();
    }).then(function() {
        req.flash('success', '编辑备忘录成功!');
        res.redirect('/remark');
    });

});

module.exports = router;