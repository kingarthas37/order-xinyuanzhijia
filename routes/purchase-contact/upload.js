'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var imgUpload = require('../../lib/img-upload');

//class
var PurchaseContact = AV.Object.extend('PurchaseContact');

var data =  extend(config.data,{
    title:'添加网站联系方式-上传图片',
    currentPage:'purchase-contact'
});

router.get('/',function(req,res) {
    return res.render('purchase-contact/upload',data);
});

router.post('/',function(req,res) {
    imgUpload(req,(result)=>{
        res.send(result);
    });
});

module.exports = router;