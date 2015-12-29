'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        $('.remove-remark').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-remark').modal({
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
        $('#form-add-remark').validate();
    },
    editFun:function() {
        $('#form-edit-remark').validate();
    }

};