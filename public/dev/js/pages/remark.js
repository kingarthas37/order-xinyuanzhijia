'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {
        
        $('.ckb-is-complete').click(function() {
            var $this = $(this);
            $.ajax({
                url:'/remark/complete',
                data:{
                    remarkId: $this.attr('data-id'),
                    checked:$this.prop('checked')
                },
                success:function(data) {
                    console.info(data);
                }
            });
        });

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