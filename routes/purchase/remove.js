'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');

//class
var PurchaseTrack = AV.Object.extend('PurchaseTrack');

//删除订单
router.get('/:purchaseId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
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

module.exports = router;