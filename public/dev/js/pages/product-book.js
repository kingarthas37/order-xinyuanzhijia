'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {
        
        $('.ckb-is-complete').click(function() {
            var $this = $(this);
            $.ajax({
                url:'/product-book/complete',
                data:{
                    productBookId: $this.attr('data-id'),
                    checked:$this.prop('checked')
                },
                success:function(data) {
                    console.info(data);
                }
            });
        });

        $('.remove-product-book').click(function() {
            var $this = $(this);
            $('#confirm-remove-product-book').modal({
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
        $('#form-add-product-book').validate();
    },
    editFun:function() {
        $('#form-edit-product-book').validate();
    }

};