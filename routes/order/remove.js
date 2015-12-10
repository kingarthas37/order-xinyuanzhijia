'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');

//class
var OrderTrack = AV.Object.extend('OrderTrack');

//删除订单
router.get('/:orderId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
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