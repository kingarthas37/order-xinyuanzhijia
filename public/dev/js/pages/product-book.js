'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function () {

        $('.remove-product-book').click(function () {
            var $this = $(this);
            $('#confirm-remove-product-book').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    location.href = $this.attr('href');
                },
                onCancel: function () {
                    return false;
                }
            });
            return false;
        });
        
        $('.ckb-search-state').click(function() {
            if(this.checked) {
                location.href = '/product-book?search-state=on';
            }else {
                location.href = '/product-book';
            }
        });

    },
    addFun: function () {

        $('.product-name').get(0).focus();

        $('#form-add-product-book').validate();
        this.productEdit();
        this.customerTypeAhead();
    },
    editFun: function () {
        $('#form-edit-product-book').validate();
        this.productEdit();
        this.customerTypeAhead();
    },

    productEdit: function () {

        let productList = $('.product-list');
        let productListGroup = productList.find('.am-form-group').eq(0);
        $('.product-add').click(function () {
            let clone = productListGroup.clone(true);
            productList.append(clone);
            clone.find('.product-count').val(1);
            clone.find('.product-state').data('checked', false);
            clone.find('.product-name').val('').get(0).focus();
        });

        productList.on('click', '.remove', function () {
            $(this).parents('.am-form-group').detach();
        });

        $('.ckb-product-state').change(function () {
            let parent = $(this).parents('.am-form-group');
            if(this.checked) {
                parent.find('.product-state').val('on');
            }else {
                parent.find('.product-state').val('');
            }
        });

    },

    customerTypeAhead: function () {

        var customerName = $('#customer-name');
        let customerId = $('#customer-id');
        let customerInfo = $('.customer-info');

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
                customerId.val(item.customerId).focus();
                customerInfo.html(`用户信息: 姓名:<a href="/customer/edit/${item.customerId}">${item.value}</a> | 淘宝号:${item.taobao} | 微信号:${item.weixin} | 地址:${item.address}`);
            }
        });

        customerName.on('change', function () {
            customerId.val('');
            customerInfo.html('用户信息: 姓名:- | 淘宝号:- | 微信号:- | 地址:-');
        });

    }

};