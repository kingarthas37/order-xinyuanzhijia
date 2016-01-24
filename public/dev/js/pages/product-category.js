'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        $('.remove-product-category').click(function() {
            var $this = $(this);
            $('#confirm-remove-product-category').modal({
                relatedTarget: this,
                onConfirm: function() {
                    
                    $.ajax({
                        url:'/product-category/remove/' + $this.attr('data-id'),
                        success:function(data) {
                            
                            if(data.success) {
                               return location.href = '/product-category';
                            }
                            
                            var alertModal = $('#alert-remove-product-category');
                            alertModal.find('.am-modal-bd').text(data.msg);
                            alertModal.modal({
                                relatedTarget:this
                            });
                            
                        }
                    });
                    
                },
                onCancel: function() {
                    return false;
                }
            });
            return false;
        });
        
    },
    addFun:function() {
        $('#form-add-product-category').validate();
    },
    editFun:function() {
        $('#form-edit-product-category').validate();
    }

};