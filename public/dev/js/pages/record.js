'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {

    indexFun:function() {
        
            $('.remove-record').click(function() {
            var $this = $(this);
            $('#confirm-remove-record').modal({
                relatedTarget: this,
                onConfirm: function() {
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
        $('#form-add-record').validate();
    },
    editFun:function() {
        $('#form-edit-record').validate();
    },
    uploadImg:function() {
 
        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');
        
        formUploadImg.submit(function(){
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success:function(data) {
                    if(data.success) {
                        uploadLoading.removeClass('on');
                        window.parent.uploadImgResponse(data.url);
                    }
                }
            });
            return false;
        });

        iconImage.change(function() {
            formUploadImg.submit();
        });
        
    },
    
    uploadImgResponse:function(url) {
        $('#image').val(url);
    }
};