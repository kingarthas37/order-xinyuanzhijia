'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {
        
        var expenseses = (function() {
            var value = 0;
            $('.cell-expenses').each(function(i,n) {
                value += parseInt($(n).text());
            });
            return value;
        })();
        
        var incomes = (function() {
            var value = 0;
            $('.cell-income').each(function(i,n) {
                value += parseInt($(n).text());
            });
            return value;
        })();
        
        $('#month-expenses').text(expenseses);
        $('#month-income').text(incomes);
        $('#month-earning').text(incomes - expenseses);
        
    },
    editFun:function() {

        $('#form-edit-earning').validate();
        var expenses = $('#expenses');
        var expensesComment = $('#expenses-comment');
        var date = /date=(.*)/.exec(location.search)[1];
        
        $('.current-day-expenses').click(function(e) {
            $.ajax({
                url:'/earning/edit/current-day-expenses',
                data:{
                    date:date
                },
                success:function(data) {
                    let val =expensesComment.val();
                    val = val.replace(/采购金额\:\d+/,'采购金额:' + data.value);
                    expensesComment.val(val).trigger('change');
                    $(e.target).css('font-weight','bold').text('已更新当天采购金额');
                }
            });
        }).trigger('click');
        
        $('#expenses-comment,#income-comment').change(function() {
            
            var amount = 0;
            var input = $(this).parent().prev().prev().find('input[type=text]');
            var amounts = this.value.match(/(\d+).*\b/g);
            
            if(!amounts) {
                input.val(0);
                return;
            }
            
            for(var i=0;i<amounts.length;i++) {
                amount += parseInt(amounts[i]);
            }
            input.val(amount);
        });
        
    }
};