'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let async = require('async');
let extend = require('xtend');

let config = require('../../lib/config');
let pager = require('../../lib/component/pager');

let ProductTranslate = AV.Object.extend('ProductTranslate');

let data = extend(config.data, {
    title: '产品翻译列表页',
    currentPage: 'product-translate'
});

//首页
router.get('/', (req, res) => {

    if(!req.currentUser) {
        return res.redirect(`/?return=${encodeURIComponent(req.originalUrl)}`);
    }

    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : config.page.limit;
    let order = req.query.order || 'desc';

    let search = req.query.search ? req.query.search.trim() : '';

    data = extend(data,{
        search: search,
        flash: {success: req.flash('success'), error: req.flash('error')},
        user: req.currentUser
    });

    AV.Promise.when(

        //获取count
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductTranslate);

            if (search.length) {
                query.contains('title', search);
            }

            query.count().done(count => {
                data = extend(data, {
                    pager:pager.init(page,limit,count),
                    pagerHtml:pager.initHtml({
                        page,limit,count,
                        url:'/product-translate',
                        serialize:{page,search,limit}
                    })
                });
                resolve();
            });

        }),

        //查询当前页所有数据
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductTranslate);

            //查询条件
            {
                query.skip((page - 1) * limit);
                query.limit(limit);
                query.ascending('productTranslateId');

                if (search.length) {
                    query.contains('title', search);
                }
            }

            query.find().then(items => {

                items.forEach( n => {
                    n.createdDate = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.createdAt.getMonth() + 1}/${n.createdAt.getDate()}`;
                    n.updatedDate = `${n.updatedAt.getFullYear().toString().substring(2)}/${n.updatedAt.getMonth() + 1}/${n.updatedAt.getDate()}`;
                });

                data = extend(data, {
                    productTranslate:items
                });

                resolve();
            });

        })

    ).then(() => res.render('product-translate', data));
});


module.exports = router;