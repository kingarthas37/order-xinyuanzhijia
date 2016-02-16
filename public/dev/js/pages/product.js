'use strict';

require('jquery-validate');
var productPreview = require('./lib/product-preview');

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
        this.chooseBanner();
        this.formActionSelect();
        this.setTabs();
        this.setMainImage();

    },
    editFun:function() {

        $('#form-add-product').validate();
        this.chooseBanner();
        this.formActionSelect();
        this.setTabs();
        this.setMainImage();
    },
    
    previewFun:productPreview,
    
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
                currentBannerSrc = select.find('option[value='+ this.value +']').attr('data-src');
                currentBannerTitle = select.find('option[value='+ this.value +']').text();
            }
            codeBanner.html('<img src="'+ currentBannerSrc +'"/>');
            mdCodeBanner.val('!['+ currentBannerTitle +']('+ currentBannerSrc +')');

        });
        
        $('.banner-enable').click(function() {
        
            if(this.checked) {
                mdCodeBanner.val('');
                select.addClass('hide');
                codeBanner.addClass('hide');
                mdCodeBanner.addClass('hide');
            } else {
                select.trigger('change');
                select.removeClass('hide');
                codeBanner.removeClass('hide');
                mdCodeBanner.removeClass('hide');
            }
            
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
        
    },
    
    //tab控件
    setTabs:function() {
        $('.am-tabs').tabs({
            animation:false
        });
    },
    
    //设置主图预览
    setMainImage:function() {
        
        var contentImage = $('#content-main-image').find('ul');
        var mainImage = $('#main-image');
        
        mainImage.change(function() {
            contentImage.empty();
            var arr = mainImage.val().split('\n');
            if($.trim(arr[0])==='') {
                return;
            }
            $.each(arr,function(i,n) {
                contentImage.append('<li><a href="'+ arr[i] +'" target="_blank"><img src="' + arr[i] + '"/></a></li>');
            });
        }).trigger('change');
        
    }

};