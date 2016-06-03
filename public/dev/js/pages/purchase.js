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
        
        $('.ckb-shipping-status').click(function() {
            $.ajax({
                url:'/purchase/shipping-status',
                type:'get',
                data:{
                    purchaseId:$(this).attr('data-id'),
                    status:this.checked ? 'arrived' : 'notarrived'
                }
            }).done(data => {
                let tr = $(this).parents('tr');
                if(this.checked) {
                    tr.addClass('off')
                } else {
                    tr.removeClass('off')
                }
            });
        });

        $('#select-site-type').change(function() {
            if(this.value) {
                return location.href = '/purchase?site-type=' + this.value;
            }
            location.href = '/purchase';
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
        var purchaseImage = $('#purchase-image');
        var purchaseImageView = $('.purchase-image');

        var siteType = location.search.indexOf('etsy') > -1 ? 'etsy' : 'normal';
        
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
                            name:purchaseDescription.val(),
                            'site-type':siteType
                        };
                        return settings;
                    }
                }
            })
        });

        purchaseDescription.on({
            'typeahead:select':function(event,item) {
                purchaseWebsite.val(item.website ? item.website : item.shop);
                purchaseEmail.val(item.email);
                purchaseImage.val(item.image);
                purchaseImageView.find('img').attr('src',item.image);
            }
        });
    }
};