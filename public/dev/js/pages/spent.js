'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        let total = 0;

        let totalUser1 = 0;
        $('.cell-user1').each(function (i,n) {
           totalUser1 += Number($(n).text());
        });

        let totalUser2 = 0;
        $('.cell-user2').each(function (i,n) {
            totalUser2 += Number($(n).text());
        });

        let totalUser3 = 0;
        $('.cell-user3').each(function (i,n) {
            totalUser3 += Number($(n).text());
        });

        let totalUser4 = 0;
        $('.cell-user4').each(function (i,n) {
            totalUser4 += Number($(n).text());
        });

        $('#total-user1').text(totalUser1.toFixed(2));
        $('#total-user2').text(totalUser2.toFixed(2));
        $('#total-user3').text(totalUser3.toFixed(2));
        $('#total-user4').text(totalUser4.toFixed(2));
        $('#total-spent').text((totalUser1 - totalUser3 - totalUser4).toFixed(2));
    },
    editFun:function() {

        $('#form-edit-earning').validate();
        $('#spent-user1-comment,#spent-user2-comment,#spent-user3-comment,#spent-user4-comment').change(function() {
            
            let amount = 0;
            let input = $(this).parent().prev().prev().find('input[type=text]');
            var amounts = this.value.match(/\\([^\n]+)/g);

            if(!amounts) {
                input.val(0);
                return;
            }
            
            for(var i=0;i<amounts.length;i++) {
                amounts[i] = amounts[i].replace('\\','');
                amounts[i] = $.trim(amounts[i]);
                amount += Number(amounts[i]);
            }
            input.val(amount.toFixed(2));
        });
        
    }
};