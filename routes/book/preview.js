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
var Book = AV.Object.extend('Book');

var data = extend(config.data,{
    title:'电子书编辑-预览电子书',
    currentPage:'book'
});


//预览产品页
router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var mdCodeName = req.body['md-code-name'] || '';
    var mdCodeReview = req.body['md-code-review'] || '';
    var mdCodeDescription = req.body['md-code-description'] || '';
    var mdCodeAuthor = req.body['md-code-author'] || '';
    var mdCodeCatalog = req.body['md-code-catalog'] || '';
    var mdCodeImage = req.body['md-code-image'] || '';
    
    data = extend(data,{
        mdCodeName: markdown.toHTML(mdCodeName),
        mdCodeReview: markdown.toHTML(mdCodeReview),
        mdCodeDescription: markdown.toHTML(mdCodeDescription),
        mdCodeAuthor: markdown.toHTML(mdCodeAuthor),
        mdCodeCatalog: markdown.toHTML(mdCodeCatalog),
        mdCodeImage: markdown.toHTML(mdCodeImage)
    });

    res.render('book/preview', data);

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