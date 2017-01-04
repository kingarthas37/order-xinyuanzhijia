'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var Identity = AV.Object.extend('Identity');

var data =  extend(config.data,{
    title:'编辑身份证',
    currentPage:'identity'
});


//编辑产品页
router.get('/:identityId', (req, res) => {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var identityId = parseInt(req.params.identityId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });

    
    var query = new AV.Query(Identity);
    query.equalTo('identityId', identityId);
    query.first().then(function(result) {
        data = extend(data, {
            identity:result
        });
        res.render('identity/edit', data);
    });

});



router.post('/:identityId',(req,res) => {

    if(!req.currentUser) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let identityId = parseInt(req.params['identityId']);
    let name = req.body['name'];
    let cardNo = req.body['card-no'];
    let cardAddress = req.body['card-address'];
    let shippingAddress = req.body['shipping-address'];
    let phone = req.body['phone'];
    let cardImageFront = req.body['card-image-front'];
    let cardImageBack = req.body['card-image-back'];
    let cardImageAll = req.body['card-image-all'];
    let isOften = req.body['is-often'] ? true : false;
    
    let query = new AV.Query(Identity);

    query.equalTo('identityId',identityId);
    
    query.first().then(result => {
        return result.save({
            name:name,
            cardNo:cardNo,
            cardAddress:cardAddress,
            shippingAddress:shippingAddress,
            phone:phone,
            cardImageFront:cardImageFront,
            cardImageBack:cardImageBack,
            cardImageAll:cardImageAll,
            isOften:isOften
        });
        
    }).then(() => {
        req.flash('success','编辑身份证成功!');
        res.redirect('/identity');
    });

});

module.exports = router;