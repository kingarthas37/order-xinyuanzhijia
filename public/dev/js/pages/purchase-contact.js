'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {

    indexFun:function() {
        
            $('.remove-purchase-contact').click(function() {
            var $this = $(this);
            $('#confirm-remove-purchase-contact').modal({
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
        $('#form-add-purchase-contact').validate();
    },
    
    editFun:function() {
        $('#form-edit-purchase-contact').validate();
    },

    uploadTitleImg:function() {
 
        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');
        
        formUploadImg.submit(function(){
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success:function(data) {
                    if(data.success) {
                        uploadLoading.removeClass('on');
                        window.parent.uploadTitleImgResponse(data.url);
                    }
                }
            });
            return false;
        });

        iconImage.change(function() {
            formUploadImg.submit();
        });
        
    },
    
    uploadTitleImgResponse:function(url) {
        $('#image-url').val(url);
    }
};