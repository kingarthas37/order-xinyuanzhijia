'use strict';

module.exports = {
    
    //pager 初始数据
    init(page,limit,count) {

        let pager = {
            page,count,limit,
            next:false,
            prev:false
        };

        if(count > page * limit) {
            pager.next = page + 1;
        }

        if( page > 1) {
            pager.prev = page - 1;
        }

        return pager;

    },
    
    //根据url参数直接输出pager html
    initHtml(settings) {
        
        let pager = this.init(settings.page,settings.limit,settings.count);
        let htmlPrev = '';
        let htmlNext = '';
        let serializePrev = '';
        let serializeNext = '';
        let serializeArr = Object.keys(settings.serialize);
        
        serializeArr.forEach((key,i) => {

            if(!settings.serialize[key]) {
                return;
            }
            
            if(pager.prev && key === 'page') {
                serializePrev += `${key}=${pager.prev}&`;
            } else {
                serializePrev += `${key}=${settings.serialize[key]}&`;
            }
            
            if(pager.next && key === 'page') {
                serializeNext += `${key}=${pager.next}&`;
            } else {
                serializeNext += `${key}=${settings.serialize[key]}&`;
            }
        });

        if(/\&$/.test(serializePrev)) {
            serializePrev = serializePrev.substring(0,serializePrev.length-1);
        }

        if(/\&$/.test(serializeNext)) {
            serializeNext = serializeNext.substring(0,serializeNext.length-1);
        }
        
        if(pager.prev) {
            htmlPrev = `<li><a href="${settings.url}?${serializePrev}">上一页</a></li>`;
        }
        
        if(pager.next) {
            htmlNext = `<li><a href="${settings.url}?${serializeNext}">下一页</a></li>`;
        }
        
        return htmlPrev + htmlNext;
    }
};