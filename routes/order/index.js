'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var OrderTrack = AV.Object.extend('OrderTrack');
var Customer = AV.Object.extend('Customer');

//lib
var pager = require('../../lib/pager');

var data =  extend(config.data,{
    title: '发货订单编辑-首页',
    currentPage: 'order'
});


//首页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    var searchOrdername = req.query['search-order-name'];
    var searchCustomerName = req.query['search-customer-name'];
    let searchAddress = req.query['search-address'];

    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.AV.user,
        searchOrderName:searchOrdername,
        searchCustomerName:searchCustomerName,
        searchAddress:searchAddress
    });
    
    
    let query = new AV.Query(OrderTrack);
    
    if(searchOrdername) {
        query.contains('orderName',searchOrdername);
    }

    if(searchCustomerName) {
        query.contains('customerName',searchCustomerName);
    }
    
    if(searchAddress) {
        query.contains('shippingAddress',searchAddress);
    }
    
    query.count().then((count) => {
        
        data = extend(data,{
            orderPager:pager(page,limit,count),
            orderCount:count
        });
        
        query.skip((page - 1) * limit);
        query.limit(limit);

        if(order === 'asc') {
            query.ascending("orderId");
        } else {
            query.descending('orderId');
        }

        if(searchOrdername) {
            query.contains('orderName',searchOrdername);
        }

        if(searchCustomerName) {
            query.contains('customerName',searchCustomerName);
        }
        
        if(searchAddress) {
            query.contains('shippingAddress',searchAddress);
        }
        
        return query.find();
        
    }).then((results)=> {
        
        data = extend(data, {
            order: results
        });
        
        let customerQuery = new AV.Query(Customer);
        
        //数组查询,用于关联列表查询
        customerQuery.containedIn('customerId',results.map(x=>x.get('customerId')));
        return customerQuery.find();
        
    }).then((results)=> {
        
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
        res.render('order', data);
    });

});


router.get('/remove/:orderId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }

    var orderId = req.params.orderId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(OrderTrack);
            query.equalTo('orderId', parseInt(orderId));
            query.first({
                success: function (object) {
                    cb(null, object);
                },
                error: function (err) {
                    next(err);
                }
            });
        },
        function (object, cb) {
            object.destroy({
                success: function () {
                    req.flash('success', '删除成功!');
                    res.redirect('/order');
                }
            });
        }

    ]);
});

module.exports = router;