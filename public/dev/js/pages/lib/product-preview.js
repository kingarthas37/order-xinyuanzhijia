'use strict';

//产品预览 function
module.exports = function() {

    var previewContent = $('.preview-content');

    var html = $.trim(previewContent.html());
    
    var btnCopy = $('.btn-copy');
    btnCopy.zclip({
        path: '/assets/swf/ZeroClipboard.swf',
        copy: function () {
            return html;
        },
        afterCopy: function () {
            btnCopy.popover({
                content: '复制成功!'
            });
        }
    });

    var btnShot = $('.btn-shot');
    btnShot.button('loading');
    var progress = $.AMUI.progress;
    
    $('p img').wrap('<span class="img-mark"></span>');
    $('.img-mark').append('<em></em>');

    window.onload = function() {

        btnShot.button('reset');
        btnShot.click(function() {

            progress.start();
            btnShot.button('loading').text('图片生成中...');
            $.ajax({
                url:'/product/preview/shot',
                type:'post',
                data:{
                    html:html,
                    htmlHeight:previewContent.height(),
                    name:$('h4').text()
                },
                success:function(data) {
                    progress.done();
                    $('#modal-shot-success').modal();
                    btnShot.button('reset').text('生成淘宝详情图片');
                }
            });
        });

    };

};