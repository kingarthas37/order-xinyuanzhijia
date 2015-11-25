'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;


//libs
var shot = require('../../lib/shot');

//class
var Music = AV.Object.extend('Music');

var title = '音乐编辑-预览音乐';
var currentPage = 'music';


//预览产品页
router.post('/', function (req, res, next) {

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDetail = req.body['md-code-detail'] || '';
    var mdCodeList = req.body['md-code-list'] || '';
    
    var datas = {
        title: title,
        currentPage: currentPage,
        mdCodeName: markdown.toHTML(mdCodeName),
        mdCodeReview: markdown.toHTML(mdCodeReview),
        mdCodeDetail: markdown.toHTML(mdCodeDetail),
        mdCodeList: markdown.toHTML(mdCodeList)
    };

    res.render('music/preview', datas);

});


//shot
router.post('/shot', function (req, res, next) {

    var name = req.body.name.substr(0, 20);
    var html = req.body.html;
    var htmlHeight = parseInt(req.body.htmlHeight);
    
    shot({
        name:name,
        html:html,
        htmlHeight:htmlHeight
    },function() {
        res.json({
            "success": 1
        });
    },function(err) {
        res.send(err);
    });

});

module.exports = router;