require=function e(n,o,t){function r(i,c){if(!o[i]){if(!n[i]){var l="function"==typeof require&&require;if(!c&&l)return l(i,!0);if(a)return a(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var u=o[i]={exports:{}};n[i][0].call(u.exports,function(e){var o=n[i][1][e];return r(o?o:e)},u,u.exports,e,n,o,t)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<t.length;i++)r(t[i]);return r}({3:[function(e,n,o){"use strict";e("../../../js/main"),e("./config"),e("./common")},{"../../../js/main":18,"./common":1,"./config":2}],2:[function(e,n,o){"use strict";window.assets={"no-image-src":"http://ac-JoaBcRTt.clouddn.com/b7f0d580ef9a4ae8e19b.png"};var t="order-51wish";window.env=function(){return location.hostname===t+".leanapp.cn"||location.hostname===t+".cn"||location.host==="www."+t+".cn"?"production":location.hostname==="stg-"+t+".leanapp.cn"?"stage":"development"};var r=function(){return"production"===env()?"//order-51wish.leanapp.cn/1.1/functions/":"stage"===env()?"//stg-order-51wish.leanapp.cn/1.1/functions/":"/1.1/functions/"};window.leanApp={appdId:"JoaBcRTtJUNAV1bLpqv8z1ze-gzGzoHsz",api:"https://leancloud.cn/1.1/",cloud:r()},window.leanAppHeader={"x-lc-id":leanApp.appdId,"x-lc-sign":$.cookie("x_lc_sign")||"","x-lc-session":$.cookie("x_lc_session")||"","x-lc-prod":"production"===env()?1:0,"content-type":"application/json"}},{}],1:[function(e,n,o){"use strict";$(function(){!function(){for(var e,n=function(){},o=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],t=o.length,r=window.console=window.console||{};t--;)e=o[t],r[e]||(r[e]=n)}(),$.extend($.validator.messages,{required:"必选字段",remote:"请修正该字段",email:"请输入正确格式的电子邮件",url:"请输入合法的网址",date:"请输入合法的日期",dateISO:"请输入合法的日期 (ISO).",number:"请输入合法的数字",digits:"只能输入整数",creditcard:"请输入合法的信用卡号",equalTo:"请再次输入相同的值",accept:"请输入拥有合法后缀名的字符串",maxlength:jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),minlength:jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),rangelength:jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),range:jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),max:jQuery.validator.format("请输入一个最大为{0} 的值"),min:jQuery.validator.format("请输入一个最小为{0} 的值")}),$(".am-alert.am-alert-success").length&&setTimeout(function(){$(".am-alert.am-alert-success").hide()},3e3)})},{}]},{},[3]);