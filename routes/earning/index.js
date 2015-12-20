'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var Earning = AV.Object.extend('Earning');


var data =  extend(config.data,{
    title:'收入统计',
    currentPage:'earning'
});



//首页
router.get('/', function (req, res, next) {

     
    if (!req.AV.user) {
        return res.redirect('/login');
    }

    var currentDate = new Date();
    
    //当月天数
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentMonthDays = (function() {
        return (new Date(currentDate.getFullYear(),(currentDate.getMonth() + 1),0)).getDate();
    })();

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        currentDate:currentDate,
        currentMonthDays:currentMonthDays
    });
    
    var query = new AV.Query(Earning);
    
    //查询一个月之内的条件
    query.greaterThan('date',new Date(currentYear,currentMonth,0));
    query.lessThan('date',new Date(currentYear,currentMonth + 1,0));
    
    query.find().then(function(results) {
        
        var _results = [];
        
        for(var i=0;i<results.length;i++) {
            _results[ results[i].get('date').getDate() -1 ] = results[i];
        }
        
        data = extend(data,{
            earning:_results
        });
        return res.render('earning',data);
    });
    
});







module.exports = router;