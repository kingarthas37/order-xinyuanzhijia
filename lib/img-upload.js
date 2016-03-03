'use strict';

var AV = require('leanengine');

var multiparty = require('multiparty');
var fs =require('fs');

module.exports = function(req,callback) {

    var form = new multiparty.Form();

    form.parse(req,function(err, fields, files) {

        var imageFile = files['icon-image'][0];
        
        if(imageFile.size !== 0){
            
            if(imageFile.headers['content-type'] !== 'image/gif' && imageFile.headers['content-type'] !== 'image/jpeg' && imageFile.headers['content-type'] !=='image/png'  ) {
                return callback({
                    success:0,
                    error:'错误的图片文件格式'
                });
            }
            
            fs.readFile(imageFile.path, function(err, data){
                if(err) {
                    return callback({
                        success:0,
                        error:'读取文件失败'
                    }); 
                }
                var base64Data = data.toString('base64');
                var theFile = new AV.File(imageFile.originalFilename, {base64: base64Data});
                theFile.save().then(function(theFile){
                    //var url = theFile.thumbnailURL(100, 200);
                    callback({
                        success:1,
                        url:theFile._url
                    });
                });
            });
        } else {
            return callback({
                success:0,
                error:'请选择一个文件'
            });
        }
    });
    
};