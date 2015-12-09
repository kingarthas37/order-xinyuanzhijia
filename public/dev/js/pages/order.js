'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun:function() {

        $('.remove-customer').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-customer').modal({
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
        
        $('#form-add-customer').validate({
            submitHandler:function(form){
                _this.updateAddress();
                form.submit();
            }
        });
        
        this.addAddress();
        this.customerTypeAhead();
        
    },
    editFun:function() {
        
        var _this = this;

        $('#form-edit-customer').validate({
            submitHandler:function(form){
                _this.updateAddress();
                form.submit();
            }
        });

        this.addAddress();
        this.customerTypeAhead();
    },
    
    addAddress:function() {
    
        var addressContent = $('.address-content');
        var add = $('.address-add');
        var remove = addressContent.find('.remove');
        
        
        add.click(function() {
            var field = $('.address-field:last');
            var newField = field.clone(true);
            newField.insertAfter(field);       
            newField.find('.address').val('').get(0).focus();
        });

        remove.click(function() {
            $(this).parents('.address-field').detach();
        });
    
    },
    updateAddress:function() {

        var input = $('input[name=address]');
        var address = '';
        
        $('.address').filter(function() {
            return $.trim(this.value) !== '';
        }).each(function(i,n) {
            address += n.value + '|';
        });
        
        input.val(address.substr(0,address.length-1));
    },

    customerTypeAhead:function() {
        
        var parentCustomerInput = $('#parent-customer');
        var parentCustomerIdInput = $('#parent-customer-id');

        var parentCustomer = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url:'/customer/add/customer-parent',
                prepare: function (query, settings) {
                    settings.data = {
                        name:parentCustomerInput.val()
                    };
                    return settings;
                }
            }
        });

        parentCustomerInput.typeahead(null, {
            display: 'value',
            highlight: true,
            source: parentCustomer
        });

        parentCustomerInput.on({
            'typeahead:select':function(event,item) {
                parentCustomerIdInput.val(item.customerId);
            },
            'blur':function() {
                if($.trim(this.value) === '') {
                    parentCustomerIdInput.val('');
                }
            }
        });
    }
};