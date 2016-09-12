'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');
var imgUpload = require('../../lib/component/img-upload');


//class
var Record = AV.Object.extend('Record');

var data =  extend(config.data,{
    title:'添加产品录入-上传图片',
    currentPage:'record'
});
 

router.get('/',function(req,res) {
    return res.render('record/upload',data);
});

router.post('/',function(req,res) {
    imgUpload(req,(result)=>{
        res.send(result);
    });
});

module.exports = router;