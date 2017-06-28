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
    getRemoteProductInfo(url,callback) {
        
        
        
    }
    
};