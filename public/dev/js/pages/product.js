'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        $('.select-category').change(function() {
            if(this.value > 0 ) {
                location.href = '/product?categoryId=' + this.value;
            }
        });

        $('.remove-product').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-product').modal({
                relatedTarget: this,
                onConfirm: function(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function() {
                    return false;
                }
            });
            
            return false;
            
        });

    },

    addFun:function() {

        $('#form-add-product').validate();
       // this.chooseInfo();
        this.chooseBanner();
        this.formActionSelect();

    },
    editFun:function() {

        $('#form-add-product').validate();
       // this.chooseInfo();
        this.chooseBanner();
        this.formActionSelect();
    },
     

    previewFun:function() {

        var previewContent = $('.preview-content');
        
        var html = $.trim(previewContent.html());
        //html = html.replace(/\<img/g,'<img style="width:100%"');
        
        var btnCopy = $('.btn-copy');
        btnCopy.zclip({
              path: '/swf/ZeroClipboard.swf',
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
        
        
        
    },
    
    //使用购买说明信息
    chooseInfo:function() {

        var contentInfo = $('#content-info');
        var mdCodeInfo = $('#md-code-info');

        mdCodeInfo.val('![]('+ contentInfo.find('.product-title img').attr('src') +')');

        contentInfo.find(':checkbox').click(function() {
            if(this.checked) {
                mdCodeInfo.val('![]('+ contentInfo.find('.product-title img').attr('src') +')');
            } else {
                mdCodeInfo.val('');
            }
        });
        
    },
    
    //选择banner
    chooseBanner:function() {

        var select = $('#select-banner');
        var bannerLength = select.find('option').length - 1;
        var codeBanner = $('.code-banner');
        var mdCodeBanner = $('#md-code-banner');
        
        var currentBannerSrc,
            currentBannerTitle;
        
        //如果是新增产品，默认为0
        if(parseInt(select.val()) === 0) {
            
            var count = Math.floor(Math.random(100) * bannerLength);
            currentBannerSrc = select.find('option:eq(' + count + ')').attr('data-src');
            currentBannerTitle = select.find('option:eq(' + count + ')').text();

            codeBanner.html('<img src="'+ currentBannerSrc +'"/>');
            mdCodeBanner.val('!['+ currentBannerTitle +']('+ currentBannerSrc +')');
            
            //编辑产品
        } else {
            
            currentBannerSrc = select.find('option:selected').attr('data-src');
            currentBannerTitle = select.find('option:selected').text();

            codeBanner.html('<img src="'+ currentBannerSrc +'"/>');
            mdCodeBanner.val('!['+ currentBannerTitle +']('+ currentBannerSrc +')');
        }
        
        select.on('change',function() {

            if(parseInt(this.value) === 0) {
                var count = Math.floor(Math.random(100) * bannerLength);
                currentBannerSrc = select.find('option:eq(' + count + ')').attr('data-src');
                currentBannerTitle = select.find('option:eq(' + count + ')').text();
            } else {
                currentBannerSrc = select.find('option:eq(' + this.value + ')').attr('data-src');
                currentBannerTitle = select.find('option:eq(' + this.value + ')').text();
            }
            codeBanner.html('<img src="'+ currentBannerSrc +'"/>');
            mdCodeBanner.val('!['+ currentBannerTitle +']('+ currentBannerSrc +')');

        });
        
    },
    
    //表单提交，是否是保存还是预览
    formActionSelect:function() {

        $('form :submit').click(function() {
            $('form').attr({
                'action':$(this).attr('data-action'),
                'target':$(this).attr('data-target')
            });
            return true;
        });
        
    }

};