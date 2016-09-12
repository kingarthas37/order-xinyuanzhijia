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
var pager = require('../../lib/component/pager-str');

var data = extend(config.data,{
    title: '产品录入编辑-首页',
    currentPage: 'record'
});


//首页
router.get('/',(req, res, next) => {
    
    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';

    var recordCategoryId = req.query.recordCategoryId ? parseInt(req.query.recordCategoryId) : '';
    
    var search = req.query['search-name'];

    data = extend(data,{
        recordCategoryId:recordCategoryId,
        search:search,
        flash:{success:req.flash('success'),error:req.flash('error')},
        user:req.AV.user
    });


    let query = new AV.Query(Record);

    if(recordCategoryId) {
        query.equalTo('recordCategoryId',recordCategoryId);
    }

    if(search) {
        query.contains('name',search);
    }
    
    query.count().then((count)=> {
        
        data = extend(data,{
            recordPager:pager(page,limit,count),
            recordCount:count
        });

        query.skip((page - 1) * limit);
        query.limit(limit);

        if(order === 'asc') {
            query.ascending('recordId');
        } else {
            query.descending('recordId');
        }

        if(recordCategoryId) {
            query.equalTo('recordCategoryId',recordCategoryId);
        }

        if(search) {
            let queryEn = new AV.Query(Record);
            queryEn.contains('nameEn',que);
            query.contains('name',search);
        }
        
        return query.find();
        
    }).then((results)=> {
        
        data = extend(data, {
            record: results
        });

        let queryCategory = new AV.Query(RecordCategory);
        return queryCategory.find();
        
    }).then((results) => {

        data = extend(data,{
            recordCategory:results
        });
        
        for (let i in data.record) {
            data.record[i].set('recordCategoryName', (function () {
                for (let j in results) {
                    if (results[j].get('recordCategoryId') === data.record[i].get('recordCategoryId')) {
                        return results[j].get('name');
                    }
                }
            })());
        }

        res.render('record', data);
        
    });
    
});


router.get('/remove/:recordId', function (req, res, next) {

    var recordId = parseInt(req.params.recordId);
    let query = new AV.Query(Record);
    query.equalTo('recordId', recordId);
    query.first().then((item)=> {
        item.destroy({
            success: function () {
                req.flash('success', '删除成功!');
                res.redirect('/record');
            }
        });
    });
  
});

module.exports = router;