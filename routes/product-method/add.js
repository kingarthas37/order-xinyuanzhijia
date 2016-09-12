'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let extend = require('xtend');

let config = require('../../lib/config');

//class
let ProductMethod = AV.Object.extend('ProductMethod');

let data = extend(config.data, {
    title: '添加产品类型',
    currentPage: 'product-method'
});

router.get('/', (req, res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data, {
        user:req.AV.user
    });

    res.render('product-method/add', data);

});


router.post('/', (req, res) => {

    if(!req.AV.user) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let name = req.body['name'];
    let label = req.body['label'];
 
    let productMethod = new ProductMethod();

    productMethod.save({
        name:name,
        label:label
    }).done(()=> {
        req.flash('success', '添加产品类型成功!');
        res.redirect('/product-method');
    });
    
});


module.exports = router;