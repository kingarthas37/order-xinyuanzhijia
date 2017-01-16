'use strict';

var AV = require('leanengine');

AV.Cloud.define('env', function(request, response) {
    response.success({env:process.env.LEANCLOUD_APP_ENV || 'development'});
});

AV.Cloud.define('hello', function(request, response) {
    response.success({name:'Wang Lin'});
});

module.exports = AV.Cloud;