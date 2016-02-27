'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

var config = require('../../lib/config');
var utils = require('../../lib/utils');

//class
var Record = AV.Object.extend('Record');
var RecordCategory = AV.Object.extend('RecordCategory');


var data = extend(config.data,{
    title:'添加录入产品',
    currentPage:'record'
});


//添加
router.get('/', (req, res, next) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data,{
        flash:{success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user
    });

    res.render('record/add', data);

});


//添加产品页
router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    let mdCodeBanner = req.body['md-code-banner'] || '';
    let mdCodeVideo = req.body['md-code-video'] || '';
    let mdCodeName = req.body['md-code-name'] || '';
    let mainImage = req.body['main-image'];
    let mdCodeNameEn = req.body['md-code-name-en'] || '';
    let mdCodeReview = req.body['md-code-review'] || '';
    let mdCodeProperty = req.body['md-code-property'] || '';
    var mdCodePropertyEn = req.body['md-code-property-en'];
    let mdCodeInstruction = req.body['md-code-instruction'] || '';
    let mdCodeInstructionEn = req.body['md-code-instruction-en'] || '';
    let mdCodeDetail = req.body['md-code-detail'] || '';
    let mdCodeDetailEn = req.body['md-code-detail-en'] || '';
    let mdCodeImage = req.body['md-code-image'] || '';
    let categoryId = parseInt(req.body['select-category']) || 1;

    let productLink = req.body['product-link'];
    let shopLink = req.body['shop-link'];
    let taobaoLink = req.body['taobao-link'];
    let comment = req.body['comment'];
    
    productLink = utils.urlCompleting(productLink);
    shopLink = utils.urlCompleting(shopLink);
    taobaoLink = utils.urlCompleting(taobaoLink);

    let product = new Product();
    let productHistory = new ProductHistory();

    product.set('banner', mdCodeBanner);
    product.set('video', mdCodeVideo);
    product.set('name', mdCodeName);
    product.set('mainImage',mainImage);
    product.set('nameEn', mdCodeNameEn);
    product.set('review', mdCodeReview);
    product.set('property', mdCodeProperty);
    product.set('propertyEn',mdCodePropertyEn);
    product.set('instruction', mdCodeInstruction);
    product.set('instructionEn', mdCodeInstructionEn);
    product.set('detail', mdCodeDetail);
    product.set('detailEn', mdCodeDetailEn);
    product.set('image', mdCodeImage);
    product.set('categoryId', categoryId);
    product.set('productLink',productLink);
    product.set('shopLink',shopLink);
    product.set('taobaoLink',taobaoLink);
    product.set('comment',comment);
 
    product.save().then(result => {

        let query = new AV.Query(Product);
        return query.get(result.id);
        
    }).then(result => {

        productHistory.set('productId',result.get('productId'));
        productHistory.set('banner', mdCodeBanner);
        productHistory.set('video', mdCodeVideo);
        productHistory.set('name', mdCodeName);
        productHistory.set('mainImage',mainImage);
        productHistory.set('nameEn', mdCodeNameEn);
        productHistory.set('review', mdCodeReview);
        productHistory.set('property', mdCodeProperty);
        productHistory.set('propertyEn',mdCodePropertyEn);
        productHistory.set('instruction', mdCodeInstruction);
        productHistory.set('instructionEn', mdCodeInstructionEn);
        productHistory.set('detail', mdCodeDetail);
        productHistory.set('detailEn', mdCodeDetailEn);
        productHistory.set('image', mdCodeImage);
        productHistory.set('categoryId', categoryId);
        productHistory.set('productLink',productLink);
        productHistory.set('shopLink',shopLink);
        productHistory.set('taobaoLink',taobaoLink);
        productHistory.set('comment',comment);
        
        return productHistory.save();
        
    }).then(() => {
        req.flash('success', '添加商品成功!');
        res.redirect('/product?categoryId=' + categoryId);
    });
   

});

module.exports = router;