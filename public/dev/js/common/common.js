'use strict';

var AMUI = require('amazeui');

$(function () {

    // Avoid `console` errors in browsers that lack a console.
    (function () {
        var method;
        var noop = function () {
        };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());


    //jquery validate
    $.extend($.validator.messages, {
        required: "必选字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
        rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为{0} 的值"),
        min: jQuery.validator.format("请输入一个最小为{0} 的值")
    });

    //am selected与jquery.form冲突解决:
    {
        AMUI.plugin('amuiSelected', AMUI.selected);
        $('[data-am-selected]').amuiSelected();
    }
    
    //提示flash隐藏
    {
        if($('.am-alert.am-alert-success').length) {
            setTimeout(()=> {
                $('.am-alert.am-alert-success').fadeOut();
            },3000);
        }
    }

    //图片在线转换
    {
        $('.image-convert').click(function(){
            let modalImageConvert = $('#modal-image-convert');
            if(!modalImageConvert.length) {
                $('body').append(`
                <div class="am-modal am-modal-no-btn" tabindex="-1" id="modal-image-convert">
                  <div class="am-modal-dialog">
                    <div class="am-modal-hd">图片在线转换
                      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                    </div>
                    <div class="am-modal-bd">
                        <form class="am-form t-l">
                            <div class="am-form-group">
                              <input type="text" id="input-image-convert" class="am-form-field" placeholder="输入需要转换的图片Url"/>
                            </div> 
                            <button type="button" class="am-btn am-btn-primary">开始转换</button>
                            <span class="info"></span>
                        </form>
                    </div>
                  </div>
                </div>
            `);
                modalImageConvert = $('#modal-image-convert');
                let input = modalImageConvert.find('.am-form-field');
                let button = modalImageConvert.find('.am-btn');
                let info = modalImageConvert.find('.info');
                button.click(function() {

                    let val = $.trim(input.val());
                    if(!val) {
                        input[0].focus();
                        return false;
                    }

                    if(!/(\.jpg|\.jpeg|\.png|\.gif)/.test(val)) {
                        input.val('');
                        input[0].focus();
                        return false;
                    }

                    button.prop('disabled',true).text('正在转换中...');

                    info.text('');
                    $.ajax({
                        url:'/file-manage/upload/auto',
                        type:'post',
                        data:{
                            'img-url':val
                        }
                    }).then(function (data) {
                        if(data.success) {
                            info.text('转换成功!');
                            button.prop('disabled',false).text('开始转换');
                            input.val(data.url);
                            input[0].focus();
                            input.select();
                        } else {
                            info.text('转换失败!');
                        }
                    });

                });

            }

            modalImageConvert.modal();
            modalImageConvert.find('.am-form-field').val('').get(0).focus();
            modalImageConvert.find('.info').text('');
        });
    }

    {
        window.globalVar ={
            logger : require('tracer').console(),

        }


    }

});