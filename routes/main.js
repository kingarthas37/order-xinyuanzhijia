'use strict';

var router = require('express').Router();

module.exports = {
    //product
    '/product':require('./product/index'),
    '/product/add':require('./product/add'),
    '/product/edit':require('./product/edit'),
    '/product/remove':require('./product/remove'),
    '/product/preview':require('./product/preview'),

    //book
    '/book':require('./book/index'),
    '/book/add':require('./book/add'),
    '/book/edit':require('./book/edit'),
    '/book/remove':require('./book/remove'),
    '/book/preview':require('./book/preview'),
    
    //music
    '/music':require('./music/index'),
    '/music/add':require('./music/add'),
    '/music/edit':require('./music/edit'),
    '/music/remove':require('./music/remove'),
    '/music/preview':require('./music/preview'),
    
    //purchase
    '/purchase':require('./purchase/index'),
    '/purchase/add':require('./purchase/add'),
    '/purchase/edit':require('./purchase/edit'),
    '/purchase/remove':require('./purchase/remove'),
    '/purchase/preview':require('./purchase/preview')
};