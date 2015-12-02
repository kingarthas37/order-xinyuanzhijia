'use strict';

require('jquery-validate');
var productPreview = require('./lib/product-preview');

module.exports = {

    indexFun:function() {

        $('.remove-book').click(function() {
            var $this = $(this);
            $('#confirm-remove-book').modal({
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

        $('#form-add-book').validate();
        this.formActionSelect();

    },
    editFun:function() {

        $('#form-add-book').validate();
        this.formActionSelect();
    },
    
    previewFun:productPreview,
    
    //表单提交，是否是保存还是预览
    formActionSelect:function() {

        $('form :submit').click(function() {
            $('form').attr({
                'action':$(this).attr('data-action'),
                'target':$(this).attr('data-target')
            });
            return true;
        });
        
    }

};