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
        var date = /date=(.*)/.exec(location.search)[1];
        
        $('.current-day-expenses').click(function() {
            $.ajax({
                url:'/earning/edit/current-day-expenses',
                data:{
                    date:date
                },
                success:function(data) {
                    expenses.val(data.value);
                }
            });
        });
    }
};