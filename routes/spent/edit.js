'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');
var utils = require('../../lib/utils');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Earning = AV.Object.extend('Earning');
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

var data =  extend(config.data,{
    title:'编辑采购记账统计',
    currentPage:'spent'
});


router.get('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var date = new Date(req.query.date + ' 00:00:00');
    
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.currentUser
    });

    var query = new AV.Query(Earning);
    
    queryFun();
    
    function queryFun() {
        query.equalTo('date',date);
        query.first({}).then(function(result) {
            if(result) {
                
                data = extend(data,{
                    earning:result
                });
                return res.render('spent/edit',data);
                
            } else {

                var earning = new Earning();
                earning.set('date',date);
                earning.save().then(function() {
                    return queryFun();     
                });
            }
        });
    }
    
});


router.post('/', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var spentUser1 = parseInt(req.body['spent-user1']);
    var spentUser2 = parseInt(req.body['spent-user2']);
    var spentUser1Comment = req.body['spent-user1-comment'];
    var spentUser2Comment = req.body['spent-user2-comment'];
    
    var earningId = parseInt(req.body['earning-id']);

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    var query = new AV.Query(Earning);
    query.equalTo('earningId',earningId);
    console.log(spentUser1,spentUser2,spentUser1Comment,spentUser2Comment);
    query.first().then(function(earning) {
        console.log(111);
        earning.set('spentUser1',spentUser1);
        earning.set('spentUser2',spentUser2);
        earning.set('spentUser1Comment',spentUser1Comment);
        earning.set('spentUser2Comment',spentUser2Comment);
        
        return earning.save();
        
    }).then(function(result) {

        data = extend(data, {
            earning: result
        });

        req.flash('success', '编辑编购记账统计成功!');
        res.redirect('/spent');
    
    });
    
});

module.exports = router;