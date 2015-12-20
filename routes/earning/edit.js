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

var data =  extend(config.data,{
    title:'编辑收入统计',
    currentPage:'earning'
});


router.get('/:date', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }
    
    var date = new Date(req.params.date);
 
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user
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
                return res.render('earning/edit',data);
            } else {

                var earning = new Earning();
                earning.set('income',0);
                earning.set('expenses',0);
                earning.set('date',date);
                
                return earning.save();
            }
        }).then(function() {
            return queryFun();
        });
    }
    
});


router.post('/', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }

    var income = parseInt(req.body['income']);
    var expenses = parseInt(req.body['expenses']);
    var incomeComment = req.body['income-comment'];
    var expensesComment = req.body['expenses-comment'];
    
    var earningId = parseInt(req.body['earning-id']);

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        }
    });

    var query = new AV.Query(Earning);
    query.equalTo('earningId',earningId);
    
    query.first().then(function(earning) {

        console.info(earning);
        
        earning.set('income',income);
        earning.set('expenses',expenses);
        earning.set('incomeComment',incomeComment);
        earning.set('expensesComment',expensesComment);
        
        return earning.save();
        
    }).then(function(result) {

        data = extend(data, {
            earning: result
        });

        req.flash('success', '编辑收入明细成功!');
        res.redirect('/earning');
    
    });
    
});

module.exports = router;