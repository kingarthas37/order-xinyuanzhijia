'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require('xtend');
var markdown = require("markdown").markdown;

//class
let ProductTranslate = AV.Object.extend('ProductTranslate');


//lib
let config = require('../../lib/config');

var data = extend(config.data, {
    title: '编辑产品翻译',
    currentPage: 'product-translate'
});

router.get('/:productTranslateId', (req, res, next) => {

    if(!req.currentUser) {
        return res.redirect(`/?return=${encodeURIComponent(req.originalUrl)}`);
    }

    var productTranslateId = parseInt(req.params.productTranslateId);

    data = extend(data, {
        user: req.currentUser
    });

    let query = new AV.Query(ProductTranslate);
    query.equalTo('productTranslateId',productTranslateId);
    query.first().then( item => {
        data = extend(data,{
            productTranslate:item
        });
        res.render('product-translate/edit',data);
    });

});

router.post('/:productTranslateId', (req, res) => {

    if(!req.currentUser) {
        return res.redirect(`/?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let title = req.body['title'];
    let detail = req.body['detail'];
    let isFinish = req.body['is-finish'];

    let productTranslateId = parseInt(req.params.productTranslateId);

    let query = new AV.Query(ProductTranslate);
    query.equalTo('productTranslateId',productTranslateId);
    query.first().then(item => {

        return item.save({
            title:title,
            detail:detail,
            isFinish:isFinish
        });

    }).then(() => {
        req.flash('success', '编辑商品翻译成功!');
        res.redirect('/product-translate');
    });

});

module.exports = router;