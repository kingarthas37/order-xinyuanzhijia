'use strict';

let router = require('express').Router();
let AV = require('leanengine');

let flash = require('connect-flash');

let async = require('async');
let extend = require("xtend");

let config = require('../../lib/config');

//class
let Identity = AV.Object.extend('Identity');

//lib
let pager = require('../../lib/component/pager-str');

let data =  extend(config.data,{
    title: '身份证管理',
    currentPage: 'identity'
});


//首页
router.get('/', (req, res) => {

    if (!req.currentUser) {
        return res.redirect('/?return=' + encodeURIComponent(req.originalUrl));
    }
    
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : config.page.LIMIT;
    let order = req.query.order || 'asc';

    let searchName = req.query['search-name'];
    let searchIsOften = req.query['search-isoften'] !== '0' ? true :false;
    
    data = extend(data,{
        flash: {
            success:req.flash('success'),
            error:req.flash('error')
        },
        user:req.currentUser,
        searchName:searchName,
        searchIsOften:searchIsOften
    });
    
    let query = new AV.Query(Identity);
    
    if(searchName) {
        query.contains('name',searchName);
    }
    
    if(searchIsOften) {
        query.equalTo('isOften',true);
    }
    
    query.count().then(count => {

        data = extend(data,{
            pager:pager(page,limit,count),
            count:count
        });
        
        query.skip((page - 1) * limit);
        query.limit(limit);

        if(order === 'asc') {
            query.ascending('identityId');
        } else {
            query.descending('identityId');
        }

        if(searchName) {
            query.contains('name',searchName);
        }

        if(searchIsOften) {
            query.equalTo('isOften',true);
        }
        
        return query.find();
        
    }).then((results)=>{
        data = extend(data, {
            identity:results
        });
        res.render('identity', data);
    });
    
});



router.get('/remove/:identityId', function (req,res) {

    if(!req.currentUser) {
        return res.json({
            error:1,
            msg:config.error.NOT_SUCCESS
        });
    }

    let identityId = parseInt(req.params.identityId);
    
    let query = new AV.Query(Identity);
    query.equalTo('identityId',identityId);
    query.first().then(function(result) {
        result.destroy().then(function() {
            res.redirect('/identity');
        });
    });
 
});


module.exports = router;