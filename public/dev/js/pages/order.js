'use strict';

require('jquery-validate');
let Bloodhound = require('bloodhound');
let utils = require('../common/utils');

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
                    /*
                    $.each(data.customers, function (_i, _n) {
                        if (_n.customerId === customerId) {
                            $(n).find('.taobao-name').removeClass('on').text(_n.taobao);
                            $(n).find('.clipboard-customer-address').after(`
                                <a href="javascript:;" title="复制淘宝用户名" class="clipboard-tbname" data-clipboard-text="${_n.taobao}"><i class="am-icon am-icon-copy"></i></a>
                            `);
                            let clipboard = new Clipboard($(n).find('.clipboard-tbname')[0]);
                            clipboard.on('success',() => {
                                $(n).find('.clipboard-tbname').addClass('active');
                            });
                        }
                    });
                    */
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
                data: {
                    productId:productId.join()
                }
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
            let sales = modalSetStock.find('[name=sales]');

            let stockMinus = modalSetStock.find('.stock-minus');
            let stockPlus = modalSetStock.find('.stock-plus');

            let save = $('.stock-save');
            let reset = $('.stock-reset');
            let ckbWarningStockOut = $('.ckb-warning-stock-out');
            let ckbWarningStockIn = $('.ckb-warning-stock-in');
            let historyStock = 0;

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

                ckbWarningStockOut.prop('checked',false);
                ckbWarningStockIn.prop('checked',false);
                $.ajax({
                    type: 'get',
                    url: '/order/set-stock',
                    data: {
                        'product-id': productId
                    },
                    success: function (data) {``
                        if (!data.success) {
                            return false;
                        }
                        stock.val(data.stock);
                        historyStock = data.stock;
                        stock.attr('data-stock', data.stock);
                        sales.val(data.sales);
                        sales.attr('data-sales', data.sales);

                        save.attr('product-id', productId);
                        if (data.updateStockDate > 1) {
                            ckbWarningStockIn.prop('checked',true);
                        } else if (data.updateStockDate == 0) {
                            ckbWarningStockOut.prop('checked',true);
                        }
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
                   // sales.find(`option[value=${salesValue + 1}]`)[0].selected = true;
                    sales.val(salesValue + 1);
                }
                stock.trigger('change');
            });

            stockPlus.click(function () {
                let stockValue = parseInt(stock.val());
                stock.find(`option[value=${stockValue + 1}]`)[0].selected = true;
                stock.trigger('change');
            });

            save.click(function () {
                let $this = $(this);
                var updateStockDate;
                $("input[name='updateStockDate']:checked").each(function() {
                    updateStockDate = $(this).val();
                });
                $.ajax({
                    type: 'post',
                    url: '/order/set-stock',
                    data: {
                        'product-id': $this.attr('product-id'),
                        'stock': stock.val(),
                        'sales': sales.val(),
                        'updateStockDate': updateStockDate
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
                sales.val(sales.attr('sales'));
                stock.trigger('change');
            });

            ckbWarningStockOut.click(function() {
                ckbWarningStockIn.prop('checked',false);
            });

            ckbWarningStockIn.click(function() {
                ckbWarningStockOut.prop('checked',false);
            });

            //库存提醒 缺货设置 checkbox
            stock.change(function() {
                var nowStock = parseInt(stock.val());

                if (nowStock > 0 && historyStock == 0) { //0-n 新到货设置 checkbox
                    ckbWarningStockIn.prop('checked',true);
                    ckbWarningStockOut.prop('checked',false);
                } else if (nowStock == 0) {    //n-0 缺货设置 checkbox
                    ckbWarningStockOut.prop('checked',true);
                    ckbWarningStockIn.prop('checked',false);
                } else {
                    ckbWarningStockIn.prop('checked',false);
                    ckbWarningStockOut.prop('checked',false);
                }
            });
        }

        //查询未发货
        {
            $('.ckb-not-shipped').click(function () {
                $('#search-not-shipped').val(this.checked ? 'on' :'');
                searchOrder();
            });
        }
        
        //快递方式
        {
            $('.select-shipping').change(function() {
                $('#search-shipping').val(this.value ? this.value : '');
                searchOrder();
            });
        }
        
        //limit
        {
            $('.select-limit').change(function() {
                $('#limit').val(this.value ? this.value : '');
                searchOrder();
            });
        }
        
        function searchOrder() {
            location.href = utils.urlParamsComponent('/order',{
                'limit':$('#limit').val(),
                'search-not-shipped':$('#search-not-shipped').val(),
                'search-shipping':$('#search-shipping').val()
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

            $('.clipboard-customer-name,.clipboard-customer-address').each(function() {
                let clipboard = new Clipboard(this);
                clipboard.on('success',() => {
                    $(this).addClass('active');
                });
            });
            
        }

        //订单跟踪
        {
            let modalTrackOrder = $('#modal-track-order');
            let title = modalTrackOrder.find('.am-modal-hd');
            let content = modalTrackOrder.find('.am-modal-bd');
            
            $('.track-order').click(function() {
                title.find('span').text($(this).data('track'));
                content.html('<ul></ul>');
                $.ajax($(this).attr('href')).then(data => {
                    if(data.list) {
                        let list = '';
                        $.each(data.list,(i,n) => {
                            list += `<li class="${i===0 ? 'success' : ''}">${n.status} ${n.time}</li>`;
                        });
                        content.find('ul').append(list);
                    } else {
                        content.find('ul').append(`<li>暂无发货记录,请稍后查看</li>`);
                    }
                    modalTrackOrder.modal();
                });
                return false;
            });
        }

        //只展示主店订单数据
        {
            let checkboxMain = $('.ckb-show-main-shop-order');
            let checkboxNew = $('.ckb-show-new-shop-order');
            if($.cookie('show-main-shop-order')) {
                checkboxMain.prop('checked',true);
                $('.new-shop-order').addClass('hide');
            }

            checkboxMain.click(function () {
                if(this.checked) {
                    $.cookie('show-main-shop-order','true',{expires:new Date(new Date().getTime() + 1000*60*60*24*365),path:'/',domain:location.host});
                    $('.new-shop-order').addClass('hide');
                    if(checkboxNew.prop('checked')) {
                        checkboxNew.click();
                    }
                } else {
                    $.cookie('show-main-shop-order','',{expires:new Date(new Date().getTime()),path:'/',domain:location.host});
                    $('.new-shop-order').removeClass('hide');
                }
            });
        }

        //只展示新店订单数据
        {
            let checkboxMain = $('.ckb-show-main-shop-order');
            let checkboxNew = $('.ckb-show-new-shop-order');
            if($.cookie('show-new-shop-order')) {
                checkboxNew.prop('checked',true);
                $('.main-shop-order').addClass('hide');
            }

            checkboxNew.click(function () {
                if(this.checked) {
                    $.cookie('show-new-shop-order','true',{expires:new Date(new Date().getTime() + 1000*60*60*24*365),path:'/',domain:location.host});
                    $('.main-shop-order').addClass('hide');
                    if(checkboxMain.prop('checked')) {
                        checkboxMain.click();
                    }
                } else {
                    $.cookie('show-new-shop-order','',{expires:new Date(new Date().getTime()),path:'/',domain:location.host});
                    $('.main-shop-order').removeClass('hide');
                }
            });
        }

        //复制收货地址中的姓名
        {
            $('.customer-name').each(function (i,n) {
                let addressName = $(n).parents('tr').find('.address-name');
                if(/([^，]+)，\d+/.test($(n).attr('title'))) {
                    let name = /([^，]+)，\d+/.exec($(n).attr('title'))[1];
                    addressName.html(name + ' <a href="javascript:;" title="复制姓名" class="clipboard-address-name" data-clipboard-text="'+ name +'"><i class="am-icon am-icon-copy"></i></a>');

                    let copy = addressName.find('.clipboard-address-name');
                    let clipboard = new Clipboard(copy[0], {
                        text: function() {
                            return name;
                        }
                    });
                    clipboard.on('success',() => {
                        copy.addClass('active' );
                    });

                } else {
                    addressName.text('-');
                }

            })
        }

    },
    addFun: function () {
        
        $('#form-add-order').validate();
        
        this.customerNameTypeAhead();
        this.orderTypeAheadAdd();
        this.domUpdate();
        this.orderBatchAdd();
     //   this.clientNameTypeAhead();

        //复制新order
        if (location.search.indexOf('name') !== -1) {
            this.copyNewOrder();
            this.orderNameTypeAhead();
        } else {
            this.orderNameTypeAhead();
            $('input[name]').get(0).focus();
        }

        //新店订单checkbox
        if (location.search.indexOf('is-new-shop') > -1) {
            $('.is-new-shop').prop('checked',true);
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
        this.orderBatchAdd();
     //   this.clientNameTypeAhead();
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
                        <div class="am-u-sm-8">
                            <input class="name" name="name" type="text" placeholder="输入订单内容" autocomplete="off">
                        </div>
                        <div class="am-u-sm-1">
                            <select name="shipping-count">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        <label class="am-u-sm-3 am-form-label">
                            <input type="hidden" name="is-gift" class="is-gift">
                            <input type="hidden" name="is-shipping" class="is-shipping">
                            <label><input class="ckb-is-gift" type="checkbox"> 赠品</label>
                            <span class="split"></span>
                            <label><input class="ckb-is-shipping" type="checkbox"> 已发货</label>
                            <span class="split"></span>
                            <a href="javascript:;" class="remove">删除</a>
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

        //更新设置checkbox数组isShipping,否则保存时数组无法存取空值
        {
            let content = $('#content-name')
            content.on('click','.ckb-is-shipping',function() {
                let i = $(this).parents('.list-group-field').index();
                if(this.checked) {
                    $('.is-shipping').eq(i).val(1);
                } else {
                    $('.is-shipping').eq(i).val(0);

                }
            });

            content.on('click','.ckb-is-gift',function() {
                let i = $(this).parents('.list-group-field').index();
                if(this.checked) {
                    $('.is-gift').eq(i).val(1);
                } else {
                    $('.is-gift').eq(i).val(0);

                }
            });
        }

    },
    orderTypeAheadAdd: function () {

        let _this = this;
        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var newCustomer = $('.new-customer');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        var newAddress = $('.new-address');
        let checkCustomerRename = $('.check-customer-rename');
        let checkCustomerId = $('.check-customer-id');
        let ckbIsTaobaoUser = $('.ckb-is-taobao-user');

        customerNameInput.on({

            //change表示此用户为新用户，而不是autocomplete选择出来的老用户，所以数据需要重置
            keyup: function () {
                this.value = $.trim(this.value);
                if (!$(this).data('typeselect')) {
                    newCustomer.prop('checked', true);
                    newAddress.prop('checked', true);
                    addressList.empty();
                }
            },
            focus: function () {
                $(this).data('typeselect', false);
            },
            'typeahead:select': function (event, item) {
                customerNameIdInput.val(item.customerId);
                var address = item.address;
                addressList.empty();

                ckbIsTaobaoUser.prop('checked',item.isTaobaoUser);

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
            },
            'typeahead:asyncrequest':function () {
                checkCustomerId.addClass('on').html('<i class="am-icon-spinner am-icon-spin"></i> 淘宝昵称检测中，请稍后...');
            },
            'typeahead:asyncreceive':function () {
                if(customerNameIdInput.parent().find('.tt-menu').hasClass('tt-empty')) { //查询无结果
                    //查询typeahead如无结果，再检测姓名是否存在数据库中
                    checkCustomerId.html('<i class="am-icon-exclamation-circle"></i> 无查询结果，该名称为新用户');
                } else { //查询有结果
                    checkCustomerId.removeClass('on').text('');
                }
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

        let _this = this;
        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        let checkCustomerId = $('.check-customer-id');
        let ckbIsTaobaoUser = $('.ckb-is-taobao-user');
        
        customerNameInput.on({
            'typeahead:select': function (event, item) {
                customerNameIdInput.val(item.customerId);
                addressList.empty();
                ckbIsTaobaoUser.prop('checked',item.isTaobaoUser);

                var address = item.address;
                if (address.length === 1) {
                    shippingAddress.val(address[0]);
                } else {
                    for (var i = address.length - 1; i >= 0; i--) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址' + (i === address.length - 1 ? '(最近更新)' : '') + '</a> </li>');
                    }
                }

            },
            'typeahead:asyncrequest':function () {
                checkCustomerId.addClass('on').html('<i class="am-icon-spinner am-icon-spin"></i> 淘宝昵称检测中，请稍后...');
            },
            'typeahead:asyncreceive':function () {
                if(customerNameIdInput.parent().find('.tt-menu').hasClass('tt-empty')) { //查询无结果
                    //查询typeahead如无结果，再检测姓名是否存在数据库中
                    checkCustomerId.html('<i class="am-icon-exclamation-circle"></i> 无查询结果，该名称为新用户');
                } else { //查询有结果
                    checkCustomerId.removeClass('on').text('');
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
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (item.isTaobaoUser ?  '(淘宝用户)' : ' (非淘宝用户) ') + item.address + '</span></div>';
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
                            name: $.trim(customerNameInput.val())
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
    //批量添加订单
    orderBatchAdd() {
        let modal = $('#modal-order-batch-add');
        let batchText = $('#batch-text');
        let batchCreate = $('#batch-create');
        let btnAdd = $('.order-add');

        $('.order-batch-add').click(function() {
            modal.modal();
            batchText.val('');
            batchText[0].focus();
        });

        batchCreate.click(function () {

            let text = batchText.val();
            if(!$.trim(text) || text.indexOf('商家编码：') < 0) {
                alert('请输入正确的淘宝订单内容!');
                return false;
            }

            //过滤用户、发货信息
            text = text.replace(/\n/gi,'');
            text = text.replace(/发货[^、)]+\)/,'');

            let testLength = text.match(/商家编码：/gi).length;
            let productIdArr = text.match(/商家编码：\d+/gi);
            let countArr = text.match(/￥\d+\.\d+/gi);

            if(testLength !== productIdArr.length) {
                alert('注意：商家编码数据不匹配，请手动检测数据');
            }

            let firstLoad = true;
            let start = (()=> {
                if($('.name').length === 2) {
                    return  0;
                }
                firstLoad = false;
                return $('.name').length;
            })();

            productIdArr = productIdArr.map(function (item,i) {
                btnAdd.click();
                return parseInt(item.replace('商家编码：',''));
            });

            countArr = countArr.map(function (item, i) {
                item = item.replace(/￥\d+\.\d\d/,'');
                return parseInt(item);
            });

            let inputs = $('.name');
            {
                if(!firstLoad) {
                    btnAdd.click();
                }
                $('.remove').last().click();
            }
            let selectCounts = $('select[name=shipping-count]');

            batchCreate.text('生成订单中...');
            setTimeout(()=>{
                $.each(productIdArr,function (i,n) {
                    $.ajax({
                        url:`/order/product?name=${n}`,
                        async:false,
                        success:(result) => {
                            inputs.eq(start + 1).val(result[0].value);
                            selectCounts.eq(start / 2 ).find('option').eq(countArr[i]-1).selected();

                            start += 2;
                            batchCreate.text('生成订单');
                            modal.modal('close');
                        }
                    });
                });
            },0);
            return false;
        });
    },

    bindOrderNameTypeAhead(element) {

        element.typeahead(null, {
            display: function (item) {
                return item.value;
            },
            templates: {
                suggestion: function (item) {
                    return `<div><img src="${item.image}?imageMogr2/thumbnail/32" />${item.value}</div>`;
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
        /*
        let clientNameInput = $('#client');
        clientNameInput.typeahead(null, {
            display: function (item) {
                return `${item.value},${item.address[0]}`;
            },
            templates: {
                suggestion: function (item) {
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (!item.isTaobaoUser ? '非淘宝用户' : '') + item.address + '</span></div>';
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
        */

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

    },
    checkCustomerRename(name,input) {

        let checkCustomerRename = $('.check-customer-rename').removeClass('error');

        if(!$.trim(input.value)) {
            checkCustomerRename.removeClass('on');
            return false;
        }

        checkCustomerRename.addClass('on').html('<i class="am-icon-spinner am-icon-spin"></i> 非淘宝用户名检测中...');
        $.ajax({
            url:'/order/check-customer-rename',
            data:{name:name}
        }).then(data => {
            if(data.customer) {
                checkCustomerRename.addClass('error').html('<i class="am-icon-exclamation-circle"></i> 检测出重命名!');
            } else {
                checkCustomerRename.html('<i class="am-icon-check"></i> 未检测出重命名');
            }
        });
    }
};