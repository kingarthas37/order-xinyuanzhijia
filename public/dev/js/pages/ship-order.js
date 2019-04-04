
'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {
    indexFun: function () {

        $('.copy-ship-order').click(function () {
            let id = $(this).data('id');
            $.ajax({
                url:'/ship-order/copy/' + id,
                method:'post',
                success:function(data) {
                    location.reload();
                }
            });
        });

        $('.remove-ship-order').click(function () {
            if(confirm('确认删除？')) {
                let id = $(this).data('id');
                $.ajax({
                    url:'/ship-order/remove/' + id,
                    method:'post',
                    success:function(data) {
                        location.reload();
                    }
                });
            }
        });

        $('.ckb-is-haiguan').click(function () {
            let id = $(this).data('id');
            let type = 'isHaiguan';
            let value = this.checked ? 'true' : 'false';
            $.ajax({
                url:`/ship-order/updateOrderStatus/${id}/${type}/${value}`,
                method:'post'
            });
        });

        $('.ckb-is-arrived').click(function () {

            let ckbIsHaiguan = $(this).parents('tr').find('.ckb-is-haiguan');
            if(!ckbIsHaiguan[0].checked) {
                ckbIsHaiguan.click();
            }

            let id = $(this).data('id');
            let type = 'isArrived';
            let value = this.checked ? 'true' : 'false';
            $.ajax({
                url:`/ship-order/updateOrderStatus/${id}/${type}/${value}`,
                method:'post',
                success:function (data) {
                    if(data.success) {
                        if(value === 'true') {
                            alert('已确认签收!');
                        } else {
                            alert('取消签收');
                        }
                    }
                }
            });
        });


        {
            let table = $('.am-table');

            if($.cookie('hide-arrived-order')) {
                $('.hide-arrived-order').prop('checked',true);
                table.find('tbody tr').each(function (i,n) {
                    if($(n).find('.ckb-is-arrived')[0].checked) {
                        $(n).addClass('hide');
                    }
                });
            }
            $('.hide-arrived-order').click(function () {
                if(this.checked) {
                    $.cookie('hide-arrived-order','true',{expires:new Date(new Date().getTime() + 1000*60*60*24*365),path:'/',domain:location.host});
                    table.find('tbody tr').each(function (i,n) {
                        if($(n).find('.ckb-is-arrived')[0].checked) {
                            $(n).addClass('hide');
                        }
                    });
                } else {
                    $.cookie('hide-arrived-order','',{expires:new Date(new Date().getTime()),path:'/',domain:location.host});
                    table.find('tr.hide').removeClass('hide');
                }
            });
        }




        $('.clipboard-order').each(function (i,n) {
            let clipboard = new Clipboard(this);
            clipboard.on('success',() => {
                $(this).addClass('active');
            });
        });

        $('.clipboard-tracking').each(function (i,n) {
            let clipboard = new Clipboard(this);
            clipboard.on('success',() => {
                $(this).addClass('active');
            });
        });


        {
            let modal = $('#modal-edit-tracking');
            let input = $('#input-edit-tracking');
            $('.edit-tracking').each(function (i, n) {

                $(this).click(function () {
                    setTimeout(function() {
                        input.val('');
                        input[0].focus();
                    },100);
                    modal.modal({
                        relatedTarget: this,
                        onConfirm: function(e) {
                            let id = $(this.relatedTarget).data('id');
                            let tr = $(this.relatedTarget).parents('tr');
                            let searchTracking = tr.find('.search-tracking');
                            $.ajax({
                                url:`/ship-order/edit-tracking/${id}`,
                                type:'post',
                                data:{
                                    value:$.trim(input.val())
                                },
                                success:function(data) {
                                    searchTracking.attr('data-tracking',$.trim(input.val()));
                                    searchTracking.text($.trim(input.val()));
                                    if(!tr.find('.ckb-is-haiguan')[0].checked) {
                                        tr.find('.ckb-is-haiguan').click();
                                    }
                                }
                            })
                        }
                    });

                });

            });
        }


        {
            let modal = $('#modal-edit-remark');
            let input = $('#input-edit-remark');
            $('.edit-remark').click(function () {
                let tr = $(this).parents('tr');
                setTimeout(function() {
                    input.val($.trim(tr.find('.remark').text()));
                    input[0].focus();
                },100);
                modal.modal({
                    relatedTarget: this,
                    onConfirm: function(e) {
                        let tr = $(this.relatedTarget).parents('tr');
                        let id = $(this.relatedTarget).attr('data-id');
                        let remark = tr.find('.remark');
                        $.ajax({
                            url:`/ship-order/edit-remark/${id}`,
                            type:'post',
                            data:{
                                value:$.trim(input.val())
                            },
                            success:function(data) {
                                remark.attr('data-remark',$.trim(input.val()));
                                remark.text($.trim(input.val()));
                            }
                        })
                    }
                });
            });
        }

        {
            let modal = $('#modal-edit-ship-order');
            let input = $('#input-edit-ship-order');
            $('.edit-ship-order').click(function () {
                let tr = $(this).parents('tr');
                setTimeout(function() {
                    input.val($.trim(tr.find('.ship-order-number').text()));
                    input[0].focus();
                },100);
                modal.modal({
                    relatedTarget: this,
                    onConfirm: function(e) {
                        let tr = $(this.relatedTarget).parents('tr');
                        let id = $(this.relatedTarget).attr('data-id');
                        let shipOrderNumber = tr.find('.ship-order-number');
                        $.ajax({
                            url:`/ship-order/edit-ship-order-number/${id}`,
                            type:'post',
                            data:{
                                value:$.trim(input.val())
                            },
                            success:function(data) {
                                shipOrderNumber.text($.trim(input.val()));
                            }
                        })
                    }
                });
            });
        }

        //查询快递
        {
            let modalLoading = $('#modal-loading');
            let modalTrackingInfo = $('#modal-tracking-info');
            $('.am-table').on('click','.search-tracking',function () {
                let id = $(this).text();
                $(this).addClass('active');
                modalLoading.modal();
                $.ajax({
                    url:`/ship-order/express/${id}/ems`,
                    type:'get',
                    success:function(data) {

                        modalLoading.modal('close');

                        if(!data.list) {
                            modalTrackingInfo.find('.am-modal-bd').html(`<p>${data.msg}</p>`);
                            modalTrackingInfo.modal();
                            return false;
                        }

                        let text = '';
                        $.each(data.list,function (i, n) {
                            text += `<p><strong>${n.time}</strong> ${n.status}</p>`;
                        });
                        modalTrackingInfo.find('.am-modal-bd').html(text);
                        modalTrackingInfo.modal();

                    }
                })
            });
        }


    },
    addFun:function () {
        $('#transferOrderNumber')[0].focus();
    }
};