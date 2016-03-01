'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");
var markdown = require("markdown").markdown;

//class
var Record = AV.Object.extend('Record');
var RecordCategory = AV.Object.extend('RecordCategory');

//lib
var config = require('../../lib/config');
var utils = require('../../lib/utils');

var data = extend(data,{
    title:'产品录入编辑-编辑产品',
    currentPage:'record'
});


//编辑产品页
router.get('/:recordId', (req, res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var recordId = parseInt(req.params.recordId);

    data = extend(data,{
        recordId: recordId,
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });

    //promise 并行操作
    AV.Promise.when(
        new AV.Promise((resolve) => {
            let query = new AV.Query(Record);
            query.equalTo('recordId',recordId);
            query.first().then((item)=> {
                data = extend(data,{
                    record:item
                });
                resolve();
            });
        }),
        new AV.Promise((resolve) => {
            let query = new AV.Query(RecordCategory);
            query.find().then((items)=> {
                data = extend(data,{
                    recordCategory:items
                });
                resolve();
            });
        })
    ).then(()=> res.render('record/edit', data));
    
});


router.post('/:recordId', function (req, res) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let recordId = parseInt(req.params['recordId']);

    let name = req.body['name'];
    let nameEn = req.body['name-en'];
    let recordCategoryId = parseInt(req.body['category']);
    let url = req.body['url'];
    let price = req.body['price'];
    let freight = req.body['freight'];
    let shippingDirect = req.body['shipping-direct'] ? true : false;
    let image = req.body['image'];
    let comment = req.body['comment'];
    
    let query = new AV.Query(Record);
    query.equalTo('recordId',recordId);
    query.first().then(item => {

        item.set('name',name);
        item.set('nameEn',nameEn);
        item.set('recordCategoryId',recordCategoryId);
        item.set('url',url);
        item.set('price',price);
        item.set('freight',freight);
        item.set('shippingDirect',shippingDirect);
        item.set('image',image);
        item.set('comment',comment);
        
        return item.save();
        
    }).then(()=> {
        req.flash('info', '编辑产品录入成功!');
        res.redirect('/record');
    });
    
});

module.exports = router;