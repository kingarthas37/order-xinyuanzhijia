
'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {

    indexFun: function () {

        $('.remove-file-manage').click(function () {
            var $this = $(this);
            $('#confirm-remove-file-manage').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    location.href = $this.attr('href');
                },
                onCancel: function () {
                    return false;
                }
            });
            return false;
        });

    },
    addFun: function () {
        $('#form-add-file-manage').validate();
    },

    editFun: function () {
        $('#form-edit-file-manage').validate();
    },

    uploadImg: function (callbackName) {
        
        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');

        formUploadImg.submit(function () {
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success: function (data) {
                    uploadLoading.removeClass('on');
                    if (data.success) {
                        window.parent[callbackName](data.url);
                    }
                }
            });
            return false;
        });

        iconImage.change(function () {
            formUploadImg.submit();
        });

    }
};