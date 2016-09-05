'use strict';

var swfobject = require('swfobject');
var FlashDetect = require('flash-detect');

module.exports = function () {

    var TAOBAONAME = '暮雪的心愿城';
    var taobaoData = null;
    var btnCreate = $('#btn-create');
    var textarea = $('#textarea');
    var mailTitle = $('.mail-title');
    var mailContent = $('.mail-content');
    var copyInfo = $('.copy-info');
    var initDataArr = []; //初始商品数据存放数组
    var orderId = ''; //生成数据的订单号
    var userName = ''; //生成数据的用户名
    var finalDataArray = [];  //最终生成的内容

    //初始加载数据
    $.ajax({
        url: '/mail/taobao-mail-create/get-content',
        success: function (_data) {
            createInitData(_data.content);
            btnCreate.removeAttr('disabled');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('数据加载出错，请重新刷新页面!(' + XMLHttpRequest + textStatus + errorThrown + ')');
        }
    });
    //点击生成代码
    btnCreate.click(function () {
        taobaoData = filterTaobaoData(textarea.val());
    });
    //初始化markdown数据代码
    function createInitData(_data) {
        _data = $.trim(_data);

        _data.replace(/#{4,6}([^\n]+)\n((?:[^#####])+)/g, function (text, title, content) {

            var obj = {};
            obj.title = encodeURIComponent($.trim(title));
            content = $.trim(content);
            content = content.replace(/(http[^密]*)/g, function (text, $1) {
                $1 = $.trim($1);
                return '<a target="_blank" href="' + $1 + '">' + $1 + '</a> ';
            });

            content = content.replace(/(密码[^\n]+)/g, function (text, $1) {
                return $1 + '<br/>';
            });
            obj.content = encodeURIComponent(content);
            initDataArr.push(obj);
            return '';
        });
    }

    //过滤淘宝复制过来得数据
    function filterTaobaoData(_data) {

        _data = $.trim(_data);
        _data = _data.replace(/\n/g, '|');
        var __data = _data.split('|');
        var dataArr = $.grep(__data, function (n, i) {
            return n;
        });

        //orderId
        if (/订单号/.test(_data)) {
            orderId = /订单号: [^\d]*(\d+)/.exec(_data)[1];
        }

        //userName
        userName = dataArr[4];

        //匹配数据
        $.each(dataArr, function (i, n) {
            $.each(initDataArr, function (_i, _n) {
                if (encodeURIComponent($.trim(n)) == _n.title) {
                    finalDataArray.push(_n);
                    return;
                }
            });
        });

        createFinalContent();
    }


    //最终生成html
    function createFinalContent() {
        mailContent.load('/assets/templates/taobao-mail.html', function (d) {

            if (!finalDataArray.length) {
                alert('数据错误，请检查!');
                return false;
            }

            //设置复制title内容
            mailTitle.text(TAOBAONAME + '-' + decodeURIComponent(finalDataArray[0].title) + (finalDataArray.length > 1 ? '等多件' : ''));

            //清空数据
            var mailTplTitle = mailContent.find('.mail-mx-title').empty();
            var mailTplContent = mailContent.find('.mail-mx-content').empty();
            //设置mail title
            var contentTitle = '亲爱的 <strong style="color:#645a7e;">' + (userName ? userName : '') + '</strong> ' + (orderId ? '(订单号' + orderId + ')' : '') + ',以下为您拍下的宝贝:';
            mailTplTitle.html(contentTitle);

            //设置mail content
            var lists = '';
            for (var i = 0; i < finalDataArray.length; i++) {

                lists += '<div style="border-bottom: 1px dashed #ccc; margin-bottom: 5px;">';
                lists += '<div style="font-weight: bold; padding:5px; margin:0; ">' + (i + 1) + '.' + decodeURIComponent(finalDataArray[i].title) + '</div>';

                //更新content html
                var _content = decodeURIComponent(finalDataArray[i].content);
                _content = _content.replace(/\<a/gi, '<a style="color:#645a7e; text-decoration: underline;"');
                _content = _content.replace(/链接\S/g, '<br/>下载链接:<span style="padding-left:6px;"></span>');
                _content = _content.replace(/密码\S([^\n]+)/gi, '<br/>下载密码:<strong style="color:#645a7e;padding-left:6px;">$1</strong><div style="padding-bottom: 6px;"></div>');

                lists += '<div style="padding:5px; margin:0;">' + _content + '</div>';
                lists += '</div>';
            }

            mailTplContent.html(lists);
            mailTplContent.find('> div:last').css({
                'border': 'none',
                'margin': '0'
            });

        });

    }

    //复制功能
    if (FlashDetect.installed) {

        let swf = '/assets/swf/ZeroClipboard.swf';
        
        $('.copy-title').show().zclip({
            path: swf,
            copy: function () {
                return $('.mail-title').text();
            },
            afterCopy: function () {
                copyInfo.show().text('复制邮件标题成功!');
            }
        });

        $('.copy-wangwang').show().zclip({
            path: swf,
            copy: function () {
                return '亲,商品已发送至您此邮箱,请注意查收! ps:如果您是手机端阅读(尤其是iPhone/iPad),请花30秒时间点击下邮件里的在手机中阅读的链接说明,希望本店商品能对亲有帮助哦,并祝亲能收获满满,心想事成,加油!!';
            },
            afterCopy: function () {
                copyInfo.show().text('复制旺旺回复内容成功!');
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        });
        $('.copy-haoping').show().zclip({
            path: swf,
            copy: function () {
                return '亲,我们已收到您的好评,感谢您对本店的支持,本店会一如既往地为您服务并会持续上架您喜欢的商品,请继续关注我们哦!以下是店主作为答谢赠送您的"天使音乐":[身体工房馆-天使疗愈花园-召唤天使] 下载链接: http://pan.baidu.com/s/1i31U9VJ 密码: 6882';
            },
            afterCopy: function () {
                copyInfo.show().text('复制好评回复内容成功!');
            }
        });

        $('.copy-howmail').show().zclip({
            path: swf,
            copy: function () {
                return '亲,请问邮箱是多少,我这边可以给亲发货哦';
            },
            afterCopy: function () {
                copyInfo.show().text('复制询问邮箱成功!');
            }
        });

        $('.copy-howread').show().zclip({
            path: swf,
            copy: function () {
                return '亲拍时请留言备注自己的邮箱号,我会把百度云的下载链接发到亲的邮箱里,亲可以保存到自己的百度云或直接下载';
            },
            afterCopy: function () {
                copyInfo.show().text('复制如何阅读成功!');
            }
        });
    }

};