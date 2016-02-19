'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        $('.remove-product-brand').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-product-brand').modal({
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
        $('#form-add-product-brand').validate();
    },
    editFun:function() {
        $('#form-add-product-brand').validate();
    }

};