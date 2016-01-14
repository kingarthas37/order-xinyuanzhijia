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
    title:'淘宝发货邮件代码生成',
    currentPage:'taobao-mail-create'
});


router.get('/', function (req, res, next) {

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user
    });

    res.render('mail/taobao-mail-create', data);
    
});


router.get('/get-content',function(req,res,next) {

    var query = new AV.Query(ResourcesDownload);
    query.containedIn('resourcesDownloadId',[2,3]);
    
    query.find().then(function(results) {

        var content = '';
        for(var i=0;i<results.length;i++) {
            content += '\n';
            content += results[i].get('content');
        }
        content = content.trim();
        res.json({
            success:1,
            content:content
        });
    });
    
    
});





module.exports = router;