'use strict';


require('jquery-validate');
var Bloodhound = require('bloodhound');

let utils = require('../common/utils');

module.exports = {

    indexFun: function () {

        $('.remove-purchase').click(function () {

            var $this = $(this);

            $('#confirm-remove-purchase').modal({
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


        $('.ckb-shipping-status-forward').click(function () {

            let tr = $(this).parents('tr');
            if (!this.checked) {
                tr.find('.ckb-shipping-status-arrived').prop('checked',false);
            }

            $.ajax({
                url: '/purchase/shipping-status',
                type: 'get',
                data: {
                    purchaseId: $(this).attr('data-id'),
                    status: this.checked ? 'forward' : 'notarrived'
                }
            }).done(() => {
                if (this.checked) {
                    tr.addClass('off-middle');
                } else {
                    tr.removeClass('off').removeClass('off-middle');
                }
            });
        });
        

        $('.ckb-shipping-status-arrived').click(function () {
            
            let tr = $(this).parents('tr');
            if (this.checked) {
                tr.find('.ckb-shipping-status-forward').prop('checked',true);
            } else {
                tr.find('.ckb-shipping-status-forward').prop('checked',false);
            }
            
            $.ajax({
                url: '/purchase/shipping-status',
                type: 'get',
                data: {
                    purchaseId: $(this).attr('data-id'),
                    status: this.checked ? 'arrived' : 'notarrived'
                }
            }).done(() => {
                if (this.checked) {
                    tr.addClass('off');
                } else {
                    tr.removeClass('off').removeClass('off-middle');
                }
            });
        });

        $('#select-site-type').change(function () {
            if (this.value) {
                return location.href = '/purchase?site-type=' + this.value;
            }
            location.href = '/purchase';
        });

        $('.ckb-notarrived').click(function () {
            if (this.checked) {
                location.href = '/purchase?notarrived=true';
            } else {
                location.href = '/purchase';
            }
        });

    },
    addFun: function () {
        $('#form-add-purchase').validate();
        this.purchaseTypeAhead();
    },
    editFun: function () {
        $('#form-add-purchase').validate();
        this.purchaseTypeAhead();

        //采购数量产品展示
        this.purchaseProductTableList();
    },
    purchaseTypeAhead: function () {

        var purchaseDescription = $('#purchase-description');
        var purchaseWebsite = $('#purchase-website');
        var purchaseEmail = $('#purchase-mail');
        var purchaseImage = $('#purchase-image');
        var purchaseImageView = $('.purchase-image');

        var siteType = (()=> {
            if (/site-type=/.test(location.search)) {
                return /site-type=(.+)$/.exec(location.search)[1];
            }
            return 'normal';
        })();

        purchaseDescription.typeahead(null, {
            display: 'value',
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/purchase/add/website-desc',
                    prepare: function (query, settings) {
                        settings.data = {
                            name: purchaseDescription.val(),
                            'site-type': siteType
                        };
                        return settings;
                    }
                }
            })
        });

        purchaseDescription.on({
            'typeahead:select': function (event, item) {
                purchaseWebsite.val(item.website ? item.website : item.shop);
                purchaseEmail.val(item.email);
                purchaseImage.val(item.image);
                purchaseImageView.find('img').attr('src', item.image);
            }
        });
    },

    purchaseProductTableList() {

        let table = $('.purchase-order-link-view');
        let value = $.trim($('#purchase-order-link').val());
        let html = '';
        
        if(!value) {
            return false;
        }

        var linkArr = value.split('\n');
        linkArr = linkArr.filter(function(n) {
            return $.trim(n) !== '';
        });
        
        $.each(linkArr, function (i, n) {
            
            let img = '';
            let title = '-';
            
            let link = (()=> {
                if (/http[^\*|\s]+/i.test(n)) {
                    return /(http[^\*|\s]+)/i.exec(n)[1];
                } else {
                    return '';
                }
            })();

            let count = (()=> {
                if (/\*\s*\d+/.test(n)) {
                    return /\*\s*(\d+)/.exec(n)[1];
                } else {
                    return 1;
                }
            })();
            
            //判断链接是否图片,则直接显示图片
            if(/\.(jpg|jpeg|png|gif)/.test(link)) {
                img = `<a href="${link}" target="_blank"><img src="${link}" /></a>`;
            } else {
                utils.getRemoteProductInfo(url,function(title,img) {

                    console.info('ok');
                    
                });
            }
            
            let template = `
                <tr class="link-product-${i}">
                    <td class="img t-c">${img}</td>     
                    <td class="count t-c">${count}</a></td>      
                    <td class="link"><a href="${link}" target="_blank">${link}</a></td>    
                    <td class="title t-c">${title}</td>      
                </tr>
            `;
            html += template;
        });
        table.find('tbody').append(html);

        table.find('a').click(function() {
            table.find('.on').removeClass('on');
            $(this).parents('tr').addClass('on');
        });
        
    }
};