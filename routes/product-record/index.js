'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let async = require('async');
let extend = require('xtend');

let config = require('../../lib/config');
let pager = require('../../lib/component/pager');

//class
let ProductRecord = AV.Object.extend('ProductRecord');

let ProductMethod = AV.Object.extend('ProductMethod');
let ProductCategory1 = AV.Object.extend('ProductCategory1');
let ProductCategory2 = AV.Object.extend('ProductCategory2');

let data = extend(config.data, {
    title: `产品收录列表页`,
    currentPage: 'product-record'
});

//首页
router.get('/', (req, res) => {

    if (!req.AV.user) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : config.page.limit;
    let order = req.query.order || 'desc';

    let productMethodId = req.query['product-method-id'] ? parseInt(req.query['product-method-id']) : 0;
    let category1Id = req.query['category1-id'] ? parseInt(req.query['category1-id']) : 0;
    let category2Id = req.query['category2-id'] ? parseInt(req.query['category2-id']) : 0;
    let search = req.query['search'] ? req.query['search'].trim() : '';

    data = extend(data, {
        search,
        flash: {success: req.flash('success'), error: req.flash('error')},
        user: req.AV.user,
        productMethodId,
        category1Id,
        category2Id,
        category1: [],
        category2: []
    });

    AV.Promise.when(
        //获取count
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductRecord);

            if(category2Id) {
                query.equalTo('category2', category2Id);
            } else if(category1Id) {
                query.equalTo('category1', category1Id);
            } else if(productMethodId) {
                query.equalTo('productMethod',productMethodId);
            }

            if (search.length) {
                query.contains('name', search);
            }

            query.count().done(count => {
                data = extend(data, {
                    pager: pager.init(page, limit, count),
                    pagerHtml: pager.initHtml({
                        page, limit, count,
                        url: '/product-record',
                        serialize: {
                            page,search,
                            'product-method-id':productMethodId,
                            'category1-id':category1Id,
                            'category2-id':category2Id
                        }
                    })
                });
                resolve();
            });

        }),

        //查询当前页所有数据
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductRecord);
            query.skip((page - 1) * limit);
            query.limit(limit);

            query[order === 'asc' ? 'ascending' : 'descending']('productRecordId');

            if(category2Id) {
                query.equalTo('category2', category2Id);
            } else if(category1Id) {
                query.equalTo('category1', category1Id);
            } else if(productMethodId) {
                query.equalTo('productMethod',productMethodId);
            }

            if (search.length) {
                query.contains('name', search);
            }

            query.find().then(items => {

                items.forEach(n => {
                    n.createdDate = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.createdAt.getMonth() + 1}/${n.createdAt.getDate()}`;
                    n.updatedDate = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.updatedAt.getMonth() + 1}/${n.updatedAt.getDate()}`;
                });

                data = extend(data, {
                    productRecord: items
                });
                
                resolve();
                
            });

        }),

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
    ).then(() => res.render('product-record', data));

});


//删除productRecord
router.post('/remove/:productRecordId',(req,res)=> {
    
    if (!req.AV.user) {
        return res.send({success:0,error:config.errors.UNAUTHORIZED});
    }
    
    let productRecordId = parseInt(req.params.productRecordId);
    
    AV.Promise.when(
       
        new AV.Promise(resolve => {
            
            let query = new AV.Query(ProductRecord);
            query.equalTo('productRecordId',productRecordId);
            query.first().then(result => {
                return result.destroy();
            }).then(resolve);
            
        })
        
    ).then(()=> {
        res.send({
            success:1
        });
    });
    
});



module.exports = router;