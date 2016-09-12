'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let async = require('async');
let extend = require("xtend");

let config = require('../../lib/config');

//class
let FileManage = AV.Object.extend('FileManage');

//lib
let pager = require('../../lib/component/pager-str');

let data =  extend(config.data,{
    title: '文件上传管理',
    currentPage: 'file-manage'
});


//首页
router.get('/', (req, res) => {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    let order = req.query.order || 'asc';

    let searchName = req.query['search-name'];
    
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchName
    });
    
    let query = new AV.Query(FileManage);
    
    if(searchName) {
        query.contains('name',searchName);
    }
    
    query.count().then(count => {

        data = extend(data,{
            pager:pager(page,limit,count),
            count:count
        });
        
        query.skip((page - 1) * limit);
        query.limit(limit);

        if(order === 'asc') {
            query.ascending('fileManageId');
        } else {
            query.descending('fileManageId');
        }

        if(searchName) {
            query.contains('name',searchName);
        }
        
        return query.find();
        
    }).then((results)=>{
        data = extend(data, {
            fileManage:results
        });
        res.render('file-manage', data);
    });
    
});



router.get('/remove/:fileManageId', function (req,res) {

    if(!req.AV.user) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }

    let fileManageId = parseInt(req.params.fileManageId);
    
    let query = new AV.Query(FileManage);
    query.equalTo('fileManageId',fileManageId);
    query.first().then(function(result) {
        result.destroy().then(function() {
            res.redirect('/file-manage');
        });
    });
 
});


module.exports = router;