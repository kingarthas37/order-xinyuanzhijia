'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function () {
        
        

    },
    addFun: function () {
        
        $('.product-name').get(0).focus();

        {
            let productList = $('.product-list');
            let productListGroup = productList.find('.am-form-group').eq(0);
            $('.product-add').click(function () {
                let clone = productListGroup.clone(true);
                productList.append(clone);
                clone.find('.product-count').val(1);
                clone.find('.product-state').data('checked',false);
                clone.find('.product-name').val('').get(0).focus();
            });

            productList.on('click','.remove',function() {
                $(this).parents('.am-form-group').detach();
            });
            
        }
        
        $('#form-add-product-book').validate();
        this.customerTypeAhead();
    },
    editFun: function () {
        $('#form-edit-product-book').validate();
        this.customerTypeAhead();
    },

    customerTypeAhead: function () {

        var customerName = $('#customer-name');
        let customerId = $('#customer-id');

        customerName.typeahead(null, {
            display: function (item) {
                return item.value;
            },
            templates: {
                suggestion: function (item) {
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (item.taobao ? ('淘宝名:' + item.taobao + ' ') : ' ') + (item.weixin ? ('微信号:' + item.weixin) : '') + '</span></div>';
                }
            },
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/product-book/get-customer-name',
                    prepare: function (query, settings) {
                        settings.data = {
                            name: customerName.val()
                        };
                        return settings;
                    }
                }
            })
        });

        customerName.on({
            'typeahead:select': function (event, item) {
                customerId.val(item.customerId);
            }
        });

        customerName.on('change', function () {
            customerId.val('');
        });

    }

};