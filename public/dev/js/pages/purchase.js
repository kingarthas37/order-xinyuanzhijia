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


        $('.ckb-shipping-status-shipped').click(function () {
            let tr = $(this).parents('tr');
            $.ajax({
                url: '/purchase/shipping-status',
                type: 'get',
                data: {
                    purchaseId: $(this).attr('data-id'),
                    status: this.checked ? 'shipped' : 'notshipped'
                }
            }).done(() => {
                if (this.checked) {
                    tr.addClass('off-middle');
                } else {
                    tr.removeClass('off').removeClass('off-middle');
                }
            });
        });

        $('.ckb-shipping-status-forward').click(function () {

            let tr = $(this).parents('tr');
            if (this.checked) {
                tr.find('.ckb-shipping-status-shipped').prop('checked', true);
            } else {
                tr.find('.ckb-shipping-status-shipped').prop('checked', false);
                tr.find('.ckb-shipping-status-arrived').prop('checked', false);
            }

            $.ajax({
                url: '/purchase/shipping-status',
                type: 'get',
                data: {
                    purchaseId: $(this).attr('data-id'),
                    status: this.checked ? 'forward' : 'notshipped'
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
                tr.find('.ckb-shipping-status-shipped').prop('checked', true);
                tr.find('.ckb-shipping-status-forward').prop('checked', true);
            } else {
                tr.find('.ckb-shipping-status-shipped').prop('checked', false);
                tr.find('.ckb-shipping-status-forward').prop('checked', false);
            }

            $.ajax({
                url: '/purchase/shipping-status',
                type: 'get',
                data: {
                    purchaseId: $(this).attr('data-id'),
                    status: this.checked ? 'arrived' : 'notshipped'
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

        $('.ckb-shipping-status').click(function () {
            if (this.checked) {
                location.href = `/purchase?shipping-status=${this.name}&site-type=${$("#site-type").val()}`;
            } else {
                location.href = '/purchase?site-type=' + $("#site-type").val();
            }
        });

        $('.import-order').click(function() {
            $.ajax({
                url: '/purchase/import-order',
                type: 'post',
                data: {
                    purchaseId: $(this).data('purchase-id'),
                    status: this.checked
                }
            }).done(() => {
                console.log(333);
            });
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
        // var purchaseEmailisSolid=$('#purchase-is-solid');
        var purchaseImage = $('#purchase-image');
        var purchaseImageView = $('.purchase-image');
        let comment = $('#purchase-comment');

        var siteType = (() => {
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
                console.info(item);
                purchaseWebsite.val(item.website ? item.website : item.shop);
                purchaseEmail.val(item.email);
                purchaseImage.val(item.image);
                purchaseImageView.find('img').attr('src', item.image);
                comment.val(item.comment);
            }
        });
    },

    purchaseProductTableList() {

        let textarea = $('#purchase-order-link');
        let table = $('.purchase-order-link-view');
        let value = $.trim($('#purchase-order-link').val());
        let newTextareaValue = '';
        let newHtml = '';

        if (!value) {
            return false;
        }

        $.each(value.split('\n'), (i, n) => {
            if ($.trim(n) === '') {
                return;
            }
            n = n.replace(/\*\s/, '*');
            n = n.replace(/(\S)\*/, '$1 *');
            if (!/\*\d*/.test(n)) {
                n += ' *1';
            }

            newTextareaValue += n + ((i === value.split('\n').length - 1) ? '' : '\n');

        });

        textarea.val(newTextareaValue);

        $.each(newTextareaValue.split('\n'), function (i, n) {

            let img = '-';
            let title = '-';

            let link = (() => {
                if (/http[^\s]+/i.test(n)) {
                    return /(http[^\s]+)/i.exec(n)[1]; //返回url
                } else {
                    return /(.*)\*\d+/.exec(n)[1]; //返回产品字符串
                }
            })();

            let count = (() => {
                if (/\*\d+/.test(n)) {
                    return /\*(\d+)/.exec(n)[1];
                } else {
                    return 1;
                }
            })();

            let countResult = (() => {
                if (/\|\d+/.test(n)) {
                    return '-' + /\|(\d+)/.exec(n)[1];
                } else {
                    return '';
                }
            })();

            //处理table html
            {
                //判断链接是否图片,则直接显示图片,如果不是链接,则直接显示普通字符串
                if (/\.(jpg|jpeg|png|gif)/.test(link)) {

                    img = `<a href="${link}" target="_blank"><img src="${link}" /></a>`;
                    link = `<span title="${link}"><a href="${link}" target="_blank">${link}</a></span>`;

                } else if (/^http/.test(link)) {

                    utils.getRemoteProductInfo(link, function (image, title) {
                        if (image.length) {
                            $(`.link-product-${i}`).find('.img').html(`<a href="${image}" target="_blank"><img src="${image}" /></a>`);
                            $(`.link-product-${i}`).find('.title').text(`${title}`);
                        }
                    });
                    link = `<span title="${link}"><a href="${link}" target="_blank">${link}</a></span>`;

                } else {

                    link = `<span title="${link}">${link}</span>`;

                }

                let template = `
                    <tr class="link-product-${i}">
                        <td class="img t-c">${img}</td>     
                        <td class="count t-c">${count} <span class="count-result">${countResult}</span></a></td>      
                        <td class="count t-c">
                            <a href="javascript:;" class="count-minus">预定+1</a>
                            <span class="sp"></span>
                            <a href="javascript:;" class="count-plus">取消-1</a>
                        </td>      
                        <td class="link">${link}</td>    
                        <td class="title">${title}</td>      
                    </tr>
                `;
                newHtml += template;
            }

        });

        table.find('tbody').append(newHtml);

        table.find('.link a').click(function () {
            table.find('.on').removeClass('on');
            $(this).parents('td').addClass('on');
        });

        //预定+1
        table.find('.count-minus').click(function () {

            let value = textarea.val();
            let newValue = '';
            let parent = $(this).parents('tr');
            let url = parent.find('.link span').attr('title');
            let countResult = parent.find('.count-result');
            let linkArr = value.split('\n');
            $.each(linkArr, function (i, n) {

                if (n.indexOf(url) > -1) {

                    let count = parseInt(/\*(\d+)/.exec(n)[1]);
                    let order = (() => {
                        if (/\|\d+/.test(n)) {
                            return parseInt(/\|(\d+)/.exec(n)[1]);
                        } else {
                            return 0;
                        }
                    })();

                    if (order < count) {
                        order++;
                        countResult.text(`-${order}`);
                    }

                    if (/\|\d+/.test(n)) {
                        n = n.replace(/\|\d+/, '|' + order);
                    } else {
                        n = n.replace(/(\*\d+)/, '$1 |' + order);
                    }

                }
                newValue += n + '\n';
            });

            textarea.val($.trim(newValue));

        });

        //取消-1
        table.find('.count-plus').click(function () {

            let value = textarea.val();
            let newValue = '';
            let parent = $(this).parents('tr');
            let url = parent.find('.link span').attr('title');
            let countResult = parent.find('.count-result');
            let linkArr = value.split('\n');
            $.each(linkArr, function (i, n) {

                if (n.indexOf(url) > -1) {

                    let order = (() => {
                        if (/\|\d+/.test(n)) {
                            return parseInt(/\|(\d+)/.exec(n)[1]);
                        } else {
                            return 0;
                        }
                    })();

                    if (order > 1) {
                        order--;
                        countResult.text(`-${order}`);
                    } else if (order === 1) {
                        order--;
                        countResult.text('');
                    }

                    if (/\|\d+/.test(n)) {
                        n = n.replace(/\|\d+/, '|' + order);
                    } else {
                        n = n.replace(/(\*\d+)/, '$1 |' + order);
                    }

                    n = n.replace(/\s\|0/, '');

                }
                newValue += n + '\n';
            });

            textarea.val($.trim(newValue));

        });

    }
};