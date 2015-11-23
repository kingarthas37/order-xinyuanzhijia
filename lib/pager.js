'use strict';

module.exports = function(page,limit,count) {

    var _pager = {
        page:page,
        limit:limit,
        next:false,
        prev:false
    };
    
    if(count > page * limit) {
        _pager.next = Math.floor(count / limit) + 1;
    }
    
    if( page > 1) {
        _pager.prev = page - 1;
    }
  
    return _pager;

};