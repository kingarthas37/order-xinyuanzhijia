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


//首页
router.get('/:resourcesDownloadId', function (req, res, next) {

    if (!req.AV.user) {
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
        
        var html = markdown.toHTML(result.get('content'));
        html = html.replace(/(http[^\s]+)/g,'<a target="_blank" href="$1">$1</a>');
        
        data = extend(data,{
            resourcesDownload:result,
            html:html
        });
        return res.render('resources-download/preview',data);
    });

});

module.exports = router;