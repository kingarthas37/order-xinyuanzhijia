'use strict';

require('jquery-validate');

module.exports = {

    loginFun:function() {
        $('#form-login').validate();
    },
    
    registerFun:function() {
        $('#form-register').validate();
    }

};