'use strict';

var router = require('express').Router();

module.exports = {
    
    //index
    '/':require('./index/index'),
    
    //sign
    '/register':require('./sign/register'),
    '/login':require('./sign/login'),
    '/logout':require('./sign/logout'),
    
    //product
    '/product':require('./product'),
    '/product/add':require('./product/add'),
    '/product/edit':require('./product/edit'),
    '/product/preview':require('./product/preview'),

    //book
    '/book':require('./book'),
    '/book/add':require('./book/add'),
    '/book/edit':require('./book/edit'),
    '/book/preview':require('./book/preview'),
    
    //music
    '/music':require('./music'),
    '/music/add':require('./music/add'),
    '/music/edit':require('./music/edit'),
    '/music/preview':require('./music/preview'),
    
    //purchase
    '/purchase':require('./purchase'),
    '/purchase/add':require('./purchase/add'),
    '/purchase/edit':require('./purchase/edit'),
    
    //customer
    '/customer':require('./customer'),
    '/customer/add':require('./customer/add'),
    '/customer/edit':require('./customer/edit'),
    
    //order
    '/order':require('./order'),
    '/order/add':require('./order/add'),
    '/order/edit':require('./order/edit'),
    
    //purchase-contact
    '/purchase-contact':require('./purchase-contact'),
    '/purchase-contact/add':require('./purchase-contact/add'),
    '/purchase-contact/edit':require('./purchase-contact/edit'),
    '/purchase-contact/upload':require('./purchase-contact/upload'),
    
    //earning
    '/earning':require('./earning'),
    '/earning/edit':require('./earning/edit'),

    //remark
    '/remark':require('./remark'),
    '/remark/add':require('./remark/add'),
    '/remark/edit':require('./remark/edit'),
    
    //resources-download
    '/resources-download':require('./resources-download'),
    '/resources-download/preview':require('./resources-download/preview'),
    '/resources-download/edit':require('./resources-download/edit')
    
    
    
};