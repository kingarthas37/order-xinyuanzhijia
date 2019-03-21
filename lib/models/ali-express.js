'use strict';
let tableName = 'ShipOrder';
let base = require('../../lib/models/base');
let shipOrder, av, extend, config, request;
let md5 = require('md5');
require('../../lib/utils');

module.exports = {
    init() {
        extend = base.getExtend();
        shipOrder = base.getObject(tableName);
        av = base.getAV();
        config = base.getConfig();
        request = base.getRequest();
    },
    createNew(){
        this.init();
        return extend(this, base);
    },
    getExpressInfo(number, type) {

        //阿里云接口: https://market.aliyun.com/products/57126001/cmapi011120.html?spm=5176.10695662.1996646101.searchclickresult.6c1009d0hVo5XR#sku=yuncode512000008
        //全国快递物流查询接口
        return new Promise(function(resolve, reject) {
            resolve({success:1});
        })
        let option = {
            // url: 'http://jisukdcx.market.alicloudapi.com/express/query?number='+number+'&type='+type,
            url: 'http://wuliu.market.alicloudapi.com/kdi?no='+number+'&type='+type,
            json: true,
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization" : config.aliExpress.appCode
            }
        };
        let list = null;
        let msg = '系统繁忙请稍后查询';
        return new Promise(function(resolve, reject) {
            request(option, function (error, response, body) {
                if (response.statusCode != 200 || error) {
                    msg = '系统繁忙请稍后查询';
                } else if (body.status != '0') {
                    msg = body.msg;
                } else {
                    list = body.result.list;
                    msg = 'ok';
                }
                resolve({list, msg});
            });
        });
    }
};