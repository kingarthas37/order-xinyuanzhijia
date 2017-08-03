'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');
var imgUpload = require('../../lib/component/img-upload');
var imgAutoUpload = require('../../lib/component/img-auto-upload');

var data =  extend(config.data,{
    title:'文件上传管理',
    currentPage:'file-manage'
});
 

router.get('/',function(req,res) {

    let callbackName = req.query.callback || 'uploadSuccess';
    
    data = extend(data,{
        callbackName:callbackName
    });
    
    return res.render('file-manage/upload',data);
});

router.post('/',function(req,res) {
    imgUpload(req,result => {
        res.send(result);
    });
});


router.post('/auto', function(req, res){
    let url = req.body['img-url'];
    imgAutoUpload(url, res, result => {
        res.send(result);
    });
});


module.exports = router;