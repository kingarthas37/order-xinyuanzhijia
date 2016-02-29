'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {
    indexFun: function () {

        $('.select-record-category').change(function() {
            if(this.value > 0 ) {
                location.href = '/record?recordCategoryId=' + this.value;
            }
        });

        $('.remove-record').click(function () {
            var $this = $(this);
            $('#confirm-remove-record').modal({
                relatedTarget: this,
                onConfirm: function () {
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
        $('#form-add-record').validate();
    },
    editFun: function () {
        $('#form-edit-record').validate();
    },
    uploadImg: function () {

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
        $('#image').val(url);
    },
    uploadImgError: function (error) {
        var modal = $('#alert-image-upload-error');
        modal.find('.am-modal-bd').text(error);
        modal.modal();
    }
};