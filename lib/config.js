'use strict';

let env = process.env.LEANCLOUD_APP_ENV || 'development';

module.exports = {
    data:{
        title: '51wish',
        currentPage: 'index',
        info:{success:null,error:null},
        user:null,
        env:env
    },
    env:env,
    error:{
        NOT_SUCCESS:'未登录'
    },
    page:{
        LIMIT:20
    }
};