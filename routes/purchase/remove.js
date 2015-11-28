'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');


var title = '订单编辑-删除订单';
var currentPage = 'purchase';


//删除订单
router.get('/:purchaseId', function (req, res, next) {

    var purchaseId = req.params.purchaseId;

    var datas = {
        title: title,
        currentPage: currentPage,
        info: req.flash('info')
    };

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
                    req.flash('info', '删除成功!');
                    res.redirect('/purchase');
                }
            });
        }

    ]);
});


module.exports = router;