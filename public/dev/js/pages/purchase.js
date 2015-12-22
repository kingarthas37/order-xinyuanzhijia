'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun:function() {

        $('.remove-purchase').click(function() {

            var $this = $(this);
            
            $('#confirm-remove-purchase').modal({
                relatedTarget: this,
                onConfirm: function(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function() {
                    return false;
                }
            });
            return false;
        });

    },
    addFun:function() {
        $('#form-add-purchase').validate();
        this.purchaseTypeAhead();
    },
    editFun:function() {
        $('#form-add-purchase').validate();
        this.purchaseTypeAhead();
    },
    purchaseTypeAhead:function() {

        var purchaseDescription = $('#purchase-description');
        var purchaseWebsite = $('#purchase-website');
        var purchaseEmail = $('#purchase-mail');

        purchaseDescription.typeahead(null, {
            display: 'value',
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url:'/purchase/add/website-desc',
                    prepare: function (query, settings) {
                        settings.data = {
                            name:purchaseDescription.val()
                        };
                        return settings;
                    }
                }
            })
        });

        purchaseDescription.on({
            'typeahead:select':function(event,item) {
                purchaseWebsite.val(item.website);
                purchaseEmail.val(item.email);
            }
        });
    }
};