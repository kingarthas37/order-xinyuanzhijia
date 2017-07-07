'use strict';

module.exports = {
  
    //url参数组合
    urlParamsComponent:(url,params)=> {
        let search = '';
        for(let key in params) {
            if(params[key]) {
                search += `${key}=${params[key]}&`;
            }
        }
        return url + '?' + search.substring(0,search.length-1);
    },
    
    //获取远程产品图片标题资源
    getRemoteProductInfo(link,callback) {

        $.ajax({
            url: '/purchase/get-spider-info',
            type: 'get',
            data: {
                url: link
            }
        }).then(
            result => {
                callback(result.image || '',result.title || '');
            },
            error => {
                callback(false);
            }
        );
        
    }
    
};