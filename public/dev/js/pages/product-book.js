'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun:function() {
        
        $('.ckb-is-complete').click(function() {
            var $this = $(this);
            $.ajax({
                url:'/product-book/complete',
                data:{
                    productBookId: $this.attr('data-id'),
                    checked:$this.prop('checked')
                },
                success:function(data) {
                    console.info(data);
                }
            });
        });

        $('.remove-product-book').click(function() {
            var $this = $(this);
            $('#confirm-remove-product-book').modal({
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
        $('#form-add-product-book').validate();
        this.customerTypeAhead();
    },
    editFun:function() {
        $('#form-edit-product-book').validate();
        this.customerTypeAhead();
    },

    customerTypeAhead:function() {

        var customerName = $('#customer-name');
        let customerId = $('#customer-id');
        
        customerName.typeahead(null,{
            display: function(item) {
                return item.value;
            },
            templates: {
                suggestion: function(item) {
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (item.taobao ? ('淘宝名:' + item.taobao +' ') : ' ') + (item.weixin ? ('微信号:' + item.weixin) : '') +'</span></div>';
                }
            },
            highlight:true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url:'/product-book/get-customer-name',
                    prepare: function (query, settings) {
                        settings.data = {
                            name:customerName.val()
                        };
                        return settings;
                    }
                }
            })
        });

        customerName.on({
            'typeahead:select':function(event,item) {
                customerId.val(item.customerId);
            }
        });

        customerName.on('change',function() {
            customerId.val('');
        });
        
    }

};