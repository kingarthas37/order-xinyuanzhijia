'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var extend = require('xtend');
var config = require('../../lib/config');
var utils = require('../../lib/utils');

var flash = require('connect-flash');

//class
var PurchaseContact = AV.Object.extend('PurchaseContact');

var data =  extend(config.data,{
    title:'添加网站联系方式-添加',
    currentPage:'purchase-contact'
});

//添加产品页
router.get('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    data = extend(data,{
        user:req.AV.user
    });
    
    res.render('purchase-contact/add', data);
});



//添加产品页
router.post('/', function (req, res, next) {

    if (!req.AV.user) {
        return res.redirect('/login');
    }
    
    var name = req.body['name'];
    var description = req.body['description'];
    var shop =req.body['shop'];
    var website = req.body['website'];
    var email =req.body['email'];
    var imageUrl = req.body['image-url'];
    
    shop = utils.urlCompleting(shop);
    website = utils.urlCompleting(website);
    imageUrl = utils.urlCompleting(imageUrl);
    
    var purchaseContact = new PurchaseContact();

    purchaseContact.set('name',name);
    purchaseContact.set('description',description);
    purchaseContact.set('shop',shop);
    purchaseContact.set('website',website);
    purchaseContact.set('email',email);
    purchaseContact.set('imageUrl',imageUrl);

    purchaseContact.save(null, {
        success: function () {
            req.flash('success', '添加联系方式成功!');
            res.redirect('/purchase-contact');
        },
        error: function (err) {
            next(err);
        }
    });
    
});


module.exports = router;