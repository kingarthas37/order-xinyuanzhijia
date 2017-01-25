'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let async = require('async');
let extend = require('xtend');

let config = require('../../lib/config');

//class
let ProductCategory1 = AV.Object.extend('ProductCategory1');
let ProductCategory2 = AV.Object.extend('ProductCategory2');
let ProductMethod = AV.Object.extend('ProductMethod');
let Product = AV.Object.extend('Product');

let data = extend(config.data, {
    title: '产品分类管理',
    currentPage: 'product-category'
});

//首页render
router.get('/', (req, res) => {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    res.cookie('x_lc_sign',data.x_lc_sign);
    res.cookie('x_lc_session',req.currentUser._sessionToken);

    let productMethodId = req.query['product-method-id'] ? parseInt(req.query['product-method-id']) : 0;
    
    data = extend(data,{
        user:req.currentUser,
        productMethodId
    });

    AV.Promise.when(
        
        //product method
        new AV.Promise(resolve => {
            let query = new AV.Query(ProductMethod);
            query.find().done(productMethod => {
                data = extend(data, {productMethod});
                resolve();
            });
        }),
        
        //category1,2
        new AV.Promise(resolve => {

            let query1 = new AV.Query(ProductCategory1);
            let query2 = new AV.Query(ProductCategory2);

            {
                //按index排序
                query1.ascending('index');
                
                //productMethod
                query1.equalTo('productMethodId',productMethodId);
            }
            
            query1.find().done(items=> {

                data = extend(data, {
                    category: items
                });

                return query2.find();

            }).done(items2 => {

                data.category.forEach(item1 => {
                    item1.contents = [];
                    items2.forEach(item2 => {
                        if (item1.get('category1Id') === item2.get('category1Id')) {
                            item1.contents.push(item2);
                        }
                    });
                    //对二级分类进行index排序
                    item1.contents.sort((a,b)=> {
                        return a.get('index') > b.get('index');
                    });
                });
                
                resolve();

            });
            
        })
        
    ).then(() => res.render('product-category', data));

});


//添加二级分类
router.post('/add-category-2',(req,res)=> {
    
    let index = parseInt(req.body.index);
    let name = req.body.name;
    let category1Id = parseInt(req.body.category1Id);
    
    let category2 = new ProductCategory2();
    category2.set('index',index);
    category2.set('name',name);
    category2.set('category1Id',category1Id);
    
    category2.save().done(data => {
        let query = new AV.Query(ProductCategory2);
        query.equalTo('objectId',data.id);
        return query.first();
    }).done(data => res.send({success:1,id:data.get('category2Id'),name:name}));
    
});

//删除一级分类
router.get('/remove-category-1', (req, res) => {

    let query1 = new AV.Query(ProductCategory1);
    let query2 = new AV.Query(ProductCategory2);
    let category1Id = parseInt(req.query.id);
    
    //查询query2是否带有category1,否则无法删除
    query2.equalTo('category1Id',category1Id);
    query2.first().then(item => {
        
        if(item) {
            res.send({success: 0,message:'该分类含有子分类,请先删除所有子分类再进行删除'});
            return AV.Promise.error();
        }

        query1.equalTo('category1Id', category1Id);
        return query1.first();
        
    }).done(item => {

        item.destroy().done(()=> {

            let query = new AV.Query(ProductCategory1);
            query.ascending('index');
            return query.find();

        }).done(items=> {
            //批量更新index
            let promises = [];
            items.forEach((item, i) => {
                item.set('index', i);
                promises.push(item.save());
            });
            return AV.Promise.when(promises);

        }).done(()=>res.send({success: 1}));
    });
    
});


