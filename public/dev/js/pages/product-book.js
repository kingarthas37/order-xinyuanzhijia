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
        $('#form-add-product-book').validate();
        this.productEdit();
        this.customerTypeAhead();
        this.productTypeAhead();
        $('.product-name').get(1).focus();
    },
    editFun: function () {
        $('#form-edit-product-book').validate();
        this.productEdit();
        this.customerTypeAhead();
        this.productTypeAhead();
    },

    productEdit: function () {

        let _this = this;
        let productList = $('.product-list');
        let productListGroup = productList.find('.am-form-group').eq(0);
        
        let template = `
            <div class="am-form-group typeahead-content">
                        <div class="am-u-sm-7">
                            <input class="product-name" required name="product-name" autocomplete="off" type="text" placeholder="输入产品名">
                        </div>
                        <div class="am-u-sm-2">
                            <input class="product-image" name="product-image" type="text" placeholder="输入图片链接">
                        </div>
                        <div class="am-u-sm-1">
                            <select class="product-count" name="product-count">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div class="am-u-sm-1 am-form-label t-c">
                            <label><input type="checkbox" class="ckb-product-state"> <span class="small-screen-hide">已发货</span></label>
                            <input type="hidden" name="product-state" class="product-state"/>
                        </div>
                        <div class="am-u-sm-1 am-form-label"><a href="javascript:;" class="remove">删除</a></div>
                    </div>
        `;
        
        
        $('.product-add').click(function () {
            let $template = $(template);
            productList.append($template);
            _this.bindProductTypeAhead($template.find('.product-name'));
            $template.find('.product-name').get(1).focus();
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
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + item.address + ' ' + (item.taobao ? ('淘宝名:' + item.taobao + ' ') : ' ') + (item.weixin ? ('微信号:' + item.weixin) : '') + '</span></div>';
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

    },
    productTypeAhead() {
        
        $('.product-name').each((i,n)=> {
            this.bindProductTypeAhead($(n));
        });
        
    },
    bindProductTypeAhead(element) {

        element.typeahead(null, {
            display: function (item) {
                return item.value;
            },
            templates: {
                suggestion: function (item) {
                    return `<div><img src="${item.image}?imageMogr2/thumbnail/32" />${item.value} </div>`;
                }
            },
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/order/product',
                    prepare: function (query, settings) {
                        settings.data = {
                            name: element.val()
                        };
                        return settings;
                    }
                }
            })
        });
        
        element.on({
            'typeahead:select':function(event,item) {
                element.parents('.am-form-group').find('.product-image').val(item.image);
            }
        });
        
    }

};