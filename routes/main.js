'use strict';

require('express').Router();

module.exports = {
    
    //sign
    '/':require('./sign/login'),  //login 设为未登录首页
    '/register':require('./sign/register'),
    '/logout':require('./sign/logout'),

    //index
    '/index':require('./index/index'), // /index为已登录首页

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

    //spent
    '/spent':require('./spent'),
    '/spent/edit':require('./spent/edit'),

    //remark
    '/remark':require('./remark'),
    '/remark/add':require('./remark/add'),
    '/remark/edit':require('./remark/edit'),
    
    //resources-download
    '/resources-download':require('./resources-download'),
    '/resources-download/preview':require('./resources-download/preview'),
    '/resources-download/edit':require('./resources-download/edit'),
    
    //taobao-mail-create
    '/mail/taobao-mail-create':require('./mail/taobao-mail-create'),
    '/mail/taobao-read':require('./mail/taobao-read'),

    //product-category
    '/product-category':require('./product-category'),
    
    //product-record
    '/product-record':require('./product-record'),
    '/product-record/add':require('./product-record/add'),
    '/product-record/edit':require('./product-record/edit'),

    //product-method
    '/product-method':require('./product-method'),
    '/product-method/add':require('./product-method/add'),
    '/product-method/edit':require('./product-method/edit'),
    
    //product-book
    '/product-book':require('./product-book'),
    '/product-book/add':require('./product-book/add'),
    '/product-book/edit':require('./product-book/edit'),
    
    //product-translate
    '/product-translate':require('./product-translate'),
    '/product-translate/add':require('./product-translate/add'),
    '/product-translate/edit':require('./product-translate/edit'),
    
    //brand
    '/product-brand':require('./product-brand'),
    '/product-brand/add':require('./product-brand/add'),
    '/product-brand/edit':require('./product-brand/edit'),
    
    //identity-manage
    '/identity':require('./identity'),
    '/identity/add':require('./identity/add'),
    '/identity/edit':require('./identity/edit'),
    '/identity/upload':require('./identity/upload'),

    //tools
    '/tools':require('./tools'),

    //file-manage
    '/file-manage':require('./file-manage'),
    '/file-manage/add':require('./file-manage/add'),
    '/file-manage/edit':require('./file-manage/edit'),
    '/file-manage/upload':require('./file-manage/upload'),

    //crontab
    '/crontab':require('./crontab')


    //ship-order
    '/ship-order':require('./ship-order'),
    '/ship-order/add':require('./ship-order/add'),
    '/ship-order/edit':require('./ship-order/edit'),
};