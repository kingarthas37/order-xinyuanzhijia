'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require('xtend');

var URL = require('url-parse');

let config = require('../../lib/config');
let utils = require('../../lib/utils');

//class
let ProductRecord = AV.Object.extend('ProductRecord');
let ProductMethod = AV.Object.extend('ProductMethod');
let ProductCategory1 = AV.Object.extend('ProductCategory1');
let ProductCategory2 = AV.Object.extend('ProductCategory2');


var data = extend(config.data, {
    title: `编辑产品收录`,
    currentPage: 'product-record'
});


//编辑产品页
router.get('/:productRecordId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect(`/admin/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    res.cookie('x_lc_sign',data.x_lc_sign);
    res.cookie('x_lc_session',req.AV.user._sessionToken);

    var productRecordId = parseInt(req.params.productRecordId);

    data = extend(data, {
        user: req.AV.user
    });
    
    async.auto({
        
        getProductRecord(resolve) {
            let query = new AV.Query(ProductRecord);
            query.equalTo('productRecordId', productRecordId);
            query.first().done(productRecord => {
                data = extend(data, {productRecord});
                resolve();
            });
        },
        getMethod(resolve) {
            let query = new AV.Query(ProductMethod);
            query.find().then(productMethod => {
                data = extend(data,{productMethod});
            });
            resolve();
        },
        getCategory1:['getProductRecord',function(resolve) {
            
            let category1 = [];
            async.forEachSeries(data.productRecord.get('productMethod'), function(productMethodId,cb) {
                let query = new AV.Query(ProductCategory1);
                query.equalTo('productMethodId',productMethodId);
                query.find().then(results => {
                    category1.push(results);
                    cb();
                });
            },err => {
                data = extend(data,{category1});
                resolve();
            });
        }],
        getCategory2:['getProductRecord',function(resolve) {
            let category2 = [];
            async.forEachSeries(data.productRecord.get('category1'), function(category1Id,cb) {
                let query = new AV.Query(ProductCategory2);
                query.equalTo('category1Id',category1Id);
                query.find().then(results => {
                    category2.push(results);
                    cb();
                });
            },err => {
                data = extend(data,{category2});
                resolve();
            });
        }]
        
    },(err,results) => res.render('product-record/edit', data));

});

router.post('/:productRecordId', (req, res) => {

    if(!req.AV.user) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }
    
    let productRecordId = parseInt(req.params.productRecordId);

    let query = new AV.Query(ProductRecord);
    query.equalTo('productRecordId',productRecordId);

    let name = req.body['name'];
    let nameEn = req.body['name-en'];
    let productMethod = getQueryData(req.body['select-product-method']);
    let category1 = getQueryData(req.body['select-category-1']);
    let category2 = getQueryData(req.body['select-category-2']);
    updateQueryData(productMethod,category1,category2);

    let url = typeof req.body['url'] === 'object' ? req.body['url'] : [req.body['url']];
    let siteType = [];
    let siteName = [];
    url = url.map(uri => {
        let parse = new URL(uri);
        siteName.push(utils.urlCompleting(parse.hostname));

        if(/([^\.]+)\.\w+$/.test(parse.hostname)) {
            siteType.push(/([^\.]+)\.\w+$/.exec(parse.hostname)[1]);
        } else {
            siteType.push("");
        }
        return utils.urlCompleting(uri);
    });

    let image = req.body['image'];
    let detail = req.body['detail'];
    let property = req.body['property'];
    let country = req.body['country'];
    let price = req.body['price'];
    let priceType = req.body['price-type'];
    let comment = req.body['comment'];

    let productRecordData = {name,nameEn,productMethod,category1,category2,url,siteType,siteName,image,detail,property,country,price,priceType,comment};

    query.first().then(productRecord => {
        
        return productRecord.save(productRecordData);
    }).then(result => {
        req.flash('success', '编辑产品收录成功!');
        res.redirect(`/product-record?product-method-id=${productMethod[0]}&category1-id=${category1[0]}&category2-id=${category2[0]}`);
    });

});

//对array或字符串数据处理,返回array
function getQueryData(value) {
    if(Object.prototype.toString.call(value) === '[object Array]') {
        value = value.map(function(item) {
            return parseInt(item);
        });
        return value;
    }
    return [parseInt(value)];
}

//筛选空的分类
function updateQueryData(...items) {
    let itemNan = [];
    items.forEach((item,i)=> {
        item.forEach((_item,_i)=> {
            if(!_item) {
                itemNan.push(_i);
            }
        });
    });
    itemNan = Array.from(new Set(itemNan)); //es6数组去重
    items.forEach(item => {
        itemNan.forEach((_item) => {
            item.splice(_item,1);
        });
    });
}

module.exports = router;