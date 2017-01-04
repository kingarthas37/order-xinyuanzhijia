'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var markdown = require("markdown").markdown;

var config = require('../../lib/config');

//class
var ResourcesDownload = AV.Object.extend('ResourcesDownload');


var data =  extend(config.data,{
    title:'资源下载管理',
    currentPage:'resources-download'
});


router.get('/:resourcesDownloadId', function (req, res, next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var resourcesDownloadId = parseInt(req.params.resourcesDownloadId);

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user
    });

    var query = new AV.Query(ResourcesDownload);

    query.equalTo('resourcesDownloadId',resourcesDownloadId);

    query.first().then(function(result) {

        var markdown = result.get('content');

        data = extend(data,{
            resourcesDownload:result,
            markdown:markdown
        });
        return res.render('resources-download/edit',data);
    });

});


router.post('/',function(req,res,next) {

    if (!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var resourcesDownloadId = parseInt(req.body['resources-download-id']);

    var content = req.body['content'];

    var query = new AV.Query(ResourcesDownload);
    
    query.equalTo('resourcesDownloadId',resourcesDownloadId);
    query.first().then(function(result) {
        result.set('content',content);
        return result.save();
    }).then(function(result) {
        req.flash('success', '编辑资源下载管理成功!');
        res.redirect('/resources-download');
    });
    
});

module.exports = router;