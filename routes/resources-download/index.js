'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var ResourcesDownload = AV.Object.extend('ResourcesDownload');


var data =  extend(config.data,{
    title:'资源下载管理',
    currentPage:'resources-download'
});



//首页
router.get('/', function (req, res, next) {
    
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.currentUser
    });

    var query = new AV.Query(ResourcesDownload);

    query.ascending("resourcesDownloadId");
    
    query.find().then(function(results) {
        data = extend(data,{
            resourcesDownload:results
        });
        return res.render('resources-download',data);
    });

});



module.exports = router;