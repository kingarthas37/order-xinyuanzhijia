'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');

var multiparty = require('multiparty');
var fs =require('fs');

//class
var PurchaseContact = AV.Object.extend('PurchaseContact');

var data =  extend(config.data,{
    title:'添加网站联系方式-上传图片',
    currentPage:'purchase-contact'
});
 

var Test = AV.Object.extend('Test');

router.get('/',function(req,res) {

    return res.render('purchase-contact/upload',data);
    
});

router.post('/',function(req,res) {
    
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {

        var imageFile = files['icon-image'][0];
        if(imageFile.size !== 0){
            fs.readFile(imageFile.path, function(err, data){
                if(err) {
                    return res.send({
                        success:0,
                        error:'读取文件失败'
                    });
                }
                var base64Data = data.toString('base64');
                var theFile = new AV.File(imageFile.originalFilename, {base64: base64Data});
                theFile.save().then(function(theFile){
                    res.send({
                        success:1,
                        url:theFile._url
                    });
                });
            });
        } else {
            res.send('请选择一个文件');
        }
    });


});


module.exports = router;