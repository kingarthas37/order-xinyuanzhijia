'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var config = require('../../lib/config');

var flash = require('connect-flash');

var async = require('async');
var extend = require("xtend");

//class
var RecordCategory = AV.Object.extend('RecordCategory');

var data =  extend(config.data,{
    title:'产品收录分类',
    currentPage:'recordCategory'
});


//编辑产品页
router.get('/:recordCategoryId', (req, res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    var recordCategoryId = parseInt(req.params.recordCategoryId);

    data = extend(data,{
        flash: { success:req.flash('success'), error:req.flash('error') },
        user:req.AV.user
    });

    
    var query = new AV.Query(RecordCategory);
    query.equalTo('recordCategoryId', recordCategoryId);
    query.first().then(function(result) {
        data = extend(data, {
            recordCategory:result
        });
        res.render('record-category/edit', data);
    });

});



router.post('/:recordCategoryId',(req,res) => {

    if(!req.AV.user) {
        return res.redirect('/login?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let recordCategoryId = parseInt(req.params['recordCategoryId']);
    let name = req.body['name'];
    let query = new AV.Query(RecordCategory);

    query.equalTo('recordCategoryId',recordCategoryId);
    query.first().then((result) => {
        
        result.set('name',name);
        return result.save();
        
    }).then(() => {
        req.flash('success', '编辑产品分类成功!');
        res.redirect('/record-category');
    });

});

module.exports = router;