'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');
let extend = require('xtend');
var URL = require('url-parse');

let config = require('../../lib/config');
let utils = require('../../lib/utils');

//class
let ProductRecord = AV.Object.extend('ProductRecord');

let ProductMethod = AV.Object.extend('ProductMethod');
let ProductCategory1 = AV.Object.extend('ProductCategory1');
let ProductCategory2 = AV.Object.extend('ProductCategory2');


let data = extend(config.data, {
    title: `添加产品收录`,
    currentPage: 'product-record'
});

router.get('/', (req, res) => {

    if(!req.currentUser) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    res.cookie('x_lc_sign',data.x_lc_sign);
    res.cookie('x_lc_session',req.AV.user._sessionToken);

    let productMethodId = req.query['product-method-id'] ? parseInt(req.query['product-method-id']) : 0;
    let category1Id = req.query['category1-id'] ? parseInt(req.query['category1-id']) : 0;
    let category2Id = req.query['category2-id'] ? parseInt(req.query['category2-id']) : 0;
    
    data = extend(data, {
        user:req.AV.user,
        productMethodId,
        category1Id,
        category2Id,
        category1: [],
        category2: []
    });
    
    AV.Promise.when(
     
        //查询productMethod
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductMethod);
            query.find().then(productMethod => {
                data = extend(data, {productMethod});
                resolve();
            });

        }),

        //查询category1
        new AV.Promise(resolve => {

            if(!productMethodId) {
                return resolve();
            }

            let query = new AV.Query(ProductCategory1);
            query.equalTo('productMethodId', productMethodId);
            query.ascending('index');
            query.find().then(category1 => {
                data = extend(data, {category1});
                resolve();
            });
        }),

        //查询categoty2
        new AV.Promise(resolve => {

            if (!category1Id) {
                return resolve();
            }

            let query = new AV.Query(ProductCategory2);
            query.equalTo('category1Id', category1Id);
            query.ascending('index');
            query.find().then(category2 => {
                data = extend(data, {category2});
                resolve();
            });

        })
    ).then(() => res.render('product-record/add', data));

});


router.post('/', (req, res) => {

    if(!req.currentUser) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }
    
    let name = req.body['name'];
    let nameEn = req.body['name-en'];
    let productMethod = getQueryData(req.body['select-product-method']);
    let category1 = getQueryData(req.body['select-category-1']);
    let category2 = getQueryData(req.body['select-category-2']);
    updateQueryData(productMethod,category1,category2);

    let url = typeof req.body['url'] === 'object' ? req.body['url'] : [req.body['url']];
    let linkType = req.body['link-type'];
    let isOrder = req.body['is-order'] === 'on' ? true : false;
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
    
    let productRecord = new ProductRecord();
    
    let productRecordData = {name,nameEn,productMethod,category1,category2,url,linkType,isOrder,siteType,siteName,image,detail,property,country,price,priceType,comment};
    
    productRecord.save(productRecordData).then(result => {
        req.flash('success', '添加产品收录成功!');
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