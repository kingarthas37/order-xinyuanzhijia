'use strict';

module.exports = {

    urlCompleting:function(url) {
    
        if(url.trim() === '') {
            return '';
        }
        
        if(url.indexOf('http') > -1) {
            return url;
        }
        
        return 'http://' + url;
        
    }

};