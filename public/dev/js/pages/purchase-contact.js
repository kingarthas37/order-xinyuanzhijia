'use strict';

require('jquery-validate');

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
        $('#form-add-purchase-contact').validate();
    }
};