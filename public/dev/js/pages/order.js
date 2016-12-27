'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function () {

        //删除订单
        {
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
        }

        //加载customer data
        {

            let queryData = {
                customerId: [],
                orderId: []
            };

            let list = $('.am-table').find('tr[data-customer-id]');

            list.each(function (i, n) {
                if ($(n).data('customer-id')) {
                    queryData.customerId.push($(n).data('customer-id'));
                    queryData.orderId.push($(n).data('order-id'));
                }
            });

            $.ajax({
                url: '/order/get-customer',
                data: {queryData}
            }).then(data => {

                if (!data.success) {
                    return;
                }

                $.each(list, function (i, n) {
                    let customerId = parseInt($(n).data('customer-id'));
                    $.each(data.customers, function (_i, _n) {
                        if (_n.customerId === customerId) {
                            $(n).find('.taobao-name').removeClass('on').text(_n.taobao);
                        }
                    });
                    $.each(data.shippings, function (_i, _n) {
                        if (_n.customerId === customerId) {
                            $(n).find('.customer-name').addClass('shunfeng');
                        }
                    });
                });
            });
        }

        //加载图片
        {

            let productId = [];
            let imageList = $('.image');

            imageList.each(function (i, n) {
                if ($(n).data('id')) {
                    productId.push($(n).data('id'));
                }
            });

            $.ajax({
                url: '/order/get-image',
                data: {productId}
            }).then(data => {

                if (!data.success) {
                    return;
                }

                $.each(imageList, function (i, n) {
                    let id = parseInt($(n).data('id'));
                    if (!$.isEmptyObject(data.images)) {
                        for (let i in data.images) {
                            if (parseInt(i) === id) {
                                $(n).removeClass('on').html(`<a href="${data.images[i]}" target="_blank"><img width="24" src="${data.images[i]}?imageMogr2/thumbnail/24"/></a>`);
                            } else if (!id) {
                                $(n).removeClass('on').html(`<img width="24" src="${window.assets['no-image-src']}?imageMogr2/thumbnail/24"/>`);
                            }
                        }
                    } else {
                        $(n).removeClass('on').html(`<img width="24" src="${window.assets['no-image-src']}?imageMogr2/thumbnail/24"/>`);
                    }

                });
            });
        }

        //设置库存状态
        {
            $('.update-stock').click(function () {
                let $this = $(this);
                if ($this.data('state')) {
                    return false;
                }
                $this.data('state', true);

                let isSet = $this.find('.am-icon').hasClass('on');
                let productId = $this.attr('product-id');
                let orderId = $this.attr('order-id');
                $.ajax({
                    url: '/order/update-stock',
                    data: {
                        'is-set': isSet,
                        'product-id': productId,
                        'order-id': orderId
                    },
                    success: (data)=> {
                        $this.data('state', false);
                        if (data.success) {
                            if (isSet) {
                                $this.find('.am-icon').removeClass('on').addClass('off');
                            } else {
                                $this.find('.am-icon').removeClass('off').addClass('on');
                            }
                        }
                    }
                });

            });
        }


        //设置库存
        {
            let modalSetStock = $('#modal-set-stock');
            let stock = modalSetStock.find('select[name=stock]');
            let sales = modalSetStock.find('select[name=sales]');

            let stockMinus = modalSetStock.find('.stock-minus');
            let stockPlus = modalSetStock.find('.stock-plus');

            let save = $('.stock-save');
            let reset = $('.stock-reset');

            $('.set-stock').click(function () {
                modalSetStock.modal({
                    relatedTarget: this,
                    onCancel: function () {
                        return false;
                    }
                });
                return false;
            });

            modalSetStock.on('open.modal.amui', function (event) {
                let target = $(event.relatedTarget);
                target.addClass('current');
                let productId = target.attr('product-id');
                save.attr('product-id', productId);

                $.ajax({
                    type: 'get',
                    url: '/order/set-stock',
                    data: {
                        'product-id': productId
                    },
                    success: function (data) {
                        if (!data.success) {
                            return false;
                        }
                        stock.val(data.stock);
                        stock.attr('data-stock', data.stock);
                        sales.val(data.sales);
                        sales.attr('data-sales', data.sales);

                        save.attr('product-id', productId);

                        stockPlus.removeAttr('disabled').removeClass('am-btn-default').addClass('am-btn-primary');
                        stockMinus.removeAttr('disabled').removeClass('am-btn-default').addClass('am-btn-primary');
                    }
                });
            });

            modalSetStock.on('close.modal.amui', function () {
                $('.set-stock.current').removeClass('current');
                stock.val(0);
                stock.attr('data-stock', 0);
                sales.val(0);
                sales.attr('data-sales', 0);
                save.removeAttr('product-id');
                stockPlus.attr('disabled', 'disabled').addClass('am-btn-default').removeClass('am-btn-primary');
                stockMinus.attr('disabled', 'disabled').addClass('am-btn-default').removeClass('am-btn-primary');
            });

            stockMinus.click(function () {
                let stockValue = parseInt(stock.val());
                let salesValue = parseInt(sales.val());
                if (stockValue > 0) {
                    stock.find(`option[value=${stockValue - 1}]`)[0].selected = true;
                    sales.find(`option[value=${salesValue + 1}]`)[0].selected = true;
                }
            });

            stockPlus.click(function () {
                let stockValue = parseInt(stock.val());
                stock.find(`option[value=${stockValue + 1}]`)[0].selected = true;
            });

            save.click(function () {
                let $this = $(this);
                $.ajax({
                    type: 'post',
                    url: '/order/set-stock',
                    data: {
                        'product-id': $this.attr('product-id'),
                        'stock': stock.val(),
                        'sales': sales.val()
                    },
                    success: function (data) {
                        if (data.success) {
                            let updateStock = $('.set-stock.current').parents('.order-split').find('.update-stock');
                            if (updateStock.find('.am-icon').hasClass('off')) {
                                updateStock.trigger('click');
                            }
                            modalSetStock.modal('close');
                        }
                    }
                });
            });

            reset.click(function () {
                stock.find(`option[value=${stock.attr('stock')}]`)[0].selected = true;
                sales.find(`option[value=${sales.attr('sales')}]`)[0].selected = true;
            });

        }

        //查询未发货
        {
            $('.ckb-notshipped').click(function () {
                if (this.checked) {
                    location.href = '/order?search-notshipped=on';
                } else {
                    location.href = '/order';
                }
            });
        }

        //发货状态
        {
            $('.ckb-shipped').click(function () {

                let $this = $(this);
                let orderId = $(this).attr('order-id');
                let shipping = this.checked;

                $.ajax({
                    type: 'post',
                    url: '/order/shipping',
                    data: {
                        'order-id': orderId,
                        'shipping': shipping
                    },
                    success: function (data) {
                        if (data.success) {
                            if ($this[0].checked) {
                                $this.parents('tr').removeClass('off');
                            } else {
                                $this.parents('tr').addClass('off');
                            }
                        }
                    }
                });

            });
        }
        
        
        //动态输入快递单号
        {
            let actionShippingCompany = $('.action-shipping-company');
            actionShippingCompany.popover({
                content: '<input class="shipping-company-input"/>'
            });

            let shippingCompanyInput = $('.shipping-company-input');
            
            actionShippingCompany.each(function(i) {
                $(this).on('open.popover.amui',function() {
                    setTimeout(()=> shippingCompanyInput.get(i).focus(),0);
                });
            });

            shippingCompanyInput.each(function(i) {
                let actionItem = actionShippingCompany.eq(i); 
                let orderId = actionItem.data('order-id');
                $(this).change(function(){
                    $.ajax({
                        url:'/order/action-tracking-number',
                        data:{
                            orderId,
                            trackingNumber:$(this).val()
                        }
                    }).then(data => {
                        if(data.success) {
                            actionItem.removeClass('disabled');
                            actionItem.off().attr('href',`http://www.kuaidi100.com/auto.shtml?nu=${data.trackingNumber}`);
                            actionItem.popover('close');
                            let copy = actionItem.parent().find('.clipboard-tracking-number');
                            let clipboard = new Clipboard(copy[0], {
                                text: function() {
                                    return data.trackingNumber;
                                }
                            });
                            clipboard.on('success',() => {
                                copy.addClass('active');
                            });
                        }
                    });
                });
            });
            
        }
        
        //复制快递单号
        {
            $('.clipboard-tracking-number').each(function() {
                if($(this).attr('data-clipboard-text')) {
                    let clipboard = new Clipboard(this);
                    clipboard.on('success',() => {
                        $(this).addClass('active');
                    });
                }
            });
            
        }


    },
    addFun: function () {
        $('#form-add-order').validate();
        this.customerNameTypeAhead();
        this.orderTypeAheadAdd();
        this.domUpdate();
        this.clientNameTypeAhead();

        //复制新order
        if (location.search.indexOf('name') !== -1) {
            this.copyNewOrder();
            this.orderNameTypeAhead();
        } else {
            this.orderNameTypeAhead();
            $('input[name]').get(0).focus();
        }

    },

    copyNewOrder() {
        let url = location.search;
        let names = /name=([^\&]*)\&/.exec(url)[1];
        
        let trackingNumber = /tracking-number=(\d+)/.test(url);
        
        names = names.split(',');
        $('input[name=name]').eq(0).val(decodeURIComponent(names[0]));

        if(trackingNumber) {
            $('#tracking-number').val(/tracking-number=(\d+)/.exec(url)[1]);
        }
        
    },
    
    editFun: function () {
        $('#form-edit-order').validate();
        this.customerNameTypeAhead();
        this.orderTypeAheadUpdate();
        this.domUpdate();
        this.orderNameTypeAhead();
        this.clientNameTypeAhead();
        this.clipboard();
    },
    domUpdate: function () {

        let _this = this;
        var shippingCompany = $('#shipping-company');
        var trackingNumber = $('#tracking-number');
        shippingCompany.change(function () {
            trackingNumber.val('').get(0).focus();
        });

        //添加删除订单名
        {

            let group = $('.content-name-group');
            let template = `
                    <div class="list-group-field am-form-group">
                        <div class="am-u-sm-10">
                            <input class="name" name="name" type="text" placeholder="输入订单内容" autocomplete="off">
                        </div>
                        <div class="am-u-sm-1">
                            <select name="shipping-count">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <label class="am-u-sm-1 am-form-label">
                            <a href="javascript:;" class="remove">- 删除</a>
                        </label>
                    </div>
            `;

            $('.order-add').click(function () {
                let $template = $(template);
                group.append($template);
                _this.bindOrderNameTypeAhead($template.find('.name'));
                $template.find('input[name=name]').get(0).focus();
            });

            group.on('click', '.remove', function () {
                $(this).parents('.list-group-field').detach();
            });
        }


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
                    for (var i = address.length - 1; i >= 0; i--) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址' + (i === address.length - 1 ? '(最近更新)' : '') + '</a> </li>');
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
        
        newCustomer.click(function() {
            if(this.checked) {
                customerNameIdInput.val('');
                newAddress.prop('checked',false).click();
                taobao.val('');
            }
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
                    for (var i = address.length - 1; i >= 0; i--) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址' + (i === address.length - 1 ? '(最近更新)' : '') + '</a> </li>');
                    }
                }
            }
        });

        addressList.on('click', 'a', function () {
            shippingAddress.val($(this).parents('li').find('span').text());
            addressList.empty();
        });

    },
    customerNameTypeAhead: function () {

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
    },
    orderNameTypeAhead() {
        $('.name').each((i, n) => {
            this.bindOrderNameTypeAhead($(n));
        });
    },
    bindOrderNameTypeAhead(element) {

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

    },
    clientNameTypeAhead() {
        let clientNameInput = $('#client');
        clientNameInput.typeahead(null, {
            display: function (item) {
                return `${item.value},${item.address[0]}`;
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
                            name: clientNameInput.val()
                        };
                        return settings;
                    }
                }
            })
        });


    },
    clipboard() {

        let shippingAddress = $('#shipping-address');

        let copyPhone = $('.copy-phone');
        let copyAddress = $('.copy-address');
        let copyThumbAddress = $('.copy-thumb-address');


        //复制手机号
        {
            let text = shippingAddress.val();
            let reg = /\d{11}/;
            if (reg.test(text)) {
                copyPhone.val(reg.exec(text)[0]);
            }
        }

        //复制地址
        {
            let text = shippingAddress.val();
            let reg = /\d{11}/;
            if (reg.test(text)) {
                text = $.trim(text.replace(/\d{11}/, ''));
            }
            text = $.trim(text.replace(/(^,|，|\.|。|;|；)|(,|，|\.|。|;|；$)/g, ''));
            copyAddress.val(text);
        }


        //复制缩略地址
        {
            let text = shippingAddress.val();
            if (/\d{11}/.test(text)) {
                text = $.trim(text.replace(/\d{11}/, ''));
            }
            if (/区/.test(text)) {
                text = $.trim(text.replace(/([\s\S]*?区)/, '')); //非贪婪匹配
            }
            if (/街道/.test(text)) {
                text = $.trim(text.replace(/([\s\S]*?街道)/, ''));
            }
            text = $.trim(text.replace(/(^,|，|\.|。|;|；)|(,|，|\.|。|;|；$)/g, ''));
            copyThumbAddress.val(text);
        }

    }
};