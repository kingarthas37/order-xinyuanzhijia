'use strict';

var router = require('express').Router();

module.exports = {
    '/product':require('./product/index'),
    '/product/add':require('./product/add'),
    '/product/edit':require('./product/edit'),
    '/product/remove':require('./product/remove'),
    '/product/preview':require('./product/preview')
};