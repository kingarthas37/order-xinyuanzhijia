'use strict';

require('jquery-validate');

module.exports = {

    indexFun:function() {

        let total = 0;
        $('.cell-spent').each(function (i,n) {
            total += parseInt($(n).text());
        });

        $('#total-spent').text(total);
    },
    editFun:function() {

        $('#form-edit-earning').validate();
        $('#spent-user1-comment,#spent-user2-comment').change(function() {
            
            var amount = 0;
            var input = $(this).parent().prev().prev().find('input[type=text]');
            
            var amounts = this.value.match(/(\d+)/g);
            
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