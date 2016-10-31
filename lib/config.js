'use strict';

let env = process.env.LEANCLOUD_APP_ENV || 'development';

let assetName = require('../package').name;
let md5 = require('md5');

//应用Keys,请求header设置
let keys = {
    APPID: 'JoaBcRTtJUNAV1bLpqv8z1ze-gzGzoHsz',
    APPKEY: 'IuCVN88iRDjBIhX2jT1fDdhd'
};

let timestamp = new Date().getTime();
let x_lc_id = keys.APPID;
let x_lc_sign = `${md5(timestamp + keys.APPKEY)},${timestamp}`;

module.exports = {
    data:{
        title: 'order-51wish',
        currentPage: 'index',
        info:{success:null,error:null},
        user:null,
        env:env,
        asset: env === 'production' ? 'min' : 'dist',
        assetName: assetName,
        x_lc_id:x_lc_id,
        x_lc_sign:x_lc_sign
    },
    env:env,
    error:{
        NOT_SUCCESS:'未登录'
    },
    page:{
        LIMIT:20
    },
    watermark:{
        main:'?watermark/1/image/aHR0cDovL2FjLUpvYUJjUlR0LmNsb3VkZG4uY29tLzdiNDkwMGQ2MDFkZmM4MGQ4NDE5LnBuZw==/dissolve/100/gravity/SouthEast/dx/0/dy/50'
    }
};