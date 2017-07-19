'use strict';
let av;
module.exports = {
    getAV(){
        av = require('leanengine');
        return av;
    },
    getObject(name){
        return this.getAV().Object.extend(name);
    },
    getExtend(){
        return require('xtend');
    },
    getConfig(){
        return require('../config');
    },
    getRequest(){
        return require('request');
    },
    getAsync(){
        return require('async');
    },
    getRouter(){
        return require('express').Router();
    },
    isAdminUserLogin(req,res){
        this.getAV();
        if(!req.currentUser) {
            return res.redirect(`/admin/login?return=${encodeURIComponent(req.originalUrl)}`);
        }
    },
    isWebUserLogin(req,res) {
        if(!req.cookies.login) {
            res.redirect(`/user/login?return=${encodeURIComponent(req.originalUrl)}`);
        }
    },
    setSessionCookie(req, res, data, domain) {
        if (domain) {
            res.cookie('login', this.getSessionDataFormat(data), {maxAge: 60*1000*60*24*365, domain: domain});
        } else {
            res.cookie('login', this.getSessionDataFormat(data), {maxAge: 60*1000*60*24*365});
        }
    },
    getSessionDataFormat(data) {
        return this.getEncodeByBase64({'username': data.attributes.username,
            'id' : data.attributes.commonMemberId,
            'objectId' : data.id,
            'nickname' : data.attributes.nickname,
            'mobile' : data.attributes.mobile,
            //'sex' : data.attributes.sex,
            //'mobilePhoneVerified': data.attributes.mobilePhoneVerified,
            //'wechat' : (data.attributes.wechat || null),
            //'birthday' : (data.attributes.birthday || null)
        });
    },
    getEncodeByBase64(data) {
        var str = JSON.stringify(data);
        return new Buffer(str).toString('base64');
    },
    getDecodeByBase64(data) {
        return JSON.parse(new Buffer(data, 'base64').toString());
    },
    formartDate(date) {
        var date = new Date(date);
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }
};
