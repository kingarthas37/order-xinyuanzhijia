'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var Record = AV.Object.extend('Record');
var RecordCategory = AV.Object.extend('RecordCategory');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '收录分类管理-首页',
    currentPage: 'record-category'
});


//首页
router.get('/', (req, res) => {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    let order = req.query.order || 'desc';

    let searchName = req.query['search-name'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchName:searchName
    });
    
    let query = new AV.Query(RecordCategory);
    if(searchName) {
        query.contains('categoryName',searchName);
    }
    
    query.count().then((count)=> {

        data = extend(data,{
            pager:pager(page,limit,count),
            count:count
        });
        
        query.skip((page - 1) * limit);
        query.limit(limit);

        if(order === 'asc') {
            query.ascending('categoryId');
        } else {
            query.descending('categoryId');
        }

        if(searchName) {
            query.contains('name',searchName);
        }
        
        return query.find();
        
    }).then((results)=>{
        data = extend(data, {
            recordCategory:results
        });
        res.render('record-category', data);
    });
     

});



router.get('/remove/:recordCategoryId', function (req,res) {

    if(!req.AV.user) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }

    var categoryId = parseInt(req.params.recordCategoryId);
    
    
    var queryRecord = new AV.Query(Record);
    queryRecord.equalTo('categoryId',categoryId);
    queryRecord.first().then(function(result) {
        
        if(result) {
            res.json({
                success:0,
                msg:'此分类已绑定产品,无法删除,请先更改产品相关分类再删除'
            });
            return AV.Promise.error('此分类已绑定产品,无法删除,请先更改产品相关分类再删除');
        }

        var query = new AV.Query(RecordCategory);
        query.equalTo('categoryId',categoryId );
        return query.first();
        
    }).then(function(result) {
        result.destroy({
            success: function () {
                req.flash('success', '删除成功!');
                return res.json({
                    success:1
                });
            }
        });
    });
 
});



module.exports = router;