//删除二级分类
router.get('/remove-category-2', (req, res) => {
    
    let queryCategory2 = new AV.Query(ProductCategory2);
    let queryProduct = new AV.Query(Product);
    
    let category1Id = parseInt(req.query.category1Id);
    let category2Id = parseInt(req.query.category2Id);

    //查询product是否含有category2,否则无法删除
    queryProduct.equalTo('category2Id',category2Id);
    queryProduct.first().then(item => {
        
        if(item) {
            res.send({success:0,message:'已有产品引用该分类,无法删除'});
            return AV.Promise.error();
        }

        queryCategory2.equalTo('category2Id', category2Id);
        return queryCategory2.first();
        
    }).done(item => {

        item.destroy().done(() => {

            let query = new AV.Query(ProductCategory2);
            query.equalTo('category1Id',category1Id);
            query.ascending('index');

            return query.find();

        }).done(items => {
            //批量更新index
            let promises = [];
            items.forEach((item, i) => {
                item.set('index', i);
                promises.push(item.save());
            });
            return AV.Promise.when(promises);

        }).done(()=>res.send({success: 1}));
    });
    
});


//上移一级分类
router.get('/move-category-1-up',(req,res) => {
    
    let currentId = parseInt(req.query.currentId);
    let targetId = parseInt(req.query.targetId);

    AV.Promise.when(
        new AV.Promise(resolve => {
            let query = new AV.Query(ProductCategory1);
            query.equalTo('category1Id',currentId);
            query.first().done(item => {
                console.info(111, item);
                item.set('index',item.get('index') - 1);
                return item.save();
            }).done(resolve);

        }),
        new AV.Promise(resolve => {
            let query = new AV.Query(ProductCategory1);
            query.equalTo('category1Id',targetId);
            query.first().done(item => {
                console.info(222, item);
                item.set('index',item.get('index') + 1);
                return item.save();
            }).done(resolve);
        })
    ).then(()=> res.send({success:1}));
    
});

//上移二级分类
router.get('/move-category-2-up',(req,res) => {

    let currentId = parseInt(req.query.currentId);
    let targetId = parseInt(req.query.targetId);

    AV.Promise.when(
        new AV.Promise(resolve => {
            
            let query = new AV.Query(ProductCategory2);
            query.equalTo('category2Id',currentId);
            
            query.first().done(item => {
                item.set('index',item.get('index') - 1);
                return item.save();
            }).done(resolve);

        }),
        new AV.Promise(resolve => {
            
            let query = new AV.Query(ProductCategory2);
            query.equalTo('category2Id',targetId);

            query.first().done(item => {
                item.set('index',item.get('index') + 1);
                return item.save();
            }).done(resolve);
        })
    ).then(()=> res.send({success:1}));

});

//下移一级分类
router.get('/move-category-1-down',(req,res) => {

    let currentId = parseInt(req.query.currentId);
    let targetId = parseInt(req.query.targetId);

    AV.Promise.when(
        new AV.Promise(resolve => {
            let query = new AV.Query(ProductCategory1);
            query.equalTo('category1Id',currentId);
            query.first().done(item => {
                item.set('index',item.get('index') + 1);
                return item.save();
            }).done(resolve);

        }),
        new AV.Promise(resolve => {
            let query = new AV.Query(ProductCategory1);
            query.equalTo('category1Id',targetId);
            query.first().done(item => {
                item.set('index',item.get('index') - 1);
                return item.save();
            }).done(resolve);
        })
    ).then(() => res.send({success:1}));

});



//下移二级分类
router.get('/move-category-2-down',(req,res) => {

    let currentId = parseInt(req.query.currentId);
    let targetId = parseInt(req.query.targetId);

    AV.Promise.when(
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductCategory2);
            query.equalTo('category2Id',currentId);

            query.first().done(item => {
                item.set('index',item.get('index') + 1);
                return item.save();
            }).done(resolve);

        }),
        new AV.Promise(resolve => {

            let query = new AV.Query(ProductCategory2);
            query.equalTo('category2Id',targetId);

            query.first().done(item => {
                item.set('index',item.get('index') - 1);
                return item.save();
            }).done(resolve);
        })
    ).then(()=> res.send({success:1}));

});


module.exports = router;