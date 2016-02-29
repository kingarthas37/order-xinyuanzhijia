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
router.get('/', (req, res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    data = extend(data,{
        flash:{success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user
    });
    
    let query = new AV.Query(RecordCategory);
    query.find().then((results) => {
        data = extend(data,{
            recordCategory:results
        });
        res.render('record/add', data);
    });

});


//添加产品页
router.post('/', (req, res)=> {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let name = req.body['name'];
    let nameEn = req.body['name-en'];
    let recordCategoryId = parseInt(req.body['category']);
    let url = req.body['url'];
    let price = req.body['price'];
    let freight = req.body['freight'];
    let shippingDirect = req.body['shipping-direct'] ? true : false;
    let image = req.body['image'];
    let comment = req.body['comment'];

    url = utils.urlCompleting(url);
    
    let record = new Record();
    
    record.set('name',name);
    record.set('nameEn',nameEn);
    record.set('recordCategoryId',recordCategoryId);
    record.set('url',url);
    record.set('price',price);
    record.set('freight',freight);
    record.set('shippingDirect',shippingDirect);
    record.set('image',image);
    record.set('comment',comment);
    
    record.save().then(()=> {
    
        req.flash('success', '添加录入商品成功!');
        res.redirect('/record');
        
    });

});

module.exports = router;