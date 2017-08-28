'use strict';

let leanAppHeader = window.leanAppHeader;

module.exports = {

    indexFun: function () {

        //删除productMethod
        let removeLink = $('.remove-product-method');
        let modal = $('#confirm-remove-product-method');
        let alert = $('#modal-alert');

        //alert 关闭后移除暂存的实例，再次调用时重新初始化,可以解决2次调用同一代码的问题
        alert.on('closed.modal.amui', function () {
            $(this).removeData('amui.modal');
        });

        removeLink.click(function() {
            
            modal.modal({
                relatedTarget: this,
                onConfirm: function () {

                    let item = $(this.relatedTarget);
                    let productMethodId = parseInt(item.data('id'));

                    if (item.data('state')) {
                        return false;
                    }

                    item.data('state', true);
                    $.AMUI.progress.start();

                    $.ajax({
                        type:'post',
                        url:`/product-method/remove/${productMethodId}`,
                        success: function (data) {
                            
                            item.data('state', false);
                            $.AMUI.progress.done();
                            modal.modal('close');

                            if (data.success) {
                                alert.modal({
                                    onConfirm: ()=> location.reload()
                                }).find('.am-modal-bd').text('删除产品类型成功!');
                            } else {
                                alert.modal().find('.am-modal-bd').text(data.message);
                            }
                        }
                        
                    });

                    return false;
                }
            });
            
        });

    },
    addFun: function () {
        this.submitControl();
    },
    editFun: function () {
        this.submitControl();
    },
    submitControl: function () {
        let submit = $('#submit');
        $('.am-form').validator({
            submit: function () {
                if (!this.isFormValid()) {
                    return false;
                }
                submit.attr('disabled', true).addClass('am-disabled');
            }
        });
    }
};