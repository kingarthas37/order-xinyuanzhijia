'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require('xtend');
var markdown = require("markdown").markdown;

//class
let ProductMethod = AV.Object.extend('ProductMethod');


//lib
let config = require('../../lib/config');

var data = extend(config.data, {
    title: '编辑产品类型',
    currentPage: 'product-method'
});

router.get('/:productMethodId', (req, res, next) => {

    if(!req.currentUser) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    var productMethodId = parseInt(req.params.productMethodId);

    data = extend(data, {
        user: req.currentUser
    });
    
    let query = new AV.Query(ProductMethod);
    query.equalTo('productMethodId',productMethodId);
    query.first().then( item => {
        data = extend(data,{
            productMethod:item
        });
        res.render('product-method/edit',data);
    });

});

router.post('/:productMethodId', (req, res) => {

    if(!req.currentUser) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let name = req.body['name'];
    let label = req.body['label'];

    let productMethodId = parseInt(req.params.productMethodId);

    let query = new AV.Query(ProductMethod);
    query.equalTo('productMethodId',productMethodId);
    query.first().then(item => {
        
        return item.save({
            name:name,
            label:label
        });
        
    }).then(() => {
        req.flash('success', '编辑商品类型成功!');
        res.redirect('/product-method');
    });

});

module.exports = router;