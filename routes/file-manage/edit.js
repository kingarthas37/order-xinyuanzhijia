'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var FileManage = AV.Object.extend('FileManage');

var data =  extend(config.data,{
    title:'编辑身份证',
    currentPage:'file-manage'
});


//编辑产品页
router.get('/:fileManageId', (req, res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var fileManageId = parseInt(req.params.fileManageId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });

    
    var query = new AV.Query(FileManage);
    query.equalTo('fileManageId', fileManageId);
    query.first().then(function(result) {
        data = extend(data, {
            fileManage:result
        });
        res.render('file-manage/edit', data);
    });

});



router.post('/:fileManageId',(req,res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let fileManageId = parseInt(req.params['fileManageId']);
    let name = req.body['name'];
    let file = req.body['file'];
    let fileType = '';
    if(/\.[^\.]+$/.test(file)) {
        fileType = /\.([^\.]+)$/.exec(file)[1];
    }
    
    let query = new AV.Query(FileManage);

    query.equalTo('fileManageId',fileManageId);
    
    query.first().then(result => {
        return result.save({
           name,file,fileType
        });
        
    }).then(() => {
        req.flash('success','编辑文件上传成功!');
        res.redirect('/file-manage');
    });

});

module.exports = router;