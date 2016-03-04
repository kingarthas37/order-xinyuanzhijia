'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var Earning = AV.Object.extend('Earning');
var extend = require("xtend");

var config = require('../../lib/config');

var data = {
    title: '首页',
    currentPage: 'index'
};

router.get('/',(req,res)=> {
    
    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    data = extend(data,{
        user:req.AV.user
    });



    AV.Promise.when(
        new AV.Promise((resolve) => {
            
            let query = new AV.Query(Earning);
            
            query.select('expenses','income');
            
            query.find().done(items=> {

                let earning = {
                    expenses:[],
                    income:[],
                    earning:[]
                };

                items.forEach(item => {
                    earning.expenses.push(item.get('expenses'));
                    earning.income.push(item.get('income'));
                    earning.earning.push(item.get('income') - item.get('expenses'));
                });
                
                data = extend(data,{
                    earningTotal:earning
                });
                
                resolve();
            });
            
        }),
        new AV.Promise((resolve) => {
            
            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth();
            
            let query = new AV.Query(Earning);
            query.greaterThan('date',new Date(currentYear,currentMonth,0));
            query.lessThanOrEqualTo('date',new Date(currentYear,currentMonth + 1,0));
            query.select('expenses','income');

            query.find().done(items => {
                
                let earning = {
                    expenses:0,
                    income:0,
                    earning:0
                };

                items.forEach(item => {
                    earning.expenses += item.get('expenses');
                    earning.income += item.get('income');
                    earning.earning += item.get('income') + item.get('expenses');
                });
                
                data = extend(data,{
                    earningMonth:earning
                });

                resolve();
                
            });
        })
    ).then(()=> res.render('index', data));
      
    
});
 
module.exports = router;