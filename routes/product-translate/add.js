'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let extend = require('xtend');

let config = require('../../lib/config');

//class
let ProductTranslate = AV.Object.extend('ProductTranslate');

let data = extend(config.data, {
    title: '添加产品翻译',
    currentPage: 'product-translate'
});


router.get('/', (req, res) => {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data, {
        user:req.currentUser
    });

    res.render('product-translate/add', data);

});


router.post('/', (req, res) => {

    if(!req.currentUser) {
        return res.redirect(`/?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let title = req.body['title'];
    let detail = req.body['detail'];
    let isFinish = req.body['is-finish'];
    isFinish = (isFinish == 'on' ? true : false);
    let productTranslate = new ProductTranslate();
    productTranslate.save({
        title:title,
        detail:detail,
        isFinish:isFinish
    }).done(()=> {
        req.flash('success', '添加产品翻译成功!');
        res.redirect('/product-translate');
    });

});


module.exports = router;