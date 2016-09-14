'use strict';

let leanAppHeader = window.leanAppHeader;

let utils = require('../common/utils');

module.exports = {

    indexFun:function() {

        //选择产品分类
        {
            let category1 = $('.select-category-1');
            let category2 = $('.select-category-2');
            let productMethod = $('.select-product-method');
            
            let category1Val = category1.val();
            let category2Val = category2.val();
            let productMethodVal = productMethod.val();

            productMethod.change(function(){
                if(this.value) {
                    return location.href = utils.urlParamsComponent('/product-record',{
                        'product-method-id':this.value
                    });
                }
                location.href = utils.urlParamsComponent('/product-record',{});
            });

            category1.change(function() {
                if(this.value) {
                    return location.href = utils.urlParamsComponent('/product-record',{
                        'product-method-id':productMethodVal,
                        'category1-id':this.value
                    });
                }
                location.href = utils.urlParamsComponent('/product-record',{
                    'product-method-id':productMethodVal
                });
            });

            category2.change(function() {
                if(this.value) {
                    return location.href = utils.urlParamsComponent('/product-record',{
                        'product-method-id':productMethodVal,
                        'category1-id':category1Val,
                        'category2-id':this.value
                    });
                }
                location.href = utils.urlParamsComponent('/product-record',{
                    'product-method-id':productMethodVal,
                    'category1-id':category1Val
                });
            });
            
        }
        
       
        
        //删除product record
        {
            let alert = $('#modal-alert');
            $('.remove-product-record').click(function() {
                $('#confirm-remove-product-record').modal({
                    relatedTarget: this,
                    onConfirm: function() {

                        let target = $(this.relatedTarget);
                        let productRecordId = target.attr('data-product-record-id');
                        
                        $.ajax({
                            type:'post',
                            url:`/product-record/remove/${productRecordId}`
                        }).then(()=> {
                            alert.modal({
                                relatedTarget: this,
                                onConfirm:()=> {
                                    let target = $(this.relatedTarget);
                                    target.parents('tr').detach();
                                }
                            }).find('.am-modal-bd').text('删除产品收录成功!');
                        });
                    },
                    onCancel:()=> { return false; }
                });

                return false;

            });
        }
        
    },

    addFun:function() {
        this.setCategory();
        this.domUpdate();
        this.submitControl();
        $('#name').get(0).focus();
    },
    editFun:function() {
        this.setCategory();
        this.domUpdate();
        this.submitControl();
    },
    
    //一级,二级分类选择
    setCategory:function() {
        
        let categoryGroup = $('.category-group');
        let $btnAddCategory = $('.btn-add-category');
        let _this = this;
        
        categoryGroup.on('change','.select-product-method',function() {

            let $this = $(this);
            let group = $this.parents('.group');
            let $selectCategory1 = group.find('.select-category-1');
            let $selectCategory2 = group.find('.select-category-2');
            
            if(!this.value) {
                return false;
            }
            
            if(_this.isSubmitBtn) {
                return false;
            }
            
            let productMethodId = parseInt(this.value);

            $.get({
                url:`${leanApp.api}classes/ProductCategory1`,
                headers:leanAppHeader,
                data:`where={"productMethodId":${productMethodId}}`
            }).done(data => {
                $selectCategory1.find('option:not(:first)').detach();
                $selectCategory2.find('option:not(:first)').detach();
                let options = ``;
                $.each(data.results,(i,n)=>{
                    options += `<option value="${n.category1Id}">${n.name}</option>`;
                });
                $selectCategory1.append(options);
            });
            
        });

        categoryGroup.on('change','.select-category-1',function() {
            
            let group = $(this).parents('.group');
            let $selectCategory2 = group.find('.select-category-2');

            if(!this.value){
                return false;
            }


            if(_this.isSubmitBtn) {
                return false;
            }
            
            let category1Id = parseInt(this.value);
            
            $.get({
                url:leanApp.api + 'classes/ProductCategory2',
                headers:leanAppHeader,
                data:'where={"category1Id":'+ category1Id +'}'
            }).done(data => {
                $selectCategory2.find('option:not(:first)').detach();
                let options = ``;
                $.each(data.results,(i,n)=>{
                    options += `<option value="${n.category2Id}">${n.name}</option>`;
                });
                $selectCategory2.append(options);
            });
        });

        categoryGroup.on('click','.btn-remove-category',function() {
            $(this).parents('.group').detach();
        });
        
        //添加新category group并初始化
        $btnAddCategory.click(function() {
            let group = $(this).parents('.group');
            let newGroup = group.clone();
            newGroup.find('.am-selected').detach();
            newGroup.find('select').removeAttr('data-am-selected').removeAttr('required');
            newGroup.appendTo(categoryGroup);
            newGroup.find('.select-category-1 option:not(:first)').detach();
            newGroup.find('.select-category-2 option:not(:first)').detach();
            newGroup.find('.btn-add-category').removeClass('btn-add-category').addClass('btn-remove-category').text('删除');
            newGroup.find('label').detach();
            newGroup.find('select').amuiSelected();
        });
        
    },
    
    domUpdate() {

        //添加删除订单内容
        {

            let group = $('.content-name-group');
            let template = `
                    <div class="list-group-field am-form-group">
                        <div class="am-u-sm-11">
                            <input class="url" name="url" type="text" placeholder="输入产品链接" autocomplete="off">
                        </div>
                        <label class="am-u-sm-1 am-form-label">
                            <a href="javascript:;" class="remove">- 删除</a>
                        </label>
                    </div>
            `;

            $('.url-add').click(function() {
                let $template = $(template);
                group.append($template);
                $template.find('input[name=url]').get(0).focus();
            });

            group.on('click','.remove', function () {
                $(this).parents('.list-group-field').detach();
            });
        }
        
        //图片展示
        {
            let image = $('#image');
            let productRecordImage = $('.product-record-image');
            image.change(function() {
                productRecordImage.find('img').attr('src',image.val());
            });
        }
        
        
    },

    submitControl:function() {

        let submit = $('#submit');
        let _this = this;
        _this.isSubmitBtn =false;
        
        $('form :submit').click(function() {

            _this.isSubmitBtn = true;
            
            //由于submit时amazeui的select会触发一次onchange,导致category1和category2会重置,数据丢失
            //还原isSubmitBtn,让select enable
            setTimeout(function() {
                _this.isSubmitBtn = false;
            }.bind(this),1000);
            return true;
        });
        
        $('.am-form').validator({
            submit:function() {
                if(!this.isFormValid()){
                    return false;
                }
                submit.attr('disabled',true).addClass('am-disabled');
            }
        });
    }

};