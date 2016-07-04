'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function () {

        $('.remove-order').click(function () {

            var $this = $(this);

            $('#confirm-remove-order').modal({
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


        //加载customer data
        {
            let customerListId = [];
            let customerList = $('.am-table').find('tr[data-customer-id]');

            customerList.each(function (i, n) {
                if ($(n).data('customer-id')) {
                    customerListId.push($(n).data('customer-id'));
                }
            });

            $.ajax({
                url: '/order/get-customer',
                data: {customerListId}
            }).then(data => {

                if (!data.success) {
                    return;
                }
                $.each(customerList, function (i, n) {
                    let customerId = parseInt($(n).data('customer-id'));
                    $.each(data.customers,function(_i,_n) {
                        if(_n.customerId === customerId) {
                            $(n).find('.taobao-name').removeClass('on').text(_n.taobao);
                        }
                    });

                });
            });
        }

    },
    addFun: function () {
        $('#form-add-order').validate();
        this.typeAhead();
        this.orderTypeAheadAdd();
        this.domUpdate();
    },
    editFun: function () {
        $('#form-edit-order').validate();
        this.typeAhead();
        this.orderTypeAheadUpdate();
        this.domUpdate();
    },
    domUpdate: function () {
        var shippingCompany = $('#shipping-company');
        var trackingNumber = $('#tracking-number');
        shippingCompany.change(function () {
            trackingNumber.val('').get(0).focus();
        });
    },
    orderTypeAheadAdd: function () {

        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var newCustomer = $('.new-customer');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        var taobao = $('#taobao');
        var newAddress = $('.new-address');

        customerNameInput.on({

            //change表示此用户为新用户，而不是autocomplete选择出来的老用户，所以数据需要重置
            'keyup': function () {
                if (!$(this).data('typeselect')) {
                    newCustomer.prop('checked', true);
                    newAddress.prop('checked', true);
                    //    customerNameIdInput.val('');
                    addressList.empty();
                }
            },
            'focus': function () {
                $(this).data('typeselect', false);
            },
            'typeahead:select': function (event, item) {
                customerNameIdInput.val(item.customerId);
                taobao.val(item.taobao);
                var address = item.address;
                addressList.empty();

                if (address.length === 1) {
                    shippingAddress.val(address[0]);
                    newAddress.prop('checked', false);
                } else {
                    for (var i = 0; i < address.length; i++) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址</a> </li>');
                    }
                }
                newCustomer.prop('checked', false);
                $(this).data('typeselect', true);
            }
        });

        addressList.on('click', 'a', function () {
            shippingAddress.val($(this).parents('li').find('span').text());
            addressList.empty();
            newAddress.prop('checked', false);
        });

        newAddress.click(function () {
            if (this.checked) {
                shippingAddress.val('').get(0).focus();
                addressList.empty();
            }
        });

        shippingAddress.on('change', function () {
            newAddress.prop('checked', true);
        });

    },
    orderTypeAheadUpdate: function () {

        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        var taobao = $('#taobao');

        customerNameInput.on({
            'typeahead:select': function (event, item) {
                customerNameIdInput.val(item.customerId);
                taobao.val(item.taobao);
                
                addressList.empty();
                var address = item.address;
                if (address.length === 1) {
                    shippingAddress.val(address[0]);
                } else {
                    for (var i = 0; i < address.length; i++) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址</a> </li>');
                    }
                }
            }
        });

        addressList.on('click', 'a', function () {
            shippingAddress.val($(this).parents('li').find('span').text());
            addressList.empty();
        });

    },
    typeAhead: function () {

        var customerNameInput = $('#customer-name');
        customerNameInput.typeahead(null, {
            display: function (item) {
                return item.value;
            },
            templates: {
                suggestion: function (item) {
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (item.taobao ? ('(淘宝名:' + item.taobao + ') ') : '') + item.address + '</span></div>';
                }
            },
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/order/add/search-customer',
                    prepare: function (query, settings) {
                        settings.data = {
                            name: customerNameInput.val()
                        };
                        return settings;
                    }
                }
            })
        });
    }
};