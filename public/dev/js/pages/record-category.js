'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        $('.remove-record-category').click(function() {
            var $this = $(this);
            $('#confirm-remove-record-category').modal({
                relatedTarget: this,
                onConfirm: function() {
                    
                    $.ajax({
                        url:'/record-category/remove/' + $this.attr('data-id'),
                        success:function(data) {
                            
                            if(data.success) {
                               return location.href = '/record-category';
                            }
                            
                            var alertModal = $('#alert-remove-record-category');
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
        $('#form-add-record-category').validate();
    },
    editFun:function() {
        $('#form-edit-record-category').validate();
    }

};