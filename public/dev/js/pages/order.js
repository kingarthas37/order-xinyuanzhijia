'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun:function() {

        $('.remove-order').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-order').modal({
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
        
        var _this = this;
        
        $('#form-add-order').validate({
            submitHandler:function(form){
                form.submit();
            }
        });
        
        this.orderTypeAhead();
        
    },
    editFun:function() {
        
        var _this = this;

        $('#form-edit-order').validate({
            submitHandler:function(form){
                form.submit();
            }
        });

        this.orderTypeAhead();
    },
    
   

    orderTypeAhead:function() {
        
        var customerNameInput = $('#customer-name');
        
        customerNameInput.typeahead(null, {
            display: 'value',
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url:'/order/add/search-customer',
                    prepare: function (query, settings) {
                        settings.data = {
                            name:customerNameInput.val()
                        };
                        return settings;
                    }
                }
            })
        });

        customerNameInput.on({
            'typeahead:select':function(event,item) {
            },
            'blur':function() {
                
            }
        });
    }
};