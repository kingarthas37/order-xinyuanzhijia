'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var flash = require('connect-flash');

var async = require('async');

//class
var Customer = AV.Object.extend('Customer');

//删除订单
router.get('/:customerId', function (req, res, next) {

    if(!req.AV.user) {
        return res.redirect('/login');
    }
    
    var customerId = req.params.customerId;

    async.waterfall([

        function (cb) {
            var query = new AV.Query(Customer);
            query.equalTo('customerId', parseInt(customerId));
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
                    res.redirect('/customer');
                }
            });
        }

    ]);
});

module.exports = router;