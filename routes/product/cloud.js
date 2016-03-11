'use strict';

var router = require('express').Router();
var AV = require('leanengine');

var async = require('async');
var extend = require("xtend");

//class
var Product = AV.Object.extend('Product');
var Category = AV.Object.extend('ProductCategory');


AV.Cloud.define('category',(req,res)=> {

    let query = new AV.Query(Category);
    query.select('categoryId','categoryName');
    query.find().then(items => {
        res.success({
            success:1,
            data:items
        });
    },error=>res.error(error));
    
});


AV.Cloud.define('product',(req,res) => {

    let productId = parseInt(req.params.productId);
    let query = new AV.Query(Product);
    query.equalTo('productId',productId);
    
    query.select('video','property','propertyEn','name','detailEn','instructionEn','categoryId','productId','nameEn','review','mainImage','image','instruction','detail');
    
    query.first().then(item => {
        res.success({
            success:1,
            data:item
        });
    },error => res.error(error));
    
});



module.exports = router;