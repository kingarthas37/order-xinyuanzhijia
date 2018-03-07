'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var Customer = AV.Object.extend('Customer');
var Order = AV.Object.extend('OrderTrack');



//首页
router.get('/', function(req, res, next){
    var query = new AV.Query(Customer);
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;

    query.skip((page - 1) * limit);
    query.limit(limit);
    var mobileArray = [];
    var mobileStr = [];
    query.find().then(function(results) {
        console.log(results);
        if (results) {
            results.forEach(function(item) {
                var mobile = item.get('address');
                mobile.forEach(function (m) {
                    var mob = m.match(/((((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147))\d{8}))?/g);
                    mob.forEach(function(mo) {
                        if (mo != '') {
                            mobileArray.push(mo.trim());
                        }
                    });
                })

            });
        }
        if (mobileArray) {
            mobileArray.sort();
            var tempStr = '';
            for (var i in mobileArray) {
                if(mobileArray[i] != tempStr) {
                    mobileStr.push(mobileArray[i]);
                    tempStr=mobileArray[i];
                } else {
                    continue;
                }
            }
        }
        res.send(mobileStr.toString());
    });
});


module.exports = router;