'use strict';

var webshot = require('webshot');
var Array = require('node-array');
var extend = require("xtend");

var AV = require('leanengine');

module.exports = function(params,callback,error) {
    
    var promise = new AV.Promise();

    var name = params.name;
    var html = params.html;
    var htmlHeight = params.htmlHeight;

    var segments = new Array(Math.ceil(htmlHeight / 960));
    
    html += "<style>body { margin:0; width:750px; font-size:24px;line-height:30px; background: #fff;font-family:'Segoe UI','Lucida Grande','Helvetica','Arial','Microsoft YaHei'; } div { margin-bottom: 20px; } img { display:block; width: 100%;} p {margin:0;padding:0 15px 20px 15px;} </style>";

    //淘宝发布的Mobile尺寸最大高度为960，故需要分段
    var options = {
        siteType: 'html',
        shotSize: {
            width: 750,
            height: 960
        }
    };

    segments.forEachAsync(function (segment, index, arr, next) {

            var option = extend(options, {
                shotOffset: {
                    left: 0,
                    right: 0,
                    top: index * 960,
                    bottom: 0
                }
            });

            if (index === segments.length - 1) {
                option.shotSize.height = htmlHeight % 960;
            }

            webshot(html, 'shot/' + name.substr(0,20) + '_' +  (index + 1) + '.jpg', option, function (err) {
                if (err) {
                    promise.reject();
                }
                next();
            });

            return true;

        },
        function () {
            promise.resolve();
        });

    return promise;
    
};