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
        
        $('#form-add-order').validate();
        this.orderTypeAhead();
        
    },
    editFun:function() {

        $('#form-edit-order').validate();
        this.orderTypeAhead();
    },

    orderTypeAhead:function() {
        
        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var newCustomer = $('.new-customer');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        var taobao = $('#taobao');
        var newAddress = $('.new-address');
        
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
            
            //change表示此用户为新用户，而不是autocomplete选择出来的老用户，所以数据需要重置
            'change':function() {
                newCustomer.prop('checked',true);
                newAddress.prop('checked',true);
                customerNameIdInput.val('');
                taobao.val('');
                shippingAddress.val('').get(0).focus();
                addressList.empty();
            },
            
            'typeahead:select':function(event,item) {

                customerNameIdInput.val(item.customerId);
                taobao.val(item.taobao);
                var address = item.address.split('|');
                addressList.empty();
                for(var i=0;i<address.length;i++) {
                    addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址</a> </li>');
                }

                newCustomer.prop('checked',false);
                
            }
        });

        addressList.on('click','a',function() {
            shippingAddress.val($(this).parents('li').find('span').text());
            addressList.empty();
            newAddress.prop('checked',false);
        });

        newAddress.click(function() {
            if(this.checked) {
                shippingAddress.val('').get(0).focus();
                addressList.empty();
            }
        });

        shippingAddress.on('change',function() {
            newAddress.prop('checked',true);
        });
        
    }
};