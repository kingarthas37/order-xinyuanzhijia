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
        
        //加载图片
        {
            
            let productId = [];
            let imageList = $('.image');

            imageList.each(function (i, n) {
                if($(n).data('id')) {
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
                    if(!$.isEmptyObject(data.images)) {
                        for(let i in data.images) {
                            if(parseInt(i) === id) {
                                $(n).removeClass('on').html(`<a href="${data.images[i]}" target="_blank"><img src="${data.images[i]}?imageMogr2/thumbnail/24"/></a>`);
                            }else if(!id) {
                                $(n).removeClass('on').html(`<img src="${window.assets['no-image-src']}?imageMogr2/thumbnail/24"/>`);
                            }
                        } 
                    } else {
                        $(n).removeClass('on').html(`<img src="${window.assets['no-image-src']}?imageMogr2/thumbnail/24"/>`);
                    }
                    
                });
            });
        }
        
        //设置库存状态
        {
            $('.update-stock').click(function() {
                let $this = $(this);
                if($this.data('state')) {
                    return false;
                }
                $this.data('state',true);
                
                let isSet = $this.find('.am-icon').hasClass('on');
                let productId = $this.data('product-id');
                let orderId = $this.data('order-id');
                $.ajax({
                    url:'/order/update-stock',
                    data:{
                        'is-set':isSet,
                        'product-id':productId,
                        'order-id':orderId
                    },
                    success:(data)=>{
                        $this.data('state',false);
                        if(data.success) {
                            if(isSet) {
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
            
            $('.set-stock').click(function() {
                modalSetStock.modal({
                    relatedTarget: this,
                    onCancel: function () {
                        return false;
                    }
                });
                return false;
            });
            
            modalSetStock.on('open.modal.amui', function(event){
                let target = $(event.relatedTarget);
                target.addClass('current');
                let productId = target.data('product-id');
                $.ajax({
                    type:'get',
                    url:'/order/set-stock',
                    data:{
                        'product-id':productId
                    },
                    success:function(data) {
                        if(!data.success) {
                            return false;
                        }
                        stock.val(data.stock);
                        stock.attr('data-stock',data.stock);
                        sales.val(data.sales);
                        sales.attr('data-sales',data.sales);
                        
                        save.attr('data-product-id',productId);

                        stockPlus.removeAttr('disabled').removeClass('am-btn-default').addClass('am-btn-primary');
                        stockMinus.removeAttr('disabled').removeClass('am-btn-default').addClass('am-btn-primary');
                    }
                });
            });

            modalSetStock.on('close.modal.amui', function(){
                $('.set-stock.current').removeClass('current');
                stock.val(0);
                stock.attr('data-stock',0);
                sales.val(0);
                sales.attr('data-sales',0);
                save.removeAttr('data-product-id');
                stockPlus.attr('disabled','disabled').addClass('am-btn-default').removeClass('am-btn-primary');
                stockMinus.attr('disabled','disabled').addClass('am-btn-default').removeClass('am-btn-primary');
            });

            stockMinus.click(function() {
                let stockValue = parseInt(stock.val());
                let salesValue = parseInt(sales.val());
                if(stockValue > 0) {
                    stock.find(`option[value=${stockValue - 1}]`)[0].selected = true;
                    sales.find(`option[value=${salesValue + 1}]`)[0].selected = true;
                }
            });

            stockPlus.click(function() {
                let stockValue = parseInt(stock.val());
                stock.find(`option[value=${stockValue + 1}]`)[0].selected = true;
            });
            
            save.click(function() {
                let $this = $(this);
                $.ajax({
                    type:'post',
                    url:'/order/set-stock',
                    data:{
                        'product-id':$this.data('product-id'),
                        'stock':stock.val(),
                        'sales':sales.val()
                    },
                    success:function(data) {
                        if(data.success) {
                            let updateStock = $('.set-stock.current').parents('.order-split').find('.update-stock');
                            if(updateStock.find('.am-icon').hasClass('off')) {
                                updateStock.trigger('click');
                            }
                            modalSetStock.modal('close');
                        }
                    }
                });
            });

            reset.click(function() {
                stock.find(`option[value=${stock.data('stock')}]`)[0].selected = true;
                sales.find(`option[value=${sales.data('sales')}]`)[0].selected = true;
            });
        
        }

    },
    addFun: function () {
        $('#form-add-order').validate();
        this.customerNameTypeAhead();
        this.orderTypeAheadAdd();
        this.domUpdate();
        this.orderNameTypeAhead();
    },
    editFun: function () {
        $('#form-edit-order').validate();
        this.customerNameTypeAhead();
        this.orderTypeAheadUpdate();
        this.domUpdate();
        this.orderNameTypeAhead();
    },
    domUpdate: function () {
        
        let _this = this;
        var shippingCompany = $('#shipping-company');
        var trackingNumber = $('#tracking-number');
        shippingCompany.change(function () {
            trackingNumber.val('').get(0).focus();
        });
        
        //添加删除订单内容
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
            
            $('.order-add').click(function() {
                let $template = $(template);
                group.append($template);
                _this.bindOrderNameTypeAhead($template.find('.name'));
                $template.find('input[name=name]').get(0).focus();
            });

            group.on('click','.remove', function () {
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
        $('.name').each((i,n) => {
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
                    prepare: function (query,settings) {
                        settings.data = {
                            name: element.val()
                        };
                        return settings;
                    }
                }
            })
        });
        
    }
};