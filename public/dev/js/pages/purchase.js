'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        $('.remove-purchase').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-purchase').modal({
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
        $('#form-add-purchase').validate();
    },
    editFun:function() {
        $('#form-add-purchase').validate();
    }
};