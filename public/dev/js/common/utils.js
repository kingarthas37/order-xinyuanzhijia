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
        
    },
    
    imageConvert() {

        let modalImageConvert = $('#modal-image-convert');
        if(!modalImageConvert.length) {
            $('body').append(`
                <div class="am-modal am-modal-no-btn" tabindex="-1" id="modal-image-convert">
                  <div class="am-modal-dialog">
                    <div class="am-modal-hd">图片在线转换
                      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                    </div>
                    <div class="am-modal-bd">
                        <form class="am-form t-l">
                            <div class="am-form-group">
                              <input type="text" id="input-image-convert" class="am-form-field" placeholder="输入需要转换的图片Url"/>
                            </div> 
                            <button type="button" class="am-btn am-btn-primary">开始转换</button>
                            <span class="info"></span>
                        </form>
                    </div>
                  </div>
                </div>
            `);
            modalImageConvert = $('#modal-image-convert');
            let input = modalImageConvert.find('.am-form-field');
            let button = modalImageConvert.find('.am-btn');
            let info = modalImageConvert.find('.info');
            button.click(function() {
                
                let val = $.trim(input.val());
                if(!val) {
                    input[0].focus();
                    return false;
                }
                
                if(!/(\.jpg|\.jpeg|\.png|\.gif)/.test(val)) {
                    input.val('');
                    input[0].focus();
                    return false;
                }
                
                button.prop('disabled',true).text('正在转换中...');
                
                info.text('');
                $.ajax({
                    url:'/file-manage/upload/auto',
                    type:'post',
                    data:{
                        'img-url':val
                    }
                }).then(function (data) {
                    if(data.success) {
                        info.text('转换成功!');
                        button.prop('disabled',false).text('开始转换');
                        input.val(data.url);
                        input[0].focus();
                        input.select();
                    } else {
                        info.text('转换失败!');
                    }
                });
                
            });
            
        }

        modalImageConvert.modal();
        modalImageConvert.find('.am-form-field').val('').get(0).focus();
        modalImageConvert.find('.info').text('');
        
    }
    
};