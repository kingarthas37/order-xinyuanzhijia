'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

var config = require('../../lib/config');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

var https = require('https');

//lib
var pager = require('../../lib/component/pager-str');

var spider = require('../../lib/spider');

var data =  extend(config.data,{
    title: '订单跟踪编辑-首页',
    currentPage: 'purchase'
});


//首页
router.get('/', function (req, res, next) {
    
    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    var order = req.query.order || 'desc';
    
    let searchOrder = req.query['purchase-search-order'] ? req.query['purchase-search-order'].trim() : '';
    let searchTracking = req.query['purchase-search-tracking'] ? req.query['purchase-search-tracking'].trim() : '';
    let shippingStatus = req.query['shipping-status'];
    
    data = extend(data,{
        flash: {success:req.flash('success'),error:req.flash('error')},
        user:req.currentUser,
        searchOrder,
        searchTracking,
        shippingStatus
    });

    async.series([

        function(cb) {
            
            var query = new AV.Query(PurchaseTrack);

            if(searchOrder) {
                query.contains('name',searchOrder);
            } else if(searchTracking) {
                query.contains('trackingNumber',searchTracking);
            } else {
                if(!shippingStatus) {
                    let queryNotShipped = new AV.Query(PurchaseTrack);
                    queryNotShipped.equalTo('shippingStatus','notshipped');
                    let queryShipped = new AV.Query(PurchaseTrack);
                    queryShipped.equalTo('shippingStatus','shipped');
                    query = AV.Query.or(queryNotShipped,queryShipped);
                } else {
                    query.equalTo('shippingStatus',shippingStatus);
                }
            }
            
            query.count({
                success: function(count) {
                    data = extend(data,{
                        purchasePager:pager(page,limit,count),
                        purchaseCount:count
                    });
                    cb();
                },
                error: function(error) {
                    next(error);
                }
            });
        },

        function (cb) {

            var query = new AV.Query(PurchaseTrack);

            if(searchOrder) {
                query.contains('name',searchOrder);
            } else if(searchTracking) {
                query.contains('trackingNumber',searchTracking);
            } else {
                if(!shippingStatus) {
                    let queryNotShipped = new AV.Query(PurchaseTrack);
                    queryNotShipped.equalTo('shippingStatus','notshipped');
                    let queryShipped = new AV.Query(PurchaseTrack);
                    queryShipped.equalTo('shippingStatus','shipped');
                    query = AV.Query.or(queryNotShipped,queryShipped);
                } else {
                    query.equalTo('shippingStatus',shippingStatus);
                }
            }

            query.skip((page - 1) * limit);
            query.limit(limit);

            if(order === 'asc') {
                query.ascending('purchaseId');
            } else {
                query.descending('purchaseId');
            }

            query.find({
                success: function (results) {
                    results.forEach(n => {
                        n.set('isNewUpdate', false);
                        let updateDate = n.get('updatedAt');
                        console.log(updateDate);
                        updateDate.setDate(updateDate.getDate() + 3);
                        n.set('isNewUpdate', (updateDate > new Date()));
                    });
                    data = extend(data, {
                        purchase: results
                    });
                    cb();
                },
                error: function (err) {
                    next(err);
                }
            });

        },

        function () {
            res.render('purchase', data);
        }

    ]);

});

router.get('/copy/:purchaseId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var purchaseId = req.params.purchaseId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(PurchaseTrack);
            query.equalTo('purchaseId', parseInt(purchaseId));
            query.first({
                success: function (result) {
                    cb(null, result);
                },
                error: function (err) {
                    next(err);
                }
            });
        },
        function (result, cb) {
            let purchaseTrack = new PurchaseTrack();
            purchaseTrack.set('name','(Copy) '+result.get('name'));
            purchaseTrack.set('description',result.get('description'));
            purchaseTrack.set('website',result.get('website'));
            purchaseTrack.set('orderUrl',result.get('orderUrl'));
            purchaseTrack.set('orderLink',result.get('orderLink'));
            purchaseTrack.set('mail',result.get('mail'));
            purchaseTrack.set('amount',result.get('amount'));
            purchaseTrack.set('shippingCompany',result.get('shippingCompany'));
            purchaseTrack.set('shippingType',result.get('shippingType'));
            purchaseTrack.set('shippingStatus',result.get('shippingStatus'));
            purchaseTrack.set('trackingNumber','');
            purchaseTrack.set('comment',result.get('comment'));
            purchaseTrack.set('image',result.get('image'));
            purchaseTrack.set('siteType',result.get('siteType'));
            purchaseTrack.save(null, {
                success: function () {
                    req.flash('success', '复制订单成功!');
                    res.redirect('/purchase');
                },
                error: function (err) {
                    next(err);
                }
            });
        }

    ]);
});

router.get('/remove/:purchaseId', function (req, res, next) {

    if(!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }

    var purchaseId = req.params.purchaseId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(PurchaseTrack);
            query.equalTo('purchaseId', parseInt(purchaseId));
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
                    res.redirect('/purchase');
                }
            });
        }

    ]);
});

router.get('/shipping-status',(req,res)=> {
    let purchaseId = parseInt(req.query.purchaseId);
    let status = req.query.status;
    
    let query = new AV.Query(PurchaseTrack);
    query.equalTo('purchaseId',purchaseId);
    query.first().done(item=> {
        item.set('shippingStatus',status);
        return item.save();
    }).done(()=> {
        res.send({success:1});
    });
     
});

router.get('/get-spider-info',(req,res)=> {

    let url = req.query.url;
    var result = {title: '-', image: '//ac-JoaBcRTt.clouddn.com/b7f0d580ef9a4ae8e19b.png?imageMogr2/thumbnail/24'};
    var response = res;
    var domain = url.match(spider.domain);
    var spiderConfig = spider.spider;
    if(typeof(spiderConfig[domain]) == "undefined") {
        response.send(result);
        return;
    }
    var patten = spiderConfig[domain]['title'];
    https.get(url, function(res) {
        var html='';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end',function() {
            var title = html.match(patten);
            if(title) {
                result.title = title[0].replace(/<(?:.|\s)*?>/g,"");
            }
            patten = spiderConfig[domain]['image'];
            var image = html.match(patten);
            if(image) {
                result.image = spiderConfig[domain]['path'] + image[0].match(spiderConfig[domain]['imageUrl'])[0].replace(/"/gi, "");
            }
            response.send(result);
        });
    }).on('error', function() {
        console.log('error');
    });
});


module.exports = router;