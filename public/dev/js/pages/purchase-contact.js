'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {

    indexFun: function () {

        $('.remove-purchase-contact').click(function () {
            var $this = $(this);
            $('#confirm-remove-purchase-contact').modal({
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
        $('#form-add-purchase-contact').validate();
    },

    editFun: function () {
        $('#form-edit-purchase-contact').validate();
    },

    uploadTitleImg: function () {

        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');

        formUploadImg.submit(function () {
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success: function (data) {
                    uploadLoading.removeClass('on');
                    if (data.success) {
                        window.parent.uploadImgResponse(data.url);
                    } else {
                        window.parent.uploadImgError(data.error);
                    }
                }
            });
            return false;
        });

        iconImage.change(function () {
            formUploadImg.submit();
        });

    },

    uploadImgResponse: function (url) {
        $('#image-url').val(url);
    },
    uploadImgError: function (error) {
        var modal = $('#alert-image-upload-error');
        modal.find('.am-modal-bd').text(error);
        modal.modal();
    }
};