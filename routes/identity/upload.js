'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');
var imgUpload = require('../../lib/component/img-upload');

var data =  extend(config.data,{
    title:'身份证管理-上传图片',
    currentPage:'identity'
});
 

router.get('/',function(req,res) {

    let callbackName = req.query.callback || 'uploadSuccess';
    
    data = extend(data,{
        callbackName:callbackName
    });
    
    return res.render('identity/upload',data);
});

router.post('/',function(req,res) {
    imgUpload(req,(result)=>{
        res.send(result);
    });
});

module.exports = router;