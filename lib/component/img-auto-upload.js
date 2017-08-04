'use strict';

var AV = require('leanengine');

var multiparty = require('multiparty');
var fs =require('fs');
var http = require('http');
var https = require('https');
let localPath = 'auto-upload.jpg';

module.exports = function(url, res, callback) {
    var hp = http;
    if (url.indexOf('https') >= 0) {
        hp = https;
    }
    var req = hp.get(url, function (res) {
        var imgData = "";
        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function (chunk) {
            imgData += chunk;
        });
        res.on("end", function () {
            fs.writeFile(localPath, imgData, "binary", function(err){
                if(err){
                    console.log("down fail");
                }
                fs.readFile(localPath, function(err, data){
                    if(err) {
                        return callback({
                            success:0,
                            error:'读取文件失败'
                        });
                    }
                    var base64Data = data.toString('base64');
                    var theFile = new AV.File(url, {base64: base64Data});
                    theFile.save().then(function(theFile){
                        callback({
                            success:1,
                            url:theFile.attributes.url
                        });
                    });
                });
            });
        });
        res.on("error", function (err) {
            console.log("请求失败");
            callback({
                success:0,
                url:'请求失败'
            });
        });
    });
    req.on('error', function (err) {
        console.log("请求失败2" + err.message);
    });
};