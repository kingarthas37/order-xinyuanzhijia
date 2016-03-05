'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');
var extend = require("xtend");

var config = require('../../lib/config');

var Earning = AV.Object.extend('Earning');
var OrderTrack = AV.Object.extend('OrderTrack');
var Customer = AV.Object.extend('Customer');
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

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
        
        //月收入统计=
        new AV.Promise(resolve => {

            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            
            let query = new AV.Query(Earning);
            query.greaterThan('date',new Date(currentYear,0,0));
            query.select('expenses','income','date');
            
            query.find().done(items=> {

                let earning = {
                    expenses:[],
                    income:[],
                    earning:[],
                    date:[]
                };

                items.forEach(item => {
                    earning.expenses.push(item.get('expenses'));
                    earning.income.push(item.get('income'));
                    earning.earning.push(item.get('income') - item.get('expenses'));
                    earning.date.push( (item.get('date').getMonth() + 1) + '/' + item.get('date').getDate() );
                });
                
                data = extend(data,{
                    earningTotal:earning
                });
                
                resolve();
            });
            
        }),
        
        //收入统计chart
        new AV.Promise(resolve => {
            
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
                    earning.earning += item.get('income') - item.get('expenses');
                });
                
                data = extend(data,{
                    earningMonth:earning
                });

                resolve();
                
            });
        }),
        
        //发货订单列表
        new AV.Promise(resolve => {

            var page = 1;
            var limit = 6;
            
            let query = new AV.Query(OrderTrack);

            query.skip((page - 1) * limit);
            query.limit(limit);
            query.descending('orderId');

            query.find().then(items => {

                data = extend(data, {
                    order: items
                });

                let customerQuery = new AV.Query(Customer);

                //数组查询,用于关联列表查询
                customerQuery.containedIn('customerId',items.map(x=>x.get('customerId')));
                return customerQuery.find();

            }).then(results => {

                //对关联查询结果进行重新排序
                let _results = data.order.map((item)=>{
                    for(let i=0;i< results.length;i++) {
                        if(item.get('customerId') === results[i].get('customerId')) {
                            return results[i];
                        }
                    }
                });

                data = extend(data,{
                    customer:_results
                });
                
                resolve();
                
            });
            
        }),
        
        //采购订单列表
        new AV.Promise(resolve => {
            
            let query = new AV.Query(PurchaseTrack);

            query.limit(6);
            query.descending('purchaseId');
            query.select('purchaseId','name','shippingType');

            query.find().done(items => {
                data = extend(data, {
                    purchase: items
                });
                resolve();
            });
            
        })
        
    ).then(()=> res.render('index', data));
      
    
});
 
module.exports = router;