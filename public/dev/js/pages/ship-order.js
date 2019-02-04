
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
                method:'post'
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


    },
    addFun:function () {
        $('#transferOrderNumber')[0].focus();
    }
};