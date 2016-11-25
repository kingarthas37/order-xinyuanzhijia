'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun:function() {

        let alert = $('#modal-alert');
        $('.remove-customer').click(function() {
            
            $('#confirm-remove-customer').modal({
                relatedTarget: this,
                onConfirm: function(options) {
                    let item = $(this.relatedTarget);
                    $.ajax({
                        type:'post',
                        url:`/customer/remove/${item.data('id')}`,
                        success:data => {
                            if(data.success) {
                                location.reload();
                            } else {
                                alert.modal({
                                    relatedTarget: this
                                }).find('.am-modal-bd').html(`无法删除,请先删除该用户所有<a href="/order?search-customer-id=${item.data('id')}" target="_blank">发货订单</a>后再进行删除`);
                            }
                            
                        }
                    });
                },
                onCancel: function() {
                    return false;
                }
            });
            return false;
        });

    },
    addFun:function() {
        
        this.addAddress();
        this.customerTypeAhead();
        
    },
    editFun:function() {
        
        this.addAddress();
        this.customerTypeAhead();
    },
    
    addAddress:function() {
    
        var addressContent = $('#content-address');
        var add = $('.address-add');
        var remove = addressContent.find('.remove');
        
        add.click(function() {
            var field = $('.address-field:last');
            var newField = field.clone(true);
            newField.insertAfter(field);       
            newField.find('.address').val('').get(0).focus();
        });

        remove.click(function() {
            if(addressContent.find('.remove').length ===1) {
                return false;
            }
            $(this).parents('.address-field').detach();
        });
    
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