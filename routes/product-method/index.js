'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let async = require('async');
let extend = require('xtend');

let config = require('../../lib/config');
let pager = require('../../lib/component/pager');

//class
let ProductCategory1 = AV.Object.extend('ProductCategory1');
let ProductMethod = AV.Object.extend('ProductMethod');

let data = extend(config.data, {
    title: '产品类型列表页',
    currentPage: 'product-method'
});

//首页
router.get('/', (req, res) => {

    if(!req.AV.user) {
        return res.redirect(`/login?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : config.page.limit;
    let order = req.query.order || 'desc';
    
    let search = req.query.search ? req.query.search.trim() : '';

    data = extend(data,{
        search: search,
        flash: {success: req.flash('success'), error: req.flash('error')},
        user: req.AV.user
    });

    AV.Promise.when(
        
        //获取count
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductMethod);
            
            if (search.length) {
                query.contains('name', search);
            }
            
            query.count().done(count => {
                data = extend(data, {
                    pager:pager.init(page,limit,count),
                    pagerHtml:pager.initHtml({
                        page,limit,count,
                        url:'/product-method',
                        serialize:{page,search,limit}
                    })
                });
                resolve();
            });

        }),

        //查询当前页所有数据
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductMethod);

            //查询条件
            {
                query.skip((page - 1) * limit);
                query.limit(limit);
                query.ascending('productMethodId');
                
                if (search.length) {
                    query.contains('name', search);
                }
            }
            
            query.find().then(items => {
                
                items.forEach( n => {
                    n.createdDate = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.createdAt.getMonth() + 1}/${n.createdAt.getDate()}`;
                    n.updatedDate = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.updatedAt.getMonth() + 1}/${n.updatedAt.getDate()}`;
                });
                
                data = extend(data, {
                    productMethod:items
                });
                
                resolve();
            });

        })

    ).then(() => res.render('product-method', data));

});


router.post('/remove/:productMethodId',(req,res)=> {
    
    let productMethodId = parseInt(req.params.productMethodId);
    
    let query = new AV.Query(ProductCategory1);
    query.equalTo('productMethodId',productMethodId);
    
    query.first().then(item => {
        
        if(item) {
            res.send({success: 0,message:'该产品类型含有分类,请先删除所有子分类后再进行删除'});
            return AV.Promise.error();
        }
        
        let query = new AV.Query(ProductMethod);
        query.equalTo('productMethodId',productMethodId);
        return query.first();
        
    }).then(item => {
        return item.destroy();
    }).then(() => res.send({success: 1}));
    
});

module.exports = router;