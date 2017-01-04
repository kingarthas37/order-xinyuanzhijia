'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;
var config = require('../../lib/config');


//libs
var shot = require('../../lib/component/shot');

//class
var Music = AV.Object.extend('Music');


var data = extend(config.data,{
    title:'音乐编辑-预览音乐',
    currentPage:'music'
});

//预览产品页
router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDetail = req.body['md-code-detail'] || '';
    var mdCodeList = req.body['md-code-list'] || '';
    
    data = extend(data,{
        mdCodeName: markdown.toHTML(mdCodeName),
        mdCodeReview: markdown.toHTML(mdCodeReview),
        mdCodeDetail: markdown.toHTML(mdCodeDetail),
        mdCodeList: markdown.toHTML(mdCodeList)
    });

    res.render('music/preview', data);

});


//shot
router.post('/shot', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var name = req.body.name.substr(0, 20);
    var html = req.body.html;
    var htmlHeight = parseInt(req.body.htmlHeight);
    
    shot({
        name:name,
        html:html,
        htmlHeight:htmlHeight
    }).then(function() {
        res.json({
            "success": 1
        });
    },function(err) {
        res.send(err);
    });

});

module.exports = router;