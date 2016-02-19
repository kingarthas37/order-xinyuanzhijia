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
        this.setTabs();
    },
    editFun:function() {
        $('#form-edit-product-brand').validate();
        this.setTabs();
    },
    setTabs:function() {
        $('.am-tabs').tabs({
            animation:false
        });
    }

};