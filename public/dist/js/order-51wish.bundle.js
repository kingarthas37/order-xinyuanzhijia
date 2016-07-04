require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {

    // Avoid `console` errors in browsers that lack a console.
    (function () {
        var method;
        var noop = function noop() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = window.console || {};

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    })();

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
});

},{}],2:[function(require,module,exports){
'use strict';

require('../../../js/main');

require('./common');

},{"../../../js/main":16,"./common":1}],3:[function(require,module,exports){
'use strict';

//产品预览 function

module.exports = function () {

    var previewContent = $('.preview-content');

    var html = $.trim(previewContent.html());

    var btnCopy = $('.btn-copy');
    btnCopy.zclip({
        path: '/assets/swf/ZeroClipboard.swf',
        copy: function copy() {
            return html;
        },
        afterCopy: function afterCopy() {
            btnCopy.popover({
                content: '复制成功!'
            });
        }
    });

    var btnShot = $('.btn-shot');
    btnShot.button('loading');
    var progress = $.AMUI.progress;

    window.onload = function () {

        btnShot.button('reset');
        btnShot.click(function () {

            progress.start();
            btnShot.button('loading').text('图片生成中...');
            $.ajax({
                url: '/product/preview/shot',
                type: 'post',
                data: {
                    html: html,
                    htmlHeight: previewContent.height(),
                    name: $('h4').text()
                },
                success: function success(data) {
                    progress.done();
                    $('#modal-shot-success').modal();
                    btnShot.button('reset').text('生成淘宝详情图片');
                }
            });
        });
    };
};

},{}],4:[function(require,module,exports){
/*! Amaze UI v2.7.0 | by Amaze UI Team | (c) 2016 AllMobilize, Inc. | Licensed under MIT | 2016-05-24T10:02:50+0800 */ 
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.AMUI=e(require("jquery")):t.AMUI=e(t.jQuery)}(this,function(t){return function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var n=i(1),s=i(2);i(3),i(4),i(5),i(6),i(7),i(8),i(9),i(10),i(11),i(14),i(15),i(16),i(17),i(18),i(19),i(20),i(21),i(22),i(24),i(25),i(23),i(27),i(28),i(29),i(30),i(31),i(32),i(33),i(26),i(34),i(35),i(36),i(37),i(38),i(39),i(40),i(41),i(42),i(43),i(44),i(45),i(46),i(47),i(48),i(49),i(50),i(51),i(52),i(53),i(54),t.exports=n.AMUI=s},function(e,i){e.exports=t},function(t,e,i){"use strict";var n=i(1);if("undefined"==typeof n)throw new Error("Amaze UI 2.x requires jQuery :-(\n\u7231\u4e0a\u4e00\u5339\u91ce\u9a6c\uff0c\u53ef\u4f60\u7684\u5bb6\u91cc\u6ca1\u6709\u8349\u539f\u2026");var s=n.AMUI||{},o=n(window),a=window.document,r=n("html");s.VERSION="2.7.0",s.support={},s.support.transition=function(){var t=function(){var t=a.body||a.documentElement,e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return e[i]}();return t&&{end:t}}(),s.support.animation=function(){var t=function(){var t=a.body||a.documentElement,e={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(var i in e)if(void 0!==t.style[i])return e[i]}();return t&&{end:t}}(),s.support.touch="ontouchstart"in window&&navigator.userAgent.toLowerCase().match(/mobile|tablet/)||window.DocumentTouch&&document instanceof window.DocumentTouch||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>0||!1,s.support.mutationobserver=window.MutationObserver||window.WebKitMutationObserver||null,s.support.formValidation="function"==typeof document.createElement("form").checkValidity,s.utils={},s.utils.debounce=function(t,e,i){var n;return function(){var s=this,o=arguments,a=function(){n=null,i||t.apply(s,o)},r=i&&!n;clearTimeout(n),n=setTimeout(a,e),r&&t.apply(s,o)}},s.utils.isInView=function(t,e){var i=n(t),s=!(!i.width()&&!i.height())&&"none"!==i.css("display");if(!s)return!1;var a=o.scrollLeft(),r=o.scrollTop(),l=i.offset(),c=l.left,h=l.top;return e=n.extend({topOffset:0,leftOffset:0},e),h+i.height()>=r&&h-e.topOffset<=r+o.height()&&c+i.width()>=a&&c-e.leftOffset<=a+o.width()},s.utils.parseOptions=s.utils.options=function(t){if(n.isPlainObject(t))return t;var e=t?t.indexOf("{"):-1,i={};if(-1!=e)try{i=new Function("","var json = "+t.substr(e)+"; return JSON.parse(JSON.stringify(json));")()}catch(s){}return i},s.utils.generateGUID=function(t){var e=t+"-"||"am-";do e+=Math.random().toString(36).substring(2,7);while(document.getElementById(e));return e},s.utils.getAbsoluteUrl=function(){var t;return function(e){return t||(t=document.createElement("a")),t.href=e,t.href}}(),s.plugin=function(t,e,i){var o=n.fn[t];i=i||{},n.fn[t]=function(o){var a,r=Array.prototype.slice.call(arguments,0),l=r.slice(1),c=this.each(function(){var c=n(this),h="amui."+t,u=i.dataOptions||"data-am-"+t,d=c.data(h),p=n.extend({},s.utils.parseOptions(c.attr(u)),"object"==typeof o&&o);(d||"destroy"!==o)&&(d||c.data(h,d=new e(this,p)),i.methodCall?i.methodCall.call(c,r,d):(i.before&&i.before.call(c,r,d),"string"==typeof o&&(a="function"==typeof d[o]?d[o].apply(d,l):d[o]),i.after&&i.after.call(c,r,d)))});return void 0===a?c:a},n.fn[t].Constructor=e,n.fn[t].noConflict=function(){return n.fn[t]=o,this},s[t]=e},n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one(s.support.transition.end,function(){e=!0});var o=function(){e||n(i).trigger(s.support.transition.end),i.transitionEndTimmer=void 0};return this.transitionEndTimmer=setTimeout(o,t),this},n.fn.redraw=function(){return this.each(function(){this.offsetHeight})},n.fn.transitionEnd=function(t){function e(s){t.call(this,s),i&&n.off(i,e)}var i=s.support.transition.end,n=this;return t&&i&&n.on(i,e),this},n.fn.removeClassRegEx=function(){return this.each(function(t){var e=n(this).attr("class");if(!e||!t)return!1;var i=[];e=e.split(" ");for(var s=0,o=e.length;o>s;s++)e[s].match(t)||i.push(e[s]);n(this).attr("class",i.join(" "))})},n.fn.alterClass=function(t,e){var i=this;if(-1===t.indexOf("*"))return i.removeClass(t),e?i.addClass(e):i;var s=new RegExp("\\s"+t.replace(/\*/g,"[A-Za-z0-9-_]+").split(" ").join("\\s|\\s")+"\\s","g");return i.each(function(t,e){for(var i=" "+e.className+" ";s.test(i);)i=i.replace(s," ");e.className=n.trim(i)}),e?i.addClass(e):i},s.utils.rAF=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),s.utils.cancelAF=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(t){window.clearTimeout(t)}}(),s.utils.measureScrollbar=function(){if(document.body.clientWidth>=window.innerWidth)return 0;var t=n('<div style="width: 100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;"></div>');n(document.body).append(t);var e=t[0].offsetWidth-t[0].clientWidth;return t.remove(),e},s.utils.imageLoader=function(t,e){function i(){e(t[0])}function n(){if(this.one("load",i),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var t=this.attr("src"),e=t.match(/\?/)?"&":"?";e+="random="+(new Date).getTime(),this.attr("src",t+e)}}return t.attr("src")?void(t[0].complete||4===t[0].readyState?i():n.call(t)):void i()},s.template=function(t,e){var i=s.template;return i.cache[t]||(i.cache[t]=function(){var e=t,n=/^[\w\-]+$/.test(t)?i.get(t):(e="template(string)",t),s=1,o=("try { "+(i.variable?"var "+i.variable+" = this.stash;":"with (this.stash) { ")+"this.ret += '"+n.replace(/<%/g,"").replace(/%>/g,"").replace(/'(?![^\x11\x13]+?\x13)/g,"\\x27").replace(/^\s*|\s*$/g,"").replace(/\n/g,function(){return"';\nthis.line = "+ ++s+"; this.ret += '\\n"}).replace(/\x11-(.+?)\x13/g,"' + ($1) + '").replace(/\x11=(.+?)\x13/g,"' + this.escapeHTML($1) + '").replace(/\x11(.+?)\x13/g,"'; $1; this.ret += '")+"'; "+(i.variable?"":"}")+"return this.ret;} catch (e) { throw 'TemplateError: ' + e + ' (on "+e+"' + ' line ' + this.line + ')'; } //@ sourceURL="+e+"\n").replace(/this\.ret \+= '';/g,""),a=new Function(o),r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#x22;","'":"&#x27;"},l=function(t){return(""+t).replace(/[&<>\'\"]/g,function(t){return r[t]})};return function(t){return a.call(i.context={escapeHTML:l,line:1,ret:"",stash:t})}}()),e?i.cache[t](e):i.cache[t]},s.template.cache={},s.template.get=function(t){if(t){var e=document.getElementById(t);return e&&e.innerHTML||""}},s.DOMWatchers=[],s.DOMReady=!1,s.ready=function(t){s.DOMWatchers.push(t),s.DOMReady&&t(document)},s.DOMObserve=function(t,e,i){var o=s.support.mutationobserver;o&&(e=n.isPlainObject(e)?e:{childList:!0,subtree:!0},i="function"==typeof i&&i||function(){},n(t).each(function(){var t=this,a=n(t);if(!a.data("am.observer"))try{var r=new o(s.utils.debounce(function(e,n){i.call(t,e,n),a.trigger("changed.dom.amui")},50));r.observe(t,e),a.data("am.observer",r)}catch(l){}}))},n.fn.DOMObserve=function(t,e){return this.each(function(){s.DOMObserve(this,t,e)})},s.support.touch&&r.addClass("am-touch"),n(document).on("changed.dom.amui",function(t){var e=t.target;n.each(s.DOMWatchers,function(t,i){i(e)})}),n(function(){var t=n("body");s.DOMReady=!0,n.each(s.DOMWatchers,function(t,e){e(document)}),s.DOMObserve("[data-am-observe]"),r.removeClass("no-js").addClass("js"),s.support.animation&&r.addClass("cssanimations"),window.navigator.standalone&&r.addClass("am-standalone"),n(".am-topbar-fixed-top").length&&t.addClass("am-with-topbar-fixed-top"),n(".am-topbar-fixed-bottom").length&&t.addClass("am-with-topbar-fixed-bottom");var e=n(".am-layout");e.find('[class*="md-block-grid"]').alterClass("md-block-grid-*"),e.find('[class*="lg-block-grid"]').alterClass("lg-block-grid"),n("[data-am-widget]").each(function(){var t=n(this);0===t.parents(".am-layout").length&&t.addClass("am-no-layout")})}),t.exports=s},function(t,e,i){"use strict";function n(t,e,i){return setTimeout(l(t,i),e)}function s(t,e,i){return Array.isArray(t)?(o(t,i[e],i),!0):!1}function o(t,e,i){var n;if(t)if(t.forEach)t.forEach(e,i);else if(void 0!==t.length)for(n=0;n<t.length;)e.call(i,t[n],n,t),n++;else for(n in t)t.hasOwnProperty(n)&&e.call(i,t[n],n,t)}function a(t,e,i){var n="DEPRECATED METHOD: "+e+"\n"+i+" AT \n";return function(){var e=new Error("get-stack-trace"),i=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=window.console&&(window.console.warn||window.console.log);return s&&s.call(window.console,n,i),t.apply(this,arguments)}}function r(t,e,i){var n,s=e.prototype;n=t.prototype=Object.create(s),n.constructor=t,n._super=s,i&&ht(n,i)}function l(t,e){return function(){return t.apply(e,arguments)}}function c(t,e){return typeof t==ft?t.apply(e?e[0]||void 0:void 0,e):t}function h(t,e){return void 0===t?e:t}function u(t,e,i){o(f(e),function(e){t.addEventListener(e,i,!1)})}function d(t,e,i){o(f(e),function(e){t.removeEventListener(e,i,!1)})}function p(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function f(t){return t.trim().split(/\s+/g)}function v(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function g(t){return Array.prototype.slice.call(t,0)}function y(t,e,i){for(var n=[],s=[],o=0;o<t.length;){var a=e?t[o][e]:t[o];v(s,a)<0&&n.push(t[o]),s[o]=a,o++}return i&&(n=e?n.sort(function(t,i){return t[e]>i[e]}):n.sort()),n}function w(t,e){for(var i,n,s=e[0].toUpperCase()+e.slice(1),o=0;o<pt.length;){if(i=pt[o],n=i?i+s:e,n in t)return n;o++}}function b(){return Tt++}function T(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||window}function x(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){c(t.options.enable,[t])&&i.handler(e)},this.init()}function C(t){var e,i=t.options.inputClass;return new(e=i?i:Et?_:St?q:Ct?H:L)(t,E)}function E(t,e,i){var n=i.pointers.length,s=i.changedPointers.length,o=e&Mt&&n-s===0,a=e&(Nt|It)&&n-s===0;i.isFirst=!!o,i.isFinal=!!a,o&&(t.session={}),i.eventType=e,S(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function S(t,e){var i=t.session,n=e.pointers,s=n.length;i.firstInput||(i.firstInput=F(e)),s>1&&!i.firstMultiple?i.firstMultiple=F(e):1===s&&(i.firstMultiple=!1);var o=i.firstInput,a=i.firstMultiple,r=a?a.center:o.center,l=e.center=A(n);e.timeStamp=yt(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=N(r,l),e.distance=P(r,l),k(i,e),e.offsetDirection=M(e.deltaX,e.deltaY);var c=$(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=c.x,e.overallVelocityY=c.y,e.overallVelocity=gt(c.x)>gt(c.y)?c.x:c.y,e.scale=a?O(a.pointers,n):1,e.rotation=a?I(a.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,D(i,e);var h=t.element;p(e.srcEvent.target,h)&&(h=e.srcEvent.target),e.target=h}function k(t,e){var i=e.center,n=t.offsetDelta||{},s=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Mt&&o.eventType!==Nt||(s=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=s.x+(i.x-n.x),e.deltaY=s.y+(i.y-n.y)}function D(t,e){var i,n,s,o,a=t.lastInterval||e,r=e.timeStamp-a.timeStamp;if(e.eventType!=It&&(r>$t||void 0===a.velocity)){var l=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,h=$(r,l,c);n=h.x,s=h.y,i=gt(h.x)>gt(h.y)?h.x:h.y,o=M(l,c),t.lastInterval=e}else i=a.velocity,n=a.velocityX,s=a.velocityY,o=a.direction;e.velocity=i,e.velocityX=n,e.velocityY=s,e.direction=o}function F(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:vt(t.pointers[i].clientX),clientY:vt(t.pointers[i].clientY)},i++;return{timeStamp:yt(),pointers:e,center:A(e),deltaX:t.deltaX,deltaY:t.deltaY}}function A(t){var e=t.length;if(1===e)return{x:vt(t[0].clientX),y:vt(t[0].clientY)};for(var i=0,n=0,s=0;e>s;)i+=t[s].clientX,n+=t[s].clientY,s++;return{x:vt(i/e),y:vt(n/e)}}function $(t,e,i){return{x:e/t||0,y:i/t||0}}function M(t,e){return t===e?Ot:gt(t)>=gt(e)?0>t?Lt:_t:0>e?zt:Rt}function P(t,e,i){i||(i=Bt);var n=e[i[0]]-t[i[0]],s=e[i[1]]-t[i[1]];return Math.sqrt(n*n+s*s)}function N(t,e,i){i||(i=Bt);var n=e[i[0]]-t[i[0]],s=e[i[1]]-t[i[1]];return 180*Math.atan2(s,n)/Math.PI}function I(t,e){return N(e[1],e[0],Ut)+N(t[1],t[0],Ut)}function O(t,e){return P(e[0],e[1],Ut)/P(t[0],t[1],Ut)}function L(){this.evEl=Xt,this.evWin=Yt,this.pressed=!1,x.apply(this,arguments)}function _(){this.evEl=Gt,this.evWin=Kt,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function z(){this.evTarget=Qt,this.evWin=te,this.started=!1,x.apply(this,arguments)}function R(t,e){var i=g(t.touches),n=g(t.changedTouches);return e&(Nt|It)&&(i=y(i.concat(n),"identifier",!0)),[i,n]}function q(){this.evTarget=ie,this.targetIds={},x.apply(this,arguments)}function W(t,e){var i=g(t.touches),n=this.targetIds;if(e&(Mt|Pt)&&1===i.length)return n[i[0].identifier]=!0,[i,i];var s,o,a=g(t.changedTouches),r=[],l=this.target;if(o=i.filter(function(t){return p(t.target,l)}),e===Mt)for(s=0;s<o.length;)n[o[s].identifier]=!0,s++;for(s=0;s<a.length;)n[a[s].identifier]&&r.push(a[s]),e&(Nt|It)&&delete n[a[s].identifier],s++;return r.length?[y(o.concat(r),"identifier",!0),r]:void 0}function H(){x.apply(this,arguments);var t=l(this.handler,this);this.touch=new q(this.manager,t),this.mouse=new L(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function B(t,e){t&Mt?(this.primaryTouch=e.changedPointers[0].identifier,U.call(this,e)):t&(Nt|It)&&U.call(this,e)}function U(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY};this.lastTouches.push(i);var n=this.lastTouches,s=function(){var t=n.indexOf(i);t>-1&&n.splice(t,1)};setTimeout(s,ne)}}function V(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var s=this.lastTouches[n],o=Math.abs(e-s.x),a=Math.abs(i-s.y);if(se>=o&&se>=a)return!0}return!1}function X(t,e){this.manager=t,this.set(e)}function Y(t){if(m(t,he))return he;var e=m(t,ue),i=m(t,de);return e&&i?he:e||i?e?ue:de:m(t,ce)?ce:le}function j(){if(!ae)return!1;var t={},e=window.CSS&&window.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){t[i]=e?window.CSS.supports("touch-action",i):!0}),t}function Z(t){this.options=ht({},this.defaults,t||{}),this.id=b(),this.manager=null,this.options.enable=h(this.options.enable,!0),this.state=me,this.simultaneous={},this.requireFail=[]}function G(t){return t&we?"cancel":t&ge?"end":t&ve?"move":t&fe?"start":""}function K(t){return t==Rt?"down":t==zt?"up":t==Lt?"left":t==_t?"right":""}function J(t,e){var i=e.manager;return i?i.get(t):t}function Q(){Z.apply(this,arguments)}function tt(){Q.apply(this,arguments),this.pX=null,this.pY=null}function et(){Q.apply(this,arguments)}function it(){Z.apply(this,arguments),this._timer=null,this._input=null}function nt(){Q.apply(this,arguments)}function st(){Q.apply(this,arguments)}function ot(){Z.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function at(t,e){return e=e||{},e.recognizers=h(e.recognizers,at.defaults.preset),new rt(t,e)}function rt(t,e){this.options=ht({},at.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=C(this),this.touchAction=new X(this,this.options.touchAction),lt(this,!0),o(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function lt(t,e){var i=t.element;if(i.style){var n;o(t.options.cssProps,function(s,o){n=w(i.style,o),e?(t.oldCssProps[n]=i.style[n],i.style[n]=s):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={})}}function ct(t,e){var i=document.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}var ht,ut=i(1),dt=i(2),pt=["","webkit","Moz","MS","ms","o"],mt=document.createElement("div"),ft="function",vt=Math.round,gt=Math.abs,yt=Date.now;ht="function"!=typeof Object.assign?function(t){if(void 0===t||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var n=arguments[i];if(void 0!==n&&null!==n)for(var s in n)n.hasOwnProperty(s)&&(e[s]=n[s])}return e}:Object.assign;var wt=a(function(t,e,i){for(var n=Object.keys(e),s=0;s<n.length;)(!i||i&&void 0===t[n[s]])&&(t[n[s]]=e[n[s]]),s++;return t},"extend","Use `assign`."),bt=a(function(t,e){return wt(t,e,!0)},"merge","Use `assign`."),Tt=1,xt=/mobile|tablet|ip(ad|hone|od)|android/i,Ct="ontouchstart"in window,Et=void 0!==w(window,"PointerEvent"),St=Ct&&xt.test(navigator.userAgent),kt="touch",Dt="pen",Ft="mouse",At="kinect",$t=25,Mt=1,Pt=2,Nt=4,It=8,Ot=1,Lt=2,_t=4,zt=8,Rt=16,qt=Lt|_t,Wt=zt|Rt,Ht=qt|Wt,Bt=["x","y"],Ut=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(T(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&d(this.element,this.evEl,this.domHandler),this.evTarget&&d(this.target,this.evTarget,this.domHandler),this.evWin&&d(T(this.element),this.evWin,this.domHandler)}};var Vt={mousedown:Mt,mousemove:Pt,mouseup:Nt},Xt="mousedown",Yt="mousemove mouseup";r(L,x,{handler:function(t){var e=Vt[t.type];e&Mt&&0===t.button&&(this.pressed=!0),e&Pt&&1!==t.which&&(e=Nt),this.pressed&&(e&Nt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:Ft,srcEvent:t}))}});var jt={pointerdown:Mt,pointermove:Pt,pointerup:Nt,pointercancel:It,pointerout:It},Zt={2:kt,3:Dt,4:Ft,5:At},Gt="pointerdown",Kt="pointermove pointerup pointercancel";window.MSPointerEvent&&!window.PointerEvent&&(Gt="MSPointerDown",Kt="MSPointerMove MSPointerUp MSPointerCancel"),r(_,x,{handler:function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),s=jt[n],o=Zt[t.pointerType]||t.pointerType,a=o==kt,r=v(e,t.pointerId,"pointerId");s&Mt&&(0===t.button||a)?0>r&&(e.push(t),r=e.length-1):s&(Nt|It)&&(i=!0),0>r||(e[r]=t,this.callback(this.manager,s,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),i&&e.splice(r,1))}});var Jt={touchstart:Mt,touchmove:Pt,touchend:Nt,touchcancel:It},Qt="touchstart",te="touchstart touchmove touchend touchcancel";r(z,x,{handler:function(t){var e=Jt[t.type];if(e===Mt&&(this.started=!0),this.started){var i=R.call(this,t,e);e&(Nt|It)&&i[0].length-i[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:kt,srcEvent:t})}}});var ee={touchstart:Mt,touchmove:Pt,touchend:Nt,touchcancel:It},ie="touchstart touchmove touchend touchcancel";r(q,x,{handler:function(t){var e=ee[t.type],i=W.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:kt,srcEvent:t})}});var ne=2500,se=25;r(H,x,{handler:function(t,e,i){var n=i.pointerType==kt,s=i.pointerType==Ft;if(!(s&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(n)B.call(this,e,i);else if(s&&V.call(this,i))return;this.callback(t,e,i)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var oe=w(mt.style,"touchAction"),ae=void 0!==oe,re="compute",le="auto",ce="manipulation",he="none",ue="pan-x",de="pan-y",pe=j();X.prototype={set:function(t){t==re&&(t=this.compute()),ae&&this.manager.element.style&&pe[t]&&(this.manager.element.style[oe]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return o(this.manager.recognizers,function(e){c(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),Y(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var n=this.actions,s=m(n,he)&&!pe[he],o=m(n,de)&&!pe[de],a=m(n,ue)&&!pe[ue];if(s){var r=1===t.pointers.length,l=t.distance<2,c=t.deltaTime<250;if(r&&l&&c)return}return a&&o?void 0:s||o&&i&qt||a&&i&Wt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var me=1,fe=2,ve=4,ge=8,ye=ge,we=16,be=32;Z.prototype={defaults:{},set:function(t){return ht(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(s(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=J(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return s(t,"dropRecognizeWith",this)?this:(t=J(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(s(t,"requireFailure",this))return this;var e=this.requireFail;return t=J(t,this),-1===v(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(s(t,"dropRequireFailure",this))return this;t=J(t,this);var e=v(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){i.manager.emit(e,t)}var i=this,n=this.state;ge>n&&e(i.options.event+G(n)),e(i.options.event),t.additionalEvent&&e(t.additionalEvent),n>=ge&&e(i.options.event+G(n))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=be)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(be|me)))return!1;t++}return!0},recognize:function(t){var e=ht({},t);return c(this.options.enable,[this,e])?(this.state&(ye|we|be)&&(this.state=me),this.state=this.process(e),void(this.state&(fe|ve|ge|we)&&this.tryEmit(e))):(this.reset(),void(this.state=be))},process:function(t){},getTouchAction:function(){},reset:function(){}},r(Q,Z,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(fe|ve),s=this.attrTest(t);return n&&(i&It||!s)?e|we:n||s?i&Nt?e|ge:e&fe?e|ve:fe:be}}),r(tt,Q,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ht},getTouchAction:function(){var t=this.options.direction,e=[];return t&qt&&e.push(de),t&Wt&&e.push(ue),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,s=t.direction,o=t.deltaX,a=t.deltaY;return s&e.direction||(e.direction&qt?(s=0===o?Ot:0>o?Lt:_t,i=o!=this.pX,n=Math.abs(t.deltaX)):(s=0===a?Ot:0>a?zt:Rt,i=a!=this.pY,n=Math.abs(t.deltaY))),t.direction=s,i&&n>e.threshold&&s&e.direction},attrTest:function(t){return Q.prototype.attrTest.call(this,t)&&(this.state&fe||!(this.state&fe)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=K(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),r(et,Q,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[he]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&fe)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),r(it,Z,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[le]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,s=t.distance<e.threshold,o=t.deltaTime>e.time;if(this._input=t,!s||!i||t.eventType&(Nt|It)&&!o)this.reset();else if(t.eventType&Mt)this.reset(),this._timer=n(function(){this.state=ye,this.tryEmit()},e.time,this);else if(t.eventType&Nt)return ye;return be},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===ye&&(t&&t.eventType&Nt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=yt(),this.manager.emit(this.options.event,this._input)))}}),r(nt,Q,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[he]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&fe)}}),r(st,Q,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:qt|Wt,pointers:1},getTouchAction:function(){return tt.prototype.getTouchAction.call(this)},attrTest:function(t){var e,i=this.options.direction;return i&(qt|Wt)?e=t.overallVelocity:i&qt?e=t.overallVelocityX:i&Wt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&i&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&gt(e)>this.options.velocity&&t.eventType&Nt},emit:function(t){var e=K(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),r(ot,Z,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ce]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,s=t.distance<e.threshold,o=t.deltaTime<e.time;if(this.reset(),t.eventType&Mt&&0===this.count)return this.failTimeout();if(s&&o&&i){if(t.eventType!=Nt)return this.failTimeout();var a=this.pTime?t.timeStamp-this.pTime<e.interval:!0,r=!this.pCenter||P(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,r&&a?this.count+=1:this.count=1,this._input=t;var l=this.count%e.taps;if(0===l)return this.hasRequireFailures()?(this._timer=n(function(){this.state=ye,this.tryEmit()},e.interval,this),fe):ye}return be},failTimeout:function(){return this._timer=n(function(){this.state=be},this.options.interval,this),be},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ye&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),at.VERSION="2.0.7",at.defaults={domEvents:!1,touchAction:re,enable:!0,inputTarget:null,inputClass:null,preset:[[nt,{enable:!1}],[et,{enable:!1},["rotate"]],[st,{direction:qt}],[tt,{direction:qt},["swipe"]],[ot],[ot,{event:"doubletap",taps:2},["tap"]],[it]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Te=1,xe=2;rt.prototype={set:function(t){return ht(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?xe:Te},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,s=e.curRecognizer;(!s||s&&s.state&ye)&&(s=e.curRecognizer=null);for(var o=0;o<n.length;)i=n[o],e.stopped===xe||s&&i!=s&&!i.canRecognizeWith(s)?i.reset():i.recognize(t),!s&&i.state&(fe|ve|ge)&&(s=e.curRecognizer=i),o++}},get:function(t){if(t instanceof Z)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(s(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(s(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,i=v(e,t);-1!==i&&(e.splice(i,1),this.touchAction.update())}return this},on:function(t,e){if(void 0!==t&&void 0!==e){var i=this.handlers;return o(f(t),function(t){i[t]=i[t]||[],i[t].push(e)}),this}},off:function(t,e){if(void 0!==t){var i=this.handlers;return o(f(t),function(t){e?i[t]&&i[t].splice(v(i[t],e),1):delete i[t]}),this}},emit:function(t,e){this.options.domEvents&&ct(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&lt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ht(at,{INPUT_START:Mt,INPUT_MOVE:Pt,INPUT_END:Nt,INPUT_CANCEL:It,STATE_POSSIBLE:me,STATE_BEGAN:fe,STATE_CHANGED:ve,STATE_ENDED:ge,STATE_RECOGNIZED:ye,STATE_CANCELLED:we,STATE_FAILED:be,DIRECTION_NONE:Ot,DIRECTION_LEFT:Lt,DIRECTION_RIGHT:_t,DIRECTION_UP:zt,DIRECTION_DOWN:Rt,DIRECTION_HORIZONTAL:qt,DIRECTION_VERTICAL:Wt,DIRECTION_ALL:Ht,Manager:rt,Input:x,TouchAction:X,TouchInput:q,MouseInput:L,PointerEventInput:_,TouchMouseInput:H,SingleTouchInput:z,Recognizer:Z,AttrRecognizer:Q,Tap:ot,Pan:tt,Swipe:st,Pinch:et,Rotate:nt,Press:it,on:u,off:d,each:o,merge:bt,extend:wt,assign:ht,inherit:r,bindFn:l,prefixed:w}),function(t,e){function i(i,n){var s=t(i);s.data("hammer")||s.data("hammer",new e(s[0],n))}t.fn.hammer=function(t){return this.each(function(){i(this,t)})},e.Manager.prototype.emit=function(e){return function(i,n){e.call(this,i,n),t(this.element).trigger({type:i,gesture:n})}}(e.Manager.prototype.emit)}(ut,at),t.exports=dt.Hammer=at},function(t,e,i){"use strict";function n(){window.removeEventListener("load",n,!1),c=!0}function s(t){return h=h||new s.Class(t)}function o(t,e){for(var i in e)t[i]=e[i];return t}function a(){"#ath"==document.location.hash&&history.replaceState("",window.document.title,document.location.href.split("#")[0]),u.test(document.location.href)&&history.replaceState("",window.document.title,document.location.href.replace(u,"$1")),d.test(document.location.search)&&history.replaceState("",window.document.title,document.location.href.replace(d,"$2"))}var r=i(2),l="addEventListener"in window,c=!1;"complete"===document.readyState?c=!0:l&&window.addEventListener("load",n,!1);var h,u=/\/ath(\/)?$/,d=/([\?&]ath=[^&]*$|&ath=[^&]*(&))/;s.intl={en_us:{ios:"To add this web app to the home screen: tap %icon and then <strong>Add to Home Screen</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},zh_cn:{ios:"\u5982\u8981\u628a\u5e94\u7528\u7a0b\u5f0f\u52a0\u81f3\u4e3b\u5c4f\u5e55,\u8bf7\u70b9\u51fb%icon, \u7136\u540e<strong>\u52a0\u81f3\u4e3b\u5c4f\u5e55</strong>",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'},zh_tw:{ios:"\u5982\u8981\u628a\u61c9\u7528\u7a0b\u5f0f\u52a0\u81f3\u4e3b\u5c4f\u5e55, \u8acb\u9ede\u64ca%icon, \u7136\u5f8c<strong>\u52a0\u81f3\u4e3b\u5c4f\u5e55</strong>.",android:'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'}};for(var p in s.intl)s.intl[p.substr(0,2)]=s.intl[p];s.defaults={appID:"org.cubiq.addtohome",fontSize:15,debug:!1,logging:!1,modal:!1,mandatory:!1,autostart:!0,skipFirstVisit:!1,startDelay:1,lifespan:15,displayPace:1440,maxDisplayCount:0,icon:!0,message:"",validLocation:[],onInit:null,onShow:null,onRemove:null,onAdd:null,onPrivate:null,privateModeOverride:!1,detectHomescreen:!1};var m=window.navigator.userAgent,f=window.navigator;o(s,{hasToken:"#ath"==document.location.hash||u.test(document.location.href)||d.test(document.location.search),isRetina:window.devicePixelRatio&&window.devicePixelRatio>1,isIDevice:/iphone|ipod|ipad/i.test(m),
isMobileChrome:m.indexOf("Android")>-1&&/Chrome\/[.0-9]*/.test(m)&&-1==m.indexOf("Version"),isMobileIE:m.indexOf("Windows Phone")>-1,language:f.language&&f.language.toLowerCase().replace("-","_")||""}),s.language=s.language&&s.language in s.intl?s.language:"en_us",s.isMobileSafari=s.isIDevice&&m.indexOf("Safari")>-1&&m.indexOf("CriOS")<0,s.OS=s.isIDevice?"ios":s.isMobileChrome?"android":s.isMobileIE?"windows":"unsupported",s.OSVersion=m.match(/(OS|Android) (\d+[_\.]\d+)/),s.OSVersion=s.OSVersion&&s.OSVersion[2]?+s.OSVersion[2].replace("_","."):0,s.isStandalone="standalone"in window.navigator&&window.navigator.standalone,s.isTablet=s.isMobileSafari&&m.indexOf("iPad")>-1||s.isMobileChrome&&m.indexOf("Mobile")<0,s.isCompatible=s.isMobileSafari&&s.OSVersion>=6||s.isMobileChrome;var v={lastDisplayTime:0,returningVisitor:!1,displayCount:0,optedout:!1,added:!1};s.removeSession=function(t){try{if(!localStorage)throw new Error("localStorage is not defined");localStorage.removeItem(t||s.defaults.appID)}catch(e){}},s.doLog=function(t){this.options.logging&&console.log(t)},s.Class=function(t){if(this.doLog=s.doLog,this.options=o({},s.defaults),o(this.options,t),this.options.debug&&(this.options.logging=!0),l){if(this.options.mandatory=this.options.mandatory&&("standalone"in window.navigator||this.options.debug),this.options.modal=this.options.modal||this.options.mandatory,this.options.mandatory&&(this.options.startDelay=-.5),this.options.detectHomescreen=this.options.detectHomescreen===!0?"hash":this.options.detectHomescreen,this.options.debug&&(s.isCompatible=!0,s.OS="string"==typeof this.options.debug?this.options.debug:"unsupported"==s.OS?"android":s.OS,s.OSVersion="ios"==s.OS?"8":"4"),this.container=document.documentElement,this.session=this.getItem(this.options.appID),this.session=this.session?JSON.parse(this.session):void 0,!s.hasToken||s.isCompatible&&this.session||(s.hasToken=!1,a()),!s.isCompatible)return void this.doLog("Add to homescreen: not displaying callout because device not supported");this.session=this.session||v;try{if(!localStorage)throw new Error("localStorage is not defined");localStorage.setItem(this.options.appID,JSON.stringify(this.session)),s.hasLocalStorage=!0}catch(e){s.hasLocalStorage=!1,this.options.onPrivate&&this.options.onPrivate.call(this)}for(var i=!this.options.validLocation.length,n=this.options.validLocation.length;n--;)if(this.options.validLocation[n].test(document.location.href)){i=!0;break}if(this.getItem("addToHome")&&this.optOut(),this.session.optedout)return void this.doLog("Add to homescreen: not displaying callout because user opted out");if(this.session.added)return void this.doLog("Add to homescreen: not displaying callout because already added to the homescreen");if(!i)return void this.doLog("Add to homescreen: not displaying callout because not a valid location");if(s.isStandalone)return this.session.added||(this.session.added=!0,this.updateSession(),this.options.onAdd&&s.hasLocalStorage&&this.options.onAdd.call(this)),void this.doLog("Add to homescreen: not displaying callout because in standalone mode");if(this.options.detectHomescreen){if(s.hasToken)return a(),this.session.added||(this.session.added=!0,this.updateSession(),this.options.onAdd&&s.hasLocalStorage&&this.options.onAdd.call(this)),void this.doLog("Add to homescreen: not displaying callout because URL has token, so we are likely coming from homescreen");"hash"==this.options.detectHomescreen?history.replaceState("",window.document.title,document.location.href+"#ath"):"smartURL"==this.options.detectHomescreen?history.replaceState("",window.document.title,document.location.href.replace(/(\/)?$/,"/ath$1")):history.replaceState("",window.document.title,document.location.href+(document.location.search?"&":"?")+"ath=")}if(!this.session.returningVisitor&&(this.session.returningVisitor=!0,this.updateSession(),this.options.skipFirstVisit))return void this.doLog("Add to homescreen: not displaying callout because skipping first visit");if(!this.options.privateModeOverride&&!s.hasLocalStorage)return void this.doLog("Add to homescreen: not displaying callout because browser is in private mode");this.ready=!0,this.options.onInit&&this.options.onInit.call(this),this.options.autostart&&(this.doLog("Add to homescreen: autostart displaying callout"),this.show())}},s.Class.prototype={events:{load:"_delayedShow",error:"_delayedShow",orientationchange:"resize",resize:"resize",scroll:"resize",click:"remove",touchmove:"_preventDefault",transitionend:"_removeElements",webkitTransitionEnd:"_removeElements",MSTransitionEnd:"_removeElements"},handleEvent:function(t){var e=this.events[t.type];e&&this[e](t)},show:function(t){if(this.options.autostart&&!c)return void setTimeout(this.show.bind(this),50);if(this.shown)return void this.doLog("Add to homescreen: not displaying callout because already shown on screen");var e=Date.now(),i=this.session.lastDisplayTime;if(t!==!0){if(!this.ready)return void this.doLog("Add to homescreen: not displaying callout because not ready");if(e-i<6e4*this.options.displayPace)return void this.doLog("Add to homescreen: not displaying callout because displayed recently");if(this.options.maxDisplayCount&&this.session.displayCount>=this.options.maxDisplayCount)return void this.doLog("Add to homescreen: not displaying callout because displayed too many times already")}this.shown=!0,this.session.lastDisplayTime=e,this.session.displayCount++,this.updateSession(),this.applicationIcon||("ios"==s.OS?this.applicationIcon=document.querySelector('head link[rel^=apple-touch-icon][sizes="152x152"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon][sizes="120x120"],head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon]'):this.applicationIcon=document.querySelector('head link[rel^="shortcut icon"][sizes="196x196"],head link[rel^=apple-touch-icon]'));var n="";"object"==typeof this.options.message&&s.language in this.options.message?n=this.options.message[s.language][s.OS]:"object"==typeof this.options.message&&s.OS in this.options.message?n=this.options.message[s.OS]:this.options.message in s.intl?n=s.intl[this.options.message][s.OS]:""!==this.options.message?n=this.options.message:s.OS in s.intl[s.language]&&(n=s.intl[s.language][s.OS]),n="<p>"+n.replace("%icon",'<span class="ath-action-icon">icon</span>')+"</p>",this.viewport=document.createElement("div"),this.viewport.className="ath-viewport",this.options.modal&&(this.viewport.className+=" ath-modal"),this.options.mandatory&&(this.viewport.className+=" ath-mandatory"),this.viewport.style.position="absolute",this.element=document.createElement("div"),this.element.className="ath-container ath-"+s.OS+" ath-"+s.OS+(s.OSVersion+"").substr(0,1)+" ath-"+(s.isTablet?"tablet":"phone"),this.element.style.cssText="-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0s;-webkit-transition-timing-function:ease-out;transition-property:transform,opacity;transition-duration:0s;transition-timing-function:ease-out;",this.element.style.webkitTransform="translate3d(0,-"+window.innerHeight+"px,0)",this.element.style.transform="translate3d(0,-"+window.innerHeight+"px,0)",this.options.icon&&this.applicationIcon&&(this.element.className+=" ath-icon",this.img=document.createElement("img"),this.img.className="ath-application-icon",this.img.addEventListener("load",this,!1),this.img.addEventListener("error",this,!1),this.img.src=this.applicationIcon.href,this.element.appendChild(this.img)),this.element.innerHTML+=n,this.viewport.style.left="-99999em",this.viewport.appendChild(this.element),this.container.appendChild(this.viewport),this.img?this.doLog("Add to homescreen: not displaying callout because waiting for img to load"):this._delayedShow()},_delayedShow:function(t){setTimeout(this._show.bind(this),1e3*this.options.startDelay+500)},_show:function(){var t=this;this.updateViewport(),window.addEventListener("resize",this,!1),window.addEventListener("scroll",this,!1),window.addEventListener("orientationchange",this,!1),this.options.modal&&document.addEventListener("touchmove",this,!0),this.options.mandatory||setTimeout(function(){t.element.addEventListener("click",t,!0)},1e3),setTimeout(function(){t.element.style.webkitTransitionDuration="1.2s",t.element.style.transitionDuration="1.2s",t.element.style.webkitTransform="translate3d(0,0,0)",t.element.style.transform="translate3d(0,0,0)"},0),this.options.lifespan&&(this.removeTimer=setTimeout(this.remove.bind(this),1e3*this.options.lifespan)),this.options.onShow&&this.options.onShow.call(this)},remove:function(){clearTimeout(this.removeTimer),this.img&&(this.img.removeEventListener("load",this,!1),this.img.removeEventListener("error",this,!1)),window.removeEventListener("resize",this,!1),window.removeEventListener("scroll",this,!1),window.removeEventListener("orientationchange",this,!1),document.removeEventListener("touchmove",this,!0),this.element.removeEventListener("click",this,!0),this.element.addEventListener("transitionend",this,!1),this.element.addEventListener("webkitTransitionEnd",this,!1),this.element.addEventListener("MSTransitionEnd",this,!1),this.element.style.webkitTransitionDuration="0.3s",this.element.style.opacity="0"},_removeElements:function(){this.element.removeEventListener("transitionend",this,!1),this.element.removeEventListener("webkitTransitionEnd",this,!1),this.element.removeEventListener("MSTransitionEnd",this,!1),this.container.removeChild(this.viewport),this.shown=!1,this.options.onRemove&&this.options.onRemove.call(this)},updateViewport:function(){if(this.shown){this.viewport.style.width=window.innerWidth+"px",this.viewport.style.height=window.innerHeight+"px",this.viewport.style.left=window.scrollX+"px",this.viewport.style.top=window.scrollY+"px";var t=document.documentElement.clientWidth;this.orientation=t>document.documentElement.clientHeight?"landscape":"portrait";var e="ios"==s.OS?"portrait"==this.orientation?screen.width:screen.height:screen.width;this.scale=screen.width>t?1:e/window.innerWidth,this.element.style.fontSize=this.options.fontSize/this.scale+"px"}},resize:function(){clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(this.updateViewport.bind(this),100)},updateSession:function(){s.hasLocalStorage!==!1&&localStorage&&localStorage.setItem(this.options.appID,JSON.stringify(this.session))},clearSession:function(){this.session=v,this.updateSession()},getItem:function(t){try{if(!localStorage)throw new Error("localStorage is not defined");return localStorage.getItem(t)}catch(e){s.hasLocalStorage=!1}},optOut:function(){this.session.optedout=!0,this.updateSession()},optIn:function(){this.session.optedout=!1,this.updateSession()},clearDisplayCount:function(){this.session.displayCount=0,this.updateSession()},_preventDefault:function(t){t.preventDefault(),t.stopPropagation()}},s.VERSION="3.2.2",t.exports=r.addToHomescreen=s},function(t,e,i){"use strict";var n=i(1),s=i(2),o=function(t,e){var i=this;this.options=n.extend({},o.DEFAULTS,e),this.$element=n(t),this.$element.addClass("am-fade am-in").on("click.alert.amui",".am-close",function(){i.close()})};o.DEFAULTS={removeElement:!0},o.prototype.close=function(){function t(){e.trigger("closed.alert.amui").remove()}var e=this.$element;e.trigger("close.alert.amui").removeClass("am-in"),s.support.transition&&e.hasClass("am-fade")?e.one(s.support.transition.end,t).emulateTransitionEnd(200):t()},s.plugin("alert",o),n(document).on("click.alert.amui.data-api","[data-am-alert]",function(t){var e=n(t.target);e.is(".am-close")&&n(this).alert("close")}),t.exports=o},function(t,e,i){"use strict";var n=i(1),s=i(2),o=function(t,e){this.$element=n(t),this.options=n.extend({},o.DEFAULTS,e),this.isLoading=!1,this.hasSpinner=!1};o.DEFAULTS={loadingText:"loading...",disabledClassName:"am-disabled",activeClassName:"am-active",spinner:void 0},o.prototype.setState=function(t,e){var i=this.$element,o="disabled",a=i.data(),r=this.options,l=i.is("input")?"val":"html",c="am-btn-"+t+" "+r.disabledClassName;t+="Text",r.resetText||(r.resetText=i[l]()),s.support.animation&&r.spinner&&"html"===l&&!this.hasSpinner&&(r.loadingText='<span class="am-icon-'+r.spinner+' am-icon-spin"></span>'+r.loadingText,this.hasSpinner=!0),e=e||(void 0===a[t]?r[t]:a[t]),i[l](e),setTimeout(n.proxy(function(){"loadingText"===t?(i.addClass(c).attr(o,o),this.isLoading=!0):this.isLoading&&(i.removeClass(c).removeAttr(o),this.isLoading=!1)},this),0)},o.prototype.toggle=function(){var t=!0,e=this.$element,i=this.$element.parent('[class*="am-btn-group"]'),n=o.DEFAULTS.activeClassName;if(i.length){var s=this.$element.find("input");"radio"==s.prop("type")&&(s.prop("checked")&&e.hasClass(n)?t=!1:i.find("."+n).removeClass(n)),t&&s.prop("checked",!e.hasClass(n)).trigger("change")}t&&(e.toggleClass(n),e.hasClass(n)||e.blur())},s.plugin("button",o,{dataOptions:"data-am-loading",methodCall:function(t,e){"toggle"===t[0]?e.toggle():"string"==typeof t[0]&&e.setState.apply(e,t)}}),n(document).on("click.button.amui.data-api","[data-am-button]",function(t){t.preventDefault();var e=n(t.target);e.hasClass("am-btn")||(e=e.closest(".am-btn")),e.button("toggle")}),s.ready(function(t){n("[data-am-loading]",t).button(),n("[data-am-button]",t).find("input:checked").each(function(){n(this).parent("label").addClass(o.DEFAULTS.activeClassName)})}),t.exports=s.button=o},function(t,e,i){"use strict";function n(t){return this.each(function(){var e=s(this),i=e.data("amui.collapse"),n=s.extend({},a.DEFAULTS,o.utils.options(e.attr("data-am-collapse")),"object"==typeof t&&t);!i&&n.toggle&&"open"===t&&(t=!t),i||e.data("amui.collapse",i=new a(this,n)),"string"==typeof t&&i[t]()})}var s=i(1),o=i(2),a=function(t,e){this.$element=s(t),this.options=s.extend({},a.DEFAULTS,e),this.transitioning=null,this.options.parent&&(this.$parent=s(this.options.parent)),this.options.toggle&&this.toggle()};a.DEFAULTS={toggle:!0},a.prototype.open=function(){if(!this.transitioning&&!this.$element.hasClass("am-in")){var t=s.Event("open.collapse.amui");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.$parent&&this.$parent.find("> .am-panel > .am-in");if(e&&e.length){var i=e.data("amui.collapse");if(i&&i.transitioning)return;n.call(e,"close"),i||e.data("amui.collapse",null)}this.$element.removeClass("am-collapse").addClass("am-collapsing").height(0),this.transitioning=1;var a=function(){this.$element.removeClass("am-collapsing").addClass("am-collapse am-in").height("").trigger("opened.collapse.amui"),this.transitioning=0};if(!o.support.transition)return a.call(this);var r=this.$element[0].scrollHeight;this.$element.one(o.support.transition.end,s.proxy(a,this)).emulateTransitionEnd(300).css({height:r})}}},a.prototype.close=function(){if(!this.transitioning&&this.$element.hasClass("am-in")){var t=s.Event("close.collapse.amui");if(this.$element.trigger(t),!t.isDefaultPrevented()){this.$element.height(this.$element.height()).redraw(),this.$element.addClass("am-collapsing").removeClass("am-collapse am-in"),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.trigger("closed.collapse.amui").removeClass("am-collapsing").addClass("am-collapse")};return o.support.transition?void this.$element.height(0).one(o.support.transition.end,s.proxy(e,this)).emulateTransitionEnd(300):e.call(this)}}},a.prototype.toggle=function(){this[this.$element.hasClass("am-in")?"close":"open"]()},s.fn.collapse=n,s(document).on("click.collapse.amui.data-api","[data-am-collapse]",function(t){var e,i=s(this),a=o.utils.options(i.attr("data-am-collapse")),r=a.target||t.preventDefault()||(e=i.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,""),l=s(r),c=l.data("amui.collapse"),h=c?"toggle":a,u=a.parent,d=u&&s(u);c&&c.transitioning||(d&&d.find("[data-am-collapse]").not(i).addClass("am-collapsed"),i[l.hasClass("am-in")?"addClass":"removeClass"]("am-collapsed")),n.call(l,h)}),t.exports=o.collapse=a},function(t,e,i){"use strict";var n=i(1),s=i(2),o=n(document),a=function(t,e){if(this.$element=n(t),this.options=n.extend({},a.DEFAULTS,e),this.format=r.parseFormat(this.options.format),this.$element.data("date",this.options.date),this.language=this.getLocale(this.options.locale),this.theme=this.options.theme,this.$picker=n(r.template).appendTo("body").on({click:n.proxy(this.click,this)}),this.isInput=this.$element.is("input"),this.component=this.$element.is(".am-datepicker-date")?this.$element.find(".am-datepicker-add-on"):!1,this.isInput?this.$element.on({"click.datepicker.amui":n.proxy(this.open,this),"keyup.datepicker.amui":n.proxy(this.update,this)}):this.component?this.component.on("click.datepicker.amui",n.proxy(this.open,this)):this.$element.on("click.datepicker.amui",n.proxy(this.open,this)),this.minViewMode=this.options.minViewMode,"string"==typeof this.minViewMode)switch(this.minViewMode){case"months":this.minViewMode=1;break;case"years":this.minViewMode=2;break;default:this.minViewMode=0}if(this.viewMode=this.options.viewMode,"string"==typeof this.viewMode)switch(this.viewMode){case"months":this.viewMode=1;break;case"years":this.viewMode=2;break;default:this.viewMode=0}this.startViewMode=this.viewMode,this.weekStart=(this.options.weekStart||a.locales[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.onRender=this.options.onRender,this.setTheme(),this.fillDow(),this.fillMonths(),this.update(),this.showMode()};a.DEFAULTS={locale:"zh_CN",format:"yyyy-mm-dd",weekStart:void 0,viewMode:0,minViewMode:0,date:"",theme:"",autoClose:1,onRender:function(t){return""}},a.prototype.open=function(t){this.$picker.show(),this.height=this.component?this.component.outerHeight():this.$element.outerHeight(),this.place(),n(window).on("resize.datepicker.amui",n.proxy(this.place,this)),t&&(t.stopPropagation(),t.preventDefault());var e=this;o.on("mousedown.datapicker.amui touchstart.datepicker.amui",function(t){0===n(t.target).closest(".am-datepicker").length&&e.close()}),this.$element.trigger({type:"open.datepicker.amui",date:this.date})},a.prototype.close=function(){this.$picker.hide(),n(window).off("resize.datepicker.amui",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||n(document).off("mousedown.datapicker.amui touchstart.datepicker.amui",this.close),this.$element.trigger({type:"close.datepicker.amui",date:this.date})},a.prototype.set=function(){var t,e=r.formatDate(this.date,this.format);this.isInput?t=this.$element.attr("value",e):(this.component&&(t=this.$element.find("input").attr("value",e)),this.$element.data("date",e)),t&&t.trigger("change")},a.prototype.setValue=function(t){"string"==typeof t?this.date=r.parseDate(t,this.format):this.date=new Date(t),this.set(),this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0),this.fill()},a.prototype.place=function(){var t=this.component?this.component.offset():this.$element.offset(),e=this.component?this.component.width():this.$element.width(),i=t.top+this.height,n=t.left,s=o.width()-t.left-e,a=this.isOutView();if(this.$picker.removeClass("am-datepicker-right"),this.$picker.removeClass("am-datepicker-up"),o.width()>640){if(a.outRight)return this.$picker.addClass("am-datepicker-right"),void this.$picker.css({top:i,left:"auto",right:s});a.outBottom&&(this.$picker.addClass("am-datepicker-up"),i=t.top-this.$picker.outerHeight(!0))}else n=0;this.$picker.css({top:i,left:n})},a.prototype.update=function(t){this.date=r.parseDate("string"==typeof t?t:this.isInput?this.$element.prop("value"):this.$element.data("date"),this.format),this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0),this.fill()},a.prototype.fillDow=function(){for(var t=this.weekStart,e="<tr>";t<this.weekStart+7;)e+='<th class="am-datepicker-dow">'+a.locales[this.language].daysMin[t++%7]+"</th>";e+="</tr>",this.$picker.find(".am-datepicker-days thead").append(e)},a.prototype.fillMonths=function(){for(var t="",e=0;12>e;)t+='<span class="am-datepicker-month">'+a.locales[this.language].monthsShort[e++]+"</span>";this.$picker.find(".am-datepicker-months td").append(t)},a.prototype.fill=function(){var t=new Date(this.viewDate),e=t.getFullYear(),i=t.getMonth(),n=this.date.valueOf(),s=new Date(e,i-1,28,0,0,0,0),o=r.getDaysInMonth(s.getFullYear(),s.getMonth()),l=this.$picker.find(".am-datepicker-days .am-datepicker-select");"zh_CN"===this.language?l.text(e+a.locales[this.language].year[0]+" "+a.locales[this.language].months[i]):l.text(a.locales[this.language].months[i]+" "+e),s.setDate(o),s.setDate(o-(s.getDay()-this.weekStart+7)%7);var c=new Date(s);c.setDate(c.getDate()+42),c=c.valueOf();for(var h,u,d,p=[];s.valueOf()<c;)s.getDay()===this.weekStart&&p.push("<tr>"),h=this.onRender(s,0),u=s.getFullYear(),d=s.getMonth(),i>d&&u===e||e>u?h+=" am-datepicker-old":(d>i&&u===e||u>e)&&(h+=" am-datepicker-new"),s.valueOf()===n&&(h+=" am-active"),p.push('<td class="am-datepicker-day '+h+'">'+s.getDate()+"</td>"),s.getDay()===this.weekEnd&&p.push("</tr>"),s.setDate(s.getDate()+1);this.$picker.find(".am-datepicker-days tbody").empty().append(p.join(""));var m=this.date.getFullYear(),f=this.$picker.find(".am-datepicker-months").find(".am-datepicker-select").text(e);f=f.end().find("span").removeClass("am-active").removeClass("am-disabled");for(var v=0;12>v;)this.onRender(t.setFullYear(e,v),1)&&f.eq(v).addClass("am-disabled"),v++;m===e&&f.eq(this.date.getMonth()).removeClass("am-disabled").addClass("am-active"),p="",e=10*parseInt(e/10,10);var g,y=this.$picker.find(".am-datepicker-years").find(".am-datepicker-select").text(e+"-"+(e+9)).end().find("td"),w=new Date(this.viewDate);e-=1;for(var b=-1;11>b;b++)g=this.onRender(w.setFullYear(e),2),p+='<span class="'+g+(-1===b||10===b?" am-datepicker-old":"")+(m===e?" am-active":"")+'">'+e+"</span>",e+=1;y.html(p)},a.prototype.click=function(t){t.stopPropagation(),t.preventDefault();var e,i,s=this.$picker.find(".am-datepicker-days").find(".am-active"),o=this.$picker.find(".am-datepicker-months"),a=o.find(".am-active").index(),l=n(t.target).closest("span, td, th");if(1===l.length)switch(l[0].nodeName.toLowerCase()){case"th":switch(l[0].className){case"am-datepicker-switch":this.showMode(1);break;case"am-datepicker-prev":case"am-datepicker-next":this.viewDate["set"+r.modes[this.viewMode].navFnc].call(this.viewDate,this.viewDate["get"+r.modes[this.viewMode].navFnc].call(this.viewDate)+r.modes[this.viewMode].navStep*("am-datepicker-prev"===l[0].className?-1:1)),this.fill(),this.set()}break;case"span":if(l.is(".am-disabled"))return;l.is(".am-datepicker-month")?(e=l.parent().find("span").index(l),l.is(".am-active")?this.viewDate.setMonth(e,s.text()):this.viewDate.setMonth(e)):(i=parseInt(l.text(),10)||0,l.is(".am-active")?this.viewDate.setFullYear(i,a,s.text()):this.viewDate.setFullYear(i)),0!==this.viewMode&&(this.date=new Date(this.viewDate),this.$element.trigger({type:"changeDate.datepicker.amui",date:this.date,viewMode:r.modes[this.viewMode].clsName})),this.showMode(-1),this.fill(),this.set();break;case"td":if(l.is(".am-datepicker-day")&&!l.is(".am-disabled")){var c=parseInt(l.text(),10)||1;e=this.viewDate.getMonth(),l.is(".am-datepicker-old")?e-=1:l.is(".am-datepicker-new")&&(e+=1),i=this.viewDate.getFullYear(),this.date=new Date(i,e,c,0,0,0,0),this.viewDate=new Date(i,e,Math.min(28,c),0,0,0,0),this.fill(),this.set(),this.$element.trigger({type:"changeDate.datepicker.amui",date:this.date,viewMode:r.modes[this.viewMode].clsName}),this.options.autoClose&&this.close()}}},a.prototype.mousedown=function(t){t.stopPropagation(),t.preventDefault()},a.prototype.showMode=function(t){t&&(this.viewMode=Math.max(this.minViewMode,Math.min(2,this.viewMode+t))),this.$picker.find(">div").hide().filter(".am-datepicker-"+r.modes[this.viewMode].clsName).show()},a.prototype.isOutView=function(){var t=this.component?this.component.offset():this.$element.offset(),e={outRight:!1,outBottom:!1},i=this.$picker,n=t.left+i.outerWidth(!0),s=t.top+i.outerHeight(!0)+this.$element.innerHeight();return n>o.width()&&(e.outRight=!0),s>o.height()&&(e.outBottom=!0),e},a.prototype.getLocale=function(t){return t||(t=navigator.language&&navigator.language.split("-"),t[1]=t[1].toUpperCase(),t=t.join("_")),a.locales[t]||(t="en_US"),t},a.prototype.setTheme=function(){this.theme&&this.$picker.addClass("am-datepicker-"+this.theme)},a.locales={en_US:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekStart:0},zh_CN:{days:["\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],daysShort:["\u5468\u65e5","\u5468\u4e00","\u5468\u4e8c","\u5468\u4e09","\u5468\u56db","\u5468\u4e94","\u5468\u516d"],daysMin:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],months:["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],monthsShort:["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],weekStart:1,year:["\u5e74"]}};var r={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(t){return t%4===0&&t%100!==0||t%400===0},getDaysInMonth:function(t,e){return[31,r.isLeapYear(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},parseFormat:function(t){var e=t.match(/[.\/\-\s].*?/),i=t.split(/\W+/);if(!e||!i||0===i.length)throw new Error("Invalid date format.");return{separator:e,parts:i}},parseDate:function(t,e){var i,n=t.split(e.separator);if(t=new Date,t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),n.length===e.parts.length){for(var s=t.getFullYear(),o=t.getDate(),a=t.getMonth(),r=0,l=e.parts.length;l>r;r++)switch(i=parseInt(n[r],10)||1,e.parts[r]){case"dd":case"d":o=i,t.setDate(i);break;case"mm":case"m":a=i-1,t.setMonth(i-1);break;case"yy":s=2e3+i,t.setFullYear(2e3+i);break;case"yyyy":s=i,t.setFullYear(i)}t=new Date(s,a,o,0,0,0)}return t},formatDate:function(t,e){var i={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()},n=[];i.dd=(i.d<10?"0":"")+i.d,i.mm=(i.m<10?"0":"")+i.m;for(var s=0,o=e.parts.length;o>s;s++)n.push(i[e.parts[s]]);return n.join(e.separator)},headTemplate:'<thead><tr class="am-datepicker-header"><th class="am-datepicker-prev"><i class="am-datepicker-prev-icon"></i></th><th colspan="5" class="am-datepicker-switch"><div class="am-datepicker-select"></div></th><th class="am-datepicker-next"><i class="am-datepicker-next-icon"></i></th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};r.template='<div class="am-datepicker am-datepicker-dropdown"><div class="am-datepicker-caret"></div><div class="am-datepicker-days"><table class="am-datepicker-table">'+r.headTemplate+'<tbody></tbody></table></div><div class="am-datepicker-months"><table class="am-datepicker-table">'+r.headTemplate+r.contTemplate+'</table></div><div class="am-datepicker-years"><table class="am-datepicker-table">'+r.headTemplate+r.contTemplate+"</table></div></div>",s.plugin("datepicker",a),s.ready(function(t){n("[data-am-datepicker]").datepicker()}),t.exports=s.datepicker=a},function(t,e,i){"use strict";var n=i(1),s=i(2),o=n(document),a=s.support.transition,r=function(){this.id=s.utils.generateGUID("am-dimmer"),this.$element=n(r.DEFAULTS.tpl,{id:this.id}),this.inited=!1,this.scrollbarWidth=0,this.$used=n([])};r.DEFAULTS={tpl:'<div class="am-dimmer" data-am-dimmer></div>'},r.prototype.init=function(){return this.inited||(n(document.body).append(this.$element),this.inited=!0,o.trigger("init.dimmer.amui"),this.$element.on("touchmove.dimmer.amui",function(t){t.preventDefault()})),this},r.prototype.open=function(t){this.inited||this.init();var e=this.$element;return t&&(this.$used=this.$used.add(n(t))),this.checkScrollbar().setScrollbar(),e.show().trigger("open.dimmer.amui"),a&&e.off(a.end),setTimeout(function(){e.addClass("am-active")},0),this},r.prototype.close=function(t,e){function i(){s.hide(),this.resetScrollbar()}if(this.$used=this.$used.not(n(t)),!e&&this.$used.length)return this;var s=this.$element;return s.removeClass("am-active").trigger("close.dimmer.amui"),i.call(this),this},r.prototype.checkScrollbar=function(){return this.scrollbarWidth=s.utils.measureScrollbar(),this},r.prototype.setScrollbar=function(){var t=n(document.body),e=parseInt(t.css("padding-right")||0,10);return this.scrollbarWidth&&t.css("padding-right",e+this.scrollbarWidth),t.addClass("am-dimmer-active"),this},r.prototype.resetScrollbar=function(){return n(document.body).css("padding-right","").removeClass("am-dimmer-active"),this},t.exports=s.dimmer=new r},function(t,e,i){"use strict";var n=i(1),s=i(2),o=s.support.animation,a=function(t,e){this.options=n.extend({},a.DEFAULTS,e),e=this.options,this.$element=n(t),this.$toggle=this.$element.find(e.selector.toggle),this.$dropdown=this.$element.find(e.selector.dropdown),this.$boundary=e.boundary===window?n(window):this.$element.closest(e.boundary),this.$justify=e.justify&&n(e.justify).length&&n(e.justify)||void 0,!this.$boundary.length&&(this.$boundary=n(window)),this.active=!!this.$element.hasClass("am-active"),this.animating=null,this.events()};a.DEFAULTS={animation:"am-animation-slide-top-fixed",boundary:window,justify:void 0,selector:{dropdown:".am-dropdown-content",toggle:".am-dropdown-toggle"},trigger:"click"},a.prototype.toggle=function(){this.clear(),this.animating||this[this.active?"close":"open"]()},a.prototype.open=function(t){var e=this.$toggle,i=this.$element,s=this.$dropdown;if(!e.is(".am-disabled, :disabled")&&!this.active){i.trigger("open.dropdown.amui").addClass("am-active"),e.trigger("focus"),this.checkDimensions(t);var a=n.proxy(function(){i.trigger("opened.dropdown.amui"),this.active=!0,this.animating=0},this);o?(this.animating=1,s.addClass(this.options.animation).on(o.end+".open.dropdown.amui",n.proxy(function(){a(),s.removeClass(this.options.animation)},this))):a()}},a.prototype.close=function(){if(this.active){var t="am-dropdown-animation",e=this.$element,i=this.$dropdown;e.trigger("close.dropdown.amui");var s=n.proxy(function(){e.removeClass("am-active").trigger("closed.dropdown.amui"),this.active=!1,this.animating=0,this.$toggle.blur()},this);o?(i.removeClass(this.options.animation),i.addClass(t),this.animating=1,i.one(o.end+".close.dropdown.amui",function(){i.removeClass(t),s()})):s()}},a.prototype.enable=function(){this.$toggle.prop("disabled",!1)},a.prototype.disable=function(){this.$toggle.prop("disabled",!0)},a.prototype.checkDimensions=function(t){if(this.$dropdown.length){var e=this.$dropdown;t&&t.offset&&e.offset(t.offset);var i=e.offset(),s=e.outerWidth(),o=this.$boundary.width(),a=n.isWindow(this.boundary)&&this.$boundary.offset()?this.$boundary.offset().left:0;this.$justify&&e.css({"min-width":this.$justify.css("width")}),s+(i.left-a)>o&&this.$element.addClass("am-dropdown-flip")}},a.prototype.clear=function(){n("[data-am-dropdown]").not(this.$element).each(function(){var t=n(this).data("amui.dropdown");t&&t.close()})},a.prototype.events=function(){var t="dropdown.amui",e=this.$toggle;e.on("click."+t,n.proxy(function(t){t.preventDefault(),this.toggle()},this)),n(document).on("keydown.dropdown.amui",n.proxy(function(t){27===t.keyCode&&this.active&&this.close()},this)).on("click.outer.dropdown.amui",n.proxy(function(t){!this.active||this.$element[0]!==t.target&&this.$element.find(t.target).length||this.close()},this))},s.plugin("dropdown",a),s.ready(function(t){n("[data-am-dropdown]",t).dropdown()}),n(document).on("click.dropdown.amui.data-api",".am-dropdown form",function(t){
t.stopPropagation()}),t.exports=s.dropdown=a},function(t,e,i){(function(e){var n=i(1),s=i(2),o=!0;n.flexslider=function(t,i){var s=n(t);s.vars=n.extend({},n.flexslider.defaults,i);var a,r=s.vars.namespace,l=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,c=("ontouchstart"in window||l||window.DocumentTouch&&document instanceof DocumentTouch)&&s.vars.touch,h="click touchend MSPointerUp keyup",u="",d="vertical"===s.vars.direction,p=s.vars.reverse,m=s.vars.itemWidth>0,f="fade"===s.vars.animation,v=""!==s.vars.asNavFor,g={};n.data(t,"flexslider",s),g={init:function(){s.animating=!1,s.currentSlide=parseInt(s.vars.startAt?s.vars.startAt:0,10),isNaN(s.currentSlide)&&(s.currentSlide=0),s.animatingTo=s.currentSlide,s.atEnd=0===s.currentSlide||s.currentSlide===s.last,s.containerSelector=s.vars.selector.substr(0,s.vars.selector.search(" ")),s.slides=n(s.vars.selector,s),s.container=n(s.containerSelector,s),s.count=s.slides.length,s.syncExists=n(s.vars.sync).length>0,"slide"===s.vars.animation&&(s.vars.animation="swing"),s.prop=d?"top":"marginLeft",s.args={},s.manualPause=!1,s.stopped=!1,s.started=!1,s.startTimeout=null,s.transitions=!s.vars.video&&!f&&s.vars.useCSS&&function(){var t=document.createElement("div"),e=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return s.pfx=e[i].replace("Perspective","").toLowerCase(),s.prop="-"+s.pfx+"-transform",!0;return!1}(),s.ensureAnimationEnd="",""!==s.vars.controlsContainer&&(s.controlsContainer=n(s.vars.controlsContainer).length>0&&n(s.vars.controlsContainer)),""!==s.vars.manualControls&&(s.manualControls=n(s.vars.manualControls).length>0&&n(s.vars.manualControls)),""!==s.vars.customDirectionNav&&(s.customDirectionNav=2===n(s.vars.customDirectionNav).length&&n(s.vars.customDirectionNav)),s.vars.randomize&&(s.slides.sort(function(){return Math.round(Math.random())-.5}),s.container.empty().append(s.slides)),s.doMath(),s.setup("init"),s.vars.controlNav&&g.controlNav.setup(),s.vars.directionNav&&g.directionNav.setup(),s.vars.keyboard&&(1===n(s.containerSelector).length||s.vars.multipleKeyboard)&&n(document).bind("keyup",function(t){var e=t.keyCode;if(!s.animating&&(39===e||37===e)){var i=39===e?s.getTarget("next"):37===e?s.getTarget("prev"):!1;s.flexAnimate(i,s.vars.pauseOnAction)}}),s.vars.mousewheel&&s.bind("mousewheel",function(t,e,i,n){t.preventDefault();var o=0>e?s.getTarget("next"):s.getTarget("prev");s.flexAnimate(o,s.vars.pauseOnAction)}),s.vars.pausePlay&&g.pausePlay.setup(),s.vars.slideshow&&s.vars.pauseInvisible&&g.pauseInvisible.init(),s.vars.slideshow&&(s.vars.pauseOnHover&&s.hover(function(){s.manualPlay||s.manualPause||s.pause()},function(){s.manualPause||s.manualPlay||s.stopped||s.play()}),s.vars.pauseInvisible&&g.pauseInvisible.isHidden()||(s.vars.initDelay>0?s.startTimeout=setTimeout(s.play,s.vars.initDelay):s.play())),v&&g.asNav.setup(),c&&s.vars.touch&&g.touch(),(!f||f&&s.vars.smoothHeight)&&n(window).bind("resize orientationchange focus",g.resize),s.find("img").attr("draggable","false"),setTimeout(function(){s.vars.start(s)},200)},asNav:{setup:function(){s.asNav=!0,s.animatingTo=Math.floor(s.currentSlide/s.move),s.currentItem=s.currentSlide,s.slides.removeClass(r+"active-slide").eq(s.currentItem).addClass(r+"active-slide"),l?(t._slider=s,s.slides.each(function(){var t=this;t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",function(t){t.preventDefault(),t.currentTarget._gesture&&t.currentTarget._gesture.addPointer(t.pointerId)},!1),t.addEventListener("MSGestureTap",function(t){t.preventDefault();var e=n(this),i=e.index();n(s.vars.asNavFor).data("flexslider").animating||e.hasClass("active")||(s.direction=s.currentItem<i?"next":"prev",s.flexAnimate(i,s.vars.pauseOnAction,!1,!0,!0))})})):s.slides.on(h,function(t){t.preventDefault();var e=n(this),i=e.index(),o=e.offset().left-n(s).scrollLeft();0>=o&&e.hasClass(r+"active-slide")?s.flexAnimate(s.getTarget("prev"),!0):n(s.vars.asNavFor).data("flexslider").animating||e.hasClass(r+"active-slide")||(s.direction=s.currentItem<i?"next":"prev",s.flexAnimate(i,s.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){s.manualControls?g.controlNav.setupManual():g.controlNav.setupPaging()},setupPaging:function(){var t,e,i="thumbnails"===s.vars.controlNav?"control-thumbs":"control-paging",o=1;if(s.controlNavScaffold=n('<ol class="'+r+"control-nav "+r+i+'"></ol>'),s.pagingCount>1)for(var a=0;a<s.pagingCount;a++){e=s.slides.eq(a),void 0===e.attr("data-thumb-alt")&&e.attr("data-thumb-alt","");var l=""!==e.attr("data-thumb-alt")?l=' alt="'+e.attr("data-thumb-alt")+'"':"";if(t="thumbnails"===s.vars.controlNav?'<img src="'+e.attr("data-thumb")+'"'+l+"/>":'<a href="#">'+o+"</a>","thumbnails"===s.vars.controlNav&&!0===s.vars.thumbCaptions){var c=e.attr("data-thumbcaption");""!==c&&void 0!==c&&(t+='<span class="'+r+'caption">'+c+"</span>")}s.controlNavScaffold.append("<li>"+t+"<i></i></li>"),o++}s.controlsContainer?n(s.controlsContainer).append(s.controlNavScaffold):s.append(s.controlNavScaffold),g.controlNav.set(),g.controlNav.active(),s.controlNavScaffold.delegate("a, img",h,function(t){if(t.preventDefault(),""===u||u===t.type){var e=n(this),i=s.controlNav.index(e);e.hasClass(r+"active")||(s.direction=i>s.currentSlide?"next":"prev",s.flexAnimate(i,s.vars.pauseOnAction))}""===u&&(u=t.type),g.setToClearWatchedEvent()})},setupManual:function(){s.controlNav=s.manualControls,g.controlNav.active(),s.controlNav.bind(h,function(t){if(t.preventDefault(),""===u||u===t.type){var e=n(this),i=s.controlNav.index(e);e.hasClass(r+"active")||(i>s.currentSlide?s.direction="next":s.direction="prev",s.flexAnimate(i,s.vars.pauseOnAction))}""===u&&(u=t.type),g.setToClearWatchedEvent()})},set:function(){var t="thumbnails"===s.vars.controlNav?"img":"a";s.controlNav=n("."+r+"control-nav li "+t,s.controlsContainer?s.controlsContainer:s)},active:function(){s.controlNav.removeClass(r+"active").eq(s.animatingTo).addClass(r+"active")},update:function(t,e){s.pagingCount>1&&"add"===t?s.controlNavScaffold.append(n('<li><a href="#">'+s.count+"</a></li>")):1===s.pagingCount?s.controlNavScaffold.find("li").remove():s.controlNav.eq(e).closest("li").remove(),g.controlNav.set(),s.pagingCount>1&&s.pagingCount!==s.controlNav.length?s.update(e,t):g.controlNav.active()}},directionNav:{setup:function(){var t=n('<ul class="'+r+'direction-nav"><li class="'+r+'nav-prev"><a class="'+r+'prev" href="#">'+s.vars.prevText+'</a></li><li class="'+r+'nav-next"><a class="'+r+'next" href="#">'+s.vars.nextText+"</a></li></ul>");s.customDirectionNav?s.directionNav=s.customDirectionNav:s.controlsContainer?(n(s.controlsContainer).append(t),s.directionNav=n("."+r+"direction-nav li a",s.controlsContainer)):(s.append(t),s.directionNav=n("."+r+"direction-nav li a",s)),g.directionNav.update(),s.directionNav.bind(h,function(t){t.preventDefault();var e;""!==u&&u!==t.type||(e=n(this).hasClass(r+"next")?s.getTarget("next"):s.getTarget("prev"),s.flexAnimate(e,s.vars.pauseOnAction)),""===u&&(u=t.type),g.setToClearWatchedEvent()})},update:function(){var t=r+"disabled";1===s.pagingCount?s.directionNav.addClass(t).attr("tabindex","-1"):s.vars.animationLoop?s.directionNav.removeClass(t).removeAttr("tabindex"):0===s.animatingTo?s.directionNav.removeClass(t).filter("."+r+"prev").addClass(t).attr("tabindex","-1"):s.animatingTo===s.last?s.directionNav.removeClass(t).filter("."+r+"next").addClass(t).attr("tabindex","-1"):s.directionNav.removeClass(t).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=n('<div class="'+r+'pauseplay"><a href="#"></a></div>');s.controlsContainer?(s.controlsContainer.append(t),s.pausePlay=n("."+r+"pauseplay a",s.controlsContainer)):(s.append(t),s.pausePlay=n("."+r+"pauseplay a",s)),g.pausePlay.update(s.vars.slideshow?r+"pause":r+"play"),s.pausePlay.bind(h,function(t){t.preventDefault(),""!==u&&u!==t.type||(n(this).hasClass(r+"pause")?(s.manualPause=!0,s.manualPlay=!1,s.pause()):(s.manualPause=!1,s.manualPlay=!0,s.play())),""===u&&(u=t.type),g.setToClearWatchedEvent()})},update:function(t){"play"===t?s.pausePlay.removeClass(r+"pause").addClass(r+"play").html(s.vars.playText):s.pausePlay.removeClass(r+"play").addClass(r+"pause").html(s.vars.pauseText)}},touch:function(){function i(e){e.stopPropagation(),s.animating?e.preventDefault():(s.pause(),t._gesture.addPointer(e.pointerId),C=0,h=d?s.h:s.w,v=Number(new Date),c=m&&p&&s.animatingTo===s.last?0:m&&p?s.limit-(s.itemW+s.vars.itemMargin)*s.move*s.animatingTo:m&&s.currentSlide===s.last?s.limit:m?(s.itemW+s.vars.itemMargin)*s.move*s.currentSlide:p?(s.last-s.currentSlide+s.cloneOffset)*h:(s.currentSlide+s.cloneOffset)*h)}function n(i){i.stopPropagation();var n=i.target._slider;if(n){var s=-i.translationX,o=-i.translationY;return C+=d?o:s,u=C,b=d?Math.abs(C)<Math.abs(-s):Math.abs(C)<Math.abs(-o),i.detail===i.MSGESTURE_FLAG_INERTIA?void e(function(){t._gesture.stop()}):void((!b||Number(new Date)-v>500)&&(i.preventDefault(),!f&&n.transitions&&(n.vars.animationLoop||(u=C/(0===n.currentSlide&&0>C||n.currentSlide===n.last&&C>0?Math.abs(C)/h+2:1)),n.setProps(c+u,"setTouch"))))}}function o(t){t.stopPropagation();var e=t.target._slider;if(e){if(e.animatingTo===e.currentSlide&&!b&&null!==u){var i=p?-u:u,n=i>0?e.getTarget("next"):e.getTarget("prev");e.canAdvance(n)&&(Number(new Date)-v<550&&Math.abs(i)>50||Math.abs(i)>h/2)?e.flexAnimate(n,e.vars.pauseOnAction):f||e.flexAnimate(e.currentSlide,e.vars.pauseOnAction,!0)}a=null,r=null,u=null,c=null,C=0}}var a,r,c,h,u,v,g,y,w,b=!1,T=0,x=0,C=0;l?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",i,!1),t._slider=s,t.addEventListener("MSGestureChange",n,!1),t.addEventListener("MSGestureEnd",o,!1)):(g=function(e){s.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(s.pause(),h=d?s.h:s.w,v=Number(new Date),T=e.touches[0].pageX,x=e.touches[0].pageY,c=m&&p&&s.animatingTo===s.last?0:m&&p?s.limit-(s.itemW+s.vars.itemMargin)*s.move*s.animatingTo:m&&s.currentSlide===s.last?s.limit:m?(s.itemW+s.vars.itemMargin)*s.move*s.currentSlide:p?(s.last-s.currentSlide+s.cloneOffset)*h:(s.currentSlide+s.cloneOffset)*h,a=d?x:T,r=d?T:x,t.addEventListener("touchmove",y,!1),t.addEventListener("touchend",w,!1))},y=function(t){T=t.touches[0].pageX,x=t.touches[0].pageY,u=d?a-x:a-T,b=d?Math.abs(u)<Math.abs(T-r):Math.abs(u)<Math.abs(x-r);var e=500;(!b||Number(new Date)-v>e)&&(t.preventDefault(),!f&&s.transitions&&(s.vars.animationLoop||(u/=0===s.currentSlide&&0>u||s.currentSlide===s.last&&u>0?Math.abs(u)/h+2:1),s.setProps(c+u,"setTouch")))},w=function(e){if(t.removeEventListener("touchmove",y,!1),s.animatingTo===s.currentSlide&&!b&&null!==u){var i=p?-u:u,n=i>0?s.getTarget("next"):s.getTarget("prev");s.canAdvance(n)&&(Number(new Date)-v<550&&Math.abs(i)>50||Math.abs(i)>h/2)?s.flexAnimate(n,s.vars.pauseOnAction):f||s.flexAnimate(s.currentSlide,s.vars.pauseOnAction,!0)}t.removeEventListener("touchend",w,!1),a=null,r=null,u=null,c=null},t.addEventListener("touchstart",g,!1))},resize:function(){!s.animating&&s.is(":visible")&&(m||s.doMath(),f?g.smoothHeight():m?(s.slides.width(s.computedW),s.update(s.pagingCount),s.setProps()):d?(s.viewport.height(s.h),s.setProps(s.h,"setTotal")):(s.vars.smoothHeight&&g.smoothHeight(),s.newSlides.width(s.computedW),s.setProps(s.computedW,"setTotal")))},smoothHeight:function(t){if(!d||f){var e=f?s:s.viewport;t?e.animate({height:s.slides.eq(s.animatingTo).innerHeight()},t):e.innerHeight(s.slides.eq(s.animatingTo).innerHeight())}},sync:function(t){var e=n(s.vars.sync).data("flexslider"),i=s.animatingTo;switch(t){case"animate":e.flexAnimate(i,s.vars.pauseOnAction,!1,!0);break;case"play":e.playing||e.asNav||e.play();break;case"pause":e.pause()}},uniqueID:function(t){return t.filter("[id]").add(t.find("[id]")).each(function(){var t=n(this);t.attr("id",t.attr("id")+"_clone")}),t},pauseInvisible:{visProp:null,init:function(){var t=g.pauseInvisible.getHiddenProp();if(t){var e=t.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(e,function(){g.pauseInvisible.isHidden()?s.startTimeout?clearTimeout(s.startTimeout):s.pause():s.started?s.play():s.vars.initDelay>0?setTimeout(s.play,s.vars.initDelay):s.play()})}},isHidden:function(){var t=g.pauseInvisible.getHiddenProp();return t?document[t]:!1},getHiddenProp:function(){var t=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var e=0;e<t.length;e++)if(t[e]+"Hidden"in document)return t[e]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(a),a=setTimeout(function(){u=""},3e3)}},s.flexAnimate=function(t,e,i,o,a){if(s.vars.animationLoop||t===s.currentSlide||(s.direction=t>s.currentSlide?"next":"prev"),v&&1===s.pagingCount&&(s.direction=s.currentItem<t?"next":"prev"),!s.animating&&(s.canAdvance(t,a)||i)&&s.is(":visible")){if(v&&o){var l=n(s.vars.asNavFor).data("flexslider");if(s.atEnd=0===t||t===s.count-1,l.flexAnimate(t,!0,!1,!0,a),s.direction=s.currentItem<t?"next":"prev",l.direction=s.direction,Math.ceil((t+1)/s.visible)-1===s.currentSlide||0===t)return s.currentItem=t,s.slides.removeClass(r+"active-slide").eq(t).addClass(r+"active-slide"),!1;s.currentItem=t,s.slides.removeClass(r+"active-slide").eq(t).addClass(r+"active-slide"),t=Math.floor(t/s.visible)}if(s.animating=!0,s.animatingTo=t,e&&s.pause(),s.vars.before(s),s.syncExists&&!a&&g.sync("animate"),s.vars.controlNav&&g.controlNav.active(),m||s.slides.removeClass(r+"active-slide").eq(t).addClass(r+"active-slide"),s.atEnd=0===t||t===s.last,s.vars.directionNav&&g.directionNav.update(),t===s.last&&(s.vars.end(s),s.vars.animationLoop||s.pause()),f)c?(s.slides.eq(s.currentSlide).css({opacity:0,zIndex:1}),s.slides.eq(t).css({opacity:1,zIndex:2}),s.wrapup(w)):(s.slides.eq(s.currentSlide).css({zIndex:1}).animate({opacity:0},s.vars.animationSpeed,s.vars.easing),s.slides.eq(t).css({zIndex:2}).animate({opacity:1},s.vars.animationSpeed,s.vars.easing,s.wrapup));else{var h,u,y,w=d?s.slides.filter(":first").height():s.computedW;m?(h=s.vars.itemMargin,y=(s.itemW+h)*s.move*s.animatingTo,u=y>s.limit&&1!==s.visible?s.limit:y):u=0===s.currentSlide&&t===s.count-1&&s.vars.animationLoop&&"next"!==s.direction?p?(s.count+s.cloneOffset)*w:0:s.currentSlide===s.last&&0===t&&s.vars.animationLoop&&"prev"!==s.direction?p?0:(s.count+1)*w:p?(s.count-1-t+s.cloneOffset)*w:(t+s.cloneOffset)*w,s.setProps(u,"",s.vars.animationSpeed),s.transitions?(s.vars.animationLoop&&s.atEnd||(s.animating=!1,s.currentSlide=s.animatingTo),s.container.unbind("webkitTransitionEnd transitionend"),s.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(s.ensureAnimationEnd),s.wrapup(w)}),clearTimeout(s.ensureAnimationEnd),s.ensureAnimationEnd=setTimeout(function(){s.wrapup(w)},s.vars.animationSpeed+100)):s.container.animate(s.args,s.vars.animationSpeed,s.vars.easing,function(){s.wrapup(w)})}s.vars.smoothHeight&&g.smoothHeight(s.vars.animationSpeed)}},s.wrapup=function(t){f||m||(0===s.currentSlide&&s.animatingTo===s.last&&s.vars.animationLoop?s.setProps(t,"jumpEnd"):s.currentSlide===s.last&&0===s.animatingTo&&s.vars.animationLoop&&s.setProps(t,"jumpStart")),s.animating=!1,s.currentSlide=s.animatingTo,s.vars.after(s)},s.animateSlides=function(){!s.animating&&o&&s.flexAnimate(s.getTarget("next"))},s.pause=function(){clearInterval(s.animatedSlides),s.animatedSlides=null,s.playing=!1,s.vars.pausePlay&&g.pausePlay.update("play"),s.syncExists&&g.sync("pause")},s.play=function(){s.playing&&clearInterval(s.animatedSlides),s.animatedSlides=s.animatedSlides||setInterval(s.animateSlides,s.vars.slideshowSpeed),s.started=s.playing=!0,s.vars.pausePlay&&g.pausePlay.update("pause"),s.syncExists&&g.sync("play")},s.stop=function(){s.pause(),s.stopped=!0},s.canAdvance=function(t,e){var i=v?s.pagingCount-1:s.last;return e?!0:v&&s.currentItem===s.count-1&&0===t&&"prev"===s.direction?!0:v&&0===s.currentItem&&t===s.pagingCount-1&&"next"!==s.direction?!1:t!==s.currentSlide||v?s.vars.animationLoop?!0:s.atEnd&&0===s.currentSlide&&t===i&&"next"!==s.direction?!1:!s.atEnd||s.currentSlide!==i||0!==t||"next"!==s.direction:!1},s.getTarget=function(t){return s.direction=t,"next"===t?s.currentSlide===s.last?0:s.currentSlide+1:0===s.currentSlide?s.last:s.currentSlide-1},s.setProps=function(t,e,i){var n=function(){var i=t?t:(s.itemW+s.vars.itemMargin)*s.move*s.animatingTo,n=function(){if(m)return"setTouch"===e?t:p&&s.animatingTo===s.last?0:p?s.limit-(s.itemW+s.vars.itemMargin)*s.move*s.animatingTo:s.animatingTo===s.last?s.limit:i;switch(e){case"setTotal":return p?(s.count-1-s.currentSlide+s.cloneOffset)*t:(s.currentSlide+s.cloneOffset)*t;case"setTouch":return p?t:t;case"jumpEnd":return p?t:s.count*t;case"jumpStart":return p?s.count*t:t;default:return t}}();return-1*n+"px"}();s.transitions&&(n=d?"translate3d(0,"+n+",0)":"translate3d("+n+",0,0)",i=void 0!==i?i/1e3+"s":"0s",s.container.css("-"+s.pfx+"-transition-duration",i),s.container.css("transition-duration",i)),s.args[s.prop]=n,(s.transitions||void 0===i)&&s.container.css(s.args),s.container.css("transform",n)},s.setup=function(t){if(f)s.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===t&&(c?s.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+s.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(s.currentSlide).css({opacity:1,zIndex:2}):0==s.vars.fadeFirstSlide?s.slides.css({opacity:0,display:"block",zIndex:1}).eq(s.currentSlide).css({zIndex:2}).css({opacity:1}):s.slides.css({opacity:0,display:"block",zIndex:1}).eq(s.currentSlide).css({zIndex:2}).animate({opacity:1},s.vars.animationSpeed,s.vars.easing)),s.vars.smoothHeight&&g.smoothHeight();else{var e,i;"init"===t&&(s.viewport=n('<div class="'+r+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(s).append(s.container),s.cloneCount=0,s.cloneOffset=0,p&&(i=n.makeArray(s.slides).reverse(),s.slides=n(i),s.container.empty().append(s.slides))),s.vars.animationLoop&&!m&&(s.cloneCount=2,s.cloneOffset=1,"init"!==t&&s.container.find(".clone").remove(),s.container.append(g.uniqueID(s.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(g.uniqueID(s.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),s.newSlides=n(s.vars.selector,s),e=p?s.count-1-s.currentSlide+s.cloneOffset:s.currentSlide+s.cloneOffset,d&&!m?(s.container.height(200*(s.count+s.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){s.newSlides.css({display:"block"}),s.doMath(),s.viewport.height(s.h),s.setProps(e*s.h,"init")},"init"===t?100:0)):(s.container.width(200*(s.count+s.cloneCount)+"%"),s.setProps(e*s.computedW,"init"),setTimeout(function(){s.doMath(),s.newSlides.css({width:s.computedW,marginRight:s.computedM,"float":"left",display:"block"}),s.vars.smoothHeight&&g.smoothHeight()},"init"===t?100:0))}m||s.slides.removeClass(r+"active-slide").eq(s.currentSlide).addClass(r+"active-slide"),s.vars.init(s)},s.doMath=function(){var t=s.slides.first(),e=s.vars.itemMargin,i=s.vars.minItems,n=s.vars.maxItems;s.w=void 0===s.viewport?s.width():s.viewport.width(),s.h=t.height(),s.boxPadding=t.outerWidth()-t.width(),m?(s.itemT=s.vars.itemWidth+e,s.itemM=e,s.minW=i?i*s.itemT:s.w,s.maxW=n?n*s.itemT-e:s.w,s.itemW=s.minW>s.w?(s.w-e*(i-1))/i:s.maxW<s.w?(s.w-e*(n-1))/n:s.vars.itemWidth>s.w?s.w:s.vars.itemWidth,s.visible=Math.floor(s.w/s.itemW),s.move=s.vars.move>0&&s.vars.move<s.visible?s.vars.move:s.visible,s.pagingCount=Math.ceil((s.count-s.visible)/s.move+1),s.last=s.pagingCount-1,s.limit=1===s.pagingCount?0:s.vars.itemWidth>s.w?s.itemW*(s.count-1)+e*(s.count-1):(s.itemW+e)*s.count-s.w-e):(s.itemW=s.w,s.itemM=e,s.pagingCount=s.count,s.last=s.count-1),s.computedW=s.itemW-s.boxPadding,s.computedM=s.itemM},s.update=function(t,e){s.doMath(),m||(t<s.currentSlide?s.currentSlide+=1:t<=s.currentSlide&&0!==t&&(s.currentSlide-=1),s.animatingTo=s.currentSlide),s.vars.controlNav&&!s.manualControls&&("add"===e&&!m||s.pagingCount>s.controlNav.length?g.controlNav.update("add"):("remove"===e&&!m||s.pagingCount<s.controlNav.length)&&(m&&s.currentSlide>s.last&&(s.currentSlide-=1,s.animatingTo-=1),g.controlNav.update("remove",s.last))),s.vars.directionNav&&g.directionNav.update()},s.addSlide=function(t,e){var i=n(t);s.count+=1,s.last=s.count-1,d&&p?void 0!==e?s.slides.eq(s.count-e).after(i):s.container.prepend(i):void 0!==e?s.slides.eq(e).before(i):s.container.append(i),s.update(e,"add"),s.slides=n(s.vars.selector+":not(.clone)",s),s.setup(),s.vars.added(s)},s.removeSlide=function(t){var e=isNaN(t)?s.slides.index(n(t)):t;s.count-=1,s.last=s.count-1,isNaN(t)?n(t,s.slides).remove():d&&p?s.slides.eq(s.last).remove():s.slides.eq(t).remove(),s.doMath(),s.update(e,"remove"),s.slides=n(s.vars.selector+":not(.clone)",s),s.setup(),s.vars.removed(s)},g.init()},n(window).blur(function(t){o=!1}).focus(function(t){o=!0}),n.flexslider.defaults={namespace:"am-",selector:".am-slides > li",animation:"slide",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:5e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:" ",nextText:" ",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},n.fn.flexslider=function(t){var e=Array.prototype.slice.call(arguments,1);if(void 0===t&&(t={}),"object"==typeof t)return this.each(function(){var e=n(this),i=t.selector?t.selector:".am-slides > li",s=e.find(i);1===s.length&&t.allowOneSlide===!1||0===s.length?(s.fadeIn(400),t.start&&t.start(e)):void 0===e.data("flexslider")&&new n.flexslider(this,t)});var i,s=n(this).data("flexslider");switch(t){case"next":s.flexAnimate(s.getTarget("next"),!0);break;case"prev":case"previous":s.flexAnimate(s.getTarget("prev"),!0);break;default:"number"==typeof t?s.flexAnimate(t,!0):"string"==typeof t&&(i="function"==typeof s[t]?s[t].apply(s,e):s[t])}return void 0===i?this:i},s.ready(function(t){n("[data-am-flexslider]",t).each(function(t,e){var i=n(e),o=s.utils.parseOptions(i.data("amFlexslider"));o.before=function(t){t._pausedTimer&&(window.clearTimeout(t._pausedTimer),t._pausedTimer=null)},o.after=function(t){var e=t.vars.playAfterPaused;!e||isNaN(e)||t.playing||t.manualPause||t.manualPlay||t.stopped||(t._pausedTimer=window.setTimeout(function(){t.play()},e))},i.flexslider(o)})}),t.exports=n.flexslider}).call(e,i(12).setImmediate)},function(t,e,i){(function(t,n){function s(t,e){this._id=t,this._clearFn=e}var o=i(13).nextTick,a=Function.prototype.apply,r=Array.prototype.slice,l={},c=0;e.setTimeout=function(){return new s(a.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new s(a.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t.close()},s.prototype.unref=s.prototype.ref=function(){},s.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},e.setImmediate="function"==typeof t?t:function(t){var i=c++,n=arguments.length<2?!1:r.call(arguments,1);return l[i]=!0,o(function(){l[i]&&(n?t.apply(null,n):t.call(null),e.clearImmediate(i))}),i},e.clearImmediate="function"==typeof n?n:function(t){delete l[t]}}).call(e,i(12).setImmediate,i(12).clearImmediate)},function(t,e){function i(){c=!1,a.length?l=a.concat(l):h=-1,l.length&&n()}function n(){if(!c){var t=setTimeout(i);c=!0;for(var e=l.length;e;){for(a=l,l=[];++h<e;)a&&a[h].run();h=-1,e=l.length}a=null,c=!1,clearTimeout(t)}}function s(t,e){this.fun=t,this.array=e}function o(){}var a,r=t.exports={},l=[],c=!1,h=-1;r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];l.push(new s(t,e)),1!==l.length||c||setTimeout(n,0)},s.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=o,r.addListener=o,r.once=o,r.off=o,r.removeListener=o,r.removeAllListeners=o,r.emit=o,r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(t,e,i){"use strict";function n(t,e){this.wrapper="string"==typeof t?document.querySelector(t):t,this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.options={disablePointer:!a.hasPointer,disableTouch:a.hasPointer||!a.hasTouch,disableMouse:a.hasPointer||a.hasTouch,startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0,bindToWrapper:"undefined"==typeof window.onmousedown};for(var i in e)this.options[i]=e[i];this.translateZ=this.options.HWCompositing&&a.hasPerspective?" translateZ(0)":"",this.options.useTransition=a.hasTransition&&this.options.useTransition,this.options.useTransform=a.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollY="vertical"==this.options.eventPassthrough?!1:this.options.scrollY,this.options.scrollX="horizontal"==this.options.eventPassthrough?!1:this.options.scrollX,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing="string"==typeof this.options.bounceEasing?a.ease[this.options.bounceEasing]||a.ease.circular:this.options.bounceEasing,this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling,this.options.tap===!0&&(this.options.tap="tap"),this.options.useTransition||this.options.useTransform||/relative|absolute/i.test(this.scrollerStyle.position)||(this.scrollerStyle.position="relative"),this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}var s=i(2),o=s.utils.rAF,a=function(){function t(t){return n===!1?!1:""===n?t:n+t.charAt(0).toUpperCase()+t.substr(1)}var e={},i=document.createElement("div").style,n=function(){for(var t,e=["t","webkitT","MozT","msT","OT"],n=0,s=e.length;s>n;n++)if(t=e[n]+"ransform",t in i)return e[n].substr(0,e[n].length-1);return!1}();e.getTime=Date.now||function(){return(new Date).getTime()},e.extend=function(t,e){for(var i in e)t[i]=e[i]},e.addEvent=function(t,e,i,n){t.addEventListener(e,i,!!n)},e.removeEvent=function(t,e,i,n){t.removeEventListener(e,i,!!n)},e.prefixPointerEvent=function(t){return window.MSPointerEvent?"MSPointer"+t.charAt(7).toUpperCase()+t.substr(8):t},e.momentum=function(t,e,i,n,s,o){var a,r,l=t-e,c=Math.abs(l)/i;return o=void 0===o?6e-4:o,a=t+c*c/(2*o)*(0>l?-1:1),r=c/o,n>a?(a=s?n-s/2.5*(c/8):n,l=Math.abs(a-t),r=l/c):a>0&&(a=s?s/2.5*(c/8):0,l=Math.abs(t)+a,r=l/c),{destination:Math.round(a),duration:r}};var s=t("transform");return e.extend(e,{hasTransform:s!==!1,hasPerspective:t("perspective")in i,hasTouch:"ontouchstart"in window,hasPointer:!(!window.PointerEvent&&!window.MSPointerEvent),hasTransition:t("transition")in i}),e.isBadAndroid=function(){var t=window.navigator.appVersion;if(/Android/.test(t)&&!/Chrome\/\d/.test(t)){var e=t.match(/Safari\/(\d+.\d)/);return e&&"object"==typeof e&&e.length>=2?parseFloat(e[1])<535.19:!0}return!1}(),e.extend(e.style={},{transform:s,transitionTimingFunction:t("transitionTimingFunction"),transitionDuration:t("transitionDuration"),transitionDelay:t("transitionDelay"),transformOrigin:t("transformOrigin")}),e.hasClass=function(t,e){var i=new RegExp("(^|\\s)"+e+"(\\s|$)");return i.test(t.className)},e.addClass=function(t,i){if(!e.hasClass(t,i)){var n=t.className.split(" ");n.push(i),t.className=n.join(" ")}},e.removeClass=function(t,i){if(e.hasClass(t,i)){var n=new RegExp("(^|\\s)"+i+"(\\s|$)","g");t.className=t.className.replace(n," ")}},e.offset=function(t){for(var e=-t.offsetLeft,i=-t.offsetTop;t=t.offsetParent;)e-=t.offsetLeft,i-=t.offsetTop;return{left:e,top:i}},e.preventDefaultException=function(t,e){for(var i in e)if(e[i].test(t[i]))return!0;return!1},e.extend(e.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,pointerdown:3,pointermove:3,pointerup:3,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),e.extend(e.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(t){return Math.sqrt(1- --t*t)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(t){var e=4;return(t-=1)*t*((e+1)*t+e)+1}},bounce:{style:"",fn:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}},elastic:{style:"",fn:function(t){var e=.22,i=.4;return 0===t?0:1==t?1:i*Math.pow(2,-10*t)*Math.sin((t-e/4)*(2*Math.PI)/e)+1}}}),e.tap=function(t,e){var i=document.createEvent("Event");i.initEvent(e,!0,!0),i.pageX=t.pageX,i.pageY=t.pageY,t.target.dispatchEvent(i)},e.click=function(t){var e,i=t.target;/(SELECT|INPUT|TEXTAREA)/i.test(i.tagName)||(e=document.createEvent(window.MouseEvent?"MouseEvents":"Event"),e.initEvent("click",!0,!0),e.view=t.view||window,e.detail=1,e.screenX=i.screenX||0,e.screenY=i.screenY||0,e.clientX=i.clientX||0,e.clientY=i.clientY||0,e.ctrlKey=!!t.ctrlKey,e.altKey=!!t.altKey,e.shiftKey=!!t.shiftKey,e.metaKey=!!t.metaKey,e.button=0,e.relatedTarget=null,e._constructed=!0,i.dispatchEvent(e))},e}();n.prototype={version:"5.2.0",_init:function(){this._initEvents()},destroy:function(){this._initEvents(!0),clearTimeout(this.resizeTimeout),this.resizeTimeout=null,this._execEvent("destroy")},_transitionEnd:function(t){t.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd")))},_start:function(t){if(1!=a.eventType[t.type]){var e;if(e=t.which?t.button:t.button<2?0:4==t.button?1:2,0!==e)return}if(this.enabled&&(!this.initiated||a.eventType[t.type]===this.initiated)){!this.options.preventDefault||a.isBadAndroid||a.preventDefaultException(t.target,this.options.preventDefaultException)||t.preventDefault();var i,n=t.touches?t.touches[0]:t;this.initiated=a.eventType[t.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this.startTime=a.getTime(),this.options.useTransition&&this.isInTransition?(this._transitionTime(),this.isInTransition=!1,i=this.getComputedPosition(),this._translate(Math.round(i.x),Math.round(i.y)),this._execEvent("scrollEnd")):!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this._execEvent("scrollEnd")),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=n.pageX,this.pointY=n.pageY,this._execEvent("beforeScrollStart")}},_move:function(t){if(this.enabled&&a.eventType[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault();var e,i,n,s,o=t.touches?t.touches[0]:t,r=o.pageX-this.pointX,l=o.pageY-this.pointY,c=a.getTime();
if(this.pointX=o.pageX,this.pointY=o.pageY,this.distX+=r,this.distY+=l,n=Math.abs(this.distX),s=Math.abs(this.distY),!(c-this.endTime>300&&10>n&&10>s)){if(this.directionLocked||this.options.freeScroll||(n>s+this.options.directionLockThreshold?this.directionLocked="h":s>=n+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n"),"h"==this.directionLocked){if("vertical"==this.options.eventPassthrough)t.preventDefault();else if("horizontal"==this.options.eventPassthrough)return void(this.initiated=!1);l=0}else if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough)t.preventDefault();else if("vertical"==this.options.eventPassthrough)return void(this.initiated=!1);r=0}r=this.hasHorizontalScroll?r:0,l=this.hasVerticalScroll?l:0,e=this.x+r,i=this.y+l,(e>0||e<this.maxScrollX)&&(e=this.options.bounce?this.x+r/3:e>0?0:this.maxScrollX),(i>0||i<this.maxScrollY)&&(i=this.options.bounce?this.y+l/3:i>0?0:this.maxScrollY),this.directionX=r>0?-1:0>r?1:0,this.directionY=l>0?-1:0>l?1:0,this.moved||this._execEvent("scrollStart"),this.moved=!0,this._translate(e,i),c-this.startTime>300&&(this.startTime=c,this.startX=this.x,this.startY=this.y)}}},_end:function(t){if(this.enabled&&a.eventType[t.type]===this.initiated){this.options.preventDefault&&!a.preventDefaultException(t.target,this.options.preventDefaultException)&&t.preventDefault();var e,i,n=(t.changedTouches?t.changedTouches[0]:t,a.getTime()-this.startTime),s=Math.round(this.x),o=Math.round(this.y),r=Math.abs(s-this.startX),l=Math.abs(o-this.startY),c=0,h="";if(this.isInTransition=0,this.initiated=0,this.endTime=a.getTime(),!this.resetPosition(this.options.bounceTime))return this.scrollTo(s,o),this.moved?this._events.flick&&200>n&&100>r&&100>l?void this._execEvent("flick"):(this.options.momentum&&300>n&&(e=this.hasHorizontalScroll?a.momentum(this.x,this.startX,n,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options.deceleration):{destination:s,duration:0},i=this.hasVerticalScroll?a.momentum(this.y,this.startY,n,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options.deceleration):{destination:o,duration:0},s=e.destination,o=i.destination,c=Math.max(e.duration,i.duration),this.isInTransition=1),s!=this.x||o!=this.y?((s>0||s<this.maxScrollX||o>0||o<this.maxScrollY)&&(h=a.ease.quadratic),void this.scrollTo(s,o,c,h)):void this._execEvent("scrollEnd")):(this.options.tap&&a.tap(t,this.options.tap),this.options.click&&a.click(t),void this._execEvent("scrollCancel"))}},_resize:function(){var t=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){t.refresh()},this.options.resizePolling)},resetPosition:function(t){var e=this.x,i=this.y;return t=t||0,!this.hasHorizontalScroll||this.x>0?e=0:this.x<this.maxScrollX&&(e=this.maxScrollX),!this.hasVerticalScroll||this.y>0?i=0:this.y<this.maxScrollY&&(i=this.maxScrollY),e==this.x&&i==this.y?!1:(this.scrollTo(e,i,t,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){this.wrapper.offsetHeight;this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.scrollerWidth=this.scroller.offsetWidth,this.scrollerHeight=this.scroller.offsetHeight,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=a.offset(this.wrapper),this._execEvent("refresh"),this.resetPosition()},on:function(t,e){this._events[t]||(this._events[t]=[]),this._events[t].push(e)},off:function(t,e){if(this._events[t]){var i=this._events[t].indexOf(e);i>-1&&this._events[t].splice(i,1)}},_execEvent:function(t){if(this._events[t]){var e=0,i=this._events[t].length;if(i)for(;i>e;e++)this._events[t][e].apply(this,[].slice.call(arguments,1))}},scrollBy:function(t,e,i,n){t=this.x+t,e=this.y+e,i=i||0,this.scrollTo(t,e,i,n)},scrollTo:function(t,e,i,n){n=n||a.ease.circular,this.isInTransition=this.options.useTransition&&i>0;var s=this.options.useTransition&&n.style;!i||s?(s&&(this._transitionTimingFunction(n.style),this._transitionTime(i)),this._translate(t,e)):this._animate(t,e,i,n.fn)},scrollToElement:function(t,e,i,n,s){if(t=t.nodeType?t:this.scroller.querySelector(t)){var o=a.offset(t);o.left-=this.wrapperOffset.left,o.top-=this.wrapperOffset.top,i===!0&&(i=Math.round(t.offsetWidth/2-this.wrapper.offsetWidth/2)),n===!0&&(n=Math.round(t.offsetHeight/2-this.wrapper.offsetHeight/2)),o.left-=i||0,o.top-=n||0,o.left=o.left>0?0:o.left<this.maxScrollX?this.maxScrollX:o.left,o.top=o.top>0?0:o.top<this.maxScrollY?this.maxScrollY:o.top,e=void 0===e||null===e||"auto"===e?Math.max(Math.abs(this.x-o.left),Math.abs(this.y-o.top)):e,this.scrollTo(o.left,o.top,e,s)}},_transitionTime:function(t){if(this.options.useTransition){t=t||0;var e=a.style.transitionDuration;if(e&&(this.scrollerStyle[e]=t+"ms",!t&&a.isBadAndroid)){this.scrollerStyle[e]="0.0001ms";var i=this;o(function(){"0.0001ms"===i.scrollerStyle[e]&&(i.scrollerStyle[e]="0s")})}}},_transitionTimingFunction:function(t){this.scrollerStyle[a.style.transitionTimingFunction]=t},_translate:function(t,e){this.options.useTransform?this.scrollerStyle[a.style.transform]="translate("+t+"px,"+e+"px)"+this.translateZ:(t=Math.round(t),e=Math.round(e),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=e+"px"),this.x=t,this.y=e},_initEvents:function(t){var e=t?a.removeEvent:a.addEvent,i=this.options.bindToWrapper?this.wrapper:window;e(window,"orientationchange",this),e(window,"resize",this),this.options.click&&e(this.wrapper,"click",this,!0),this.options.disableMouse||(e(this.wrapper,"mousedown",this),e(i,"mousemove",this),e(i,"mousecancel",this),e(i,"mouseup",this)),a.hasPointer&&!this.options.disablePointer&&(e(this.wrapper,a.prefixPointerEvent("pointerdown"),this),e(i,a.prefixPointerEvent("pointermove"),this),e(i,a.prefixPointerEvent("pointercancel"),this),e(i,a.prefixPointerEvent("pointerup"),this)),a.hasTouch&&!this.options.disableTouch&&(e(this.wrapper,"touchstart",this),e(i,"touchmove",this),e(i,"touchcancel",this),e(i,"touchend",this)),e(this.scroller,"transitionend",this),e(this.scroller,"webkitTransitionEnd",this),e(this.scroller,"oTransitionEnd",this),e(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var t,e,i=window.getComputedStyle(this.scroller,null);return this.options.useTransform?(i=i[a.style.transform].split(")")[0].split(", "),t=+(i[12]||i[4]),e=+(i[13]||i[5])):(t=+i.left.replace(/[^-\d.]/g,""),e=+i.top.replace(/[^-\d.]/g,"")),{x:t,y:e}},_animate:function(t,e,i,n){function s(){var d,p,m,f=a.getTime();return f>=u?(r.isAnimating=!1,r._translate(t,e),void(r.resetPosition(r.options.bounceTime)||r._execEvent("scrollEnd"))):(f=(f-h)/i,m=n(f),d=(t-l)*m+l,p=(e-c)*m+c,r._translate(d,p),void(r.isAnimating&&o(s)))}var r=this,l=this.x,c=this.y,h=a.getTime(),u=h+i;this.isAnimating=!0,s()},handleEvent:function(t){switch(t.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(t);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(t);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._wheel(t);break;case"keydown":this._key(t);break;case"click":this.enabled&&!t._constructed&&(t.preventDefault(),t.stopPropagation())}}},n.utils=a,t.exports=s.iScroll=n},function(t,e,i){"use strict";function n(t,e){return this.each(function(){var i=s(this),n=i.data("amui.modal"),o="object"==typeof t&&t;n||i.data("amui.modal",n=new c(this,o)),"string"==typeof t?n[t]&&n[t](e):n.toggle(t&&t.relatedTarget||void 0)})}var s=i(1),o=i(2),a=i(9),r=s(document),l=o.support.transition,c=function(t,e){this.options=s.extend({},c.DEFAULTS,e||{}),this.$element=s(t),this.$dialog=this.$element.find(".am-modal-dialog"),this.$element.attr("id")||this.$element.attr("id",o.utils.generateGUID("am-modal")),this.isPopup=this.$element.hasClass("am-popup"),this.isActions=this.$element.hasClass("am-modal-actions"),this.isPrompt=this.$element.hasClass("am-modal-prompt"),this.isLoading=this.$element.hasClass("am-modal-loading"),this.active=this.transitioning=this.relatedTarget=null,this.dimmer=this.options.dimmer?a:{open:function(){},close:function(){}},this.events()};c.DEFAULTS={className:{active:"am-modal-active",out:"am-modal-out"},selector:{modal:".am-modal",active:".am-modal-active"},closeViaDimmer:!0,cancelable:!0,onConfirm:function(){},onCancel:function(){},closeOnCancel:!0,closeOnConfirm:!0,dimmer:!0,height:void 0,width:void 0,duration:300,transitionEnd:l&&l.end+".modal.amui"},c.prototype.toggle=function(t){return this.active?this.close():this.open(t)},c.prototype.open=function(t){var e=this.$element,i=this.options,n=this.isPopup,o=i.width,a=i.height,r={};if(!this.active&&this.$element.length){t&&(this.relatedTarget=t),this.transitioning&&(clearTimeout(e.transitionEndTimmer),e.transitionEndTimmer=null,e.trigger(i.transitionEnd).off(i.transitionEnd)),n&&this.$element.show(),this.active=!0,e.trigger(s.Event("open.modal.amui",{relatedTarget:t})),this.dimmer.open(e),e.show().redraw(),n||this.isActions||(o&&(r.width=parseInt(o,10)+"px"),a&&(r.height=parseInt(a,10)+"px"),this.$dialog.css(r)),e.removeClass(i.className.out).addClass(i.className.active),this.transitioning=1;var c=function(){e.trigger(s.Event("opened.modal.amui",{relatedTarget:t})),this.transitioning=0,this.isPrompt&&this.$dialog.find("input").eq(0).focus()};return l?void e.one(i.transitionEnd,s.proxy(c,this)).emulateTransitionEnd(i.duration):c.call(this)}},c.prototype.close=function(t){if(this.active){var e=this.$element,i=this.options,n=this.isPopup;this.transitioning&&(clearTimeout(e.transitionEndTimmer),e.transitionEndTimmer=null,e.trigger(i.transitionEnd).off(i.transitionEnd),this.dimmer.close(e,!0)),this.$element.trigger(s.Event("close.modal.amui",{relatedTarget:t})),this.transitioning=1;var o=function(){e.trigger("closed.modal.amui"),n&&e.removeClass(i.className.out),e.hide(),this.transitioning=0,this.dimmer.close(e,!1),this.active=!1};return e.removeClass(i.className.active).addClass(i.className.out),l?void e.one(i.transitionEnd,s.proxy(o,this)).emulateTransitionEnd(i.duration):o.call(this)}},c.prototype.events=function(){var t=this.options,e=this,i=this.$element,n=i.find(".am-modal-prompt-input"),o=i.find("[data-am-modal-confirm]"),a=i.find("[data-am-modal-cancel]"),r=function(){var t=[];return n.each(function(){t.push(s(this).val())}),0===t.length?void 0:1===t.length?t[0]:t};this.options.cancelable&&i.on("keyup.modal.amui",function(t){e.active&&27===t.which&&(i.trigger("cancel.modal.amui"),e.close())}),this.options.dimmer&&this.options.closeViaDimmer&&!this.isLoading&&this.dimmer.$element.on("click.dimmer.modal.amui",function(t){e.close()}),i.on("click.close.modal.amui","[data-am-modal-close], .am-modal-btn",function(i){i.preventDefault();var n=s(this);n.is(o)?t.closeOnConfirm&&e.close():n.is(a)?t.closeOnCancel&&e.close():e.close()}),o.on("click.confirm.modal.amui",function(){i.trigger(s.Event("confirm.modal.amui",{trigger:this}))}),a.on("click.cancel.modal.amui",function(){i.trigger(s.Event("cancel.modal.amui",{trigger:this}))}),i.on("confirm.modal.amui",function(t){t.data=r(),e.options.onConfirm.call(e,t)}).on("cancel.modal.amui",function(t){t.data=r(),e.options.onCancel.call(e,t)})},s.fn.modal=n,r.on("click.modal.amui.data-api","[data-am-modal]",function(){var t=s(this),e=o.utils.parseOptions(t.attr("data-am-modal")),i=s(e.target||this.href&&this.href.replace(/.*(?=#[^\s]+$)/,"")),a=i.data("amui.modal")?"toggle":e;n.call(i,a,this)}),t.exports=o.modal=c},function(t,e,i){"use strict";function n(t,e){var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var n=s(this),o=n.data("amui.offcanvas"),a=s.extend({},"object"==typeof t&&t);o||(n.data("amui.offcanvas",o=new c(this,a)),(!t||"object"==typeof t)&&o.open(e)),"string"==typeof t&&o[t]&&o[t].apply(o,i)})}var s=i(1),o=i(2);i(3);var a,r=s(window),l=s(document),c=function(t,e){this.$element=s(t),this.options=s.extend({},c.DEFAULTS,e),this.active=null,this.bindEvents()};c.DEFAULTS={duration:300,effect:"overlay"},c.prototype.open=function(t){var e=this,i=this.$element;if(i.length&&!i.hasClass("am-active")){var n=this.options.effect,o=s("html"),l=s("body"),c=i.find(".am-offcanvas-bar").first(),h=c.hasClass("am-offcanvas-bar-flip")?-1:1;c.addClass("am-offcanvas-bar-"+n),a={x:window.scrollX,y:window.scrollY},i.addClass("am-active"),l.css({width:window.innerWidth,height:r.height()}).addClass("am-offcanvas-page"),"overlay"!==n&&l.css({"margin-left":c.outerWidth()*h}).width(),o.css("margin-top",-1*a.y),setTimeout(function(){c.addClass("am-offcanvas-bar-active").width()},0),i.trigger("open.offcanvas.amui"),this.active=1,i.on("click.offcanvas.amui",function(t){var i=s(t.target);i.hasClass("am-offcanvas-bar")||i.parents(".am-offcanvas-bar").first().length||(t.stopImmediatePropagation(),e.close())}),o.on("keydown.offcanvas.amui",function(t){27===t.keyCode&&e.close()})}},c.prototype.close=function(t){function e(){r.removeClass("am-offcanvas-page").css({width:"",height:"","margin-left":"","margin-right":""}),l.removeClass("am-active"),c.removeClass("am-offcanvas-bar-active"),n.css("margin-top",""),window.scrollTo(a.x,a.y),l.trigger("closed.offcanvas.amui"),i.active=0}var i=this,n=s("html"),r=s("body"),l=this.$element,c=l.find(".am-offcanvas-bar").first();l.length&&this.active&&l.hasClass("am-active")&&(l.trigger("close.offcanvas.amui"),o.support.transition?(setTimeout(function(){c.removeClass("am-offcanvas-bar-active")},0),r.css("margin-left","").one(o.support.transition.end,function(){e()}).emulateTransitionEnd(this.options.duration)):e(),l.off("click.offcanvas.amui"),n.off(".offcanvas.amui"))},c.prototype.bindEvents=function(){var t=this;return l.on("click.offcanvas.amui",'[data-am-dismiss="offcanvas"]',function(e){e.preventDefault(),t.close()}),r.on("resize.offcanvas.amui orientationchange.offcanvas.amui",function(){t.active&&t.close()}),this.$element.hammer().on("swipeleft swipeleft",function(e){e.preventDefault(),t.close()}),this},s.fn.offCanvas=n,l.on("click.offcanvas.amui","[data-am-offcanvas]",function(t){t.preventDefault();var e=s(this),i=o.utils.parseOptions(e.data("amOffcanvas")),a=s(i.target||this.href&&this.href.replace(/.*(?=#[^\s]+$)/,"")),r=a.data("amui.offcanvas")?"open":i;n.call(a,r,this)}),t.exports=o.offcanvas=c},function(t,e,i){"use strict";var n=i(1),s=i(2),o=s.utils.rAF,a=function(t){var e=function(e,i){this.el=t(e),this.zoomFactor=1,this.lastScale=1,this.offset={x:0,y:0},this.options=t.extend({},this.defaults,i),this.setupMarkup(),this.bindEvents(),this.update(),this.enable()},i=function(t,e){return t+e},n=function(t,e){return t>e-.01&&e+.01>t};e.prototype={defaults:{tapZoomFactor:2,zoomOutFactor:1.3,animationDuration:300,maxZoom:4,minZoom:.5,lockDragAxis:!1,use2d:!0,zoomStartEventName:"pz_zoomstart",zoomEndEventName:"pz_zoomend",dragStartEventName:"pz_dragstart",dragEndEventName:"pz_dragend",doubleTapEventName:"pz_doubletap"},handleDragStart:function(t){this.el.trigger(this.options.dragStartEventName),this.stopAnimation(),this.lastDragPosition=!1,this.hasInteraction=!0,this.handleDrag(t)},handleDrag:function(t){if(this.zoomFactor>1){var e=this.getTouches(t)[0];this.drag(e,this.lastDragPosition),this.offset=this.sanitizeOffset(this.offset),this.lastDragPosition=e}},handleDragEnd:function(){this.el.trigger(this.options.dragEndEventName),this.end()},handleZoomStart:function(t){this.el.trigger(this.options.zoomStartEventName),this.stopAnimation(),this.lastScale=1,this.nthZoom=0,this.lastZoomCenter=!1,this.hasInteraction=!0},handleZoom:function(t,e){var i=this.getTouchCenter(this.getTouches(t)),n=e/this.lastScale;this.lastScale=e,this.nthZoom+=1,this.nthZoom>3&&(this.scale(n,i),this.drag(i,this.lastZoomCenter)),this.lastZoomCenter=i},handleZoomEnd:function(){this.el.trigger(this.options.zoomEndEventName),this.end()},handleDoubleTap:function(t){var e=this.getTouches(t)[0],i=this.zoomFactor>1?1:this.options.tapZoomFactor,n=this.zoomFactor,s=function(t){this.scaleTo(n+t*(i-n),e)}.bind(this);this.hasInteraction||(n>i&&(e=this.getCurrentZoomCenter()),this.animate(this.options.animationDuration,s,this.swing),this.el.trigger(this.options.doubleTapEventName))},sanitizeOffset:function(t){var e=(this.zoomFactor-1)*this.getContainerX(),i=(this.zoomFactor-1)*this.getContainerY(),n=Math.max(e,0),s=Math.max(i,0),o=Math.min(e,0),a=Math.min(i,0);return{x:Math.min(Math.max(t.x,o),n),y:Math.min(Math.max(t.y,a),s)}},scaleTo:function(t,e){this.scale(t/this.zoomFactor,e)},scale:function(t,e){t=this.scaleZoomFactor(t),this.addOffset({x:(t-1)*(e.x+this.offset.x),y:(t-1)*(e.y+this.offset.y)})},scaleZoomFactor:function(t){var e=this.zoomFactor;return this.zoomFactor*=t,this.zoomFactor=Math.min(this.options.maxZoom,Math.max(this.zoomFactor,this.options.minZoom)),this.zoomFactor/e},drag:function(t,e){e&&(this.options.lockDragAxis?Math.abs(t.x-e.x)>Math.abs(t.y-e.y)?this.addOffset({x:-(t.x-e.x),y:0}):this.addOffset({y:-(t.y-e.y),x:0}):this.addOffset({y:-(t.y-e.y),x:-(t.x-e.x)}))},getTouchCenter:function(t){return this.getVectorAvg(t)},getVectorAvg:function(t){return{x:t.map(function(t){return t.x}).reduce(i)/t.length,y:t.map(function(t){return t.y}).reduce(i)/t.length}},addOffset:function(t){this.offset={x:this.offset.x+t.x,y:this.offset.y+t.y}},sanitize:function(){this.zoomFactor<this.options.zoomOutFactor?this.zoomOutAnimation():this.isInsaneOffset(this.offset)&&this.sanitizeOffsetAnimation()},isInsaneOffset:function(t){var e=this.sanitizeOffset(t);return e.x!==t.x||e.y!==t.y},sanitizeOffsetAnimation:function(){var t=this.sanitizeOffset(this.offset),e={x:this.offset.x,y:this.offset.y},i=function(i){this.offset.x=e.x+i*(t.x-e.x),this.offset.y=e.y+i*(t.y-e.y),this.update()}.bind(this);this.animate(this.options.animationDuration,i,this.swing)},zoomOutAnimation:function(){var t=this.zoomFactor,e=1,i=this.getCurrentZoomCenter(),n=function(n){this.scaleTo(t+n*(e-t),i)}.bind(this);this.animate(this.options.animationDuration,n,this.swing)},updateAspectRatio:function(){this.setContainerY(this.getContainerX()/this.getAspectRatio())},getInitialZoomFactor:function(){return this.container[0].offsetWidth/this.el[0].offsetWidth},getAspectRatio:function(){return this.el[0].offsetWidth/this.el[0].offsetHeight},getCurrentZoomCenter:function(){var t=this.container[0].offsetWidth*this.zoomFactor,e=this.offset.x,i=t-e-this.container[0].offsetWidth,n=e/i,s=n*this.container[0].offsetWidth/(n+1),o=this.container[0].offsetHeight*this.zoomFactor,a=this.offset.y,r=o-a-this.container[0].offsetHeight,l=a/r,c=l*this.container[0].offsetHeight/(l+1);return 0===i&&(s=this.container[0].offsetWidth),0===r&&(c=this.container[0].offsetHeight),{x:s,y:c}},canDrag:function(){return!n(this.zoomFactor,1)},getTouches:function(t){var e=this.container.offset();return Array.prototype.slice.call(t.touches).map(function(t){return{x:t.pageX-e.left,y:t.pageY-e.top}})},animate:function(t,e,i,n){var s=(new Date).getTime(),a=function(){if(this.inAnimation){var r=(new Date).getTime()-s,l=r/t;r>=t?(e(1),n&&n(),this.update(),this.stopAnimation(),this.update()):(i&&(l=i(l)),e(l),this.update(),o(a))}}.bind(this);this.inAnimation=!0,o(a)},stopAnimation:function(){this.inAnimation=!1},swing:function(t){return-Math.cos(t*Math.PI)/2+.5},getContainerX:function(){return this.container[0].offsetWidth},getContainerY:function(){return this.container[0].offsetHeight},setContainerY:function(t){return this.container.height(t)},setupMarkup:function(){this.container=t('<div class="pinch-zoom-container"></div>'),this.el.before(this.container),this.container.append(this.el),this.container.css({overflow:"hidden",position:"relative"}),this.el.css({"-webkit-transform-origin":"0% 0%","-moz-transform-origin":"0% 0%","-ms-transform-origin":"0% 0%","-o-transform-origin":"0% 0%","transform-origin":"0% 0%",position:"absolute"})},end:function(){this.hasInteraction=!1,this.sanitize(),this.update()},bindEvents:function(){s(this.container.get(0),this),t(window).on("resize",this.update.bind(this)),t(this.el).find("img").on("load",this.update.bind(this))},update:function(){this.updatePlaned||(this.updatePlaned=!0,setTimeout(function(){this.updatePlaned=!1,this.updateAspectRatio();var t=this.getInitialZoomFactor()*this.zoomFactor,e=-this.offset.x/t,i=-this.offset.y/t,n="scale3d("+t+", "+t+",1) translate3d("+e+"px,"+i+"px,0px)",s="scale("+t+", "+t+") translate("+e+"px,"+i+"px)",o=function(){this.clone&&(this.clone.remove(),delete this.clone)}.bind(this);!this.options.use2d||this.hasInteraction||this.inAnimation?(this.is3d=!0,o(),this.el.css({"-webkit-transform":n,"-o-transform":s,"-ms-transform":s,"-moz-transform":s,transform:n})):(this.is3d&&(this.clone=this.el.clone(),this.clone.css("pointer-events","none"),this.clone.appendTo(this.container),setTimeout(o,200)),this.el.css({"-webkit-transform":s,"-o-transform":s,"-ms-transform":s,"-moz-transform":s,transform:s}),this.is3d=!1)}.bind(this),0))},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1}};var s=function(t,e){var i=null,n=0,s=null,o=null,a=function(t,n){if(i!==t){if(i&&!t)switch(i){case"zoom":e.handleZoomEnd(n);break;case"drag":e.handleDragEnd(n)}switch(t){case"zoom":e.handleZoomStart(n);break;case"drag":e.handleDragStart(n)}}i=t},r=function(t){2===n?a("zoom"):1===n&&e.canDrag()?a("drag",t):a(null,t)},l=function(t){return Array.prototype.slice.call(t).map(function(t){return{x:t.pageX,y:t.pageY}})},c=function(t,e){var i,n;return i=t.x-e.x,n=t.y-e.y,Math.sqrt(i*i+n*n)},h=function(t,e){var i=c(t[0],t[1]),n=c(e[0],e[1]);return n/i},u=function(t){t.stopPropagation(),t.preventDefault()},d=function(t){var o=(new Date).getTime();if(n>1&&(s=null),300>o-s)switch(u(t),e.handleDoubleTap(t),i){case"zoom":e.handleZoomEnd(t);break;case"drag":e.handleDragEnd(t)}1===n&&(s=o)},p=!0;t.addEventListener("touchstart",function(t){e.enabled&&(p=!0,n=t.touches.length,d(t))}),t.addEventListener("touchmove",function(t){if(e.enabled){if(p)r(t),i&&u(t),o=l(t.touches);else{switch(i){case"zoom":e.handleZoom(t,h(o,l(t.touches)));break;case"drag":e.handleDrag(t)}i&&(u(t),e.update())}p=!1}}),t.addEventListener("touchend",function(t){e.enabled&&(n=t.touches.length,r(t))})};return e};t.exports=s.pichzoom=a(n)},function(t,e,i){"use strict";var n=i(1),s=i(2),o=n(window),a=function(t,e){this.options=n.extend({},a.DEFAULTS,e),this.$element=n(t),this.active=null,this.$popover=this.options.target&&n(this.options.target)||null,this.init(),this._bindEvents()};a.DEFAULTS={theme:null,trigger:"click",content:"",open:!1,target:null,tpl:'<div class="am-popover"><div class="am-popover-inner"></div><div class="am-popover-caret"></div></div>'},a.prototype.init=function(){function t(){i.sizePopover()}var e,i=this,o=this.$element;this.options.target||(this.$popover=this.getPopover(),this.setContent()),e=this.$popover,e.appendTo(n("body")),this.sizePopover(),o.on("open.popover.amui",function(){n(window).on("resize.popover.amui",s.utils.debounce(t,50))}),o.on("close.popover.amui",function(){n(window).off("resize.popover.amui",t)}),this.options.open&&this.open()},a.prototype.sizePopover=function(){var t=this.$element,e=this.$popover;if(e&&e.length){var i=e.outerWidth(),n=e.outerHeight(),s=e.find(".am-popover-caret"),a=s.outerWidth()/2||8,r=n+8,l=t.outerWidth(),c=t.outerHeight(),h=t.offset(),u=t[0].getBoundingClientRect(),d=o.height(),p=o.width(),m=0,f=0,v=0,g=2,y="top";e.css({left:"",top:""}).removeClass("am-popover-left am-popover-right am-popover-top am-popover-bottom"),r-g<u.top+g?m=h.top-r-g:r<d-u.top-u.height?(y="bottom",m=h.top+c+a+g):(y="middle",m=c/2+h.top-n/2),"top"===y||"bottom"===y?(f=l/2+h.left-i/2,v=f,5>f&&(f=5),f+i>p&&(f=p-i-20),"top"===y&&e.addClass("am-popover-top"),"bottom"===y&&e.addClass("am-popover-bottom"),v-=f):"middle"===y&&(f=h.left-i-a,e.addClass("am-popover-left"),5>f&&(f=h.left+l+a,e.removeClass("am-popover-left").addClass("am-popover-right")),f+i>p&&(f=p-i-5,e.removeClass("am-popover-left").addClass("am-popover-right"))),e.css({top:m+"px",left:f+"px"})}},a.prototype.toggle=function(){return this[this.active?"close":"open"]()},a.prototype.open=function(){var t=this.$popover;this.$element.trigger("open.popover.amui"),this.sizePopover(),t.show().addClass("am-active"),this.active=!0},a.prototype.close=function(){var t=this.$popover;this.$element.trigger("close.popover.amui"),t.removeClass("am-active").trigger("closed.popover.amui").hide(),this.active=!1},a.prototype.getPopover=function(){var t=s.utils.generateGUID("am-popover"),e=[];return this.options.theme&&n.each(this.options.theme.split(" "),function(t,i){e.push("am-popover-"+n.trim(i))}),n(this.options.tpl).attr("id",t).addClass(e.join(" "))},a.prototype.setContent=function(t){t=t||this.options.content,this.$popover&&this.$popover.find(".am-popover-inner").empty().html(t)},a.prototype._bindEvents=function(){for(var t="popover.amui",e=this.options.trigger.split(" "),i=e.length;i--;){var s=e[i];if("click"===s)this.$element.on("click."+t,n.proxy(this.toggle,this));else{var o="hover"==s?"mouseenter":"focusin",a="hover"==s?"mouseleave":"focusout";this.$element.on(o+"."+t,n.proxy(this.open,this)),this.$element.on(a+"."+t,n.proxy(this.close,this))}}},a.prototype.destroy=function(){this.$element.off(".popover.amui").removeData("amui.popover"),this.$popover.remove()},s.plugin("popover",a),s.ready(function(t){n("[data-am-popover]",t).popover()}),t.exports=a},function(t,e,i){"use strict";var n=i(2),s=function(){function t(t,e,i){return e>t?e:t>i?i:t}function e(t){return 100*(-1+t)}function i(t,i,n){var s;return s="translate3d"===c.positionUsing?{transform:"translate3d("+e(t)+"%,0,0)"}:"translate"===c.positionUsing?{transform:"translate("+e(t)+"%,0)"}:{"margin-left":e(t)+"%"},s.transition="all "+i+"ms "+n,s}function n(t,e){var i="string"==typeof t?t:a(t);return i.indexOf(" "+e+" ")>=0}function s(t,e){var i=a(t),s=i+e;n(i,e)||(t.className=s.substring(1))}function o(t,e){var i,s=a(t);n(t,e)&&(i=s.replace(" "+e+" "," "),t.className=i.substring(1,i.length-1))}function a(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function r(t){t&&t.parentNode&&t.parentNode.removeChild(t)}var l={};l.version="0.2.0";var c=l.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,parent:"body",barSelector:'[role="nprogress-bar"]',spinnerSelector:'[role="nprogress-spinner"]',template:'<div class="nprogress-bar" role="nprogress-bar"><div class="nprogress-peg"></div></div><div class="nprogress-spinner" role="nprogress-spinner"><div class="nprogress-spinner-icon"></div></div>'};l.configure=function(t){var e,i;for(e in t)i=t[e],void 0!==i&&t.hasOwnProperty(e)&&(c[e]=i);return this},l.status=null,l.set=function(e){var n=l.isStarted();e=t(e,c.minimum,1),l.status=1===e?null:e;var s=l.render(!n),o=s.querySelector(c.barSelector),a=c.speed,r=c.easing;return s.offsetWidth,h(function(t){""===c.positionUsing&&(c.positionUsing=l.getPositioningCSS()),u(o,i(e,a,r)),1===e?(u(s,{transition:"none",opacity:1}),s.offsetWidth,setTimeout(function(){u(s,{transition:"all "+a+"ms linear",opacity:0}),setTimeout(function(){l.remove(),t()},a)},a)):setTimeout(t,a)}),this},l.isStarted=function(){return"number"==typeof l.status},l.start=function(){l.status||l.set(0);var t=function(){setTimeout(function(){l.status&&(l.trickle(),t())},c.trickleSpeed)};return c.trickle&&t(),this},l.done=function(t){return t||l.status?l.inc(.3+.5*Math.random()).set(1):this},l.inc=function(e){var i=l.status;return i?("number"!=typeof e&&(e=(1-i)*t(Math.random()*i,.1,.95)),i=t(i+e,0,.994),l.set(i)):l.start()},l.trickle=function(){return l.inc(Math.random()*c.trickleRate)},function(){var t=0,e=0;l.promise=function(i){return i&&"resolved"!==i.state()?(0===e&&l.start(),t++,e++,i.always(function(){e--,0===e?(t=0,l.done()):l.set((t-e)/t)}),this):this}}(),l.render=function(t){if(l.isRendered())return document.getElementById("nprogress");s(document.documentElement,"nprogress-busy");var i=document.createElement("div");i.id="nprogress",i.innerHTML=c.template;var n,o=i.querySelector(c.barSelector),a=t?"-100":e(l.status||0),h=document.querySelector(c.parent);return u(o,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),c.showSpinner||(n=i.querySelector(c.spinnerSelector),n&&r(n)),h!=document.body&&s(h,"nprogress-custom-parent"),h.appendChild(i),i},l.remove=function(){o(document.documentElement,"nprogress-busy"),o(document.querySelector(c.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&r(t)},l.isRendered=function(){return!!document.getElementById("nprogress")},l.getPositioningCSS=function(){var t=document.body.style,e="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return e+"Perspective"in t?"translate3d":e+"Transform"in t?"translate":"margin"};var h=function(){function t(){var i=e.shift();i&&i(t)}var e=[];return function(i){e.push(i),1==e.length&&t()}}(),u=function(){function t(t){return t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(t,e){return e.toUpperCase()})}function e(t){var e=document.body.style;if(t in e)return t;for(var i,n=s.length,o=t.charAt(0).toUpperCase()+t.slice(1);n--;)if(i=s[n]+o,i in e)return i;return t}function i(i){return i=t(i),o[i]||(o[i]=e(i))}function n(t,e,n){e=i(e),t.style[e]=n}var s=["Webkit","O","Moz","ms"],o={};return function(t,e){var i,s,o=arguments;if(2==o.length)for(i in e)s=e[i],void 0!==s&&e.hasOwnProperty(i)&&n(t,i,s);else n(t,o[1],o[2])}}();return l}();t.exports=n.progress=s},function(t,e,i){"use strict";var n=i(1),s=i(2),o=i(17),a=i(3),r=s.support.animation,l=s.support.transition,c=function(t,e){this.$element=n(t),this.$body=n(document.body),this.options=n.extend({},c.DEFAULTS,e),this.$pureview=n(this.options.tpl).attr("id",s.utils.generateGUID("am-pureview")),this.$slides=null,this.transitioning=null,this.scrollbarWidth=0,this.init()};c.DEFAULTS={tpl:'<div class="am-pureview am-pureview-bar-active"><ul class="am-pureview-slider"></ul><ul class="am-pureview-direction"><li class="am-pureview-prev"><a href=""></a></li><li class="am-pureview-next"><a href=""></a></li></ul><ol class="am-pureview-nav"></ol><div class="am-pureview-bar am-active"><span class="am-pureview-title"></span><div class="am-pureview-counter"><span class="am-pureview-current"></span> / <span class="am-pureview-total"></span></div></div><div class="am-pureview-actions am-active"><a href="javascript: void(0)" class="am-icon-chevron-left" data-am-close="pureview"></a></div></div>',className:{prevSlide:"am-pureview-slide-prev",nextSlide:"am-pureview-slide-next",onlyOne:"am-pureview-only",active:"am-active",barActive:"am-pureview-bar-active",activeBody:"am-pureview-active"},selector:{slider:".am-pureview-slider",close:'[data-am-close="pureview"]',total:".am-pureview-total",current:".am-pureview-current",title:".am-pureview-title",actions:".am-pureview-actions",bar:".am-pureview-bar",pinchZoom:".am-pinch-zoom",nav:".am-pureview-nav"},shareBtn:!1,toggleToolbar:!0,target:"img",weChatImagePreview:!0},c.prototype.init=function(){var t=this,e=this.options,i=this.$element,s=this.$pureview;this.refreshSlides(),n("body").append(s),this.$title=s.find(e.selector.title),this.$current=s.find(e.selector.current),this.$bar=s.find(e.selector.bar),this.$actions=s.find(e.selector.actions),e.shareBtn&&this.$actions.append('<a href="javascript: void(0)" class="am-icon-share-square-o" data-am-toggle="share"></a>'),
this.$element.on("click.pureview.amui",e.target,function(i){i.preventDefault();var n=t.$images.index(this);e.weChatImagePreview&&window.WeixinJSBridge?window.WeixinJSBridge.invoke("imagePreview",{current:t.imgUrls[n],urls:t.imgUrls}):t.open(n)}),s.find(".am-pureview-direction").on("click.direction.pureview.amui","li",function(e){e.preventDefault(),n(this).is(".am-pureview-prev")?t.prevSlide():t.nextSlide()}),s.find(e.selector.nav).on("click.nav.pureview.amui","li",function(){var e=t.$navItems.index(n(this));t.activate(t.$slides.eq(e))}),s.find(e.selector.close).on("click.close.pureview.amui",function(e){e.preventDefault(),t.close()}),this.$slider.hammer().on("swipeleft.pureview.amui",function(e){e.preventDefault(),t.nextSlide()}).on("swiperight.pureview.amui",function(e){e.preventDefault(),t.prevSlide()}).on("press.pureview.amui",function(i){i.preventDefault(),e.toggleToolbar&&t.toggleToolBar()}),this.$slider.data("hammer").get("swipe").set({direction:a.DIRECTION_HORIZONTAL,velocity:.35}),i.DOMObserve({childList:!0,subtree:!0},function(t,e){}),i.on("changed.dom.amui",function(e){e.stopPropagation(),t.refreshSlides()}),n(document).on("keydown.pureview.amui",n.proxy(function(t){var e=t.keyCode;37==e?this.prevSlide():39==e?this.nextSlide():27==e&&this.close()},this))},c.prototype.refreshSlides=function(){this.$images=this.$element.find(this.options.target);var t=this,e=this.options,i=this.$pureview,o=n([]),a=n([]),r=this.$images,l=r.length;this.$slider=i.find(e.selector.slider),this.$nav=i.find(e.selector.nav);var c="data-am-pureviewed";this.imgUrls=this.imgUrls||[],l&&(1===l&&i.addClass(e.className.onlyOne),r.not("["+c+"]").each(function(e,i){var r,l;"A"===i.nodeName?(r=i.href,l=i.title||""):(r=n(i).data("rel")||i.src,r=s.utils.getAbsoluteUrl(r),l=n(i).attr("alt")||""),i.setAttribute(c,"1"),t.imgUrls.push(r),o=o.add(n('<li data-src="'+r+'" data-title="'+l+'"></li>')),a=a.add(n("<li>"+(e+1)+"</li>"))}),i.find(e.selector.total).text(l),this.$slider.append(o),this.$nav.append(a),this.$navItems=this.$nav.find("li"),this.$slides=this.$slider.find("li"))},c.prototype.loadImage=function(t,e){var i="image-appended";if(!t.data(i)){var s=n("<img>",{src:t.data("src"),alt:t.data("title")});t.html(s).wrapInner('<div class="am-pinch-zoom"></div>').redraw();var a=t.find(this.options.selector.pinchZoom);a.data("amui.pinchzoom",new o(a[0],{})),t.data("image-appended",!0)}e&&e.call(this)},c.prototype.activate=function(t){var e=this.options,i=this.$slides,o=i.index(t),a=t.data("title")||"",r=e.className.active;i.find("."+r).is(t)||this.transitioning||(this.loadImage(t,function(){s.utils.imageLoader(t.find("img"),function(e){t.find(".am-pinch-zoom").addClass("am-pureview-loaded"),n(e).addClass("am-img-loaded")})}),this.transitioning=1,this.$title.text(a),this.$current.text(o+1),i.removeClass(),t.addClass(r),i.eq(o-1).addClass(e.className.prevSlide),i.eq(o+1).addClass(e.className.nextSlide),this.$navItems.removeClass().eq(o).addClass(e.className.active),l?t.one(l.end,n.proxy(function(){this.transitioning=0},this)).emulateTransitionEnd(300):this.transitioning=0)},c.prototype.nextSlide=function(){if(1!==this.$slides.length){var t=this.$slides,e=t.filter(".am-active"),i=t.index(e),n="am-animation-right-spring";i+1>=t.length?r&&e.addClass(n).on(r.end,function(){e.removeClass(n)}):this.activate(t.eq(i+1))}},c.prototype.prevSlide=function(){if(1!==this.$slides.length){var t=this.$slides,e=t.filter(".am-active"),i=this.$slides.index(e),n="am-animation-left-spring";0===i?r&&e.addClass(n).on(r.end,function(){e.removeClass(n)}):this.activate(t.eq(i-1))}},c.prototype.toggleToolBar=function(){this.$pureview.toggleClass(this.options.className.barActive)},c.prototype.open=function(t){var e=t||0;this.checkScrollbar(),this.setScrollbar(),this.activate(this.$slides.eq(e)),this.$pureview.show().redraw().addClass(this.options.className.active),this.$body.addClass(this.options.className.activeBody)},c.prototype.close=function(){function t(){this.$pureview.hide(),this.$body.removeClass(e.className.activeBody),this.resetScrollbar()}var e=this.options;this.$pureview.removeClass(e.className.active),this.$slides.removeClass(),l?this.$pureview.one(l.end,n.proxy(t,this)).emulateTransitionEnd(300):t.call(this)},c.prototype.checkScrollbar=function(){this.scrollbarWidth=s.utils.measureScrollbar()},c.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",t+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},s.plugin("pureview",c),s.ready(function(t){n("[data-am-pureview]",t).pureview()}),t.exports=c},function(t,e,i){"use strict";var n=i(1),s=i(2),o=function(t,e){if(s.support.animation){this.options=n.extend({},o.DEFAULTS,e),this.$element=n(t);var i=function(){s.utils.rAF.call(window,n.proxy(this.checkView,this))}.bind(this);this.$window=n(window).on("scroll.scrollspy.amui",i).on("resize.scrollspy.amui orientationchange.scrollspy.amui",s.utils.debounce(i,50)),this.timer=this.inViewState=this.initInView=null,i()}};o.DEFAULTS={animation:"fade",className:{inView:"am-scrollspy-inview",init:"am-scrollspy-init"},repeat:!0,delay:0,topOffset:0,leftOffset:0},o.prototype.checkView=function(){var t=this.$element,e=this.options,i=s.utils.isInView(t,e),n=e.animation?" am-animation-"+e.animation:"";i&&!this.inViewState&&(this.timer&&clearTimeout(this.timer),this.initInView||(t.addClass(e.className.init),this.offset=t.offset(),this.initInView=!0,t.trigger("init.scrollspy.amui")),this.timer=setTimeout(function(){i&&t.addClass(e.className.inView+n).width()},e.delay),this.inViewState=!0,t.trigger("inview.scrollspy.amui")),!i&&this.inViewState&&e.repeat&&(t.removeClass(e.className.inView+n),this.inViewState=!1,t.trigger("outview.scrollspy.amui"))},o.prototype.check=function(){s.utils.rAF.call(window,n.proxy(this.checkView,this))},s.plugin("scrollspy",o),s.ready(function(t){n("[data-am-scrollspy]",t).scrollspy()}),t.exports=o},function(t,e,i){"use strict";var n=i(1),s=i(2);i(23);var o=function(t,e){this.options=n.extend({},o.DEFAULTS,e),this.$element=n(t),this.anchors=[],this.$links=this.$element.find('a[href^="#"]').each(function(t,e){this.anchors.push(n(e).attr("href"))}.bind(this)),this.$targets=n(this.anchors.join(", "));var i=function(){s.utils.rAF.call(window,n.proxy(this.process,this))}.bind(this);this.$window=n(window).on("scroll.scrollspynav.amui",i).on("resize.scrollspynav.amui orientationchange.scrollspynav.amui",s.utils.debounce(i,50)),i(),this.scrollProcess()};o.DEFAULTS={className:{active:"am-active"},closest:!1,smooth:!0,offsetTop:0},o.prototype.process=function(){var t=this.$window.scrollTop(),e=this.options,i=[],o=this.$links,a=this.$targets;if(a.each(function(t,n){s.utils.isInView(n,e)&&i.push(n)}),i.length){var r;if(n.each(i,function(e,i){return n(i).offset().top>=t?(r=n(i),!1):void 0}),!r)return;e.closest?(o.closest(e.closest).removeClass(e.className.active),o.filter('a[href="#'+r.attr("id")+'"]').closest(e.closest).addClass(e.className.active)):o.removeClass(e.className.active).filter('a[href="#'+r.attr("id")+'"]').addClass(e.className.active)}},o.prototype.scrollProcess=function(){var t=this.$links,e=this.options;e.smooth&&n.fn.smoothScroll&&t.on("click",function(t){t.preventDefault();var i=n(this),s=n(i.attr("href"));if(s){var o=e.offsetTop&&!isNaN(parseInt(e.offsetTop))&&parseInt(e.offsetTop)||0;n(window).smoothScroll({position:s.offset().top-o})}})},s.plugin("scrollspynav",o),s.ready(function(t){n("[data-am-scrollspy-nav]",t).scrollspynav()}),t.exports=o},function(t,e,i){"use strict";var n=i(1),s=i(2),o=s.utils.rAF,a=s.utils.cancelAF,r=!1,l=function(t,e){function i(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)}function s(){p.off("touchstart.smoothscroll.amui",w),r=!1}function c(t){r&&(h||(h=t),u=Math.min(1,Math.max((t-h)/y,0)),d=Math.round(f+g*i(u)),g>0&&d>m&&(d=m),0>g&&m>d&&(d=m),v!=d&&p.scrollTop(d),v=d,d!==m?(a(b),b=o(c)):(a(b),s()))}e=e||{};var h,u,d,p=n(t),m=parseInt(e.position)||l.DEFAULTS.position,f=p.scrollTop(),v=f,g=m-f,y=e.speed||Math.min(750,Math.min(1500,Math.abs(f-m))),w=function(){s()};if(!r&&0!==g){p.on("touchstart.smoothscroll.amui",w),r=!0;var b=o(c)}};l.DEFAULTS={position:0},n.fn.smoothScroll=function(t){return this.each(function(){new l(this,t)})},n(document).on("click.smoothScroll.amui.data-api","[data-am-smooth-scroll]",function(t){t.preventDefault();var e=s.utils.parseOptions(n(this).data("amSmoothScroll"));n(window).smoothScroll(e)}),t.exports=l},function(t,e,i){"use strict";var n=i(1),s=i(2);n.expr[":"].containsNC=function(t,e,i,n){return(t.textContent||t.innerText||"").toLowerCase().indexOf((i[3]||"").toLowerCase())>=0};var o=function(t,e){this.$element=n(t),this.options=n.extend({},o.DEFAULTS,{placeholder:t.getAttribute("placeholder")||o.DEFAULTS.placeholder},e),this.$originalOptions=this.$element.find("option"),this.multiple=t.multiple,this.$selector=null,this.initialized=!1,this.init()};o.DEFAULTS={btnWidth:null,btnSize:null,btnStyle:"default",dropUp:0,maxHeight:null,maxChecked:null,placeholder:"\u70b9\u51fb\u9009\u62e9...",selectedClass:"am-checked",disabledClass:"am-disabled",searchBox:!1,tpl:'<div class="am-selected am-dropdown <%= dropUp ? \'am-dropdown-up\': \'\' %>" id="<%= id %>" data-am-dropdown>  <button type="button" class="am-selected-btn am-btn am-dropdown-toggle">    <span class="am-selected-status am-fl"></span>    <i class="am-selected-icon am-icon-caret-<%= dropUp ? \'up\' : \'down\' %>"></i>  </button>  <div class="am-selected-content am-dropdown-content">    <h2 class="am-selected-header"><span class="am-icon-chevron-left">\u8fd4\u56de</span></h2>   <% if (searchBox) { %>   <div class="am-selected-search">     <input autocomplete="off" class="am-form-field am-input-sm" />   </div>   <% } %>    <ul class="am-selected-list">      <% for (var i = 0; i < options.length; i++) { %>       <% var option = options[i] %>       <% if (option.header) { %>  <li data-group="<%= option.group %>" class="am-selected-list-header">       <%= option.text %></li>       <% } else { %>       <li class="<%= option.classNames%>"          data-index="<%= option.index %>"          data-group="<%= option.group || 0 %>"          data-value="<%= option.value %>" >         <span class="am-selected-text"><%= option.text %></span>         <i class="am-icon-check"></i></li>      <% } %>      <% } %>    </ul>    <div class="am-selected-hint"></div>  </div></div>',listTpl:'<% for (var i = 0; i < options.length; i++) { %>       <% var option = options[i] %>       <% if (option.header) { %>  <li data-group="<%= option.group %>" class="am-selected-list-header">       <%= option.text %></li>       <% } else { %>       <li class="<%= option.classNames %>"          data-index="<%= option.index %>"          data-group="<%= option.group || 0 %>"          data-value="<%= option.value %>" >         <span class="am-selected-text"><%= option.text %></span>         <i class="am-icon-check"></i></li>      <% } %>      <% } %>'},o.prototype.init=function(){var t=this,e=this.$element,i=this.options;e.hide();var o={id:s.utils.generateGUID("am-selected"),multiple:this.multiple,options:[],searchBox:i.searchBox,dropUp:i.dropUp,placeholder:i.placeholder};this.$selector=n(s.template(this.options.tpl,o)),this.$selector.css({width:this.options.btnWidth}),this.$element[0].disabled&&this.$selector.addClass(i.disabledClass),this.$list=this.$selector.find(".am-selected-list"),this.$searchField=this.$selector.find(".am-selected-search input"),this.$hint=this.$selector.find(".am-selected-hint");var a=this.$selector.find(".am-selected-btn"),r=[];i.btnSize&&r.push("am-btn-"+i.btnSize),i.btnStyle&&r.push("am-btn-"+i.btnStyle),a.addClass(r.join(" ")),this.$selector.dropdown({justify:a}),i.maxHeight&&this.$selector.find(".am-selected-list").css({"max-height":i.maxHeight,"overflow-y":"scroll"});var l=[],c=e.attr("minchecked"),h=e.attr("maxchecked")||i.maxChecked;this.maxChecked=h||1/0,e[0].required&&l.push("\u5fc5\u9009"),(c||h)&&(c&&l.push("\u81f3\u5c11\u9009\u62e9 "+c+" \u9879"),h&&l.push("\u81f3\u591a\u9009\u62e9 "+h+" \u9879")),this.$hint.text(l.join("\uff0c")),this.renderOptions(),this.$element.after(this.$selector),this.dropdown=this.$selector.data("amui.dropdown"),this.$status=this.$selector.find(".am-selected-status"),setTimeout(function(){t.syncData(),t.initialized=!0},0),this.bindEvents()},o.prototype.renderOptions=function(){function t(t,e,s){if(""===e.value)return!0;var o="";e.disabled&&(o+=i.disabledClass),!e.disabled&&e.selected&&(o+=i.selectedClass),n.push({group:s,index:t,classNames:o,text:e.text,value:e.value})}var e=this.$element,i=this.options,n=[],o=e.find("optgroup");this.$originalOptions=this.$element.find("option"),this.multiple||null!==e.val()||this.$originalOptions.length&&(this.$originalOptions.get(0).selected=!0),o.length?o.each(function(e){n.push({header:!0,group:e+1,text:this.label}),o.eq(e).find("option").each(function(i,n){t(i,n,e)})}):this.$originalOptions.each(function(e,i){t(e,i,null)}),this.$list.html(s.template(i.listTpl,{options:n})),this.$shadowOptions=this.$list.find("> li").not(".am-selected-list-header")},o.prototype.setChecked=function(t){var e=this.options,i=n(t),s=i.hasClass(e.selectedClass);if(this.multiple){var o=this.$list.find("."+e.selectedClass).length;if(!s&&this.maxChecked<=o)return this.$element.trigger("checkedOverflow.selected.amui",{selected:this}),!1}else{if(this.dropdown.close(),s)return!1;this.$shadowOptions.not(i).removeClass(e.selectedClass)}i.toggleClass(e.selectedClass),this.syncData(t)},o.prototype.syncData=function(t){var e=this,i=this.options,s=[],o=n([]);if(this.$shadowOptions.filter("."+i.selectedClass).each(function(){var i=n(this);s.push(i.find(".am-selected-text").text()),t||(o=o.add(e.$originalOptions.filter('[value="'+i.data("value")+'"]').prop("selected",!0)))}),t){var a=n(t);this.$originalOptions.filter('[value="'+a.data("value")+'"]').prop("selected",a.hasClass(i.selectedClass))}else this.$originalOptions.not(o).prop("selected",!1);this.$element.val()||(s=[i.placeholder]),this.$status.text(s.join(", ")),this.initialized&&this.$element.trigger("change")},o.prototype.bindEvents=function(){var t=this,e="am-selected-list-header",i=s.utils.debounce(function(i){t.$shadowOptions.not("."+e).hide().filter(':containsNC("'+i.target.value+'")').show()},100);this.$list.on("click","> li",function(i){var s=n(this);!s.hasClass(t.options.disabledClass)&&!s.hasClass(e)&&t.setChecked(this)}),this.$searchField.on("keyup.selected.amui",i),this.$selector.on("closed.dropdown.amui",function(){t.$searchField.val(""),t.$shadowOptions.css({display:""})}),this.$element.on("validated.field.validator.amui",function(e){if(e.validity){var i=e.validity.valid,n="am-invalid";t.$selector[(i?"remove":"add")+"Class"](n)}}),s.support.mutationobserver&&(this.observer=new s.support.mutationobserver(function(){t.$element.trigger("changed.selected.amui")}),this.observer.observe(this.$element[0],{childList:!0,attributes:!0,subtree:!0,characterData:!0})),this.$element.on("changed.selected.amui",function(){t.renderOptions(),t.syncData()})},o.prototype.select=function(t){var e;e="number"==typeof t?this.$list.find("> li").not(".am-selected-list-header").eq(t):"string"==typeof t?this.$list.find(t):n(t),e.trigger("click")},o.prototype.enable=function(){this.$element.prop("disable",!1),this.$selector.dropdown("enable")},o.prototype.disable=function(){this.$element.prop("disable",!0),this.$selector.dropdown("disable")},o.prototype.destroy=function(){this.$element.removeData("amui.selected").show(),this.$selector.remove()},s.plugin("selected",o),s.ready(function(t){n("[data-am-selected]",t).selected()}),t.exports=o},function(t,e,i){"use strict";i(15);var n=i(1),s=i(2),o=i(26),a=document,r=n(a),l=function(t){this.options=n.extend({},l.DEFAULTS,t||{}),this.$element=null,this.$wechatQr=null,this.pics=null,this.inited=!1,this.active=!1};l.DEFAULTS={sns:["weibo","qq","qzone","tqq","wechat","renren"],title:"\u5206\u4eab\u5230",cancel:"\u53d6\u6d88",closeOnShare:!0,id:s.utils.generateGUID("am-share"),desc:"Hi\uff0c\u5b64\u591c\u89c2\u5929\u8c61\uff0c\u53d1\u73b0\u4e00\u4e2a\u4e0d\u9519\u7684\u897f\u897f\uff0c\u5206\u4eab\u4e00\u4e0b\u4e0b ;-)",via:"Amaze UI",tpl:'<div class="am-share am-modal-actions" id="<%= id %>"><h3 class="am-share-title"><%= title %></h3><ul class="am-share-sns am-avg-sm-3"><% for(var i = 0; i < sns.length; i++) {%><li><a href="<%= sns[i].shareUrl %>" data-am-share-to="<%= sns[i].id %>" ><i class="am-icon-<%= sns[i].icon %>"></i><span><%= sns[i].title %></span></a></li><% } %></ul><div class="am-share-footer"><button class="am-btn am-btn-default am-btn-block" data-am-share-close><%= cancel %></button></div></div>'},l.SNS={weibo:{title:"\u65b0\u6d6a\u5fae\u535a",url:"http://service.weibo.com/share/share.php",width:620,height:450,icon:"weibo"},qq:{title:"QQ \u597d\u53cb",url:"http://connect.qq.com/widget/shareqq/index.html",icon:"qq"},qzone:{title:"QQ \u7a7a\u95f4",url:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",icon:"star"},tqq:{title:"\u817e\u8baf\u5fae\u535a",url:"http://v.t.qq.com/share/share.php",icon:"tencent-weibo"},wechat:{title:"\u5fae\u4fe1",url:"[qrcode]",icon:"wechat"},renren:{title:"\u4eba\u4eba\u7f51",url:"http://widget.renren.com/dialog/share",icon:"renren"},douban:{title:"\u8c46\u74e3",url:"http://www.douban.com/recommend/",icon:"share-alt"},mail:{title:"\u90ae\u4ef6\u5206\u4eab",url:"mailto:",icon:"envelope-o"},sms:{title:"\u77ed\u4fe1\u5206\u4eab",url:"sms:",icon:"comment"}},l.prototype.render=function(){var t=this.options,e=[],i=encodeURIComponent(a.title),o=encodeURIComponent(a.location),r="?body="+i+o;return t.sns.forEach(function(n,s){if(l.SNS[n]){var a,c=l.SNS[n];c.id=n,a="mail"===n?r+"&subject="+t.desc:"sms"===n?r:"?url="+o+"&title="+i,c.shareUrl=c.url+a,e.push(c)}}),s.template(t.tpl,n.extend({},t,{sns:e}))},l.prototype.init=function(){if(!this.inited){var t=this,e="[data-am-share-to]";r.ready(n.proxy(function(){n("body").append(this.render()),this.$element=n("#"+this.options.id),this.$element.find("[data-am-share-close]").on("click.share.amui",function(){t.close()})},this)),r.on("click.share.amui",e,n.proxy(function(t){var i=n(t.target),s=i.is(e)&&i||i.parent(e),o=s.attr("data-am-share-to");"mail"!==o&&"sms"!==o&&(t.preventDefault(),this.shareTo(o,this.setData(o))),this.close()},this)),this.inited=!0}},l.prototype.open=function(){!this.inited&&this.init(),this.$element&&this.$element.modal("open"),this.$element.trigger("open.share.amui"),this.active=!0},l.prototype.close=function(){this.$element&&this.$element.modal("close"),this.$element.trigger("close.share.amui"),this.active=!1},l.prototype.toggle=function(){this.active?this.close():this.open()},l.prototype.setData=function(t){if(t){var e={url:a.location,title:a.title},i=this.options.desc,n=this.pics||[],s=/^(qzone|qq|tqq)$/;if(s.test(t)&&!n.length){for(var o=a.images,r=0;r<o.length&&10>r;r++)!!o[r].src&&n.push(encodeURIComponent(o[r].src));this.pics=n}switch(t){case"qzone":e.desc=i,e.site=this.options.via,e.pics=n.join("|");break;case"qq":e.desc=i,e.site=this.options.via,e.pics=n[0];break;case"tqq":e.pic=n.join("|")}return e}},l.prototype.shareTo=function(t,e){var i=l.SNS[t];if(i){if("wechat"===t||"weixin"===t)return this.wechatQr();var n=[];for(var s in e)e[s]&&n.push(s.toString()+"="+("pic"===s||"pics"===s?e[s]:encodeURIComponent(e[s])));window.open(i.url+"?"+n.join("&"))}},l.prototype.wechatQr=function(){if(!this.$wechatQr){var t=s.utils.generateGUID("am-share-wechat"),e=n('<div class="am-modal am-modal-no-btn am-share-wechat-qr"><div class="am-modal-dialog"><div class="am-modal-hd">\u5206\u4eab\u5230\u5fae\u4fe1 <a href="" class="am-close am-close-spin" data-am-modal-close>&times;</a> </div><div class="am-modal-bd"><div class="am-share-wx-qr"></div><div class="am-share-wechat-tip">\u6253\u5f00\u5fae\u4fe1\uff0c\u70b9\u51fb\u5e95\u90e8\u7684<em>\u53d1\u73b0</em>\uff0c<br/> \u4f7f\u7528<em>\u626b\u4e00\u626b</em>\u5c06\u7f51\u9875\u5206\u4eab\u81f3\u670b\u53cb\u5708</div></div></div></div>');e.attr("id",t);var i=new o({render:"canvas",correctLevel:0,text:a.location.href,width:180,height:180,background:"#fff",foreground:"#000"});e.find(".am-share-wx-qr").html(i),e.appendTo(n("body")),this.$wechatQr=n("#"+t)}this.$wechatQr.modal("open")};var c=new l;r.on("click.share.amui.data-api",'[data-am-toggle="share"]',function(t){t.preventDefault(),c.toggle()}),t.exports=s.share=c},function(t,e,i){function n(t){return 128>t?[t]:2048>t?(c0=192+(t>>6),c1=128+(63&t),[c0,c1]):(c0=224+(t>>12),c1=128+(t>>6&63),c2=128+(63&t),[c0,c1,c2])}function s(t){for(var e=[],i=0;i<t.length;i++)for(var s=t.charCodeAt(i),o=n(s),a=0;a<o.length;a++)e.push(o[a]);return e}function o(t,e){this.typeNumber=-1,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=t,this.utf8bytes=s(t),this.make()}function a(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var i=0;i<t.length&&0==t[i];)i++;this.num=new Array(t.length-i+e);for(var n=0;n<t.length-i;n++)this.num[n]=t[n+i]}function r(){this.buffer=new Array,this.length=0}function n(t){return 128>t?[t]:2048>t?(c0=192+(t>>6),c1=128+(63&t),[c0,c1]):(c0=224+(t>>12),c1=128+(t>>6&63),c2=128+(63&t),[c0,c1,c2])}function s(t){for(var e=[],i=0;i<t.length;i++)for(var s=t.charCodeAt(i),o=n(s),a=0;a<o.length;a++)e.push(o[a]);return e}function o(t,e){this.typeNumber=-1,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=t,this.utf8bytes=s(t),this.make()}function a(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var i=0;i<t.length&&0==t[i];)i++;this.num=new Array(t.length-i+e);for(var n=0;n<t.length-i;n++)this.num[n]=t[n+i]}function r(){this.buffer=new Array,this.length=0}var c=i(1),h=i(2),u=[],d=function(t){"string"==typeof t&&(t={text:t}),this.options=c.extend({},{text:"",render:"",width:256,height:256,correctLevel:3,background:"#ffffff",foreground:"#000000"},t);for(var e=null,i=0,n=u.length;n>i;i++)if(u[i].text==this.options.text&&u[i].text.correctLevel==this.options.correctLevel){e=u[i].obj;break}if(i==n&&(e=new o(this.options.text,this.options.correctLevel),u.push({text:this.options.text,correctLevel:this.options.correctLevel,obj:e})),this.options.render)switch(this.options.render){case"canvas":return this.createCanvas(e);case"table":return this.createTable(e);case"svg":return this.createSVG(e);default:return this.createDefault(e)}return this.createDefault(e)};d.prototype.createDefault=function(t){var e=document.createElement("canvas");return e.getContext?this.createCanvas(t):document.createElementNS&&document.createElementNS(SVG_NS,"svg").createSVGRect?this.createSVG(t):this.createTable(t)},d.prototype.createCanvas=function(t){var e=document.createElement("canvas");e.width=this.options.width,e.height=this.options.height;for(var i=e.getContext("2d"),n=(this.options.width/t.getModuleCount()).toPrecision(4),s=this.options.height/t.getModuleCount().toPrecision(4),o=0;o<t.getModuleCount();o++)for(var a=0;a<t.getModuleCount();a++){i.fillStyle=t.modules[o][a]?this.options.foreground:this.options.background;var r=Math.ceil((a+1)*n)-Math.floor(a*n),l=Math.ceil((o+1)*n)-Math.floor(o*n);i.fillRect(Math.round(a*n),Math.round(o*s),r,l)}return e},d.prototype.createTable=function(t){var e=[];e.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: '+this.options.background+';">');var i=-1,n=-1,s=-1,o=-1;i=s=Math.floor(this.options.width/t.getModuleCount()),n=o=Math.floor(this.options.height/t.getModuleCount()),0>=s&&(i=t.getModuleCount()<80?2:1),0>=o&&(n=t.getModuleCount()<80?2:1),foreTd='<td style="border:0px; margin:0px; padding:0px; width:'+i+"px; background-color: "+this.options.foreground+'"></td>',backTd='<td style="border:0px; margin:0px; padding:0px; width:'+i+"px; background-color: "+this.options.background+'"></td>',l=t.getModuleCount();for(var a=0;a<l;a++){e.push('<tr style="border:0px; margin:0px; padding:0px; height: '+n+'px">');for(var r=0;r<l;r++)e.push(t.modules[a][r]?foreTd:backTd);e.push("</tr>")}e.push("</table>");var c=document.createElement("span");return c.innerHTML=e.join(""),c.firstChild},d.prototype.createSVG=function(t){for(var e,i,n,s,o=t.getModuleCount(),a=this.options.height/this.options.width,r='<svg xmlns="http://www.w3.org/2000/svg" width="'+this.options.width+'px" height="'+this.options.height+'px" viewbox="0 0 '+10*o+" "+10*o*a+'">',l="<path ",h=' style="stroke-width:0.5;stroke:'+this.options.foreground+";fill:"+this.options.foreground+';"></path>',u=' style="stroke-width:0.5;stroke:'+this.options.background+";fill:"+this.options.background+';"></path>',d=0;o>d;d++)for(var p=0;o>p;p++)e=10*p,n=10*d*a,i=10*(p+1),s=10*(d+1)*a,r+=l+'d="M '+e+","+n+" L "+i+","+n+" L "+i+","+s+" L "+e+","+s+' Z"',r+=t.modules[d][p]?h:u;return r+="</svg>",c(r)[0]},o.prototype={constructor:o,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(t,e){for(var i=-1;7>=i;i++)if(!(-1>=t+i||this.moduleCount<=t+i))for(var n=-1;7>=n;n++)-1>=e+n||this.moduleCount<=e+n||(i>=0&&6>=i&&(0==n||6==n)||n>=0&&6>=n&&(0==i||6==i)||i>=2&&4>=i&&n>=2&&4>=n?this.modules[t+i][e+n]=!0:this.modules[t+i][e+n]=!1)},createQrcode:function(){for(var t=0,e=0,i=null,n=0;8>n;n++){this.makeImpl(n);var s=f.getLostPoint(this);(0==n||t>s)&&(t=s,e=n,i=this.modules)}this.modules=i,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))},setupPositionAdjustPattern:function(){for(var t=f.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var i=0;i<t.length;i++){var n=t[e],s=t[i];if(null==this.modules[n][s])for(var o=-2;2>=o;o++)for(var a=-2;2>=a;a++)-2==o||2==o||-2==a||2==a||0==o&&0==a?this.modules[n+o][s+a]=!0:this.modules[n+o][s+a]=!1}},setupTypeNumber:function(t){for(var e=f.getBCHTypeNumber(this.typeNumber),i=0;18>i;i++){var n=!t&&1==(e>>i&1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=n,this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=n}},setupTypeInfo:function(t,e){for(var i=p[this.errorCorrectLevel]<<3|e,n=f.getBCHTypeInfo(i),s=0;15>s;s++){var o=!t&&1==(n>>s&1);6>s?this.modules[s][8]=o:8>s?this.modules[s+1][8]=o:this.modules[this.moduleCount-15+s][8]=o;var o=!t&&1==(n>>s&1);8>s?this.modules[8][this.moduleCount-s-1]=o:9>s?this.modules[8][15-s-1+1]=o:this.modules[8][15-s-1]=o}this.modules[this.moduleCount-8][8]=!t},createData:function(){var t=new r,e=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,e);for(var i=0,n=this.utf8bytes.length;n>i;i++)t.put(this.utf8bytes[i],8);for(t.length+4<=8*this.totalDataCount&&t.put(0,4);t.length%8!=0;)t.putBit(!1);for(;;){if(t.length>=8*this.totalDataCount)break;if(t.put(o.PAD0,8),t.length>=8*this.totalDataCount)break;t.put(o.PAD1,8)}return this.createBytes(t)},createBytes:function(t){for(var e=0,i=0,n=0,s=this.rsBlock.length/3,o=new Array,r=0;s>r;r++)for(var l=this.rsBlock[3*r+0],c=this.rsBlock[3*r+1],h=this.rsBlock[3*r+2],u=0;l>u;u++)o.push([h,c]);for(var d=new Array(o.length),p=new Array(o.length),m=0;m<o.length;m++){var v=o[m][0],g=o[m][1]-v;i=Math.max(i,v),n=Math.max(n,g),d[m]=new Array(v);for(var r=0;r<d[m].length;r++)d[m][r]=255&t.buffer[r+e];e+=v;var y=f.getErrorCorrectPolynomial(g),w=new a(d[m],y.getLength()-1),b=w.mod(y);p[m]=new Array(y.getLength()-1);for(var r=0;r<p[m].length;r++){var T=r+b.getLength()-p[m].length;p[m][r]=T>=0?b.get(T):0}}for(var x=new Array(this.totalDataCount),C=0,r=0;i>r;r++)for(var m=0;m<o.length;m++)r<d[m].length&&(x[C++]=d[m][r]);for(var r=0;n>r;r++)for(var m=0;m<o.length;m++)r<p[m].length&&(x[C++]=p[m][r]);return x},mapData:function(t,e){for(var i=-1,n=this.moduleCount-1,s=7,o=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var r=0;2>r;r++)if(null==this.modules[n][a-r]){var l=!1;o<t.length&&(l=1==(t[o]>>>s&1));var c=f.getMask(e,n,a-r);c&&(l=!l),this.modules[n][a-r]=l,s--,-1==s&&(o++,s=7)}if(n+=i,0>n||this.moduleCount<=n){n-=i,i=-i;break}}}},o.PAD0=236,o.PAD1=17;for(var p=[1,0,3,2],m={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;f.getBCHDigit(e)-f.getBCHDigit(f.G15)>=0;)e^=f.G15<<f.getBCHDigit(e)-f.getBCHDigit(f.G15);return(t<<10|e)^f.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;f.getBCHDigit(e)-f.getBCHDigit(f.G18)>=0;)e^=f.G18<<f.getBCHDigit(e)-f.getBCHDigit(f.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return f.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,i){switch(t){case m.PATTERN000:return(e+i)%2==0;case m.PATTERN001:return e%2==0;case m.PATTERN010:return i%3==0;case m.PATTERN011:return(e+i)%3==0;case m.PATTERN100:return(Math.floor(e/2)+Math.floor(i/3))%2==0;case m.PATTERN101:return e*i%2+e*i%3==0;case m.PATTERN110:return(e*i%2+e*i%3)%2==0;case m.PATTERN111:return(e*i%3+(e+i)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new a([1],0),i=0;t>i;i++)e=e.multiply(new a([1,v.gexp(i)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),i=0,n=0,s=0;e>s;s++)for(var o=0,a=t.modules[s][0],r=0;e>r;r++){var l=t.modules[s][r];if(e-6>r&&l&&!t.modules[s][r+1]&&t.modules[s][r+2]&&t.modules[s][r+3]&&t.modules[s][r+4]&&!t.modules[s][r+5]&&t.modules[s][r+6]&&(e-10>r?t.modules[s][r+7]&&t.modules[s][r+8]&&t.modules[s][r+9]&&t.modules[s][r+10]&&(i+=40):r>3&&t.modules[s][r-1]&&t.modules[s][r-2]&&t.modules[s][r-3]&&t.modules[s][r-4]&&(i+=40)),e-1>s&&e-1>r){var c=0;l&&c++,t.modules[s+1][r]&&c++,t.modules[s][r+1]&&c++,t.modules[s+1][r+1]&&c++,0!=c&&4!=c||(i+=3)}a^l?o++:(a=l,o>=5&&(i+=3+o-5),o=1),l&&n++}for(var r=0;e>r;r++)for(var o=0,a=t.modules[0][r],s=0;e>s;s++){var l=t.modules[s][r];e-6>s&&l&&!t.modules[s+1][r]&&t.modules[s+2][r]&&t.modules[s+3][r]&&t.modules[s+4][r]&&!t.modules[s+5][r]&&t.modules[s+6][r]&&(e-10>s?t.modules[s+7][r]&&t.modules[s+8][r]&&t.modules[s+9][r]&&t.modules[s+10][r]&&(i+=40):s>3&&t.modules[s-1][r]&&t.modules[s-2][r]&&t.modules[s-3][r]&&t.modules[s-4][r]&&(i+=40)),a^l?o++:(a=l,o>=5&&(i+=3+o-5),o=1)}var h=Math.abs(100*n/e/e-50)/5;return i+=10*h}},v={glog:function(t){if(1>t)throw new Error("glog("+t+")");return v.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return v.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},g=0;8>g;g++)v.EXP_TABLE[g]=1<<g;for(var g=8;256>g;g++)v.EXP_TABLE[g]=v.EXP_TABLE[g-4]^v.EXP_TABLE[g-5]^v.EXP_TABLE[g-6]^v.EXP_TABLE[g-8];for(var g=0;255>g;g++)v.LOG_TABLE[v.EXP_TABLE[g]]=g;
a.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),i=0;i<this.getLength();i++)for(var n=0;n<t.getLength();n++)e[i+n]^=v.gexp(v.glog(this.get(i))+v.glog(t.get(n)));return new a(e,0)},mod:function(t){var e=this.getLength(),i=t.getLength();if(0>e-i)return this;for(var n=new Array(e),s=0;e>s;s++)n[s]=this.get(s);for(;n.length>=i;){for(var o=v.glog(n[0])-v.glog(t.get(0)),s=0;s<t.getLength();s++)n[s]^=v.gexp(v.glog(t.get(s))+o);for(;0==n[0];)n.shift()}return new a(n,0)}};var y=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];o.prototype.getRightType=function(){for(var t=1;41>t;t++){var e=y[4*(t-1)+this.errorCorrectLevel];if(void 0==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var i=e.length/3,n=0,s=0;i>s;s++){var o=e[3*s+0],a=e[3*s+2];n+=a*o}var r=t>9?2:1;if(this.utf8bytes.length+r<n||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=n;break}}},r.prototype={get:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1},put:function(t,e){for(var i=0;e>i;i++)this.putBit(t>>>e-i-1&1)},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},o.prototype={constructor:o,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(t,e){for(var i=-1;7>=i;i++)if(!(-1>=t+i||this.moduleCount<=t+i))for(var n=-1;7>=n;n++)-1>=e+n||this.moduleCount<=e+n||(i>=0&&6>=i&&(0==n||6==n)||n>=0&&6>=n&&(0==i||6==i)||i>=2&&4>=i&&n>=2&&4>=n?this.modules[t+i][e+n]=!0:this.modules[t+i][e+n]=!1)},createQrcode:function(){for(var t=0,e=0,i=null,n=0;8>n;n++){this.makeImpl(n);var s=f.getLostPoint(this);(0==n||t>s)&&(t=s,e=n,i=this.modules)}this.modules=i,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))},setupPositionAdjustPattern:function(){for(var t=f.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var i=0;i<t.length;i++){var n=t[e],s=t[i];if(null==this.modules[n][s])for(var o=-2;2>=o;o++)for(var a=-2;2>=a;a++)-2==o||2==o||-2==a||2==a||0==o&&0==a?this.modules[n+o][s+a]=!0:this.modules[n+o][s+a]=!1}},setupTypeNumber:function(t){for(var e=f.getBCHTypeNumber(this.typeNumber),i=0;18>i;i++){var n=!t&&1==(e>>i&1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=n,this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=n}},setupTypeInfo:function(t,e){for(var i=p[this.errorCorrectLevel]<<3|e,n=f.getBCHTypeInfo(i),s=0;15>s;s++){var o=!t&&1==(n>>s&1);6>s?this.modules[s][8]=o:8>s?this.modules[s+1][8]=o:this.modules[this.moduleCount-15+s][8]=o;var o=!t&&1==(n>>s&1);8>s?this.modules[8][this.moduleCount-s-1]=o:9>s?this.modules[8][15-s-1+1]=o:this.modules[8][15-s-1]=o}this.modules[this.moduleCount-8][8]=!t},createData:function(){var t=new r,e=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,e);for(var i=0,n=this.utf8bytes.length;n>i;i++)t.put(this.utf8bytes[i],8);for(t.length+4<=8*this.totalDataCount&&t.put(0,4);t.length%8!=0;)t.putBit(!1);for(;;){if(t.length>=8*this.totalDataCount)break;if(t.put(o.PAD0,8),t.length>=8*this.totalDataCount)break;t.put(o.PAD1,8)}return this.createBytes(t)},createBytes:function(t){for(var e=0,i=0,n=0,s=this.rsBlock.length/3,o=new Array,r=0;s>r;r++)for(var l=this.rsBlock[3*r+0],c=this.rsBlock[3*r+1],h=this.rsBlock[3*r+2],u=0;l>u;u++)o.push([h,c]);for(var d=new Array(o.length),p=new Array(o.length),m=0;m<o.length;m++){var v=o[m][0],g=o[m][1]-v;i=Math.max(i,v),n=Math.max(n,g),d[m]=new Array(v);for(var r=0;r<d[m].length;r++)d[m][r]=255&t.buffer[r+e];e+=v;var y=f.getErrorCorrectPolynomial(g),w=new a(d[m],y.getLength()-1),b=w.mod(y);p[m]=new Array(y.getLength()-1);for(var r=0;r<p[m].length;r++){var T=r+b.getLength()-p[m].length;p[m][r]=T>=0?b.get(T):0}}for(var x=new Array(this.totalDataCount),C=0,r=0;i>r;r++)for(var m=0;m<o.length;m++)r<d[m].length&&(x[C++]=d[m][r]);for(var r=0;n>r;r++)for(var m=0;m<o.length;m++)r<p[m].length&&(x[C++]=p[m][r]);return x},mapData:function(t,e){for(var i=-1,n=this.moduleCount-1,s=7,o=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var r=0;2>r;r++)if(null==this.modules[n][a-r]){var l=!1;o<t.length&&(l=1==(t[o]>>>s&1));var c=f.getMask(e,n,a-r);c&&(l=!l),this.modules[n][a-r]=l,s--,-1==s&&(o++,s=7)}if(n+=i,0>n||this.moduleCount<=n){n-=i,i=-i;break}}}},o.PAD0=236,o.PAD1=17;for(var p=[1,0,3,2],m={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;f.getBCHDigit(e)-f.getBCHDigit(f.G15)>=0;)e^=f.G15<<f.getBCHDigit(e)-f.getBCHDigit(f.G15);return(t<<10|e)^f.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;f.getBCHDigit(e)-f.getBCHDigit(f.G18)>=0;)e^=f.G18<<f.getBCHDigit(e)-f.getBCHDigit(f.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return f.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,i){switch(t){case m.PATTERN000:return(e+i)%2==0;case m.PATTERN001:return e%2==0;case m.PATTERN010:return i%3==0;case m.PATTERN011:return(e+i)%3==0;case m.PATTERN100:return(Math.floor(e/2)+Math.floor(i/3))%2==0;case m.PATTERN101:return e*i%2+e*i%3==0;case m.PATTERN110:return(e*i%2+e*i%3)%2==0;case m.PATTERN111:return(e*i%3+(e+i)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new a([1],0),i=0;t>i;i++)e=e.multiply(new a([1,v.gexp(i)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),i=0,n=0,s=0;e>s;s++)for(var o=0,a=t.modules[s][0],r=0;e>r;r++){var l=t.modules[s][r];if(e-6>r&&l&&!t.modules[s][r+1]&&t.modules[s][r+2]&&t.modules[s][r+3]&&t.modules[s][r+4]&&!t.modules[s][r+5]&&t.modules[s][r+6]&&(e-10>r?t.modules[s][r+7]&&t.modules[s][r+8]&&t.modules[s][r+9]&&t.modules[s][r+10]&&(i+=40):r>3&&t.modules[s][r-1]&&t.modules[s][r-2]&&t.modules[s][r-3]&&t.modules[s][r-4]&&(i+=40)),e-1>s&&e-1>r){var c=0;l&&c++,t.modules[s+1][r]&&c++,t.modules[s][r+1]&&c++,t.modules[s+1][r+1]&&c++,0!=c&&4!=c||(i+=3)}a^l?o++:(a=l,o>=5&&(i+=3+o-5),o=1),l&&n++}for(var r=0;e>r;r++)for(var o=0,a=t.modules[0][r],s=0;e>s;s++){var l=t.modules[s][r];e-6>s&&l&&!t.modules[s+1][r]&&t.modules[s+2][r]&&t.modules[s+3][r]&&t.modules[s+4][r]&&!t.modules[s+5][r]&&t.modules[s+6][r]&&(e-10>s?t.modules[s+7][r]&&t.modules[s+8][r]&&t.modules[s+9][r]&&t.modules[s+10][r]&&(i+=40):s>3&&t.modules[s-1][r]&&t.modules[s-2][r]&&t.modules[s-3][r]&&t.modules[s-4][r]&&(i+=40)),a^l?o++:(a=l,o>=5&&(i+=3+o-5),o=1)}var h=Math.abs(100*n/e/e-50)/5;return i+=10*h}},v={glog:function(t){if(1>t)throw new Error("glog("+t+")");return v.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return v.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},g=0;8>g;g++)v.EXP_TABLE[g]=1<<g;for(var g=8;256>g;g++)v.EXP_TABLE[g]=v.EXP_TABLE[g-4]^v.EXP_TABLE[g-5]^v.EXP_TABLE[g-6]^v.EXP_TABLE[g-8];for(var g=0;255>g;g++)v.LOG_TABLE[v.EXP_TABLE[g]]=g;a.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),i=0;i<this.getLength();i++)for(var n=0;n<t.getLength();n++)e[i+n]^=v.gexp(v.glog(this.get(i))+v.glog(t.get(n)));return new a(e,0)},mod:function(t){var e=this.getLength(),i=t.getLength();if(0>e-i)return this;for(var n=new Array(e),s=0;e>s;s++)n[s]=this.get(s);for(;n.length>=i;){for(var o=v.glog(n[0])-v.glog(t.get(0)),s=0;s<t.getLength();s++)n[s]^=v.gexp(v.glog(t.get(s))+o);for(;0==n[0];)n.shift()}return new a(n,0)}},y=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.prototype.getRightType=function(){for(var t=1;41>t;t++){var e=y[4*(t-1)+this.errorCorrectLevel];if(void 0==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var i=e.length/3,n=0,s=0;i>s;s++){var o=e[3*s+0],a=e[3*s+2];n+=a*o}var r=t>9?2:1;if(this.utf8bytes.length+r<n||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=n;break}}},r.prototype={get:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1},put:function(t,e){for(var i=0;e>i;i++)this.putBit(t>>>e-i-1&1)},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},c.fn.qrcode=function(t){return this.each(function(){c(this).append(new d(t))})},t.exports=h.qrcode=d},function(t,e,i){"use strict";var n=i(1),s=i(2),o=function(t,e){var i=this;this.options=n.extend({},o.DEFAULTS,e),this.$element=n(t),this.sticked=null,this.inited=null,this.$holder=void 0,this.$window=n(window).on("scroll.sticky.amui",s.utils.debounce(n.proxy(this.checkPosition,this),10)).on("resize.sticky.amui orientationchange.sticky.amui",s.utils.debounce(function(){i.reset(!0,function(){i.checkPosition()})},50)).on("load.sticky.amui",n.proxy(this.checkPosition,this)),this.offset=this.$element.offset(),this.init()};o.DEFAULTS={top:0,bottom:0,animation:"",className:{sticky:"am-sticky",resetting:"am-sticky-resetting",stickyBtm:"am-sticky-bottom",animationRev:"am-animation-reverse"}},o.prototype.init=function(){var t=this.check();if(!t)return!1;var e=this.$element,i="";n.each(e.css(["marginTop","marginRight","marginBottom","marginLeft"]),function(t,e){return i+=" "+e});var s=n('<div class="am-sticky-placeholder"></div>').css({height:"absolute"!==e.css("position")?e.outerHeight():"","float":"none"!=e.css("float")?e.css("float"):"",margin:i});return this.$holder=e.css("margin",0).wrap(s).parent(),this.inited=1,!0},o.prototype.reset=function(t,e){var i=this.options,n=this.$element,o=i.animation?" am-animation-"+i.animation:"",a=function(){n.css({position:"",top:"",width:"",left:"",margin:0}),n.removeClass([o,i.className.animationRev,i.className.sticky,i.className.resetting].join(" ")),this.animating=!1,this.sticked=!1,this.offset=n.offset(),e&&e()}.bind(this);n.addClass(i.className.resetting),!t&&i.animation&&s.support.animation?(this.animating=!0,n.removeClass(o).one(s.support.animation.end,function(){a()}).width(),n.addClass(o+" "+i.className.animationRev)):a()},o.prototype.check=function(){if(!this.$element.is(":visible"))return!1;var t=this.options.media;if(t)switch(typeof t){case"number":if(window.innerWidth<t)return!1;break;case"string":if(window.matchMedia&&!window.matchMedia(t).matches)return!1}return!0},o.prototype.checkPosition=function(){if(!this.inited){var t=this.init();if(!t)return}var e=this.options,i=this.$window.scrollTop(),n=e.top,s=e.bottom,o=this.$element,a=e.animation?" am-animation-"+e.animation:"",r=[e.className.sticky,a].join(" ");"function"==typeof s&&(s=s(this.$element));var l=i>this.$holder.offset().top;!this.sticked&&l?o.addClass(r):this.sticked&&!l&&this.reset(),this.$holder.css({height:o.is(":visible")&&"absolute"!==o.css("position")?o.outerHeight():""}),l&&o.css({top:n,left:this.$holder.offset().left,width:this.$holder.width()}),this.sticked=l},s.plugin("sticky",o),n(window).on("load",function(){n("[data-am-sticky]").sticky()}),t.exports=o},function(t,e,i){"use strict";function n(t){var e,i=Array.prototype.slice.call(arguments,1);return this.each(function(){var n=s(this),a=n.is(".am-tabs")&&n||n.closest(".am-tabs"),r=a.data("amui.tabs"),l=s.extend({},o.utils.parseOptions(n.data("amTabs")),s.isPlainObject(t)&&t);r||a.data("amui.tabs",r=new c(a[0],l)),"string"==typeof t&&("open"===t&&n.is(".am-tabs-nav a")?r.open(n):e="function"==typeof r[t]?r[t].apply(r,i):r[t])}),void 0===e?this:e}var s=i(1),o=i(2),a=i(3),r=o.support.transition,l=o.support.animation,c=function(t,e){this.$element=s(t),this.options=s.extend({},c.DEFAULTS,e||{}),this.transitioning=this.activeIndex=null,this.refresh(),this.init()};c.DEFAULTS={selector:{nav:"> .am-tabs-nav",content:"> .am-tabs-bd",panel:"> .am-tab-panel"},activeClass:"am-active"},c.prototype.refresh=function(){var t=this.options.selector;this.$tabNav=this.$element.find(t.nav),this.$navs=this.$tabNav.find("a"),this.$content=this.$element.find(t.content),this.$tabPanels=this.$content.find(t.panel);var e=this.$tabNav.find("> ."+this.options.activeClass);1!==e.length?this.open(0):this.activeIndex=this.$navs.index(e.children("a"))},c.prototype.init=function(){var t=this,e=this.options;if(this.$element.on("click.tabs.amui",e.selector.nav+" a",function(e){e.preventDefault(),t.open(s(this))}),!e.noSwipe){if(!this.$content.length)return this;var i=new a.Manager(this.$content[0]),n=new a.Swipe({direction:a.DIRECTION_HORIZONTAL});i.add(n),i.on("swipeleft",o.utils.debounce(function(e){e.preventDefault(),t.goTo("next")},100)),i.on("swiperight",o.utils.debounce(function(e){e.preventDefault(),t.goTo("prev")},100)),this._hammer=i}},c.prototype.open=function(t){var e=this.options.activeClass,i="number"==typeof t?t:this.$navs.index(s(t));if(t="number"==typeof t?this.$navs.eq(i):s(t),t&&t.length&&!this.transitioning&&!t.parent("li").hasClass(e)){var n=this.$tabNav,o=t.attr("href"),a=/^#.+$/,r=a.test(o)&&this.$content.find(o)||this.$tabPanels.eq(i),l=n.find("."+e+" a")[0],c=s.Event("open.tabs.amui",{relatedTarget:l});t.trigger(c),c.isDefaultPrevented()||(this.activate(t.closest("li"),n),this.activate(r,this.$content,function(){t.trigger({type:"opened.tabs.amui",relatedTarget:l})}),this.activeIndex=i)}},c.prototype.activate=function(t,e,i){this.transitioning=!0;var n=this.options.activeClass,o=e.find("> ."+n),a=i&&r&&!!o.length;o.removeClass(n+" am-in"),t.addClass(n),a?(t.redraw(),t.addClass("am-in")):t.removeClass("am-fade");var l=s.proxy(function(){i&&i(),this.transitioning=!1},this);a?o.one(r.end,l):l()},c.prototype.goTo=function(t){var e=this.activeIndex,i="next"===t,n=i?"am-animation-right-spring":"am-animation-left-spring";if(i&&e+1>=this.$navs.length||!i&&0===e){var s=this.$tabPanels.eq(e);l&&s.addClass(n).on(l.end,function(){s.removeClass(n)})}else this.open(i?e+1:e-1)},c.prototype.destroy=function(){this.$element.off(".tabs.amui"),a.off(this.$content[0],"swipeleft swiperight"),this._hammer&&this._hammer.destroy(),s.removeData(this.$element,"amui.tabs")},s.fn.tabs=n,o.ready(function(t){s("[data-am-tabs]",t).tabs()}),s(document).on("click.tabs.amui.data-api","[data-am-tabs] .am-tabs-nav a",function(t){t.preventDefault(),n.call(s(this),"open")}),t.exports=o.tabs=c},function(t,e,i){"use strict";var n=i(1),s=i(2),o=function(t,e){this.options=n.extend({},o.DEFAULTS,e),this.$element=n(t),this.init()};o.DEFAULTS={checkboxClass:"am-ucheck-checkbox",radioClass:"am-ucheck-radio",checkboxTpl:'<span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>',radioTpl:'<span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>'},o.prototype.init=function(){var t=this.$element,e=t[0],i=this.options;"checkbox"===e.type?t.addClass(i.checkboxClass).after(i.checkboxTpl):"radio"===e.type&&t.addClass(i.radioClass).after(i.radioTpl)},o.prototype.check=function(){this.$element.prop("checked",!0).trigger("change.ucheck.amui").trigger("checked.ucheck.amui")},o.prototype.uncheck=function(){this.$element.prop("checked",!1).trigger("change").trigger("unchecked.ucheck.amui")},o.prototype.toggle=function(){this.$element.prop("checked",function(t,e){return!e}).trigger("change.ucheck.amui").trigger("toggled.ucheck.amui")},o.prototype.disable=function(){this.$element.prop("disabled",!0).trigger("change.ucheck.amui").trigger("disabled.ucheck.amui")},o.prototype.enable=function(){this.$element.prop("disabled",!1),this.$element.trigger("change.ucheck.amui").trigger("enabled.ucheck.amui")},o.prototype.destroy=function(){this.$element.removeData("amui.ucheck").removeClass(this.options.checkboxClass+" "+this.options.radioClass).next(".am-ucheck-icons").remove().end().trigger("destroyed.ucheck.amui")},s.plugin("uCheck",o,{after:function(){s.support.touch&&this.parent().hover(function(){n(this).addClass("am-nohover")},function(){n(this).removeClass("am-nohover")})}}),s.ready(function(t){n("[data-am-ucheck]",t).uCheck()}),t.exports=o},function(t,e,i){"use strict";var n=i(1),s=i(2),o=function(t,e){this.options=n.extend({},o.DEFAULTS,e),this.options.patterns=n.extend({},o.patterns,this.options.patterns);var i=this.options.locales;!o.validationMessages[i]&&(this.options.locales="zh_CN"),this.$element=n(t),this.init()};o.DEFAULTS={debug:!1,locales:"zh_CN",H5validation:!1,H5inputType:["email","url","number"],patterns:{},patternClassPrefix:"js-pattern-",activeClass:"am-active",inValidClass:"am-field-error",validClass:"am-field-valid",validateOnSubmit:!0,alwaysRevalidate:!1,allFields:":input:not(:submit, :button, :disabled, .am-novalidate)",ignore:":hidden:not([data-am-selected], .am-validate)",customEvents:"validate",keyboardFields:":input:not(:submit, :button, :disabled, .am-novalidate)",keyboardEvents:"focusout, change",activeKeyup:!1,textareaMaxlenthKeyup:!0,pointerFields:'input[type="range"]:not(:disabled, .am-novalidate), input[type="radio"]:not(:disabled, .am-novalidate), input[type="checkbox"]:not(:disabled, .am-novalidate), select:not(:disabled, .am-novalidate), option:not(:disabled, .am-novalidate)',pointerEvents:"click",onValid:function(t){},onInValid:function(t){},markValid:function(t){var e=this.options,i=n(t.field),s=i.closest(".am-form-group");i.addClass(e.validClass).removeClass(e.inValidClass),s.addClass("am-form-success").removeClass("am-form-error"),e.onValid.call(this,t)},markInValid:function(t){var e=this.options,i=n(t.field),s=i.closest(".am-form-group");i.addClass(e.inValidClass+" "+e.activeClass).removeClass(e.validClass),s.addClass("am-form-error").removeClass("am-form-success"),e.onInValid.call(this,t)},validate:function(t){},submit:null},o.VERSION="2.7.0",o.patterns={email:/^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,url:/^(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,integer:/^-?\d+$/},o.validationMessages={zh_CN:{valueMissing:"\u8bf7\u586b\u5199\uff08\u9009\u62e9\uff09\u6b64\u5b57\u6bb5",customError:{tooShort:"\u81f3\u5c11\u586b\u5199 %s \u4e2a\u5b57\u7b26",checkedOverflow:"\u81f3\u591a\u9009\u62e9 %s \u9879",checkedUnderflow:"\u81f3\u5c11\u9009\u62e9 %s \u9879"},patternMismatch:"\u8bf7\u6309\u7167\u8981\u6c42\u7684\u683c\u5f0f\u586b\u5199",rangeOverflow:"\u8bf7\u586b\u5199\u5c0f\u4e8e\u7b49\u4e8e %s \u7684\u503c",rangeUnderflow:"\u8bf7\u586b\u5199\u5927\u4e8e\u7b49\u4e8e %s \u7684\u503c",stepMismatch:"",tooLong:"\u81f3\u591a\u586b\u5199 %s \u4e2a\u5b57\u7b26",typeMismatch:"\u8bf7\u6309\u7167\u8981\u6c42\u7684\u7c7b\u578b\u586b\u5199"}},o.ERROR_MAP={tooShort:"minlength",checkedOverflow:"maxchecked",checkedUnderflow:"minchecked",rangeOverflow:"max",rangeUnderflow:"min",tooLong:"maxlength"},o.prototype.init=function(){function t(t){var e=t.toString();return e.substring(1,e.length-1)}function e(t,e,a){var r=e.split(","),l=function(t){i.validate(this)};a&&(l=s.utils.debounce(l,a)),n.each(r,function(e,i){o.on(i+".validator.amui",t,l)})}var i=this,o=this.$element,a=this.options;return a.H5validation&&s.support.formValidation?!1:(o.attr("novalidate","novalidate"),n.each(a.H5inputType,function(e,i){var n=o.find("input[type="+i+"]");n.attr("pattern")||n.is("[class*="+a.patternClassPrefix+"]")||n.attr("pattern",t(a.patterns[i]))}),n.each(a.patterns,function(e,i){var n=o.find("."+a.patternClassPrefix+e);!n.attr("pattern")&&n.attr("pattern",t(i))}),o.on("submit.validator.amui",function(t){if("function"==typeof a.submit)return a.submit.call(i,t);if(a.validateOnSubmit){var e=i.isFormValid();return"boolean"===n.type(e)?e:o.data("amui.checked")?!0:(n.when(e).then(function(){o.data("amui.checked",!0).submit()},function(){o.data("amui.checked",!1).find("."+a.inValidClass).eq(0).focus()}),!1)}}),e(":input",a.customEvents),e(a.keyboardFields,a.keyboardEvents),e(a.pointerFields,a.pointerEvents),a.textareaMaxlenthKeyup&&e("textarea[maxlength]","keyup",50),void(a.activeKeyup&&e(".am-active","keyup",50)))},o.prototype.isValid=function(t){var e=n(t),i=this.options;return(void 0===e.data("validity")||i.alwaysRevalidate)&&this.validate(t),e.data("validity")&&e.data("validity").valid},o.prototype.validate=function(t){var e=this,i=this.$element,s=this.options,o=n(t),a=o.data("equalTo");a&&o.attr("pattern","^"+i.find(a).val()+"$");var r=o.attr("pattern")||!1,l=new RegExp(r),c=null,h=null,u=o.is("[type=checkbox]")?(h=i.find('input[name="'+t.name+'"]')).filter(":checked").length:o.is("[type=radio]")?(c=this.$element.find('input[name="'+t.name+'"]')).filter(":checked").length>0:o.val();o=h&&h.length?h.first():o;var d=void 0!==o.attr("required")&&"false"!==o.attr("required"),p=parseInt(o.attr("maxlength"),10),m=parseInt(o.attr("minlength"),10),f=Number(o.attr("min")),v=Number(o.attr("max")),g=this.createValidity({field:o[0],valid:!0});if(s.debug&&window.console&&(console.log("Validate: value -> ["+u+", regex -> ["+l+"], required -> "+d),console.log("Regex test: "+l.test(u)+", Pattern: "+r)),!isNaN(p)&&u.length>p&&(g.valid=!1,g.tooLong=!0),!isNaN(m)&&u.length<m&&(g.valid=!1,g.customError="tooShort"),!isNaN(f)&&Number(u)<f&&(g.valid=!1,g.rangeUnderflow=!0),!isNaN(v)&&Number(u)>v&&(g.valid=!1,g.rangeOverflow=!0),d&&!u)g.valid=!1,g.valueMissing=!0;else if((h||o.is('select[multiple="multiple"]'))&&u){u=h?u:u.length;var y=parseInt(o.attr("minchecked"),10),w=parseInt(o.attr("maxchecked"),10);!isNaN(y)&&y>u&&(g.valid=!1,g.customError="checkedUnderflow"),!isNaN(w)&&u>w&&(g.valid=!1,g.customError="checkedOverflow")}else r&&!l.test(u)&&u&&(g.valid=!1,g.patternMismatch=!0);var b,T=function(t){this.markField(t);var i=n.Event("validated.field.validator.amui");i.validity=t,o.trigger(i).data("validity",t);var s=c||h;return s&&s.not(o).data("validity",t).each(function(){t.field=this,e.markField(t)}),t};if("function"==typeof s.validate&&(b=s.validate.call(this,g)),b){var x=new n.Deferred;return o.data("amui.dfdValidity",x.promise()),n.when(b).always(function(t){x[t.valid?"resolve":"reject"](t),T.call(e,t)})}T.call(this,g)},o.prototype.markField=function(t){var e=this.options,i="mark"+(t.valid?"":"In")+"Valid";e[i]&&e[i].call(this,t)},o.prototype.validateForm=function(){var t=this,e=this.$element,i=this.options,s=e.find(i.allFields).not(i.ignore),o=[],a=!0,r=[],l=n([]),c=[],h=!1;e.trigger("validate.form.validator.amui");var u=s.filter(function(t){var e;if("INPUT"===this.tagName&&"radio"===this.type){if(e=this.name,o[e]===!0)return!1;o[e]=!0}return!0});u.each(function(){var i=n(this),s=t.isValid(this),o=i.data("validity");a=!!s&&a,r.push(o),s||(l=l.add(n(this),e));var u=i.data("amui.dfdValidity");if(u)c.push(u),h=!0;else{var d=new n.Deferred;c.push(d.promise()),d[s?"resolve":"reject"](o)}});var d={valid:a,$invalidFields:l,validity:r,promises:c,async:h};return e.trigger("validated.form.validator.amui",d),d},o.prototype.isFormValid=function(){var t=this,e=this.validateForm(),i=function(e){t.$element.trigger(e+".validator.amui")};if(e.async){var s=new n.Deferred;
return n.when.apply(null,e.promises).then(function(){s.resolve(),i("valid")},function(){s.reject(),i("invalid")}),s.promise()}if(!e.valid){var o=e.$invalidFields.first();return o.is("[data-am-selected]")&&(o=o.next(".am-selected").find(".am-selected-btn")),o.focus(),i("invalid"),!1}return i("valid"),!0},o.prototype.createValidity=function(t){return n.extend({customError:t.customError||!1,patternMismatch:t.patternMismatch||!1,rangeOverflow:t.rangeOverflow||!1,rangeUnderflow:t.rangeUnderflow||!1,stepMismatch:t.stepMismatch||!1,tooLong:t.tooLong||!1,typeMismatch:t.typeMismatch||!1,valid:t.valid||!0,valueMissing:t.valueMissing||!1},t)},o.prototype.getValidationMessage=function(t){var e,i,s=o.validationMessages[this.options.locales],a="%s",r=n(t.field);return(r.is('[type="checkbox"]')||r.is('[type="radio"]'))&&(r=this.$element.find("[name="+r.attr("name")+"]").first()),n.each(t,function(t,i){return"field"===t||"valid"===t?t:"customError"===t&&i?(e=i,s=s.customError,!1):i===!0?(e=t,!1):void 0}),i=s[e]||void 0,i&&o.ERROR_MAP[e]&&(i=i.replace(a,r.attr(o.ERROR_MAP[e])||"\u89c4\u5b9a\u7684")),i},o.prototype.removeMark=function(){this.$element.find(".am-form-success, .am-form-error, ."+this.options.inValidClass+", ."+this.options.validClass).removeClass(["am-form-success","am-form-error",this.options.inValidClass,this.options.validClass].join(" "))},o.prototype.destroy=function(){this.removeMark(),this.$element.removeData("amui.validator amui.checked").off(".validator.amui").find(this.options.allFields).removeData("validity amui.dfdValidity")},s.plugin("validator",o),s.ready(function(t){n("[data-am-validator]",t).validator()}),t.exports=o},function(t,e,i){"use strict";var n=i(2),s={get:function(t){var e,i=encodeURIComponent(t)+"=",n=document.cookie.indexOf(i),s=null;return n>-1&&(e=document.cookie.indexOf(";",n),-1==e&&(e=document.cookie.length),s=decodeURIComponent(document.cookie.substring(n+i.length,e))),s},set:function(t,e,i,n,s,o){var a=encodeURIComponent(t)+"="+encodeURIComponent(e);i instanceof Date&&(a+="; expires="+i.toUTCString()),n&&(a+="; path="+n),s&&(a+="; domain="+s),o&&(a+="; secure"),document.cookie=a},unset:function(t,e,i,n){this.set(t,"",new Date(0),e,i,n)}};n.utils=n.utils||{},t.exports=n.utils.cookie=s},function(t,e,i){"use strict";var n=i(2),s=function(){var t="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,e=function(){for(var t,e,i=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n=0,s=i.length,o={};s>n;n++)if(t=i[n],t&&t[1]in document){for(n=0,e=t.length;e>n;n++)o[i[0][n]]=t[n];return o}return!1}(),i={request:function(i){var n=e.requestFullscreen;i=i||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?i[n]():i[n](t&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[e.exitFullscreen]()},toggle:function(t){this.isFullscreen?this.exit():this.request(t)},raw:e};return e?(Object.defineProperties(i,{isFullscreen:{get:function(){return!!document[e.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[e.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[e.fullscreenEnabled]}}}),i.VERSION="3.0.0",i):!1}();t.exports=n.fullscreen=s},function(t,e,i){"use strict";var n=i(1),s=i(2);s.support.geolocation=window.navigator&&window.navigator.geolocation;var o=s.support.geolocation,a=function(t){this.options=t||{}};a.MESSAGES={unsupportedBrowser:"Browser does not support location services",permissionDenied:"You have rejected access to your location",positionUnavailable:"Unable to determine your location",timeout:"Service timeout has been reached"},a.ERROR_CODE={0:"unsupportedBrowser",1:"permissionDenied",2:"positionUnavailable",3:"timeout"},a.prototype.get=function(t){var e=this;t=n.extend({},this.options,t);var i=new n.Deferred;return o?this.watchID=o.getCurrentPosition(function(t){i.resolve.call(e,t)},function(t){i.reject(a.MESSAGES[a.ERROR_CODE[t.code]])},t):i.reject(a.MESSAGES.unsupportedBrowser),i.promise()},a.prototype.watch=function(t){if(o&&(t=n.extend({},this.options,t),n.isFunction(t.done))){this.clearWatch();var e=n.isFunction(t.fail)?t.fail:null;return this.watchID=o.watchPosition(t.done,e,t),this.watchID}},a.prototype.clearWatch=function(){o&&this.watchID&&(o.clearWatch(this.watchID),this.watchID=null)},t.exports=s.Geolocation=a},function(t,e,i){(function(e){"use strict";function n(){try{return l in r&&r[l]}catch(t){return!1}}var s,o=i(2),a={},r="undefined"!=typeof window?window:e,l="localStorage";a.disabled=!1,a.version="1.3.20",a.set=function(t,e){},a.get=function(t,e){},a.has=function(t){return void 0!==a.get(t)},a.remove=function(t){},a.clear=function(){},a.transact=function(t,e,i){null==i&&(i=e,e=null),null==e&&(e={});var n=a.get(t,e);i(n),a.set(t,n)},a.getAll=function(){},a.forEach=function(){},a.serialize=function(t){return JSON.stringify(t)},a.deserialize=function(t){if("string"==typeof t)try{return JSON.parse(t)}catch(e){return t||void 0}},n()&&(s=r[l],a.set=function(t,e){return void 0===e?a.remove(t):(s.setItem(t,a.serialize(e)),e)},a.get=function(t,e){var i=a.deserialize(s.getItem(t));return void 0===i?e:i},a.remove=function(t){s.removeItem(t)},a.clear=function(){s.clear()},a.getAll=function(){var t={};return a.forEach(function(e,i){t[e]=i}),t},a.forEach=function(t){for(var e=0;e<s.length;e++){var i=s.key(e);t(i,a.get(i))}});try{var c="__storejs__";a.set(c,c),a.get(c)!=c&&(a.disabled=!0),a.remove(c)}catch(h){a.disabled=!0}a.enabled=!a.disabled,t.exports=o.store=a}).call(e,function(){return this}())},function(t,e,i){"use strict";function n(){var t=s('[data-am-widget="accordion"]'),e={item:".am-accordion-item",title:".am-accordion-title",body:".am-accordion-bd",disabled:".am-disabled"};t.each(function(t,i){var n=o.utils.parseOptions(s(i).attr("data-am-accordion")),a=s(i).find(e.title);a.on("click.accordion.amui",function(){var t=s(this).next(e.body),o=s(this).parent(e.item),a=t.data("amui.collapse");o.is(e.disabled)||(o.toggleClass("am-active"),a?t.collapse("toggle"):t.collapse(),!n.multiple&&s(i).children(".am-active").not(o).not(e.disabled).removeClass("am-active").find(e.body+".am-in").collapse("close"))})})}var s=i(1),o=i(2);i(7),s(n),t.exports=o.accordion={VERSION:"2.1.0",init:n}},function(t,e){"use strict";t.exports={VERSION:"2.0.1"}},function(t,e,i){"use strict";function n(){var t=s(".ds-thread"),e=t.parent('[data-am-widget="duoshuo"]').attr("data-ds-short-name"),i=("https:"==document.location.protocol?"https:":"http:")+"//static.duoshuo.com/embed.js";if(t.length&&e&&(window.duoshuoQuery={short_name:e},!s('script[src="'+i+'"]').length)){var n=s("<script>",{async:!0,type:"text/javascript",src:i,charset:"utf-8"});s("body").append(n)}}var s=i(1),o=i(2);s(window).on("load",n),t.exports=o.duoshuo={VERSION:"2.0.1",init:n}},function(t,e,i){"use strict";function n(){s(".am-figure").each(function(t,e){var i,n=o.utils.parseOptions(s(e).attr("data-am-figure")),a=s(e);if(n.pureview)if("auto"===n.pureview){var r=s.isImgZoomAble(a.find("img")[0]);r&&a.pureview()}else a.addClass("am-figure-zoomable").pureview();i=a.data("amui.pureview"),i&&a.on("click",":not(img)",function(){i.open(0)})})}var s=i(1),o=i(2);i(20),s.isImgZoomAble=function(t){var e=new Image;e.src=t.src;var i=s(t).width()<e.width;return i&&s(t).closest(".am-figure").addClass("am-figure-zoomable"),i},s(window).on("load",n),t.exports=o.figure={VERSION:"2.0.3",init:n}},function(t,e,i){"use strict";function n(){s(".am-footer-ysp").on("click",function(){s("#am-footer-modal").modal()});var t=o.utils.parseOptions(s(".am-footer").data("amFooter"));t.addToHS&&a(),s('[data-rel="desktop"]').on("click",function(t){t.preventDefault(),window.AMPlatform?window.AMPlatform.util.goDesktop():(r.set("allmobilize","desktop","","/"),window.location=window.location)})}var s=i(1),o=i(2);i(15);var a=i(4),r=i(31);s(n),t.exports=o.footer={VERSION:"3.1.2",init:n}},function(t,e,i){"use strict";function n(){var t=s('[data-am-widget="gallery"]');t.each(function(){var t=o.utils.parseOptions(s(this).attr("data-am-gallery"));t.pureview&&("object"==typeof t.pureview?s(this).pureview(t.pureview):s(this).pureview())})}var s=i(1),o=i(2);i(20),s(n),t.exports=o.gallery={VERSION:"3.0.0",init:n}},function(t,e,i){"use strict";function n(){function t(){i[(n.scrollTop()>50?"add":"remove")+"Class"]("am-active")}var e=s('[data-am-widget="gotop"]'),i=e.filter(".am-gotop-fixed"),n=s(window);e.data("init")||(e.find("a").on("click",function(t){t.preventDefault(),n.smoothScroll()}),t(),n.on("scroll.gotop.amui",o.utils.debounce(t,100)),e.data("init",!0))}var s=i(1),o=i(2);i(23),s(n),t.exports=o.gotop={VERSION:"4.0.2",init:n}},function(t,e,i){"use strict";function n(){s('[data-am-widget="header"]').each(function(){return s(this).hasClass("am-header-fixed")?(s("body").addClass("am-with-fixed-header"),!1):void 0})}var s=i(1),o=i(2);s(n),t.exports=o.header={VERSION:"2.0.0",init:n}},function(t,e,i){"use strict";var n=i(2);t.exports=n.intro={VERSION:"4.0.2",init:function(){}}},function(t,e,i){"use strict";var n=i(2);t.exports=n.listNews={VERSION:"4.0.0",init:function(){}}},function(t,e,i){function n(t){var e=o("<script />",{id:"am-map-api-0"});o("body").append(e),e.on("load",function(){console.log("load");var e=o("<script/>",{id:"am-map-api-1"});o("body").append(e),e.on("load",function(){var e=document.createElement("script");e.textContent="("+t.toString()+")();",o("body")[0].appendChild(e)}).attr("src","http://api.map.baidu.com/getscript?type=quick&file=feature&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002")}).attr("src","http://api.map.baidu.com/getscript?type=quick&file=api&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002")}function s(){var t=document.querySelector(".am-map"),e=116.331398,i=39.897445,n=t.getAttribute("data-name"),s=t.getAttribute("data-address"),o=t.getAttribute("data-longitude")||e,a=t.getAttribute("data-latitude")||i,r=t.getAttribute("data-setZoom")||17,l=t.getAttribute("data-icon"),c=new BMap.Map("bd-map"),h=new BMap.Point(o,a);c.centerAndZoom(h,r),t.getAttribute("data-zoomControl")&&c.addControl(new BMap.ZoomControl),t.getAttribute("data-scaleControl")&&c.addControl(new BMap.ScaleControl);var u=new BMap.Marker(h);l&&u.setIcon(new BMap.Icon(l,new BMap.Size(40,40)));var d={width:200,title:n},p=new BMap.InfoWindow("\u5730\u5740\uff1a"+s,d),m=new BMap.Geocoder;o==e&&a==i?m.getPoint(s,function(t){t&&(c.centerAndZoom(t,r),u.setPosition(t),c.addOverlay(u),c.openInfoWindow(p,t))},""):m.getLocation(h,function(t){c.centerAndZoom(h,r),u.setPosition(h),c.addOverlay(u),s?c.openInfoWindow(p,h):c.openInfoWindow(new BMap.InfoWindow(s,d),h)})}var o=i(1),a=i(2),r=function(){o(".am-map").length&&n(s)};o(r),t.exports=a.map={VERSION:"2.0.2",init:r}},function(t,e,i){"use strict";function n(){if(s("#mechat").length){var t=s('[data-am-widget="mechat"]'),e=t.data("am-mechat-unitid"),i=s("<script>",{charset:"utf-8",src:"http://mechatim.com/js/unit/button.js?id="+e});s("body").append(i)}}var s=i(1),o=i(2);s(window).on("load",n),t.exports=o.mechat={VERSION:"2.0.1",init:n}},function(t,e,i){"use strict";var n=i(1),s=i(2),o=i(14);i(16),i(7);var a=function(){var t=n('[data-am-widget="menu"]');t.find(".am-menu-nav .am-parent > a").on("click",function(t){t.preventDefault();var e=n(this),i=e.parent(),s=e.next(".am-menu-sub");i.toggleClass("am-open"),s.collapse("toggle"),i.siblings(".am-parent").removeClass("am-open").children(".am-menu-sub.am-in").collapse("close")}),t.filter("[data-am-menu-collapse]").find("> .am-menu-toggle").on("click",function(t){t.preventDefault();var e=n(this),i=e.next(".am-menu-nav");e.toggleClass("am-active"),i.collapse("toggle")}),t.filter("[data-am-menu-offcanvas]").find("> .am-menu-toggle").on("click",function(t){t.preventDefault();var e=n(this),i=e.next(".am-offcanvas");e.toggleClass("am-active"),i.offCanvas("open")});var e='.am-offcanvas[data-dismiss-on="click"]',i=n(e);i.find("a").not(".am-parent>a").on("click",function(t){n(this).parents(e).offCanvas("close")}),t.filter(".am-menu-one").each(function(t){var e,i=n(this),s=n('<div class="am-menu-nav-sub-wrap"></div>'),a=0,r=i.find(".am-menu-nav"),l=r.children("li");l.filter(".am-parent").each(function(t){n(this).attr("data-rel","#am-menu-sub-"+t),n(this).find(".am-menu-sub").attr("id","am-menu-sub-"+t).appendTo(s)}),i.append(s),r.wrap('<div class="am-menu-nav-wrap" id="am-menu-'+t+'">'),l.each(function(t){a+=parseFloat(n(this).css("width"))}),r.width(a);var c=new o("#am-menu-"+t,{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1});l.on("click",function(){var t=n(this);t.addClass("am-active").siblings().removeClass("am-active"),s.find(".am-menu-sub.am-in").collapse("close"),t.is(".am-parent")?!t.hasClass(".am-open")&&s.find(t.attr("data-rel")).collapse("open"):t.siblings().removeClass("am-open"),void 0===e&&(e=n(this).index()?0:1);var o,a=n(this).index()>e,l=n(this)[a?"next":"prev"](),h=l.offset()||n(this).offset(),u=i.offset(),d=parseInt(i.css("padding-left"));(a?h.left+h.width>u.left+u.width:h.left<u.left)&&(o=r.offset(),c.scrollTo(a?u.width-h.left+o.left-h.width-d:o.left-h.left,0,400)),e=n(this).index()}),i.on("touchmove",function(t){t.preventDefault()})})};n(a),t.exports=s.menu={VERSION:"4.0.3",init:a}},function(t,e,i){"use strict";function n(){function t(){h.append(b),h.find("li").not(".am-navbar-more").slice(i()-1).appendTo(w),n.append(w)}function e(){return i()>=d?(b.hide(),void w.find("li").insertBefore(b)):(!n.find(".am-navbar-actions").length&&t(),b.show(),void(h.find("li").length<i()?w.find("li").slice(0,i()-h.find("li").length).insertBefore(b):h.find("li").length>i()&&(w.find("li").length?h.find("li").not(b).slice(i()-1).insertBefore(w.find("li").first()):h.find("li").not(b).slice(i()-1).appendTo(w))))}function i(){return Math.floor((l.width()-f)/m)}var n=s('[data-am-widget="navbar"]');if(n.length){var l=s(window),c=s("body"),h=n.find(".am-navbar-nav"),u=n.find("li"),d=u.length,p=h.attr("class")&&parseInt(h.attr("class").match(/am-avg-sm-(\d+)/)[1])||3,m=60,f=16,v=u.filter("[data-am-navbar-share]"),g=u.filter("[data-am-navbar-qrcode]"),y="am-active",w=s('<ul class="am-navbar-actions"></ul>',{id:o.utils.generateGUID("am-navbar-actions")}),b=s('<li class="am-navbar-labels am-navbar-more"><a href="javascript: void(0);"><span class="am-icon-angle-up"></span><span class="am-navbar-label">\u66f4\u591a</span></a></li>');if("fixed"==n.css("position")&&c.addClass("am-with-fixed-navbar"),g.length){var T="am-navbar-qrcode";if(C=s("#"+T),!C.length){var x=g.attr("data-am-navbar-qrcode"),C=s('<div class="am-modal am-modal-no-btn" id=""><div class="am-modal-dialog"><div class="am-modal-bd"></div></div></div>',{id:T}),E=C.find(".am-modal-bd");if(x)E.html('<img src="'+x+'"/>');else{var S=new r({render:"canvas",correctLevel:0,text:window.location.href,width:200,height:200,background:"#fff",foreground:"#000"});E.html(S)}c.append(C)}g.on("click",function(t){t.preventDefault(),C.modal()})}d>p&&d>i()&&t(),n.on("click.navbar.amui",".am-navbar-more",function(t){t.preventDefault(),b[w.hasClass(y)?"removeClass":"addClass"](y),w.toggleClass(y)}),v.length&&v.on("click.navbar.amui",function(t){t.preventDefault(),a.toggle()}),l.on("resize.navbar.amui orientationchange.navbar.amui",o.utils.debounce(e,150))}}var s=i(1),o=i(2),a=i(25),r=i(26);i(15),s(n),t.exports=o.navbar={VERSION:"2.0.2",init:n}},function(t,e,i){"use strict";var n=i(2);t.exports=n.pagination={VERSION:"3.0.1"}},function(t,e,i){"use strict";function n(){var t=s('[data-am-widget="paragraph"]');t.each(function(t){var e=s(this),i=o.utils.parseOptions(e.attr("data-am-paragraph")),n=t;i.pureview&&e.pureview(),i.tableScrollable&&e.find("table").each(function(t){s(this).width()>s(window).width()&&s(this).scrollTable(n+"-"+t)})})}var s=i(1),o=i(2),a=i(14);i(20),s.fn.scrollTable=function(t){var e,i=s(this);i.wrap('<div class="am-paragraph-table-container" id="am-paragraph-table-'+t+'"><div class="am-paragraph-table-scroller"></div></div>'),e=i.parent(),e.width(i.width()),e.height(i.height()),new a("#am-paragraph-table-"+t,{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1})},s(window).on("load",n),t.exports=o.paragraph={VERSION:"2.0.1",init:n}},function(t,e,i){"use strict";function n(){var t=s('[data-am-widget="slider"]');t.not(".am-slider-manual").each(function(t,e){var i=o.utils.parseOptions(s(e).attr("data-am-slider"));s(e).flexslider(i)})}var s=i(1),o=i(2);i(11),s(n),t.exports=o.slider={VERSION:"3.0.1",init:n}},function(t,e,i){"use strict";function n(){s('[data-am-widget="tabs"]').each(function(){var t=s(this).data("amTabsNoswipe")?{noSwipe:1}:{};s(this).tabs(t)})}var s=i(1),o=i(2);i(28),s(n),t.exports=o.tab={VERSION:"4.0.1",init:n}},function(t,e,i){"use strict";var n=i(2);t.exports=n.titlebar={VERSION:"4.0.1"}},function(t,e,i){"use strict";function n(){var t=s('[data-am-widget="wechatpay"]');return a?void t.on("click",".am-wechatpay-btn",function(t){t.preventDefault();var e=o.utils.parseOptions(s(this).parent().data("wechatPay"));return window.wx?void wx.checkJsApi({jsApiList:["chooseWXPay"],success:function(t){t.checkResult.chooseWXPay?wx.chooseWXPay(e):alert("\u5fae\u4fe1\u7248\u672c\u4e0d\u652f\u6301\u652f\u4ed8\u63a5\u53e3\u6216\u6ca1\u6709\u5f00\u542f\uff01")},fail:function(){alert("\u8c03\u7528 checkJsApi \u63a5\u53e3\u65f6\u53d1\u751f\u9519\u8bef!")}}):void alert("\u6ca1\u6709\u5fae\u4fe1 JS SDK")}):(t.hide(),!1)}var s=i(1),o=i(2),a=window.navigator.userAgent.indexOf("MicroMessenger")>-1,r=n;s(r),t.exports=o.pay={VERSION:"1.0.0",init:r}}])});
},{"jquery":12}],5:[function(require,module,exports){
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define("bloodhound",["jquery"],function(c){return a.Bloodhound=b(c)}):"object"==typeof exports?module.exports=b(require("jquery")):a.Bloodhound=b(jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},noop:function(){}}}(),c="0.11.1",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){return function(c){return c=b.isArray(c)?c:[].slice.call(arguments,0),function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,obj:{nonword:d(c),whitespace:d(a)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key],this.size--),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];return b?(this.list.moveToFront(b),b.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function c(a,c){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix)),this.ls=c||h,!this.ls&&this._noop()}function d(){return(new Date).getTime()}function e(a){return JSON.stringify(b.isUndefined(a)?null:a)}function f(b){return a.parseJSON(b)}function g(a){var b,c,d=[],e=h.length;for(b=0;e>b;b++)(c=h.key(b)).match(a)&&d.push(c.replace(a,""));return d}var h;try{h=window.localStorage,h.setItem("~~~","!"),h.removeItem("~~~")}catch(i){h=null}return b.mixin(c.prototype,{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=b.noop},_safeSet:function(a,b){try{this.ls.setItem(a,b)}catch(c){"QuotaExceededError"===c.name&&(this.clear(),this._noop())}},get:function(a){return this.isExpired(a)&&this.remove(a),f(this.ls.getItem(this._prefix(a)))},set:function(a,c,f){return b.isNumber(f)?this._safeSet(this._ttlKey(a),e(d()+f)):this.ls.removeItem(this._ttlKey(a)),this._safeSet(this._prefix(a),e(c))},remove:function(a){return this.ls.removeItem(this._ttlKey(a)),this.ls.removeItem(this._prefix(a)),this},clear:function(){var a,b=g(this.keyMatcher);for(a=b.length;a--;)this.remove(b[a]);return this},isExpired:function(a){var c=f(this.ls.getItem(this._ttlKey(a)));return b.isNumber(c)&&d()>c?!0:!1}}),c}(),g=function(){"use strict";function c(a){a=a||{},this.cancelled=!1,this.lastReq=null,this._send=a.transport,this._get=a.limiter?a.limiter(this._get):this._get,this._cache=a.cache===!1?new e(0):h}var d=0,f={},g=6,h=new e(10);return c.setMaxPendingRequests=function(a){g=a},c.resetCache=function(){h.reset()},b.mixin(c.prototype,{_fingerprint:function(b){return b=b||{},b.url+b.type+a.param(b.data||{})},_get:function(a,b){function c(a){b(null,a),k._cache.set(i,a)}function e(){b(!0)}function h(){d--,delete f[i],k.onDeckRequestArgs&&(k._get.apply(k,k.onDeckRequestArgs),k.onDeckRequestArgs=null)}var i,j,k=this;i=this._fingerprint(a),this.cancelled||i!==this.lastReq||((j=f[i])?j.done(c).fail(e):g>d?(d++,f[i]=this._send(a).done(c).fail(e).always(h)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(c,d){var e,f;d=d||a.noop,c=b.isString(c)?{url:c}:c||{},f=this._fingerprint(c),this.cancelled=!1,this.lastReq=f,(e=this._cache.get(f))?d(null,e):this._get(c,d)},cancel:function(){this.cancelled=!0}}),c}(),h=window.SearchIndex=function(){"use strict";function c(c){c=c||{},c.datumTokenizer&&c.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.identify=c.identify||b.stringify,this.datumTokenizer=c.datumTokenizer,this.queryTokenizer=c.queryTokenizer,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){var a={};return a[i]=[],a[h]={},a}function f(a){for(var b={},c=[],d=0,e=a.length;e>d;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){var c=0,d=0,e=[];a=a.sort(),b=b.sort();for(var f=a.length,g=b.length;f>c&&g>d;)a[c]<b[d]?c++:a[c]>b[d]?d++:(e.push(a[c]),c++,d++);return e}var h="c",i="i";return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;c.datums[f=c.identify(a)]=a,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b[h][g]||(b[h][g]=e()),b[i].push(f)})})},get:function(a){var c=this;return b.map(a,function(a){return c.datums[a]})},search:function(a){var c,e,j=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length)return!1;for(b=j.trie,c=a.split("");b&&(d=c.shift());)b=b[h][d];return b&&0===c.length?(f=b[i].slice(0),void(e=e?g(e,f):f)):(e=[],!1)}),e?b.map(f(e),function(a){return j.datums[a]}):[]},all:function(){var a=[];for(var b in this.datums)a.push(this.datums[b]);return a},reset:function(){this.datums={},this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function a(a){this.url=a.url,this.ttl=a.ttl,this.cache=a.cache,this.prepare=a.prepare,this.transform=a.transform,this.transport=a.transport,this.thumbprint=a.thumbprint,this.storage=new f(a.cacheKey)}var c;return c={data:"data",protocol:"protocol",thumbprint:"thumbprint"},b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(a){this.cache&&(this.storage.set(c.data,a,this.ttl),this.storage.set(c.protocol,location.protocol,this.ttl),this.storage.set(c.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var a,b={};return this.cache?(b.data=this.storage.get(c.data),b.protocol=this.storage.get(c.protocol),b.thumbprint=this.storage.get(c.thumbprint),a=b.thumbprint!==this.thumbprint||b.protocol!==location.protocol,b.data&&!a?b.data:null):null},fromNetwork:function(a){function b(){a(!0)}function c(b){a(null,e.transform(b))}var d,e=this;a&&(d=this.prepare(this._settings()),this.transport(d).fail(b).done(c))},clear:function(){return this.storage.clear(),this}}),a}(),j=function(){"use strict";function a(a){this.url=a.url,this.prepare=a.prepare,this.transform=a.transform,this.transport=new g({cache:a.cache,limiter:a.limiter,transport:a.transport})}return b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(a,b){function c(a,c){b(a?[]:e.transform(c))}var d,e=this;if(b)return a=a||"",d=this.prepare(a,this._settings()),this.transport.get(d,c)},cancelLastRequest:function(){this.transport.cancel()}}),a}(),k=function(){"use strict";function d(d){var e;return d?(e={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:b.identity,transform:b.identity,transport:null},d=b.isString(d)?{url:d}:d,d=b.mixin(e,d),!d.url&&a.error("prefetch requires url to be set"),d.transform=d.filter||d.transform,d.cacheKey=d.cacheKey||d.url,d.thumbprint=c+d.thumbprint,d.transport=d.transport?h(d.transport):a.ajax,d):null}function e(c){var d;if(c)return d={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:b.identity,transport:null},c=b.isString(c)?{url:c}:c,c=b.mixin(d,c),!c.url&&a.error("remote requires url to be set"),c.transform=c.filter||c.transform,c.prepare=f(c),c.limiter=g(c),c.transport=c.transport?h(c.transport):a.ajax,delete c.replace,delete c.wildcard,delete c.rateLimitBy,delete c.rateLimitWait,c}function f(a){function b(a,b){return b.url=f(b.url,a),b}function c(a,b){return b.url=b.url.replace(g,encodeURIComponent(a)),b}function d(a,b){return b}var e,f,g;return e=a.prepare,f=a.replace,g=a.wildcard,e?e:e=f?b:a.wildcard?c:d}function g(a){function c(a){return function(c){return b.debounce(c,a)}}function d(a){return function(c){return b.throttle(c,a)}}var e,f,g;return e=a.limiter,f=a.rateLimitBy,g=a.rateLimitWait,e||(e=/^throttle$/i.test(f)?d(g):c(g)),e}function h(c){return function(d){function e(a){b.defer(function(){g.resolve(a)})}function f(a){b.defer(function(){g.reject(a)})}var g=a.Deferred();return c(d,e,f),g}}return function(c){var f,g;return f={initialize:!0,identify:b.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null},c=b.mixin(f,c||{}),!c.datumTokenizer&&a.error("datumTokenizer is required"),!c.queryTokenizer&&a.error("queryTokenizer is required"),g=c.sorter,c.sorter=g?function(a){return a.sort(g)}:b.identity,c.local=b.isFunction(c.local)?c.local():c.local,c.prefetch=d(c.prefetch),c.remote=e(c.remote),c}}(),l=function(){"use strict";function c(a){a=k(a),this.sorter=a.sorter,this.identify=a.identify,this.sufficient=a.sufficient,this.local=a.local,this.remote=a.remote?new j(a.remote):null,this.prefetch=a.prefetch?new i(a.prefetch):null,this.index=new h({identify:this.identify,datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer}),a.initialize!==!1&&this.initialize()}var e;return e=window&&window.Bloodhound,c.noConflict=function(){return window&&(window.Bloodhound=e),c},c.tokenizers=d,b.mixin(c.prototype,{__ttAdapter:function(){function a(a,b,d){return c.search(a,b,d)}function b(a,b){return c.search(a,b)}var c=this;return this.remote?a:b},_loadPrefetch:function(){function b(a,b){return a?c.reject():(e.add(b),e.prefetch.store(e.index.serialize()),void c.resolve())}var c,d,e=this;return c=a.Deferred(),this.prefetch?(d=this.prefetch.fromCache())?(this.index.bootstrap(d),c.resolve()):this.prefetch.fromNetwork(b):c.resolve(),c.promise()},_initialize:function(){function a(){b.add(b.local)}var b=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(a),this.initPromise},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){return this.index.add(a),this},get:function(a){return a=b.isArray(a)?a:[].slice.call(arguments),this.index.get(a)},search:function(a,c,d){function e(a){var c=[];b.each(a,function(a){!b.some(f,function(b){return g.identify(a)===g.identify(b)})&&c.push(a)}),d&&d(c)}var f,g=this;return f=this.sorter(this.index.search(a)),c(this.remote?f.slice():f),this.remote&&f.length<this.sufficient?this.remote.get(a,e):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return g.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),c}();return l});
},{"jquery":12}],6:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*
 Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
 Code licensed under the BSD License: http://www.featureblend.com/license.txt
 Version: 1.0.4
 */
var FlashDetect = new function(){
    var self = this;
    self.installed = false;
    self.raw = "";
    self.major = -1;
    self.minor = -1;
    self.revision = -1;
    self.revisionStr = "";
    var activeXDetectRules = [
        {
            "name":"ShockwaveFlash.ShockwaveFlash.7",
            "version":function(obj){
                return getActiveXVersion(obj);
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash.6",
            "version":function(obj){
                var version = "6,0,21";
                try{
                    obj.AllowScriptAccess = "always";
                    version = getActiveXVersion(obj);
                }catch(err){}
                return version;
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash",
            "version":function(obj){
                return getActiveXVersion(obj);
            }
        }
    ];
    /**
     * Extract the ActiveX version of the plugin.
     *
     * @param {Object} The flash ActiveX object.
     * @type String
     */
    var getActiveXVersion = function(activeXObj){
        var version = -1;
        try{
            version = activeXObj.GetVariable("$version");
        }catch(err){}
        return version;
    };
    /**
     * Try and retrieve an ActiveX object having a specified name.
     *
     * @param {String} name The ActiveX object name lookup.
     * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
     * @type Object
     */
    var getActiveXObject = function(name){
        var obj = -1;
        try{
            obj = new ActiveXObject(name);
        }catch(err){
            obj = {activeXError:true};
        }
        return obj;
    };
    /**
     * Parse an ActiveX $version string into an object.
     *
     * @param {String} str The ActiveX Object GetVariable($version) return value.
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    var parseActiveXVersion = function(str){
        var versionArray = str.split(",");//replace with regex
        return {
            "raw":str,
            "major":parseInt(versionArray[0].split(" ")[1], 10),
            "minor":parseInt(versionArray[1], 10),
            "revision":parseInt(versionArray[2], 10),
            "revisionStr":versionArray[2]
        };
    };
    /**
     * Parse a standard enabledPlugin.description into an object.
     *
     * @param {String} str The enabledPlugin.description value.
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    var parseStandardVersion = function(str){
        var descParts = str.split(/ +/);
        var majorMinor = descParts[2].split(/\./);
        var revisionStr = descParts[3];
        return {
            "raw":str,
            "major":parseInt(majorMinor[0], 10),
            "minor":parseInt(majorMinor[1], 10),
            "revisionStr":revisionStr,
            "revision":parseRevisionStrToInt(revisionStr)
        };
    };
    /**
     * Parse the plugin revision string into an integer.
     *
     * @param {String} The revision in string format.
     * @type Number
     */
    var parseRevisionStrToInt = function(str){
        return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
    };
    /**
     * Is the major version greater than or equal to a specified version.
     *
     * @param {Number} version The minimum required major version.
     * @type Boolean
     */
    self.majorAtLeast = function(version){
        return self.major >= version;
    };
    /**
     * Is the minor version greater than or equal to a specified version.
     *
     * @param {Number} version The minimum required minor version.
     * @type Boolean
     */
    self.minorAtLeast = function(version){
        return self.minor >= version;
    };
    /**
     * Is the revision version greater than or equal to a specified version.
     *
     * @param {Number} version The minimum required revision version.
     * @type Boolean
     */
    self.revisionAtLeast = function(version){
        return self.revision >= version;
    };
    /**
     * Is the version greater than or equal to a specified major, minor and revision.
     *
     * @param {Number} major The minimum required major version.
     * @param {Number} (Optional) minor The minimum required minor version.
     * @param {Number} (Optional) revision The minimum required revision version.
     * @type Boolean
     */
    self.versionAtLeast = function(major){
        var properties = [self.major, self.minor, self.revision];
        var len = Math.min(properties.length, arguments.length);
        for(i=0; i<len; i++){
            if(properties[i]>=arguments[i]){
                if(i+1<len && properties[i]==arguments[i]){
                    continue;
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }
    };
    /**
     * Constructor, sets raw, major, minor, revisionStr, revision and installed public properties.
     */
    self.FlashDetect = function(){
        if(navigator.plugins && navigator.plugins.length>0){
            var type = 'application/x-shockwave-flash';
            var mimeTypes = navigator.mimeTypes;
            if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
                var version = mimeTypes[type].enabledPlugin.description;
                var versionObj = parseStandardVersion(version);
                self.raw = versionObj.raw;
                self.major = versionObj.major;
                self.minor = versionObj.minor;
                self.revisionStr = versionObj.revisionStr;
                self.revision = versionObj.revision;
                self.installed = true;
            }
        }else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
            var version = -1;
            for(var i=0; i<activeXDetectRules.length && version==-1; i++){
                var obj = getActiveXObject(activeXDetectRules[i].name);
                if(!obj.activeXError){
                    self.installed = true;
                    version = activeXDetectRules[i].version(obj);
                    if(version!=-1){
                        var versionObj = parseActiveXVersion(version);
                        self.raw = versionObj.raw;
                        self.major = versionObj.major;
                        self.minor = versionObj.minor;
                        self.revision = versionObj.revision;
                        self.revisionStr = versionObj.revisionStr;
                    }
                }
            }
        }
    }();
};
FlashDetect.JS_RELEASE = "1.0.4";

if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
        return FlashDetect;
    });
} else if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS
    module.exports = FlashDetect;
}
; browserify_shim__define__module__export__(typeof FlashDetect != "undefined" ? FlashDetect : window.FlashDetect);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

},{"jquery":12}],8:[function(require,module,exports){
!function(e){"use strict";var t={i18n:{ar:{months:["كانون الثاني","شباط","آذار","نيسان","مايو","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],dayOfWeek:["ن","ث","ع","خ","ج","س","ح"]},ro:{months:["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"],dayOfWeek:["l","ma","mi","j","v","s","d"]},id:{months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],dayOfWeek:["Sen","Sel","Rab","Kam","Jum","Sab","Min"]},bg:{months:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],dayOfWeek:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]},fa:{months:["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"],dayOfWeek:["یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"]},ru:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],dayOfWeek:["Вск","Пн","Вт","Ср","Чт","Пт","Сб"]},uk:{months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],dayOfWeek:["Ндл","Пнд","Втр","Срд","Чтв","Птн","Сбт"]},en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeek:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},el:{months:["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],dayOfWeek:["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"]},de:{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],dayOfWeek:["So","Mo","Di","Mi","Do","Fr","Sa"]},nl:{months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],dayOfWeek:["zo","ma","di","wo","do","vr","za"]},tr:{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],dayOfWeek:["Paz","Pts","Sal","Çar","Per","Cum","Cts"]},fr:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],dayOfWeek:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"]},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],dayOfWeek:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"]},th:{months:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],dayOfWeek:["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."]},pl:{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],dayOfWeek:["nd","pn","wt","śr","cz","pt","sb"]},pt:{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeek:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"]},ch:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeek:["日","一","二","三","四","五","六"]},se:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeek:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},kr:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeek:["일","월","화","수","목","금","토"]},it:{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],dayOfWeek:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"]},da:{months:["January","Februar","Marts","April","Maj","Juni","July","August","September","Oktober","November","December"],dayOfWeek:["Søn","Man","Tir","Ons","Tor","Fre","Lør"]},no:{months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],dayOfWeek:["Søn","Man","Tir","Ons","Tor","Fre","Lør"]},ja:{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayOfWeek:["日","月","火","水","木","金","土"]},vi:{months:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],dayOfWeek:["CN","T2","T3","T4","T5","T6","T7"]},sl:{months:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],dayOfWeek:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"]},cs:{months:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],dayOfWeek:["Ne","Po","Út","St","Čt","Pá","So"]},hu:{months:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],dayOfWeek:["Va","Hé","Ke","Sze","Cs","Pé","Szo"]},az:{months:["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],dayOfWeek:["B","Be","Ça","Ç","Ca","C","Ş"]},bs:{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeek:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"]},ca:{months:["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],dayOfWeek:["Dg","Dl","Dt","Dc","Dj","Dv","Ds"]},"en-GB":{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeek:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},et:{months:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],dayOfWeek:["P","E","T","K","N","R","L"]},eu:{months:["Urtarrila","Otsaila","Martxoa","Apirila","Maiatza","Ekaina","Uztaila","Abuztua","Iraila","Urria","Azaroa","Abendua"],dayOfWeek:["Ig.","Al.","Ar.","Az.","Og.","Or.","La."]},fi:{months:["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"],dayOfWeek:["Su","Ma","Ti","Ke","To","Pe","La"]},gl:{months:["Xan","Feb","Maz","Abr","Mai","Xun","Xul","Ago","Set","Out","Nov","Dec"],dayOfWeek:["Dom","Lun","Mar","Mer","Xov","Ven","Sab"]},hr:{months:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],dayOfWeek:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"]},ko:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeek:["일","월","화","수","목","금","토"]},lt:{months:["Sausio","Vasario","Kovo","Balandžio","Gegužės","Birželio","Liepos","Rugpjūčio","Rugsėjo","Spalio","Lapkričio","Gruodžio"],dayOfWeek:["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"]},lv:{months:["Janvāris","Februāris","Marts","Aprīlis ","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"],dayOfWeek:["Sv","Pr","Ot","Tr","Ct","Pk","St"]},mk:{months:["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],dayOfWeek:["нед","пон","вто","сре","чет","пет","саб"]},mn:{months:["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],dayOfWeek:["Дав","Мяг","Лха","Пүр","Бсн","Бям","Ням"]},"pt-BR":{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeek:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"]},sk:{months:["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"],dayOfWeek:["Ne","Po","Ut","St","Št","Pi","So"]},sq:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeek:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},"sr-YU":{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeek:["Ned","Pon","Uto","Sre","čet","Pet","Sub"]},sr:{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],dayOfWeek:["нед","пон","уто","сре","чет","пет","суб"]},sv:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeek:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},"zh-TW":{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeek:["日","一","二","三","四","五","六"]},zh:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeek:["日","一","二","三","四","五","六"]},he:{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],dayOfWeek:["א'","ב'","ג'","ד'","ה'","ו'","שבת"]},hy:{months:["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],dayOfWeek:["Կի","Երկ","Երք","Չոր","Հնգ","Ուրբ","Շբթ"]}},value:"",lang:"en",format:"Y/m/d H:i",formatTime:"H:i",formatDate:"Y/m/d",startDate:!1,step:60,monthChangeSpinner:!0,closeOnDateSelect:!1,closeOnWithoutClick:!0,closeOnInputClick:!0,timepicker:!0,datepicker:!0,weeks:!1,defaultTime:!1,defaultDate:!1,minDate:!1,maxDate:!1,minTime:!1,maxTime:!1,allowTimes:[],opened:!1,initTime:!0,inline:!1,theme:"",onSelectDate:function(){},onSelectTime:function(){},onChangeMonth:function(){},onChangeYear:function(){},onChangeDateTime:function(){},onShow:function(){},onClose:function(){},onGenerate:function(){},withoutCopyright:!0,inverseButton:!1,hours12:!1,next:"xdsoft_next",prev:"xdsoft_prev",dayOfWeekStart:0,parentID:"body",timeHeightInTimePicker:25,timepickerScrollbar:!0,todayButton:!0,defaultSelect:!0,scrollMonth:!0,scrollTime:!0,scrollInput:!0,lazyInit:!1,mask:!1,validateOnBlur:!0,allowBlank:!0,yearStart:1950,yearEnd:2050,style:"",id:"",fixed:!1,roundTime:"round",className:"",weekends:[],disabledDates:[],yearOffset:0,beforeShowDay:null,enterLikeTab:!0};Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n,a;for(n=t||0,a=this.length;a>n;n+=1)if(this[n]===e)return n;return-1}),Date.prototype.countDaysInMonth=function(){return new Date(this.getFullYear(),this.getMonth()+1,0).getDate()},e.fn.xdsoftScroller=function(t){return this.each(function(){var n,a,r,o,s,i=e(this),u=function(e){var t,n={x:0,y:0};return"touchstart"===e.type||"touchmove"===e.type||"touchend"===e.type||"touchcancel"===e.type?(t=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],n.x=t.clientX,n.y=t.clientY):("mousedown"===e.type||"mouseup"===e.type||"mousemove"===e.type||"mouseover"===e.type||"mouseout"===e.type||"mouseenter"===e.type||"mouseleave"===e.type)&&(n.x=e.clientX,n.y=e.clientY),n},d=100,l=!1,c=0,f=0,m=0,h=!1,g=0,p=function(){};return"hide"===t?void i.find(".xdsoft_scrollbar").hide():(e(this).hasClass("xdsoft_scroller_box")||(n=i.children().eq(0),a=i[0].clientHeight,r=n[0].offsetHeight,o=e('<div class="xdsoft_scrollbar"></div>'),s=e('<div class="xdsoft_scroller"></div>'),o.append(s),i.addClass("xdsoft_scroller_box").append(o),p=function(e){var t=u(e).y-c+g;0>t&&(t=0),t+s[0].offsetHeight>m&&(t=m-s[0].offsetHeight),i.trigger("scroll_element.xdsoft_scroller",[d?t/d:0])},s.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller",function(n){a||i.trigger("resize_scroll.xdsoft_scroller",[t]),c=u(n).y,g=parseInt(s.css("margin-top"),10),m=o[0].offsetHeight,"mousedown"===n.type?(document&&e(document.body).addClass("xdsoft_noselect"),e([document.body,window]).on("mouseup.xdsoft_scroller",function r(){e([document.body,window]).off("mouseup.xdsoft_scroller",r).off("mousemove.xdsoft_scroller",p).removeClass("xdsoft_noselect")}),e(document.body).on("mousemove.xdsoft_scroller",p)):(h=!0,n.stopPropagation(),n.preventDefault())}).on("touchmove",function(e){h&&(e.preventDefault(),p(e))}).on("touchend touchcancel",function(){h=!1,g=0}),i.on("scroll_element.xdsoft_scroller",function(e,t){a||i.trigger("resize_scroll.xdsoft_scroller",[t,!0]),t=t>1?1:0>t||isNaN(t)?0:t,s.css("margin-top",d*t),setTimeout(function(){n.css("marginTop",-parseInt((n[0].offsetHeight-a)*t,10))},10)}).on("resize_scroll.xdsoft_scroller",function(e,t,u){var l,c;a=i[0].clientHeight,r=n[0].offsetHeight,l=a/r,c=l*o[0].offsetHeight,l>1?s.hide():(s.show(),s.css("height",parseInt(c>10?c:10,10)),d=o[0].offsetHeight-s[0].offsetHeight,u!==!0&&i.trigger("scroll_element.xdsoft_scroller",[t||Math.abs(parseInt(n.css("marginTop"),10))/(r-a)]))}),i.on("mousewheel",function(e){var t=Math.abs(parseInt(n.css("marginTop"),10));return t-=20*e.deltaY,0>t&&(t=0),i.trigger("scroll_element.xdsoft_scroller",[t/(r-a)]),e.stopPropagation(),!1}),i.on("touchstart",function(e){l=u(e),f=Math.abs(parseInt(n.css("marginTop"),10))}),i.on("touchmove",function(e){if(l){e.preventDefault();var t=u(e);i.trigger("scroll_element.xdsoft_scroller",[(f-(t.y-l.y))/(r-a)])}}),i.on("touchend touchcancel",function(){l=!1,f=0})),void i.trigger("resize_scroll.xdsoft_scroller",[t]))})},e.fn.datetimepicker=function(n){var a,r,o=48,s=57,i=96,u=105,d=17,l=46,c=13,f=27,m=8,h=37,g=38,p=39,x=40,y=9,D=116,v=65,b=67,T=86,k=90,w=89,M=!1,S=e.isPlainObject(n)||!n?e.extend(!0,{},t,n):e.extend(!0,{},t),O=0,_=function(e){e.on("open.xdsoft focusin.xdsoft mousedown.xdsoft",function t(){e.is(":disabled")||e.data("xdsoft_datetimepicker")||(clearTimeout(O),O=setTimeout(function(){e.data("xdsoft_datetimepicker")||a(e),e.off("open.xdsoft focusin.xdsoft mousedown.xdsoft",t).trigger("open.xdsoft")},100))})};return a=function(t){function a(){var e,n=!1;return S.startDate?n=W.strToDate(S.startDate):(n=S.value||(t&&t.val&&t.val()?t.val():""),n?n=W.strToDateTime(n):S.defaultDate&&(n=W.strToDate(S.defaultDate),S.defaultTime&&(e=W.strtotime(S.defaultTime),n.setHours(e.getHours()),n.setMinutes(e.getMinutes())))),n&&W.isValidDate(n)?Y.data("changed",!0):n="",n||0}var r,O,_,F,A,W,Y=e("<div "+(S.id?'id="'+S.id+'"':"")+" "+(S.style?'style="'+S.style+'"':"")+' class="xdsoft_datetimepicker xdsoft_'+S.theme+" xdsoft_noselect "+(S.weeks?" xdsoft_showweeks":"")+S.className+'"></div>'),P=e('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),C=e('<div class="xdsoft_datepicker active"></div>'),J=e('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),I=e('<div class="xdsoft_calendar"></div>'),N=e('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),H=N.find(".xdsoft_time_box").eq(0),z=e('<div class="xdsoft_time_variant"></div>'),j=e('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),L=e('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),R=!1,B=0,V=0;J.find(".xdsoft_month span").after(j),J.find(".xdsoft_year span").after(L),J.find(".xdsoft_month,.xdsoft_year").on("mousedown.xdsoft",function(t){var n,a,r=e(this).find(".xdsoft_select").eq(0),o=0,s=0,i=r.is(":visible");for(J.find(".xdsoft_select").hide(),W.currentTime&&(o=W.currentTime[e(this).hasClass("xdsoft_month")?"getMonth":"getFullYear"]()),r[i?"hide":"show"](),n=r.find("div.xdsoft_option"),a=0;a<n.length&&n.eq(a).data("value")!==o;a+=1)s+=n[0].offsetHeight;return r.xdsoftScroller(s/(r.children()[0].offsetHeight-r[0].clientHeight)),t.stopPropagation(),!1}),J.find(".xdsoft_select").xdsoftScroller().on("mousedown.xdsoft",function(e){e.stopPropagation(),e.preventDefault()}).on("mousedown.xdsoft",".xdsoft_option",function(){(void 0===W.currentTime||null===W.currentTime)&&(W.currentTime=W.now());var t=W.currentTime.getFullYear();W&&W.currentTime&&W.currentTime[e(this).parent().parent().hasClass("xdsoft_monthselect")?"setMonth":"setFullYear"](e(this).data("value")),e(this).parent().parent().hide(),Y.trigger("xchange.xdsoft"),S.onChangeMonth&&e.isFunction(S.onChangeMonth)&&S.onChangeMonth.call(Y,W.currentTime,Y.data("input")),t!==W.currentTime.getFullYear()&&e.isFunction(S.onChangeYear)&&S.onChangeYear.call(Y,W.currentTime,Y.data("input"))}),Y.setOptions=function(n){if(S=e.extend(!0,{},S,n),n.allowTimes&&e.isArray(n.allowTimes)&&n.allowTimes.length&&(S.allowTimes=e.extend(!0,[],n.allowTimes)),n.weekends&&e.isArray(n.weekends)&&n.weekends.length&&(S.weekends=e.extend(!0,[],n.weekends)),n.disabledDates&&e.isArray(n.disabledDates)&&n.disabledDates.length&&(S.disabledDates=e.extend(!0,[],n.disabledDates)),!S.open&&!S.opened||S.inline||t.trigger("open.xdsoft"),S.inline&&(R=!0,Y.addClass("xdsoft_inline"),t.after(Y).hide()),S.inverseButton&&(S.next="xdsoft_prev",S.prev="xdsoft_next"),S.datepicker?C.addClass("active"):C.removeClass("active"),S.timepicker?N.addClass("active"):N.removeClass("active"),S.value&&(t&&t.val&&t.val(S.value),W.setCurrentTime(S.value)),S.dayOfWeekStart=isNaN(S.dayOfWeekStart)?0:parseInt(S.dayOfWeekStart,10)%7,S.timepickerScrollbar||H.xdsoftScroller("hide"),S.minDate&&/^-(.*)$/.test(S.minDate)&&(S.minDate=W.strToDateTime(S.minDate).dateFormat(S.formatDate)),S.maxDate&&/^\+(.*)$/.test(S.maxDate)&&(S.maxDate=W.strToDateTime(S.maxDate).dateFormat(S.formatDate)),J.find(".xdsoft_today_button").css("visibility",S.todayButton?"visible":"hidden"),S.mask){var a=function(e){try{if(document.selection&&document.selection.createRange){var t=document.selection.createRange();return t.getBookmark().charCodeAt(2)-2}if(e.setSelectionRange)return e.selectionStart}catch(n){return 0}},r=function(e,t){if(e="string"==typeof e||e instanceof String?document.getElementById(e):e,!e)return!1;if(e.createTextRange){var n=e.createTextRange();return n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",t),n.select(),!0}return e.setSelectionRange?(e.setSelectionRange(t,t),!0):!1},O=function(e,t){var n=e.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g,"\\$1").replace(/_/g,"{digit+}").replace(/([0-9]{1})/g,"{digit$1}").replace(/\{digit([0-9]{1})\}/g,"[0-$1_]{1}").replace(/\{digit[\+]\}/g,"[0-9_]{1}");return new RegExp(n).test(t)};t.off("keydown.xdsoft"),S.mask===!0&&(S.mask=S.format.replace(/Y/g,"9999").replace(/F/g,"9999").replace(/m/g,"19").replace(/d/g,"39").replace(/H/g,"29").replace(/i/g,"59").replace(/s/g,"59")),"string"===e.type(S.mask)&&(O(S.mask,t.val())||t.val(S.mask.replace(/[0-9]/g,"_")),t.on("keydown.xdsoft",function(n){var _,F,A=this.value,W=n.which;if(W>=o&&s>=W||W>=i&&u>=W||W===m||W===l){for(_=a(this),F=W!==m&&W!==l?String.fromCharCode(W>=i&&u>=W?W-o:W):"_",W!==m&&W!==l||!_||(_-=1,F="_");/[^0-9_]/.test(S.mask.substr(_,1))&&_<S.mask.length&&_>0;)_+=W===m||W===l?-1:1;if(A=A.substr(0,_)+F+A.substr(_+1),""===e.trim(A))A=S.mask.replace(/[0-9]/g,"_");else if(_===S.mask.length)return n.preventDefault(),!1;for(_+=W===m||W===l?0:1;/[^0-9_]/.test(S.mask.substr(_,1))&&_<S.mask.length&&_>0;)_+=W===m||W===l?-1:1;O(S.mask,A)?(this.value=A,r(this,_)):""===e.trim(A)?this.value=S.mask.replace(/[0-9]/g,"_"):t.trigger("error_input.xdsoft")}else if(-1!==[v,b,T,k,w].indexOf(W)&&M||-1!==[f,g,x,h,p,D,d,y,c].indexOf(W))return!0;return n.preventDefault(),!1}))}S.validateOnBlur&&t.off("blur.xdsoft").on("blur.xdsoft",function(){if(S.allowBlank&&!e.trim(e(this).val()).length)e(this).val(null),Y.data("xdsoft_datetime").empty();else if(Date.parseDate(e(this).val(),S.format))Y.data("xdsoft_datetime").setCurrentTime(e(this).val());else{var t=+[e(this).val()[0],e(this).val()[1]].join(""),n=+[e(this).val()[2],e(this).val()[3]].join("");e(this).val(!S.datepicker&&S.timepicker&&t>=0&&24>t&&n>=0&&60>n?[t,n].map(function(e){return e>9?e:"0"+e}).join(":"):W.now().dateFormat(S.format)),Y.data("xdsoft_datetime").setCurrentTime(e(this).val())}Y.trigger("changedatetime.xdsoft")}),S.dayOfWeekStartPrev=0===S.dayOfWeekStart?6:S.dayOfWeekStart-1,Y.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")},Y.data("options",S).on("mousedown.xdsoft",function(e){return e.stopPropagation(),e.preventDefault(),L.hide(),j.hide(),!1}),H.append(z),H.xdsoftScroller(),Y.on("afterOpen.xdsoft",function(){H.xdsoftScroller()}),Y.append(C).append(N),S.withoutCopyright!==!0&&Y.append(P),C.append(J).append(I),e(S.parentID).append(Y),r=function(){var t=this;t.now=function(e){var n,a,r=new Date;return!e&&S.defaultDate&&(n=t.strToDate(S.defaultDate),r.setFullYear(n.getFullYear()),r.setMonth(n.getMonth()),r.setDate(n.getDate())),S.yearOffset&&r.setFullYear(r.getFullYear()+S.yearOffset),!e&&S.defaultTime&&(a=t.strtotime(S.defaultTime),r.setHours(a.getHours()),r.setMinutes(a.getMinutes())),r},t.isValidDate=function(e){return"[object Date]"!==Object.prototype.toString.call(e)?!1:!isNaN(e.getTime())},t.setCurrentTime=function(e){t.currentTime="string"==typeof e?t.strToDateTime(e):t.isValidDate(e)?e:t.now(),Y.trigger("xchange.xdsoft")},t.empty=function(){t.currentTime=null},t.getCurrentTime=function(){return t.currentTime},t.nextMonth=function(){(void 0===t.currentTime||null===t.currentTime)&&(t.currentTime=t.now());var n,a=t.currentTime.getMonth()+1;return 12===a&&(t.currentTime.setFullYear(t.currentTime.getFullYear()+1),a=0),n=t.currentTime.getFullYear(),t.currentTime.setDate(Math.min(new Date(t.currentTime.getFullYear(),a+1,0).getDate(),t.currentTime.getDate())),t.currentTime.setMonth(a),S.onChangeMonth&&e.isFunction(S.onChangeMonth)&&S.onChangeMonth.call(Y,W.currentTime,Y.data("input")),n!==t.currentTime.getFullYear()&&e.isFunction(S.onChangeYear)&&S.onChangeYear.call(Y,W.currentTime,Y.data("input")),Y.trigger("xchange.xdsoft"),a},t.prevMonth=function(){(void 0===t.currentTime||null===t.currentTime)&&(t.currentTime=t.now());var n=t.currentTime.getMonth()-1;return-1===n&&(t.currentTime.setFullYear(t.currentTime.getFullYear()-1),n=11),t.currentTime.setDate(Math.min(new Date(t.currentTime.getFullYear(),n+1,0).getDate(),t.currentTime.getDate())),t.currentTime.setMonth(n),S.onChangeMonth&&e.isFunction(S.onChangeMonth)&&S.onChangeMonth.call(Y,W.currentTime,Y.data("input")),Y.trigger("xchange.xdsoft"),n},t.getWeekOfYear=function(e){var t=new Date(e.getFullYear(),0,1);return Math.ceil(((e-t)/864e5+t.getDay()+1)/7)},t.strToDateTime=function(e){var n,a,r=[];return e&&e instanceof Date&&t.isValidDate(e)?e:(r=/^(\+|\-)(.*)$/.exec(e),r&&(r[2]=Date.parseDate(r[2],S.formatDate)),r&&r[2]?(n=r[2].getTime()-6e4*r[2].getTimezoneOffset(),a=new Date(W.now().getTime()+parseInt(r[1]+"1",10)*n)):a=e?Date.parseDate(e,S.format):t.now(),t.isValidDate(a)||(a=t.now()),a)},t.strToDate=function(e){if(e&&e instanceof Date&&t.isValidDate(e))return e;var n=e?Date.parseDate(e,S.formatDate):t.now(!0);return t.isValidDate(n)||(n=t.now(!0)),n},t.strtotime=function(e){if(e&&e instanceof Date&&t.isValidDate(e))return e;var n=e?Date.parseDate(e,S.formatTime):t.now(!0);return t.isValidDate(n)||(n=t.now(!0)),n},t.str=function(){return t.currentTime.dateFormat(S.format)},t.currentTime=this.now()},W=new r,J.find(".xdsoft_today_button").on("mousedown.xdsoft",function(){Y.data("changed",!0),W.setCurrentTime(0),Y.trigger("afterOpen.xdsoft")}).on("dblclick.xdsoft",function(){t.val(W.str()),Y.trigger("close.xdsoft")}),J.find(".xdsoft_prev,.xdsoft_next").on("mousedown.xdsoft",function(){var t=e(this),n=0,a=!1;!function r(e){t.hasClass(S.next)?W.nextMonth():t.hasClass(S.prev)&&W.prevMonth(),S.monthChangeSpinner&&(a||(n=setTimeout(r,e||100)))}(500),e([document.body,window]).on("mouseup.xdsoft",function o(){clearTimeout(n),a=!0,e([document.body,window]).off("mouseup.xdsoft",o)})}),N.find(".xdsoft_prev,.xdsoft_next").on("mousedown.xdsoft",function(){var t=e(this),n=0,a=!1,r=110;!function o(e){var s=H[0].clientHeight,i=z[0].offsetHeight,u=Math.abs(parseInt(z.css("marginTop"),10));t.hasClass(S.next)&&i-s-S.timeHeightInTimePicker>=u?z.css("marginTop","-"+(u+S.timeHeightInTimePicker)+"px"):t.hasClass(S.prev)&&u-S.timeHeightInTimePicker>=0&&z.css("marginTop","-"+(u-S.timeHeightInTimePicker)+"px"),H.trigger("scroll_element.xdsoft_scroller",[Math.abs(parseInt(z.css("marginTop"),10)/(i-s))]),r=r>10?10:r-10,a||(n=setTimeout(o,e||r))}(500),e([document.body,window]).on("mouseup.xdsoft",function s(){clearTimeout(n),a=!0,e([document.body,window]).off("mouseup.xdsoft",s)})}),O=0,Y.on("xchange.xdsoft",function(t){clearTimeout(O),O=setTimeout(function(){(void 0===W.currentTime||null===W.currentTime)&&(W.currentTime=W.now());for(var t,a,r,o,s,i,u,d="",l=new Date(W.currentTime.getFullYear(),W.currentTime.getMonth(),1,12,0,0),c=0,f=W.now(),m=!1,h=!1,g=[],p=!0,x="",y="";l.getDay()!==S.dayOfWeekStart;)l.setDate(l.getDate()-1);for(d+="<table><thead><tr>",S.weeks&&(d+="<th></th>"),t=0;7>t;t+=1)d+="<th>"+S.i18n[S.lang].dayOfWeek[(t+S.dayOfWeekStart)%7]+"</th>";for(d+="</tr></thead>",d+="<tbody>",S.maxDate!==!1&&(m=W.strToDate(S.maxDate),m=new Date(m.getFullYear(),m.getMonth(),m.getDate(),23,59,59,999)),S.minDate!==!1&&(h=W.strToDate(S.minDate),h=new Date(h.getFullYear(),h.getMonth(),h.getDate()));c<W.currentTime.countDaysInMonth()||l.getDay()!==S.dayOfWeekStart||W.currentTime.getMonth()===l.getMonth();)g=[],c+=1,a=l.getDate(),r=l.getFullYear(),o=l.getMonth(),s=W.getWeekOfYear(l),g.push("xdsoft_date"),i=S.beforeShowDay&&e.isFunction(S.beforeShowDay.call)?S.beforeShowDay.call(Y,l):null,m!==!1&&l>m||h!==!1&&h>l||i&&i[0]===!1?g.push("xdsoft_disabled"):-1!==S.disabledDates.indexOf(l.dateFormat(S.formatDate))&&g.push("xdsoft_disabled"),i&&""!==i[1]&&g.push(i[1]),W.currentTime.getMonth()!==o&&g.push("xdsoft_other_month"),(S.defaultSelect||Y.data("changed"))&&W.currentTime.dateFormat(S.formatDate)===l.dateFormat(S.formatDate)&&g.push("xdsoft_current"),f.dateFormat(S.formatDate)===l.dateFormat(S.formatDate)&&g.push("xdsoft_today"),(0===l.getDay()||6===l.getDay()||~S.weekends.indexOf(l.dateFormat(S.formatDate)))&&g.push("xdsoft_weekend"),S.beforeShowDay&&e.isFunction(S.beforeShowDay)&&g.push(S.beforeShowDay(l)),p&&(d+="<tr>",p=!1,S.weeks&&(d+="<th>"+s+"</th>")),d+='<td data-date="'+a+'" data-month="'+o+'" data-year="'+r+'" class="xdsoft_date xdsoft_day_of_week'+l.getDay()+" "+g.join(" ")+'"><div>'+a+"</div></td>",l.getDay()===S.dayOfWeekStartPrev&&(d+="</tr>",p=!0),l.setDate(a+1);if(d+="</tbody></table>",I.html(d),J.find(".xdsoft_label span").eq(0).text(S.i18n[S.lang].months[W.currentTime.getMonth()]),J.find(".xdsoft_label span").eq(1).text(W.currentTime.getFullYear()),x="",y="",o="",u=function(e,t){var n=W.now();n.setHours(e),e=parseInt(n.getHours(),10),n.setMinutes(t),t=parseInt(n.getMinutes(),10);var a=new Date(W.currentTime);a.setHours(e),a.setMinutes(t),g=[],(S.minDateTime!==!1&&S.minDateTime>a||S.maxTime!==!1&&W.strtotime(S.maxTime).getTime()<n.getTime()||S.minTime!==!1&&W.strtotime(S.minTime).getTime()>n.getTime())&&g.push("xdsoft_disabled"),(S.initTime||S.defaultSelect||Y.data("changed"))&&parseInt(W.currentTime.getHours(),10)===parseInt(e,10)&&(S.step>59||Math[S.roundTime](W.currentTime.getMinutes()/S.step)*S.step===parseInt(t,10))&&(S.defaultSelect||Y.data("changed")?g.push("xdsoft_current"):S.initTime&&g.push("xdsoft_init_time")),parseInt(f.getHours(),10)===parseInt(e,10)&&parseInt(f.getMinutes(),10)===parseInt(t,10)&&g.push("xdsoft_today"),x+='<div class="xdsoft_time '+g.join(" ")+'" data-hour="'+e+'" data-minute="'+t+'">'+n.dateFormat(S.formatTime)+"</div>"},S.allowTimes&&e.isArray(S.allowTimes)&&S.allowTimes.length)for(c=0;c<S.allowTimes.length;c+=1)y=W.strtotime(S.allowTimes[c]).getHours(),o=W.strtotime(S.allowTimes[c]).getMinutes(),u(y,o);else for(c=0,t=0;c<(S.hours12?12:24);c+=1)for(t=0;60>t;t+=S.step)y=(10>c?"0":"")+c,o=(10>t?"0":"")+t,u(y,o);for(z.html(x),n="",c=0,c=parseInt(S.yearStart,10)+S.yearOffset;c<=parseInt(S.yearEnd,10)+S.yearOffset;c+=1)n+='<div class="xdsoft_option '+(W.currentTime.getFullYear()===c?"xdsoft_current":"")+'" data-value="'+c+'">'+c+"</div>";for(L.children().eq(0).html(n),c=0,n="";11>=c;c+=1)n+='<div class="xdsoft_option '+(W.currentTime.getMonth()===c?"xdsoft_current":"")+'" data-value="'+c+'">'+S.i18n[S.lang].months[c]+"</div>";j.children().eq(0).html(n),e(Y).trigger("generate.xdsoft")},10),t.stopPropagation()}).on("afterOpen.xdsoft",function(){if(S.timepicker){var e,t,n,a;z.find(".xdsoft_current").length?e=".xdsoft_current":z.find(".xdsoft_init_time").length&&(e=".xdsoft_init_time"),e?(t=H[0].clientHeight,n=z[0].offsetHeight,a=z.find(e).index()*S.timeHeightInTimePicker+1,a>n-t&&(a=n-t),H.trigger("scroll_element.xdsoft_scroller",[parseInt(a,10)/(n-t)])):H.trigger("scroll_element.xdsoft_scroller",[0])}}),_=0,I.on("click.xdsoft","td",function(n){n.stopPropagation(),_+=1;var a=e(this),r=W.currentTime;return(void 0===r||null===r)&&(W.currentTime=W.now(),r=W.currentTime),a.hasClass("xdsoft_disabled")?!1:(r.setDate(1),r.setFullYear(a.data("year")),r.setMonth(a.data("month")),r.setDate(a.data("date")),Y.trigger("select.xdsoft",[r]),t.val(W.str()),(_>1||S.closeOnDateSelect===!0||0===S.closeOnDateSelect&&!S.timepicker)&&!S.inline&&Y.trigger("close.xdsoft"),S.onSelectDate&&e.isFunction(S.onSelectDate)&&S.onSelectDate.call(Y,W.currentTime,Y.data("input"),n),Y.data("changed",!0),Y.trigger("xchange.xdsoft"),Y.trigger("changedatetime.xdsoft"),void setTimeout(function(){_=0},200))}),z.on("click.xdsoft","div",function(t){t.stopPropagation();var n=e(this),a=W.currentTime;return(void 0===a||null===a)&&(W.currentTime=W.now(),a=W.currentTime),n.hasClass("xdsoft_disabled")?!1:(a.setHours(n.data("hour")),a.setMinutes(n.data("minute")),Y.trigger("select.xdsoft",[a]),Y.data("input").val(W.str()),S.inline||Y.trigger("close.xdsoft"),S.onSelectTime&&e.isFunction(S.onSelectTime)&&S.onSelectTime.call(Y,W.currentTime,Y.data("input"),t),Y.data("changed",!0),Y.trigger("xchange.xdsoft"),void Y.trigger("changedatetime.xdsoft"))}),C.on("mousewheel.xdsoft",function(e){return S.scrollMonth?(e.deltaY<0?W.nextMonth():W.prevMonth(),!1):!0}),t.on("mousewheel.xdsoft",function(e){return S.scrollInput?!S.datepicker&&S.timepicker?(F=z.find(".xdsoft_current").length?z.find(".xdsoft_current").eq(0).index():0,F+e.deltaY>=0&&F+e.deltaY<z.children().length&&(F+=e.deltaY),z.children().eq(F).length&&z.children().eq(F).trigger("mousedown"),!1):S.datepicker&&!S.timepicker?(C.trigger(e,[e.deltaY,e.deltaX,e.deltaY]),t.val&&t.val(W.str()),Y.trigger("changedatetime.xdsoft"),!1):void 0:!0}),Y.on("changedatetime.xdsoft",function(t){if(S.onChangeDateTime&&e.isFunction(S.onChangeDateTime)){var n=Y.data("input");S.onChangeDateTime.call(Y,W.currentTime,n,t),delete S.value,n.trigger("change")}}).on("generate.xdsoft",function(){S.onGenerate&&e.isFunction(S.onGenerate)&&S.onGenerate.call(Y,W.currentTime,Y.data("input")),R&&(Y.trigger("afterOpen.xdsoft"),R=!1)}).on("click.xdsoft",function(e){e.stopPropagation()}),F=0,A=function(){var t=Y.data("input").offset(),n=t.top+Y.data("input")[0].offsetHeight-1,a=t.left,r="absolute";S.fixed?(n-=e(window).scrollTop(),a-=e(window).scrollLeft(),r="fixed"):(n+Y[0].offsetHeight>e(window).height()+e(window).scrollTop()&&(n=t.top-Y[0].offsetHeight+1),0>n&&(n=0),a+Y[0].offsetWidth>e(window).width()&&(a=e(window).width()-Y[0].offsetWidth)),Y.css({left:a,top:n,position:r})},Y.on("open.xdsoft",function(t){var n=!0;S.onShow&&e.isFunction(S.onShow)&&(n=S.onShow.call(Y,W.currentTime,Y.data("input"),t)),n!==!1&&(Y.show(),A(),e(window).off("resize.xdsoft",A).on("resize.xdsoft",A),S.closeOnWithoutClick&&e([document.body,window]).on("mousedown.xdsoft",function a(){Y.trigger("close.xdsoft"),e([document.body,window]).off("mousedown.xdsoft",a)}))}).on("close.xdsoft",function(t){var n=!0;J.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(),S.onClose&&e.isFunction(S.onClose)&&(n=S.onClose.call(Y,W.currentTime,Y.data("input"),t)),n===!1||S.opened||S.inline||Y.hide(),t.stopPropagation()}).on("toggle.xdsoft",function(){Y.trigger(Y.is(":visible")?"close.xdsoft":"open.xdsoft")}).data("input",t),B=0,V=0,Y.data("xdsoft_datetime",W),Y.setOptions(S),W.setCurrentTime(a()),t.data("xdsoft_datetimepicker",Y).on("open.xdsoft focusin.xdsoft mousedown.xdsoft",function(){t.is(":disabled")||t.data("xdsoft_datetimepicker").is(":visible")&&S.closeOnInputClick||(clearTimeout(B),B=setTimeout(function(){t.is(":disabled")||(R=!0,W.setCurrentTime(a()),Y.trigger("open.xdsoft"))
},100))}).on("keydown.xdsoft",function(t){var n,a=(this.value,t.which);return-1!==[c].indexOf(a)&&S.enterLikeTab?(n=e("input:visible,textarea:visible"),Y.trigger("close.xdsoft"),n.eq(n.index(this)+1).focus(),!1):-1!==[y].indexOf(a)?(Y.trigger("close.xdsoft"),!0):void 0})},r=function(t){var n=t.data("xdsoft_datetimepicker");n&&(n.data("xdsoft_datetime",null),n.remove(),t.data("xdsoft_datetimepicker",null).off(".xdsoft"),e(window).off("resize.xdsoft"),e([window,document.body]).off("mousedown.xdsoft"),t.unmousewheel&&t.unmousewheel())},e(document).off("keydown.xdsoftctrl keyup.xdsoftctrl").on("keydown.xdsoftctrl",function(e){e.keyCode===d&&(M=!0)}).on("keyup.xdsoftctrl",function(e){e.keyCode===d&&(M=!1)}),this.each(function(){var t=e(this).data("xdsoft_datetimepicker");if(t){if("string"===e.type(n))switch(n){case"show":e(this).select().focus(),t.trigger("open.xdsoft");break;case"hide":t.trigger("close.xdsoft");break;case"toggle":t.trigger("toggle.xdsoft");break;case"destroy":r(e(this));break;case"reset":this.value=this.defaultValue,this.value&&t.data("xdsoft_datetime").isValidDate(Date.parseDate(this.value,S.format))||t.data("changed",!1),t.data("xdsoft_datetime").setCurrentTime(this.value)}else t.setOptions(n);return 0}"string"!==e.type(n)&&(!S.lazyInit||S.open||S.inline?a(e(this)):_(e(this)))})},e.fn.datetimepicker.defaults=t}(jQuery),function(){!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var s=t||window.event,i=u.call(arguments,1),d=0,c=0,f=0,m=0,h=0,g=0;if(t=e.event.fix(s),t.type="mousewheel","detail"in s&&(f=-1*s.detail),"wheelDelta"in s&&(f=s.wheelDelta),"wheelDeltaY"in s&&(f=s.wheelDeltaY),"wheelDeltaX"in s&&(c=-1*s.wheelDeltaX),"axis"in s&&s.axis===s.HORIZONTAL_AXIS&&(c=-1*f,f=0),d=0===f?c:f,"deltaY"in s&&(f=-1*s.deltaY,d=f),"deltaX"in s&&(c=s.deltaX,0===f&&(d=-1*c)),0!==f||0!==c){if(1===s.deltaMode){var p=e.data(this,"mousewheel-line-height");d*=p,f*=p,c*=p}else if(2===s.deltaMode){var x=e.data(this,"mousewheel-page-height");d*=x,f*=x,c*=x}if(m=Math.max(Math.abs(f),Math.abs(c)),(!o||o>m)&&(o=m,a(s,m)&&(o/=40)),a(s,m)&&(d/=40,c/=40,f/=40),d=Math[d>=1?"floor":"ceil"](d/o),c=Math[c>=1?"floor":"ceil"](c/o),f=Math[f>=1?"floor":"ceil"](f/o),l.settings.normalizeOffset&&this.getBoundingClientRect){var y=this.getBoundingClientRect();h=t.clientX-y.left,g=t.clientY-y.top}return t.deltaX=c,t.deltaY=f,t.deltaFactor=o,t.offsetX=h,t.offsetY=g,t.deltaMode=0,i.unshift(t,d,c,f),r&&clearTimeout(r),r=setTimeout(n,200),(e.event.dispatch||e.event.handle).apply(this,i)}}function n(){o=null}function a(e,t){return l.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120===0}var r,o,s=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],i="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],u=Array.prototype.slice;if(e.event.fixHooks)for(var d=s.length;d;)e.event.fixHooks[s[--d]]=e.event.mouseHooks;var l=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var n=i.length;n;)this.addEventListener(i[--n],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",l.getLineHeight(this)),e.data(this,"mousewheel-page-height",l.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var n=i.length;n;)this.removeEventListener(i[--n],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var n=e(t),a=n["offsetParent"in e.fn?"offsetParent":"parent"]();return a.length||(a=e("body")),parseInt(a.css("fontSize"),10)||parseInt(n.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),Date.parseFunctions={count:0},Date.parseRegexes=[],Date.formatFunctions={count:0},Date.prototype.dateFormat=function(e){if("unixtime"==e)return parseInt(this.getTime()/1e3);null==Date.formatFunctions[e]&&Date.createNewFormat(e);var t=Date.formatFunctions[e];return this[t]()},Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;for(var codePrefix="Date.prototype."+funcName+" = function() {return ",code="",special=!1,ch="",i=0;i<format.length;++i)ch=format.charAt(i),special||"\\"!=ch?special?(special=!1,code+="'"+String.escape(ch)+"' + "):code+=Date.getFormatCode(ch):special=!0;code=0==code.length?'""':code.substring(0,code.length-3),eval(codePrefix+code+";}")},Date.getFormatCode=function(e){switch(e){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(e)+"' + "}},Date.parseDate=function(e,t){if("unixtime"==t)return new Date(isNaN(parseInt(e))?0:1e3*parseInt(e));null==Date.parseFunctions[t]&&Date.createParser(t);var n=Date.parseFunctions[t];return Date[n](e)},Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++,regexNum=Date.parseRegexes.length,currentGroup=1;Date.parseFunctions[format]=funcName;for(var code="Date."+funcName+" = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {",regex="",special=!1,ch="",i=0;i<format.length;++i)ch=format.charAt(i),special||"\\"!=ch?special?(special=!1,regex+=String.escape(ch)):(obj=Date.formatCodeToRegex(ch,currentGroup),currentGroup+=obj.g,regex+=obj.s,obj.g&&obj.c&&(code+=obj.c)):special=!0;code+="if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}",code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}",Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$"),eval(code)},Date.formatCodeToRegex=function(e,t){switch(e){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+t+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:1,c:"z = parseInt(results["+t+"], 10);\n",s:"(\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+t+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+t+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+t+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+t+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+t+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+t+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+t+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+t+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+t+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+t+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};default:return{g:0,c:null,s:String.escape(e)}}},Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3")},Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+String.leftPad(Math.abs(this.getTimezoneOffset())%60,2,"0")},Date.prototype.getDayOfYear=function(){var e=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var t=0;t<this.getMonth();++t)e+=Date.daysInMonth[t];return e+this.getDate()},Date.prototype.getWeekOfYear=function(){var e=this.getDayOfYear()+(4-this.getDay()),t=new Date(this.getFullYear(),0,1),n=7-t.getDay()+4;return String.leftPad(Math.ceil((e-n)/7)+1,2,"0")},Date.prototype.isLeapYear=function(){var e=this.getFullYear();return 0==(3&e)&&(e%100||e%400==0&&e)},Date.prototype.getFirstDayOfMonth=function(){var e=(this.getDay()-(this.getDate()-1))%7;return 0>e?e+7:e},Date.prototype.getLastDayOfMonth=function(){var e=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return 0>e?e+7:e},Date.prototype.getDaysInMonth=function(){return Date.daysInMonth[1]=this.isLeapYear()?29:28,Date.daysInMonth[this.getMonth()]},Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}},String.escape=function(e){return e.replace(/('|\\)/g,"\\$1")},String.leftPad=function(e,t,n){var a=new String(e);for(null==n&&(n=" ");a.length<t;)a=n+a;return a},Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31],Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Date.y2kYear=50,Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"}}();
},{}],9:[function(require,module,exports){
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?l.push(e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]):l.push(e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]));m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});
},{}],10:[function(require,module,exports){
/*! jCarousel - v0.3.3 - 2015-04-07
* http://sorgalla.com/jcarousel/
* Copyright (c) 2006-2015 Jan Sorgalla; Licensed MIT */
!function(a){"use strict";var b=a.jCarousel={};b.version="0.3.3";var c=/^([+\-]=)?(.+)$/;b.parseTarget=function(a){var b=!1,d="object"!=typeof a?c.exec(a):null;return d?(a=parseInt(d[2],10)||0,d[1]&&(b=!0,"-="===d[1]&&(a*=-1))):"object"!=typeof a&&(a=parseInt(a,10)||0),{target:a,relative:b}},b.detectCarousel=function(a){for(var b;a.length>0;){if(b=a.filter("[data-jcarousel]"),b.length>0)return b;if(b=a.find("[data-jcarousel]"),b.length>0)return b;a=a.parent()}return null},b.base=function(c){return{version:b.version,_options:{},_element:null,_carousel:null,_init:a.noop,_create:a.noop,_destroy:a.noop,_reload:a.noop,create:function(){return this._element.attr("data-"+c.toLowerCase(),!0).data(c,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(c).removeAttr("data-"+c.toLowerCase()),this)},reload:function(a){return!1===this._trigger("reload")?this:(a&&this.options(a),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(b,c){if(0===arguments.length)return a.extend({},this._options);if("string"==typeof b){if("undefined"==typeof c)return"undefined"==typeof this._options[b]?null:this._options[b];this._options[b]=c}else this._options=a.extend({},this._options,b);return this},carousel:function(){return this._carousel||(this._carousel=b.detectCarousel(this.options("carousel")||this._element),this._carousel||a.error('Could not detect carousel for plugin "'+c+'"')),this._carousel},_trigger:function(b,d,e){var f,g=!1;return e=[this].concat(e||[]),(d||this._element).each(function(){f=a.Event((c+":"+b).toLowerCase()),a(this).trigger(f,e),f.isDefaultPrevented()&&(g=!0)}),!g}}},b.plugin=function(c,d){var e=a[c]=function(b,c){this._element=a(b),this.options(c),this._init(),this.create()};return e.fn=e.prototype=a.extend({},b.base(c),d),a.fn[c]=function(b){var d=Array.prototype.slice.call(arguments,1),f=this;return this.each("string"==typeof b?function(){var e=a(this).data(c);if(!e)return a.error("Cannot call methods on "+c+' prior to initialization; attempted to call method "'+b+'"');if(!a.isFunction(e[b])||"_"===b.charAt(0))return a.error('No such method "'+b+'" for '+c+" instance");var g=e[b].apply(e,d);return g!==e&&"undefined"!=typeof g?(f=g,!1):void 0}:function(){var d=a(this).data(c);d instanceof e?d.reload(b):new e(this,b)}),f},e}}(jQuery),function(a,b){"use strict";var c=function(a){return parseFloat(a)||0};a.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:a(),_first:a(),_last:a(),_visible:a(),_fullyvisible:a(),_init:function(){var a=this;return this.onWindowResize=function(){a.resizeTimer&&clearTimeout(a.resizeTimer),a.resizeTimer=setTimeout(function(){a.reload()},100)},this},_create:function(){this._reload(),a(b).on("resize.jcarousel",this.onWindowResize)},_destroy:function(){a(b).off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=this.list().height()>this.list().width()),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(b){if("rtl"===(""+b.attr("dir")).toLowerCase())return!0;var c=!1;return b.parents("[dir]").each(function(){return/rtl/i.test(a(this).attr("dir"))?(c=!0,!1):void 0}),c}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var b=this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var c={left:0,top:0};return b.length>0&&(this._prepare(b),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,c[this.lt]=this._position(b)+"px"),this.move(c),this},list:function(){if(null===this._list){var b=this.options("list");this._list=a.isFunction(b)?b.call(this):this._element.find(b)}return this._list},items:function(){if(null===this._items){var b=this.options("items");this._items=(a.isFunction(b)?b.call(this):this.list().find(b)).not("[data-jcarousel-clone]")}return this._items},index:function(a){return this.items().index(a)},closest:function(){var b,d=this,e=this.list().position()[this.lt],f=a(),g=!1,h=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(e+=this.list().width()-this.clipping()),this.items().each(function(){if(f=a(this),g)return!1;var i=d.dimension(f);if(e+=i,e>=0){if(b=i-c(f.css("margin-"+h)),!(Math.abs(e)-i+b/2<=0))return!1;g=!0}}),f},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var a=this.options("wrap"),b=this.items().length-1,c=this.options("center")?this._target:this._last;return b>=0&&!this.underflow&&(a&&"first"!==a||this.index(c)<b||this.tail&&!this.inTail)?!0:!1},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var a=this.options("wrap");return this.items().length>0&&!this.underflow&&(a&&"last"!==a||this.index(this._first)>0||this.tail&&this.inTail)?!0:!1},clipping:function(){return this._element["inner"+(this.vertical?"Height":"Width")]()},dimension:function(a){return a["outer"+(this.vertical?"Height":"Width")](!0)},scroll:function(b,c,d){if(this.animating)return this;if(!1===this._trigger("scroll",null,[b,c]))return this;a.isFunction(c)&&(d=c,c=!0);var e=a.jCarousel.parseTarget(b);if(e.relative){var f,g,h,i,j,k,l,m,n=this.items().length-1,o=Math.abs(e.target),p=this.options("wrap");if(e.target>0){var q=this.index(this._last);if(q>=n&&this.tail)this.inTail?"both"===p||"last"===p?this._scroll(0,c,d):a.isFunction(d)&&d.call(this,!1):this._scrollTail(c,d);else if(f=this.index(this._target),this.underflow&&f===n&&("circular"===p||"both"===p||"last"===p)||!this.underflow&&q===n&&("both"===p||"last"===p))this._scroll(0,c,d);else if(h=f+o,this.circular&&h>n){for(m=n,j=this.items().get(-1);m++<h;)j=this.items().eq(0),k=this._visible.index(j)>=0,k&&j.after(j.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(j),k||(l={},l[this.lt]=this.dimension(j),this.moveBy(l)),this._items=null;this._scroll(j,c,d)}else this._scroll(Math.min(h,n),c,d)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-o+1,0),c,d);else if(g=this.index(this._first),f=this.index(this._target),i=this.underflow?f:g,h=i-o,0>=i&&(this.underflow&&"circular"===p||"both"===p||"first"===p))this._scroll(n,c,d);else if(this.circular&&0>h){for(m=h,j=this.items().get(0);m++<0;){j=this.items().eq(-1),k=this._visible.index(j)>=0,k&&j.after(j.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(j),this._items=null;var r=this.dimension(j);l={},l[this.lt]=-r,this.moveBy(l)}this._scroll(j,c,d)}else this._scroll(Math.max(h,0),c,d)}else this._scroll(e.target,c,d);return this._trigger("scrollend"),this},moveBy:function(a,b){var d=this.list().position(),e=1,f=0;return this.rtl&&!this.vertical&&(e=-1,this.relative&&(f=this.list().width()-this.clipping())),a.left&&(a.left=d.left+f+c(a.left)*e+"px"),a.top&&(a.top=d.top+f+c(a.top)*e+"px"),this.move(a,b)},move:function(b,c){c=c||{};var d=this.options("transitions"),e=!!d,f=!!d.transforms,g=!!d.transforms3d,h=c.duration||0,i=this.list();if(!e&&h>0)return void i.animate(b,c);var j=c.complete||a.noop,k={};if(e){var l={transitionDuration:i.css("transitionDuration"),transitionTimingFunction:i.css("transitionTimingFunction"),transitionProperty:i.css("transitionProperty")},m=j;j=function(){a(this).css(l),m.call(this)},k={transitionDuration:(h>0?h/1e3:0)+"s",transitionTimingFunction:d.easing||c.easing,transitionProperty:h>0?function(){return f||g?"all":b.left?"left":"top"}():"none",transform:"none"}}g?k.transform="translate3d("+(b.left||0)+","+(b.top||0)+",0)":f?k.transform="translate("+(b.left||0)+","+(b.top||0)+")":a.extend(k,b),e&&h>0&&i.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",j),i.css(k),0>=h&&i.each(function(){j.call(this)})},_scroll:function(b,c,d){if(this.animating)return a.isFunction(d)&&d.call(this,!1),this;if("object"!=typeof b?b=this.items().eq(b):"undefined"==typeof b.jquery&&(b=a(b)),0===b.length)return a.isFunction(d)&&d.call(this,!1),this;this.inTail=!1,this._prepare(b);var e=this._position(b),f=this.list().position()[this.lt];if(e===f)return a.isFunction(d)&&d.call(this,!1),this;var g={};return g[this.lt]=e+"px",this._animate(g,c,d),this},_scrollTail:function(b,c){if(this.animating||!this.tail)return a.isFunction(c)&&c.call(this,!1),this;var d=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(d+=this.list().width()-this.clipping()),this.rtl&&!this.vertical?d+=this.tail:d-=this.tail,this.inTail=!0;var e={};return e[this.lt]=d+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(e,b,c),this},_animate:function(b,c,d){if(d=d||a.noop,!1===this._trigger("animate"))return d.call(this,!1),this;this.animating=!0;var e=this.options("animation"),f=a.proxy(function(){this.animating=!1;var a=this.list().find("[data-jcarousel-clone]");a.length>0&&(a.remove(),this._reload()),this._trigger("animateend"),d.call(this,!0)},this),g="object"==typeof e?a.extend({},e):{duration:e},h=g.complete||a.noop;return c===!1?g.duration=0:"undefined"!=typeof a.fx.speeds[g.duration]&&(g.duration=a.fx.speeds[g.duration]),g.complete=function(){f(),h.call(this)},this.move(b,g),this},_prepare:function(b){var d,e,f,g,h=this.index(b),i=h,j=this.dimension(b),k=this.clipping(),l=this.vertical?"bottom":this.rtl?"left":"right",m=this.options("center"),n={target:b,first:b,last:b,visible:b,fullyvisible:k>=j?b:a()};if(m&&(j/=2,k/=2),k>j)for(;;){if(d=this.items().eq(++i),0===d.length){if(!this.circular)break;if(d=this.items().eq(0),b.get(0)===d.get(0))break;if(e=this._visible.index(d)>=0,e&&d.after(d.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(d),!e){var o={};o[this.lt]=this.dimension(d),this.moveBy(o)}this._items=null}if(g=this.dimension(d),0===g)break;if(j+=g,n.last=d,n.visible=n.visible.add(d),f=c(d.css("margin-"+l)),k>=j-f&&(n.fullyvisible=n.fullyvisible.add(d)),j>=k)break}if(!this.circular&&!m&&k>j)for(i=h;;){if(--i<0)break;if(d=this.items().eq(i),0===d.length)break;if(g=this.dimension(d),0===g)break;if(j+=g,n.first=d,n.visible=n.visible.add(d),f=c(d.css("margin-"+l)),k>=j-f&&(n.fullyvisible=n.fullyvisible.add(d)),j>=k)break}return this._update(n),this.tail=0,m||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(n.last)!==this.items().length-1||(j-=c(n.last.css("margin-"+l)),j>k&&(this.tail=j-k)),this},_position:function(a){var b=this._first,c=b.position()[this.lt],d=this.options("center"),e=d?this.clipping()/2-this.dimension(b)/2:0;return this.rtl&&!this.vertical?(c-=this.relative?this.list().width()-this.dimension(b):this.clipping()-this.dimension(b),c+=e):c-=e,!d&&(this.index(a)>this.index(b)||this.inTail)&&this.tail?(c=this.rtl&&!this.vertical?c-this.tail:c+this.tail,this.inTail=!0):this.inTail=!1,-c},_update:function(b){var c,d=this,e={target:this._target,first:this._first,last:this._last,visible:this._visible,fullyvisible:this._fullyvisible},f=this.index(b.first||e.first)<this.index(e.first),g=function(c){var g=[],h=[];b[c].each(function(){e[c].index(this)<0&&g.push(this)}),e[c].each(function(){b[c].index(this)<0&&h.push(this)}),f?g=g.reverse():h=h.reverse(),d._trigger(c+"in",a(g)),d._trigger(c+"out",a(h)),d["_"+c]=b[c]};for(c in b)g(c);return this}})}(jQuery,window),function(a){"use strict";a.jcarousel.fn.scrollIntoView=function(b,c,d){var e,f=a.jCarousel.parseTarget(b),g=this.index(this._fullyvisible.first()),h=this.index(this._fullyvisible.last());if(e=f.relative?f.target<0?Math.max(0,g+f.target):h+f.target:"object"!=typeof f.target?f.target:this.index(f.target),g>e)return this.scroll(e,c,d);if(e>=g&&h>=e)return a.isFunction(d)&&d.call(this,!1),this;for(var i,j=this.items(),k=this.clipping(),l=this.vertical?"bottom":this.rtl?"left":"right",m=0;;){if(i=j.eq(e),0===i.length)break;if(m+=this.dimension(i),m>=k){var n=parseFloat(i.css("margin-"+l))||0;m-n!==k&&e++;break}if(0>=e)break;e--}return this.scroll(e,c,d)}}(jQuery),function(a){"use strict";a.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=a.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",a.proxy(this._create,this))},this),this.onReload=a.proxy(this._reload,this),this.onEvent=a.proxy(function(b){b.preventDefault();var c=this.options("method");a.isFunction(c)?c.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var b,c=a.jCarousel.parseTarget(this.options("target")),d=this.carousel();if(c.relative)b=d.jcarousel(c.target>0?"hasNext":"hasPrev");else{var e="object"!=typeof c.target?d.jcarousel("items").eq(c.target):c.target;b=d.jcarousel("target").index(e)>=0}return this._active!==b&&(this._trigger(b?"active":"inactive"),this._active=b),this}})}(jQuery),function(a){"use strict";a.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(a){return'<a href="#'+a+'">'+a+"</a>"},event:"click",method:"scroll"},_carouselItems:null,_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=a.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",a.proxy(this._create,this))},this),this.onReload=a.proxy(this._reload,this),this.onScroll=a.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll),this._carouselItems=null},_reload:function(){var b=this.options("perPage");if(this._pages={},this._items={},a.isFunction(b)&&(b=b.call(this)),null==b)this._pages=this._calculatePages();else for(var c,d=parseInt(b,10)||0,e=this._getCarouselItems(),f=1,g=0;;){if(c=e.eq(g++),0===c.length)break;this._pages[f]=this._pages[f]?this._pages[f].add(c):c,g%d===0&&f++}this._clear();var h=this,i=this.carousel().data("jcarousel"),j=this._element,k=this.options("item"),l=this._getCarouselItems().length;a.each(this._pages,function(b,c){var d=h._items[b]=a(k.call(h,b,c));d.on(h.options("event")+".jcarouselpagination",a.proxy(function(){var a=c.eq(0);if(i.circular){var d=i.index(i.target()),e=i.index(a);parseFloat(b)>parseFloat(h._currentPage)?d>e&&(a="+="+(l-d+e)):e>d&&(a="-="+(d+(l-e)))}i[this.options("method")](a)},h)),j.append(d)}),this._update()},_update:function(){var b,c=this.carousel().jcarousel("target");a.each(this._pages,function(a,d){return d.each(function(){return c.is(this)?(b=a,!1):void 0}),b?!1:void 0}),this._currentPage!==b&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[b])),this._currentPage=b},items:function(){return this._items},reloadCarouselItems:function(){return this._carouselItems=null,this},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var a,b,c=this.carousel().data("jcarousel"),d=this._getCarouselItems(),e=c.clipping(),f=0,g=0,h=1,i={};;){if(a=d.eq(g++),0===a.length)break;b=c.dimension(a),f+b>e&&(h++,f=0),f+=b,i[h]=i[h]?i[h].add(a):a}return i},_getCarouselItems:function(){return this._carouselItems||(this._carouselItems=this.carousel().jcarousel("items")),this._carouselItems}})}(jQuery),function(a,b){"use strict";var c,d,e={hidden:"visibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange",webkitHidden:"webkitvisibilitychange"};a.each(e,function(a,e){return"undefined"!=typeof b[a]?(c=a,d=e,!1):void 0}),a.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0},_timer:null,_started:!1,_init:function(){this.onDestroy=a.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",a.proxy(this._create,this))},this),this.onAnimateEnd=a.proxy(this._start,this),this.onVisibilityChange=a.proxy(function(){b[c]?this._stop():this._start()},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),a(b).on(d,this.onVisibilityChange),this.options("autostart")&&this.start()},_destroy:function(){this._stop(),this.carousel().off("jcarousel:destroy",this.onDestroy),a(b).off(d,this.onVisibilityChange)},_start:function(){return this._stop(),this._started?(this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(a.proxy(function(){this.carousel().jcarousel("scroll",this.options("target"))},this),this.options("interval")),this):void 0},_stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this},start:function(){return this._started=!0,this._start(),this},stop:function(){return this._started=!1,this._stop(),this}})}(jQuery,document);
},{}],11:[function(require,module,exports){
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.5
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

},{}],12:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
; browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});
},{}],14:[function(require,module,exports){
/*
 * zClip :: jQuery ZeroClipboard v1.1.5
 * Originally forked from: http://steamdev.com/zclip
 *
 * Copyright 2011, SteamDev
 *
 * Released under the MIT license.
 * https://github.com/patricklodder/jquery-zclip/blob/master/LICENSE
 */

(function (jQuery) {

    jQuery.fn.zclip = function (params) {

        if (typeof params == "object" && !params.length) {

            var settings = jQuery.extend({}, ZeroClipboard.defaults, params);

            return this.each(function () {

                var o = jQuery(this);

                if (o.is(':visible') && (typeof settings.copy == 'string' || jQuery.isFunction(settings.copy))) {

                    ZeroClipboard.setMoviePath(settings.path);
                    var clip = new ZeroClipboard.Client();

                    if (jQuery.isFunction(settings.copy)) {
                        o.bind('zClip_copy', settings.copy);
                    }

                    if (jQuery.isFunction(settings.beforeCopy)) {
                        o.bind('zClip_beforeCopy', settings.beforeCopy);
                    }

                    if (jQuery.isFunction(settings.afterCopy)) {
                        o.bind('zClip_afterCopy', settings.afterCopy);
                    }

                    clip.setHandCursor(settings.setHandCursor);

                    clip.setCSSEffects(settings.setCSSEffects);

                    clip.addEventListener('mouseOver', function (client) {
                        o.trigger('mouseenter');
                    });

                    clip.addEventListener('mouseOut', function (client) {
                        o.trigger('mouseleave');
                    });

                    clip.addEventListener('mouseDown', function (client) {

                        o.trigger('mousedown');

                        if (jQuery.isFunction(settings.beforeCopy)) {
                            o.trigger('zClip_beforeCopy');
                        }

                        if (!jQuery.isFunction(settings.copy)) {
                            clip.setText(settings.copy);
                        } else {
                            clip.setText(o.triggerHandler('zClip_copy'));
                        }

                    });

                    clip.addEventListener('complete', function (client, text) {

                        if (jQuery.isFunction(settings.afterCopy)) {

                            o.trigger('zClip_afterCopy');

                        } else {
                            if (text.length > 500) {
                                text = text.substr(0, 500) + "...\n\n(" + (text.length - 500) + " characters not shown)";
                            }

                            o.removeClass('hover');
                            alert("Copied text to clipboard:\n\n " + text);
                        }

                        if (settings.clickAfter) {
                            o.trigger('click');
                        }

                    });

                    clip.glue(o[0], o.parent()[0]);

                    jQuery(window).bind('load resize', function () {clip.reposition();});

                }

            });

        } else if (typeof params == "string") {

            return this.each(function () {

                var o = jQuery(this);

                params = params.toLowerCase();
                var zclipId = o.data('zclipId');
                var clipElm = jQuery('#' + zclipId + '.zclip');
                var clientId = clipElm.attr('id').replace(/^.*_/g, '') || null;

                if (params == "remove") {

                    clipElm.remove();
                    o.removeClass('active hover');
                    o.unbind('zClip_copy');
                    o.unbind('zClip_beforeCopy');
                    o.unbind('zClip_afterCopy');
                    ZeroClipboard.unregister(clientId);

                } else if (params == "hide") {

                    clipElm.hide();
                    o.removeClass('active hover');

                } else if (params == "show") {

                    clipElm.show();

                }

            });

        }

    };

})(jQuery);

// ZeroClipboard
// Simple Set Clipboard System
// Author: Joseph Huckaby
window.ZeroClipboard = {

    version: "1.0.7",
    clients: {},
    // registered upload clients on page, indexed by id
    moviePath: 'ZeroClipboard.swf',
    // URL to movie
    nextId: 1,
    // ID of next movie

    defaults: {
        path: 'ZeroClipboard.swf',
        clickAfter: true,
        setHandCursor: true,
        setCSSEffects: true,

        copy: null,
        // a string or function that returns string

        beforeCopy: null,
        afterCopy: null
    },

    jQuery: function (thingy) {
        // simple DOM lookup utility function
        if (typeof(thingy) == 'string') thingy = document.getElementById(thingy);
        if (!thingy.addClass) {
            // extend element with a few useful methods
            thingy.hide = function () {
                this.style.display = 'none';
            };
            thingy.show = function () {
                this.style.display = '';
            };
            thingy.addClass = function (name) {
                this.removeClass(name);
                this.className += ' ' + name;
            };
            thingy.removeClass = function (name) {
                var classes = this.className.split(/\s+/);
                var idx = -1;
                for (var k = 0; k < classes.length; k++) {
                    if (classes[k] == name) {
                        idx = k;
                        k = classes.length;
                    }
                }
                if (idx > -1) {
                    classes.splice(idx, 1);
                    this.className = classes.join(' ');
                }
                return this;
            };
            thingy.hasClass = function (name) {
                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
            };
        }
        return thingy;
    },

    setMoviePath: function (path) {
        // set path to ZeroClipboard.swf
        this.moviePath = path;
    },

    dispatch: function (id, eventName, args) {
        // receive event from flash movie, send to client
        var client = this.clients[id];
        if (client) {
            client.receiveEvent(eventName, args);
        }
    },

    register: function (id, client) {
        // register new client to receive events
        this.clients[id] = client;
    },

    unregister: function (id) {
        if (typeof(id) === 'number' && this.clients.hasOwnProperty(id)) {
            delete this.clients[id];
        }
    },

    getDOMObjectPosition: function (obj, stopObj) {
        // get absolute coordinates for dom element
        var info = {
            left: 0,
            top: 0,
            width: obj.width ? obj.width : obj.offsetWidth,
            height: obj.height ? obj.height : obj.offsetHeight
        };

        if (obj && (obj != stopObj)) {
            info.left += obj.offsetLeft;
            info.top += obj.offsetTop;
        }

        return info;
    },

    Client: function (elem) {
        // constructor for new simple upload client
        this.handlers = {};

        // unique ID
        this.id = ZeroClipboard.nextId++;
        this.movieId = 'ZeroClipboardMovie_' + this.id;

        // register client with singleton to receive flash events
        ZeroClipboard.register(this.id, this);

        // create movie
        if (elem) this.glue(elem);
    }
};

ZeroClipboard.Client.prototype = {

    id: 0,
    // unique ID for us
    ready: false,
    // whether movie is ready to receive events or not
    movie: null,
    // reference to movie object
    clipText: '',
    // text to copy to clipboard
    handCursorEnabled: true,
    // whether to show hand cursor, or default pointer cursor
    cssEffects: true,
    // enable CSS mouse effects on dom container
    handlers: null,
    // user event handlers
    glue: function (elem, appendElem, stylesToAdd) {
        // glue to DOM element
        // elem can be ID or actual DOM element object
        this.domElement = ZeroClipboard.jQuery(elem);

        // float just above object, or zIndex 99 if dom element isn't set
        var zIndex = 99;
        if (this.domElement.style.zIndex) {
            zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
        }

        if (typeof(appendElem) == 'string') {
            appendElem = ZeroClipboard.jQuery(appendElem);
        } else if (typeof(appendElem) == 'undefined') {
            appendElem = document.getElementsByTagName('body')[0];
        }

        // find X/Y position of domElement
        var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);

        // create floating DIV above element
        this.div = document.createElement('div');
        this.div.className = "zclip";
        this.div.id = "zclip-" + this.movieId;
        jQuery(this.domElement).data('zclipId', 'zclip-' + this.movieId);
        var style = this.div.style;
        style.position = 'absolute';
        style.left = '' + box.left + 'px';
        style.top = '' + box.top + 'px';
        style.width = '' + box.width + 'px';
        style.height = '' + box.height + 'px';
        style.zIndex = zIndex;

        if (typeof(stylesToAdd) == 'object') {
            for (var addedStyle in stylesToAdd) {
                style[addedStyle] = stylesToAdd[addedStyle];
            }
        }

        // style.backgroundColor = '#f00'; // debug
        appendElem.appendChild(this.div);

        this.div.innerHTML = this.getHTML(box.width, box.height);
    },

    getHTML: function (width, height) {
        // return HTML for movie
        var html = '';
        var flashvars = 'id=' + this.id + '&width=' + width + '&height=' + height;

        if (navigator.userAgent.match(/MSIE/)) {
            // IE gets an OBJECT tag
            var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
            html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
        } else {
            // all other browsers get an EMBED tag
            html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
        }
        return html;
    },

    hide: function () {
        // temporarily hide floater offscreen
        if (this.div) {
            this.div.style.left = '-2000px';
        }
    },

    show: function () {
        // show ourselves after a call to hide()
        this.reposition();
    },

    destroy: function () {
        // destroy control and floater
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = '';

            var body = document.getElementsByTagName('body')[0];
            try {
                body.removeChild(this.div);
            } catch (e) {
                //do nothing
            }

            this.domElement = null;
            this.div = null;
        }
    },

    reposition: function (elem) {
        // reposition our floating div, optionally to new container
        // warning: container CANNOT change size, only position
        if (elem) {
            this.domElement = ZeroClipboard.jQuery(elem);
            if (!this.domElement) this.hide();
        }

        if (this.domElement && this.div) {
            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var style = this.div.style;
            style.left = '' + box.left + 'px';
            style.top = '' + box.top + 'px';
        }
    },

    setText: function (newText) {
        // set text to be copied to clipboard
        this.clipText = newText;
        if (this.ready) {
            this.movie.setText(newText);
        }
    },

    addEventListener: function (eventName, func) {
        // add user event listener for event
        // event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(func);
    },

    setHandCursor: function (enabled) {
        // enable hand cursor (true), or default arrow cursor (false)
        this.handCursorEnabled = enabled;
        if (this.ready) {
            this.movie.setHandCursor(enabled);
        }
    },

    setCSSEffects: function (enabled) {
        // enable or disable CSS effects on DOM container
        this.cssEffects = !! enabled;
    },

    receiveEvent: function (eventName, args) {
        // receive event from flash
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');

        // special behavior for certain events
        switch (eventName) {
            case 'load':
                // movie claims it is ready, but in IE this isn't always the case...
                // bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
                this.movie = document.getElementById(this.movieId);
                var self = this;

                if (!this.movie) {
                    setTimeout(function () {
                        self.receiveEvent('load', null);
                    }, 1);
                    return;
                }

                // firefox on pc needs a "kick" in order to set these in certain cases
                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                    setTimeout(function () {
                        self.receiveEvent('load', null);
                    }, 100);
                    this.ready = true;
                    return;
                }

                this.ready = true;
                try {
                    this.movie.setText(this.clipText);
                } catch (e) {}
                try {
                    this.movie.setHandCursor(this.handCursorEnabled);
                } catch (e) {}
                break;

            case 'mouseover':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('hover');
                    if (this.recoverActive) {
                        this.domElement.addClass('active');
                    }

                }
                break;

            case 'mouseout':
                if (this.domElement && this.cssEffects) {
                    this.recoverActive = false;
                    if (this.domElement.hasClass('active')) {
                        this.domElement.removeClass('active');
                        this.recoverActive = true;
                    }
                    this.domElement.removeClass('hover');

                }
                break;

            case 'mousedown':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('active');
                }
                break;

            case 'mouseup':
                if (this.domElement && this.cssEffects) {
                    this.domElement.removeClass('active');
                    this.recoverActive = false;
                }
                break;
        } // switch eventName
        if (this.handlers[eventName]) {
            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
                var func = this.handlers[eventName][idx];

                if (jQuery.isFunction(func)) {
                    // actual function reference
                    func(this, args);
                } else if ((typeof(func) == 'object') && (func.length == 2)) {
                    // PHP style object + method, i.e. [myObject, 'myMethod']
                    func[0][func[1]](this, args);
                } else if (typeof(func) == 'string') {
                    // name of function
                    window[func](this, args);
                }
            } // foreach event handler defined
        } // user defined handler for event
    }

};

},{}],15:[function(require,module,exports){
//**************************************************************  
// jQZoom allows you to realize a small magnifier window,close  
// to the image or images on your web page easily.  
//  
// jqZoom version 2.1  
//**************************************************************  
(function($) {
    $.fn.jqueryzoom = function(options) {
        var settings = {
            xzoom: 336,     //zoomed width default width  
            yzoom: 336,     //zoomed div default width  
            offset: 2,      //zoomed div default offset  
            position: "right" ,//zoomed div default position,offset position is to the right of the image  
            lens:1, //zooming lens over the image,by default is 1;  
            preload: 1 
        };
        if (options) {
            $.extend(settings, options);
        }
        var noalt = '';
        $(this).hover(function() {
            var imageLeft = $(this).offset().left;
            var imageTop = $(this).offset().top;
            var imageWidth = $(this).children('img').get(0).offsetWidth;
            var imageHeight = $(this).children('img').get(0).offsetHeight;
            noalt = $(this).children("img").attr("alt");
            var bigimage = $(this).children("img").attr("jqimg");
            $(this).children("img").attr("alt", '');
            if ($("div.zoomdiv").get().length == 0) {
                $(this).after("<div class='zoomdiv'><img class='bigimg' src='" + bigimage + "'/></div>");
                $(this).append("<div class='jqZoomPup'>&nbsp;</div>")
            }
            if (settings.position == "right") {
                if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
                    leftpos = imageLeft - settings.offset - settings.xzoom;
                } else {
                    leftpos = imageLeft + imageWidth + settings.offset;
                }
            } else {
                leftpos = imageLeft - settings.xzoom - settings.offset;
                if (leftpos < 0) {
                    leftpos = imageLeft + imageWidth + settings.offset
                }
            }
            $("div.zoomdiv").css({
                top: imageTop,
                left: leftpos
            });
            $("div.zoomdiv").width(settings.xzoom);
            $("div.zoomdiv").height(settings.yzoom);
            $("div.zoomdiv").show();
            if (!settings.lens) {
                $(this).css('cursor', 'crosshair');
            }
            $(document.body).mousemove(function(e) {
                mouse = new MouseEvent(e);
                var bigwidth = $(".bigimg").get(0).offsetWidth;
                var bigheight = $(".bigimg").get(0).offsetHeight;
                var scaley = 'x';
                var scalex = 'y';
                if (isNaN(scalex) | isNaN(scaley)) {
                    var scalex = (bigwidth / imageWidth);
                    var scaley = (bigheight / imageHeight);
                    $("div.jqZoomPup").width((settings.xzoom) / scalex);
                    $("div.jqZoomPup").height((settings.yzoom) / scaley);
                    if (settings.lens) {
                        $("div.jqZoomPup").css('visibility', 'visible');
                    }
                }
                xpos = mouse.x - $("div.jqZoomPup").width() / 2 - imageLeft;
                ypos = mouse.y - $("div.jqZoomPup").height() / 2 - imageTop;
                if (settings.lens) {
                    xpos = (mouse.x - $("div.jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;
                    ypos = (mouse.y - $("div.jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos;
                }
                if (settings.lens) {
                    $("div.jqZoomPup").css({
                        top: ypos,
                        left: xpos
                    });
                }
                scrolly = ypos;
                $("div.zoomdiv").get(0).scrollTop = scrolly * scaley;
                scrollx = xpos;
                $("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex
            })
        },
        function() {
            $(this).children("img").attr("alt", noalt);
            $(document.body).unbind("mousemove");
            if (settings.lens) {
                $("div.jqZoomPup").remove();
            }
            $("div.zoomdiv").remove();
        });
        count = 0;
        if (settings.preload) {
            $('body').append("<div style='display:none;' class='jqPreload" + count + "'></div>");
            $(this).each(function() {
                var imagetopreload = $(this).children("img").attr("jqimg");
                var content = jQuery('div.jqPreload' + count + '').html();
                jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">')
            });
        }
    }
})(jQuery);
function MouseEvent(e) {
    this.x = e.pageX;
    this.y = e.pageY;
}
},{}],16:[function(require,module,exports){
require('jquery');
require('amazeui');
require('underscore');
require('jquery-jcarousel');
require('jquery-cookie');
require('jquery-lazyload');
require('jquery-zoom');
require('jquery-validate');
require('jquery-zclip');
require('jquery-datetimepicker');
require('jquery-form');
require('flash-detect');
require('swfobject');
require('typeahead');
},{"amazeui":4,"flash-detect":6,"jquery":12,"jquery-cookie":7,"jquery-datetimepicker":8,"jquery-form":9,"jquery-jcarousel":10,"jquery-lazyload":11,"jquery-validate":13,"jquery-zclip":14,"jquery-zoom":15,"swfobject":17,"typeahead":18,"underscore":19}],17:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",T="Shockwave Flash",Z="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",S="SWFObjectExprInst",x="onreadystatechange",Q=window,h=document,t=navigator,V=false,X=[],o=[],P=[],K=[],I,p,E,B,L=false,a=false,m,G,j=true,l=false,O=function(){var ad=typeof h.getElementById!=D&&typeof h.getElementsByTagName!=D&&typeof h.createElement!=D,ak=t.userAgent.toLowerCase(),ab=t.platform.toLowerCase(),ah=ab?/win/.test(ab):/win/.test(ak),af=ab?/mac/.test(ab):/mac/.test(ak),ai=/webkit/.test(ak)?parseFloat(ak.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,aa=t.appName==="Microsoft Internet Explorer",aj=[0,0,0],ae=null;if(typeof t.plugins!=D&&typeof t.plugins[T]==r){ae=t.plugins[T].description;if(ae&&(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&t.mimeTypes[q].enabledPlugin)){V=true;aa=false;ae=ae.replace(/^.*\s+(\S+\s+\S+$)/,"$1");aj[0]=n(ae.replace(/^(.*)\..*$/,"$1"));aj[1]=n(ae.replace(/^.*\.(.*)\s.*$/,"$1"));aj[2]=/[a-zA-Z]/.test(ae)?n(ae.replace(/^.*[a-zA-Z]+(.*)$/,"$1")):0}}else{if(typeof Q.ActiveXObject!=D){try{var ag=new ActiveXObject(Z);if(ag){ae=ag.GetVariable("$version");if(ae){aa=true;ae=ae.split(" ")[1].split(",");aj=[n(ae[0]),n(ae[1]),n(ae[2])]}}}catch(ac){}}}return{w3:ad,pv:aj,wk:ai,ie:aa,win:ah,mac:af}}(),i=function(){if(!O.w3){return}if((typeof h.readyState!=D&&(h.readyState==="complete"||h.readyState==="interactive"))||(typeof h.readyState==D&&(h.getElementsByTagName("body")[0]||h.body))){f()}if(!L){if(typeof h.addEventListener!=D){h.addEventListener("DOMContentLoaded",f,false)}if(O.ie){h.attachEvent(x,function aa(){if(h.readyState=="complete"){h.detachEvent(x,aa);f()}});if(Q==top){(function ac(){if(L){return}try{h.documentElement.doScroll("left")}catch(ad){setTimeout(ac,0);return}f()}())}}if(O.wk){(function ab(){if(L){return}if(!/loaded|complete/.test(h.readyState)){setTimeout(ab,0);return}f()}())}}}();function f(){if(L||!document.getElementsByTagName("body")[0]){return}try{var ac,ad=C("span");ad.style.display="none";ac=h.getElementsByTagName("body")[0].appendChild(ad);ac.parentNode.removeChild(ac);ac=null;ad=null}catch(ae){return}L=true;var aa=X.length;for(var ab=0;ab<aa;ab++){X[ab]()}}function M(aa){if(L){aa()}else{X[X.length]=aa}}function s(ab){if(typeof Q.addEventListener!=D){Q.addEventListener("load",ab,false)}else{if(typeof h.addEventListener!=D){h.addEventListener("load",ab,false)}else{if(typeof Q.attachEvent!=D){g(Q,"onload",ab)}else{if(typeof Q.onload=="function"){var aa=Q.onload;Q.onload=function(){aa();ab()}}else{Q.onload=ab}}}}}function Y(){var aa=h.getElementsByTagName("body")[0];var ae=C(r);ae.setAttribute("style","visibility: hidden;");ae.setAttribute("type",q);var ad=aa.appendChild(ae);if(ad){var ac=0;(function ab(){if(typeof ad.GetVariable!=D){try{var ag=ad.GetVariable("$version");if(ag){ag=ag.split(" ")[1].split(",");O.pv=[n(ag[0]),n(ag[1]),n(ag[2])]}}catch(af){O.pv=[8,0,0]}}else{if(ac<10){ac++;setTimeout(ab,10);return}}aa.removeChild(ae);ad=null;H()}())}else{H()}}function H(){var aj=o.length;if(aj>0){for(var ai=0;ai<aj;ai++){var ab=o[ai].id;var ae=o[ai].callbackFn;var ad={success:false,id:ab};if(O.pv[0]>0){var ah=c(ab);if(ah){if(F(o[ai].swfVersion)&&!(O.wk&&O.wk<312)){w(ab,true);if(ae){ad.success=true;ad.ref=z(ab);ad.id=ab;ae(ad)}}else{if(o[ai].expressInstall&&A()){var al={};al.data=o[ai].expressInstall;al.width=ah.getAttribute("width")||"0";al.height=ah.getAttribute("height")||"0";if(ah.getAttribute("class")){al.styleclass=ah.getAttribute("class")}if(ah.getAttribute("align")){al.align=ah.getAttribute("align")}var ak={};var aa=ah.getElementsByTagName("param");var af=aa.length;for(var ag=0;ag<af;ag++){if(aa[ag].getAttribute("name").toLowerCase()!="movie"){ak[aa[ag].getAttribute("name")]=aa[ag].getAttribute("value")}}R(al,ak,ab,ae)}else{b(ah);if(ae){ae(ad)}}}}}else{w(ab,true);if(ae){var ac=z(ab);if(ac&&typeof ac.SetVariable!=D){ad.success=true;ad.ref=ac;ad.id=ac.id}ae(ad)}}}}}X[0]=function(){if(V){Y()}else{H()}};function z(ac){var aa=null,ab=c(ac);if(ab&&ab.nodeName.toUpperCase()==="OBJECT"){if(typeof ab.SetVariable!==D){aa=ab}else{aa=ab.getElementsByTagName(r)[0]||ab}}return aa}function A(){return !a&&F("6.0.65")&&(O.win||O.mac)&&!(O.wk&&O.wk<312)}function R(ad,ae,aa,ac){var ah=c(aa);aa=W(aa);a=true;E=ac||null;B={success:false,id:aa};if(ah){if(ah.nodeName.toUpperCase()=="OBJECT"){I=J(ah);p=null}else{I=ah;p=aa}ad.id=S;if(typeof ad.width==D||(!/%$/.test(ad.width)&&n(ad.width)<310)){ad.width="310"}if(typeof ad.height==D||(!/%$/.test(ad.height)&&n(ad.height)<137)){ad.height="137"}var ag=O.ie?"ActiveX":"PlugIn",af="MMredirectURL="+encodeURIComponent(Q.location.toString().replace(/&/g,"%26"))+"&MMplayerType="+ag+"&MMdoctitle="+encodeURIComponent(h.title.slice(0,47)+" - Flash Player Installation");if(typeof ae.flashvars!=D){ae.flashvars+="&"+af}else{ae.flashvars=af}if(O.ie&&ah.readyState!=4){var ab=C("div");
aa+="SWFObjectNew";ab.setAttribute("id",aa);ah.parentNode.insertBefore(ab,ah);ah.style.display="none";y(ah)}u(ad,ae,aa)}}function b(ab){if(O.ie&&ab.readyState!=4){ab.style.display="none";var aa=C("div");ab.parentNode.insertBefore(aa,ab);aa.parentNode.replaceChild(J(ab),aa);y(ab)}else{ab.parentNode.replaceChild(J(ab),ab)}}function J(af){var ae=C("div");if(O.win&&O.ie){ae.innerHTML=af.innerHTML}else{var ab=af.getElementsByTagName(r)[0];if(ab){var ag=ab.childNodes;if(ag){var aa=ag.length;for(var ad=0;ad<aa;ad++){if(!(ag[ad].nodeType==1&&ag[ad].nodeName=="PARAM")&&!(ag[ad].nodeType==8)){ae.appendChild(ag[ad].cloneNode(true))}}}}}return ae}function k(aa,ab){var ac=C("div");ac.innerHTML="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='"+aa+"'>"+ab+"</object>";return ac.firstChild}function u(ai,ag,ab){var aa,ad=c(ab);ab=W(ab);if(O.wk&&O.wk<312){return aa}if(ad){var ac=(O.ie)?C("div"):C(r),af,ah,ae;if(typeof ai.id==D){ai.id=ab}for(ae in ag){if(ag.hasOwnProperty(ae)&&ae.toLowerCase()!=="movie"){e(ac,ae,ag[ae])}}if(O.ie){ac=k(ai.data,ac.innerHTML)}for(af in ai){if(ai.hasOwnProperty(af)){ah=af.toLowerCase();if(ah==="styleclass"){ac.setAttribute("class",ai[af])}else{if(ah!=="classid"&&ah!=="data"){ac.setAttribute(af,ai[af])}}}}if(O.ie){P[P.length]=ai.id}else{ac.setAttribute("type",q);ac.setAttribute("data",ai.data)}ad.parentNode.replaceChild(ac,ad);aa=ac}return aa}function e(ac,aa,ab){var ad=C("param");ad.setAttribute("name",aa);ad.setAttribute("value",ab);ac.appendChild(ad)}function y(ac){var ab=c(ac);if(ab&&ab.nodeName.toUpperCase()=="OBJECT"){if(O.ie){ab.style.display="none";(function aa(){if(ab.readyState==4){for(var ad in ab){if(typeof ab[ad]=="function"){ab[ad]=null}}ab.parentNode.removeChild(ab)}else{setTimeout(aa,10)}}())}else{ab.parentNode.removeChild(ab)}}}function U(aa){return(aa&&aa.nodeType&&aa.nodeType===1)}function W(aa){return(U(aa))?aa.id:aa}function c(ac){if(U(ac)){return ac}var aa=null;try{aa=h.getElementById(ac)}catch(ab){}return aa}function C(aa){return h.createElement(aa)}function n(aa){return parseInt(aa,10)}function g(ac,aa,ab){ac.attachEvent(aa,ab);K[K.length]=[ac,aa,ab]}function F(ac){ac+="";var ab=O.pv,aa=ac.split(".");aa[0]=n(aa[0]);aa[1]=n(aa[1])||0;aa[2]=n(aa[2])||0;return(ab[0]>aa[0]||(ab[0]==aa[0]&&ab[1]>aa[1])||(ab[0]==aa[0]&&ab[1]==aa[1]&&ab[2]>=aa[2]))?true:false}function v(af,ab,ag,ae){var ad=h.getElementsByTagName("head")[0];if(!ad){return}var aa=(typeof ag=="string")?ag:"screen";if(ae){m=null;G=null}if(!m||G!=aa){var ac=C("style");ac.setAttribute("type","text/css");ac.setAttribute("media",aa);m=ad.appendChild(ac);if(O.ie&&typeof h.styleSheets!=D&&h.styleSheets.length>0){m=h.styleSheets[h.styleSheets.length-1]}G=aa}if(m){if(typeof m.addRule!=D){m.addRule(af,ab)}else{if(typeof h.createTextNode!=D){m.appendChild(h.createTextNode(af+" {"+ab+"}"))}}}}function w(ad,aa){if(!j){return}var ab=aa?"visible":"hidden",ac=c(ad);if(L&&ac){ac.style.visibility=ab}else{if(typeof ad==="string"){v("#"+ad,"visibility:"+ab)}}}function N(ab){var ac=/[\\\"<>\.;]/;var aa=ac.exec(ab)!=null;return aa&&typeof encodeURIComponent!=D?encodeURIComponent(ab):ab}var d=function(){if(O.ie){window.attachEvent("onunload",function(){var af=K.length;for(var ae=0;ae<af;ae++){K[ae][0].detachEvent(K[ae][1],K[ae][2])}var ac=P.length;for(var ad=0;ad<ac;ad++){y(P[ad])}for(var ab in O){O[ab]=null}O=null;for(var aa in swfobject){swfobject[aa]=null}swfobject=null})}}();return{registerObject:function(ae,aa,ad,ac){if(O.w3&&ae&&aa){var ab={};ab.id=ae;ab.swfVersion=aa;ab.expressInstall=ad;ab.callbackFn=ac;o[o.length]=ab;w(ae,false)}else{if(ac){ac({success:false,id:ae})}}},getObjectById:function(aa){if(O.w3){return z(aa)}},embedSWF:function(af,al,ai,ak,ab,ae,ad,ah,aj,ag){var ac=W(al),aa={success:false,id:ac};if(O.w3&&!(O.wk&&O.wk<312)&&af&&al&&ai&&ak&&ab){w(ac,false);M(function(){ai+="";ak+="";var an={};if(aj&&typeof aj===r){for(var aq in aj){an[aq]=aj[aq]}}an.data=af;an.width=ai;an.height=ak;var ar={};if(ah&&typeof ah===r){for(var ao in ah){ar[ao]=ah[ao]}}if(ad&&typeof ad===r){for(var am in ad){if(ad.hasOwnProperty(am)){var ap=(l)?encodeURIComponent(am):am,at=(l)?encodeURIComponent(ad[am]):ad[am];if(typeof ar.flashvars!=D){ar.flashvars+="&"+ap+"="+at}else{ar.flashvars=ap+"="+at}}}}if(F(ab)){var au=u(an,ar,al);if(an.id==ac){w(ac,true)}aa.success=true;aa.ref=au;aa.id=au.id}else{if(ae&&A()){an.data=ae;R(an,ar,al,ag);return}else{w(ac,true)}}if(ag){ag(aa)}})}else{if(ag){ag(aa)}}},switchOffAutoHideShow:function(){j=false},enableUriEncoding:function(aa){l=(typeof aa===D)?true:aa},ua:O,getFlashPlayerVersion:function(){return{major:O.pv[0],minor:O.pv[1],release:O.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(ac,ab,aa){if(O.w3){return u(ac,ab,aa)}else{return undefined}},showExpressInstall:function(ac,ad,aa,ab){if(O.w3&&A()){R(ac,ad,aa,ab)}},removeSWF:function(aa){if(O.w3){y(aa)}},createCSS:function(ad,ac,ab,aa){if(O.w3){v(ad,ac,ab,aa)}},addDomLoadEvent:M,addLoadEvent:s,getQueryParamValue:function(ad){var ac=h.location.search||h.location.hash;
if(ac){if(/\?/.test(ac)){ac=ac.split("?")[1]}if(ad==null){return N(ac)}var ab=ac.split("&");for(var aa=0;aa<ab.length;aa++){if(ab[aa].substring(0,ab[aa].indexOf("="))==ad){return N(ab[aa].substring((ab[aa].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var aa=c(S);if(aa&&I){aa.parentNode.replaceChild(I,aa);if(p){w(p,true);if(O.ie){I.style.display="block"}}if(E){E(B)}}a=false}},version:"2.3"}}();

; browserify_shim__define__module__export__(typeof swfobject != "undefined" ? swfobject : window.swfobject);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(require,module,exports){
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define("typeahead.js",["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},noop:function(){}}}(),c=function(){"use strict";function a(a){var g,h;return h=b.mixin({},f,a),g={css:e(),classes:h,html:c(h),selectors:d(h)},{css:g.css,html:g.html,classes:g.classes,selectors:g.selectors,mixin:function(a){b.mixin(a,g)}}}function c(a){return{wrapper:'<span class="'+a.wrapper+'"></span>',menu:'<div class="'+a.menu+'"></div>'}}function d(a){var c={};return b.each(a,function(a,b){c[b]="."+a}),c}function e(){var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),a}var f={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return a}(),d=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d,e;return d="typeahead:",e={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},b.mixin(c.prototype,{_trigger:function(b,c){var e;return e=a.Event(d+b),(c=c||[]).unshift(e),this.$el.trigger.apply(this.$el,c),e},before:function(a){var b,c;return b=[].slice.call(arguments,1),c=this._trigger("before"+a,b),c.isDefaultPrevented()},trigger:function(a){var b;this._trigger(a,[].slice.call(arguments,1)),(b=e[a])&&this._trigger(b,[].slice.call(arguments,1))}}),c}(),e=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),f=function(a){"use strict";function c(a,c,d){for(var e,f=[],g=0,h=a.length;h>g;g++)f.push(b.escapeRegExChars(a[g]));return e=d?"\\b("+f.join("|")+")\\b":"("+f.join("|")+")",c?new RegExp(e):new RegExp(e,"i")}var d={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(e){function f(b){var c,d,f;return(c=h.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;e=b.mixin({},d,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],h=c(e.pattern,e.caseSensitive,e.wordsOnly),g(e.node,f))}}(window.document),g=function(){"use strict";function c(c,e){c=c||{},c.input||a.error("input is missing"),e.mixin(this),this.$hint=a(c.hint),this.$input=a(c.input),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=d(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function g(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var h;return h={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return b.toStr(a).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(a){var b=h[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(a,b){var c;switch(a){case"up":case"down":c=!g(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!g(b);break;default:c=!0}return c},_checkLanguageDirection:function(){var a=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==a&&(this.dir=a,this.$hint.attr("dir",a),this.trigger("langDirChanged",a))},_setQuery:function(a,b){var c,d;c=f(a,this.query),d=c?this.query.length!==a.length:!1,this.query=a,b||c?!b&&d&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},bind:function(){var a,c,d,e,f=this;return a=b.bind(this._onBlur,this),c=b.bind(this._onFocus,this),d=b.bind(this._onKeydown,this),e=b.bind(this._onInput,this),this.$input.on("blur.tt",a).on("focus.tt",c).on("keydown.tt",d),!b.isMsie()||b.isMsie()>9?this.$input.on("input.tt",e):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){h[a.which||a.keyCode]||b.defer(b.bind(f._onInput,f,a))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(a,b){this.setInputValue(a),this._setQuery(a,b)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(a){this.$input.val(a),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:document.selection?(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=a("<div>")}}),c}(),h=function(){"use strict";function c(c,e){c=c||{},c.templates=c.templates||{},c.templates.notFound=c.templates.notFound||c.templates.empty,c.source||a.error("missing source"),c.node||a.error("missing node"),c.name&&!h(c.name)&&a.error("invalid dataset name: "+c.name),e.mixin(this),this.highlight=!!c.highlight,this.name=c.name||j(),this.limit=c.limit||5,this.displayFn=d(c.display||c.displayKey),this.templates=g(c.templates,this.displayFn),this.source=c.source.__ttAdapter?c.source.__ttAdapter():c.source,this.async=b.isUndefined(c.async)?this.source.length>2:!!c.async,this._resetLastSuggestion(),this.$el=a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function d(a){function c(b){return b[a]}return a=a||b.stringify,b.isFunction(a)?a:c}function g(c,d){function e(b){return a("<div>").text(d(b))}return{notFound:c.notFound&&b.templatify(c.notFound),pending:c.pending&&b.templatify(c.pending),header:c.header&&b.templatify(c.header),footer:c.footer&&b.templatify(c.footer),suggestion:c.suggestion||e}}function h(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var i,j;return i={val:"tt-selectable-display",obj:"tt-selectable-object"},j=b.getIdGenerator(),c.extractData=function(b){var c=a(b);return c.data(i.obj)?{val:c.data(i.val)||"",obj:c.data(i.obj)||null}:null},b.mixin(c.prototype,e,{_overwrite:function(a,b){b=b||[],b.length?this._renderSuggestions(a,b):this.async&&this.templates.pending?this._renderPending(a):!this.async&&this.templates.notFound?this._renderNotFound(a):this._empty(),this.trigger("rendered",this.name,b,!1)},_append:function(a,b){b=b||[],b.length&&this.$lastSuggestion.length?this._appendSuggestions(a,b):b.length?this._renderSuggestions(a,b):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(a),this.trigger("rendered",this.name,b,!0)},_renderSuggestions:function(a,b){var c;c=this._getSuggestionsFragment(a,b),this.$lastSuggestion=c.children().last(),this.$el.html(c).prepend(this._getHeader(a,b)).append(this._getFooter(a,b))},_appendSuggestions:function(a,b){var c,d;c=this._getSuggestionsFragment(a,b),d=c.children().last(),this.$lastSuggestion.after(c),this.$lastSuggestion=d},_renderPending:function(a){var b=this.templates.pending;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_renderNotFound:function(a){var b=this.templates.notFound;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(c,d){var e,g=this;return e=document.createDocumentFragment(),b.each(d,function(b){var d,f;f=g._injectQuery(c,b),d=a(g.templates.suggestion(f)).data(i.obj,b).data(i.val,g.displayFn(b)).addClass(g.classes.suggestion+" "+g.classes.selectable),e.appendChild(d[0])}),this.highlight&&f({className:this.classes.highlight,node:e,pattern:c}),a(e)},_getFooter:function(a,b){return this.templates.footer?this.templates.footer({query:a,suggestions:b,dataset:this.name}):null},_getHeader:function(a,b){return this.templates.header?this.templates.header({query:a,suggestions:b,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=a()},_injectQuery:function(a,c){return b.isObject(c)?b.mixin({_query:a},c):c},update:function(b){function c(a){g||(g=!0,a=(a||[]).slice(0,e.limit),h=a.length,e._overwrite(b,a),h<e.limit&&e.async&&e.trigger("asyncRequested",b))}function d(c){c=c||[],!f&&h<e.limit&&(e.cancel=a.noop,h+=c.length,e._append(b,c.slice(0,e.limit-h)),e.async&&e.trigger("asyncReceived",b))}var e=this,f=!1,g=!1,h=0;this.cancel(),this.cancel=function(){f=!0,e.cancel=a.noop,e.async&&e.trigger("asyncCanceled",b)},this.source(b,c,d),!g&&c([])},cancel:a.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=a("<div>")}}),c}(),i=function(){"use strict";function c(c,d){function e(b){var c=f.$node.find(b.node).first();return b.node=c.length?c:a("<div>").appendTo(f.$node),new h(b,d)}var f=this;c=c||{},c.node||a.error("node is required"),d.mixin(this),this.$node=a(c.node),this.query=null,this.datasets=b.map(c.datasets,e)}return b.mixin(c.prototype,e,{_onSelectableClick:function(b){this.trigger("selectableClicked",a(b.currentTarget))},_onRendered:function(a,b,c,d){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",b,c,d)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){function a(a){return a.isEmpty()}return b.every(this.datasets,a)},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var a=this.getActiveSelectable();a&&a.removeClass(this.classes.cursor)},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$node.scrollTop(),e=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),0>b?this.$node.scrollTop(d+b):c>e&&this.$node.scrollTop(d+(c-e))},bind:function(){var a,c=this;return a=b.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,a),b.each(this.datasets,function(a){a.onSync("asyncRequested",c._propagate,c).onSync("asyncCanceled",c._propagate,c).onSync("asyncReceived",c._propagate,c).onSync("rendered",c._onRendered,c).onSync("cleared",c._onCleared,c)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.addClass(this.classes.open)},close:function(){this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(a){this.$node.attr("dir",a)},selectableRelativeToCursor:function(a){var b,c,d,e;return c=this.getActiveSelectable(),b=this._getSelectables(),d=c?b.index(c):-1,e=d+a,e=(e+1)%(b.length+1)-1,e=-1>e?b.length-1:e,-1===e?null:b.eq(e)},setCursor:function(a){this._removeCursor(),(a=a&&a.first())&&(a.addClass(this.classes.cursor),this._ensureVisible(a))},getSelectableData:function(a){return a&&a.length?h.extractData(a):null},getActiveSelectable:function(){var a=this._getSelectables().filter(this.selectors.cursor).first();return a.length?a:null},getTopSelectable:function(){var a=this._getSelectables().first();return a.length?a:null},update:function(a){function c(b){b.update(a)}var d=a!==this.query;return d&&(this.query=a,b.each(this.datasets,c)),d},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function c(a){a.destroy()}this.$node.off(".tt"),this.$node=a("<div>"),b.each(this.datasets,c)}}),c}(),j=function(){"use strict";function a(){i.apply(this,[].slice.call(arguments,0))}var c=i.prototype;return b.mixin(a.prototype,i.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),c.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),c.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(a){return this.$node.css("ltr"===a?this.css.ltr:this.css.rtl),c.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),a}(),k=function(){"use strict";function c(c,e){var f,g,h,i,j,k,l,m,n,o,p;c=c||{},c.input||a.error("missing input"),c.menu||a.error("missing menu"),c.eventBus||a.error("missing event bus"),e.mixin(this),this.eventBus=c.eventBus,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.input=c.input,this.menu=c.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),f=d(this,"activate","open","_onFocused"),g=d(this,"deactivate","_onBlurred"),h=d(this,"isActive","isOpen","_onEnterKeyed"),i=d(this,"isActive","isOpen","_onTabKeyed"),j=d(this,"isActive","_onEscKeyed"),k=d(this,"isActive","open","_onUpKeyed"),l=d(this,"isActive","open","_onDownKeyed"),m=d(this,"isActive","isOpen","_onLeftKeyed"),n=d(this,"isActive","isOpen","_onRightKeyed"),o=d(this,"_openIfActive","_onQueryChanged"),p=d(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",f,this).onSync("blurred",g,this).onSync("enterKeyed",h,this).onSync("tabKeyed",i,this).onSync("escKeyed",j,this).onSync("upKeyed",k,this).onSync("downKeyed",l,this).onSync("leftKeyed",m,this).onSync("rightKeyed",n,this).onSync("queryChanged",o,this).onSync("whitespaceChanged",p,this).onSync("langDirChanged",this._onLangDirChanged,this)}function d(a){var c=[].slice.call(arguments,1);return function(){var d=[].slice.call(arguments);b.each(c,function(b){return a[b].apply(a,d)})}}return b.mixin(c.prototype,{_hacks:function(){var c,d;c=this.input.$input||a("<div>"),d=this.menu.$node||a("<div>"),c.on("blur.tt",function(a){var e,f,g;e=document.activeElement,f=d.is(e),g=d.has(e).length>0,b.isMsie()&&(f||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){c.focus()}))}),d.on("mousedown.tt",function(a){a.preventDefault()})},_onSelectableClicked:function(a,b){this.select(b)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(a,b,c,d){this._updateHint(),this.eventBus.trigger("render",c,d,b)},_onAsyncRequested:function(a,b,c){this.eventBus.trigger("asyncrequest",c,b)},_onAsyncCanceled:function(a,b,c){this.eventBus.trigger("asynccancel",c,b)},_onAsyncReceived:function(a,b,c){this.eventBus.trigger("asyncreceive",c,b)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())&&this.select(c)&&b.preventDefault()},_onTabKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())?this.select(c)&&b.preventDefault():(c=this.menu.getTopSelectable())&&this.autocomplete(c)&&b.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onQueryChanged:function(a,b){this._minLengthMet(b)?this.menu.update(b):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(a,b){this.dir!==b&&(this.dir=b,this.menu.setLanguageDirection(b))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(a){return a=b.isString(a)?a:this.input.getQuery()||"",a.length>=this.minLength},_updateHint:function(){var a,c,d,e,f,h,i;a=this.menu.getTopSelectable(),c=this.menu.getSelectableData(a),d=this.input.getInputValue(),!c||b.isBlankString(d)||this.input.hasOverflow()?this.input.clearHint():(e=g.normalizeQuery(d),f=b.escapeRegExChars(e),h=new RegExp("^(?:"+f+")(.+$)","i"),i=h.exec(c.val),i&&this.input.setHint(d+i[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return this.isActive()?!0:!this.isEnabled()||this.eventBus.before("active")?!1:(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return this.isActive()?this.eventBus.before("idle")?!1:(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0):!0},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(a){this.input.setQuery(b.toStr(a))},getVal:function(){return this.input.getQuery()},select:function(a){var b=this.menu.getSelectableData(a);return b&&!this.eventBus.before("select",b.obj)?(this.input.setQuery(b.val,!0),this.eventBus.trigger("select",b.obj),this.close(),!0):!1},autocomplete:function(a){var b,c,d;return b=this.input.getQuery(),c=this.menu.getSelectableData(a),d=c&&b!==c.val,d&&!this.eventBus.before("autocomplete",c.obj)?(this.input.setQuery(c.val),this.eventBus.trigger("autocomplete",c.obj),!0):!1},moveCursor:function(a){var b,c,d,e,f;return b=this.input.getQuery(),c=this.menu.selectableRelativeToCursor(a),d=this.menu.getSelectableData(c),e=d?d.obj:null,f=this._minLengthMet()&&this.menu.update(b),f||this.eventBus.before("cursorchange",e)?!1:(this.menu.setCursor(c),d?this.input.setInputValue(d.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",e),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),c}();!function(){"use strict";function e(b,c){b.each(function(){var b,d=a(this);(b=d.data(p.typeahead))&&c(b,d)})}function f(a,b){return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly",!0).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1})}function h(a,b){a.data(p.attrs,{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass(b.classes.input).attr({autocomplete:"off",spellcheck:!1});try{!a.attr("dir")&&a.attr("dir","auto")}catch(c){}return a}function l(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function m(a){var c,d;c=a.data(p.www),d=a.parent().filter(c.selectors.wrapper),b.each(a.data(p.attrs),function(c,d){b.isUndefined(c)?a.removeAttr(d):a.attr(d,c)}),a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input),d.length&&(a.detach().insertAfter(d),d.remove())}function n(c){var d,e;return d=b.isJQuery(c)||b.isElement(c),e=d?a(c).first():[],e.length?e:null}var o,p,q;o=a.fn.typeahead,p={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},q={initialize:function(e,l){function m(){var c,m,q,r,s,t,u,v,w,x,y;b.each(l,function(a){a.highlight=!!e.highlight}),c=a(this),m=a(o.html.wrapper),q=n(e.hint),r=n(e.menu),s=e.hint!==!1&&!q,t=e.menu!==!1&&!r,s&&(q=f(c,o)),t&&(r=a(o.html.menu).css(o.css.menu)),q&&q.val(""),c=h(c,o),(s||t)&&(m.css(o.css.wrapper),c.css(s?o.css.input:o.css.inputWithNoHint),c.wrap(m).parent().prepend(s?q:null).append(t?r:null)),y=t?j:i,u=new d({el:c}),v=new g({hint:q,input:c},o),w=new y({node:r,datasets:l},o),x=new k({input:v,menu:w,eventBus:u,minLength:e.minLength},o),c.data(p.www,o),c.data(p.typeahead,x)}var o;return l=b.isArray(l)?l:[].slice.call(arguments,1),e=e||{},o=c(e.classNames),this.each(m)},isEnabled:function(){var a;return e(this.first(),function(b){a=b.isEnabled()}),a},enable:function(){return e(this,function(a){a.enable()}),this},disable:function(){return e(this,function(a){a.disable()}),this},isActive:function(){var a;return e(this.first(),function(b){a=b.isActive()}),a},activate:function(){return e(this,function(a){a.activate()}),this},deactivate:function(){return e(this,function(a){a.deactivate()}),this},isOpen:function(){var a;return e(this.first(),function(b){a=b.isOpen()}),a},open:function(){return e(this,function(a){a.open()}),this},close:function(){return e(this,function(a){a.close()}),this},select:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.select(d)}),c},autocomplete:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.autocomplete(d)}),c},moveCursor:function(a){var b=!1;return e(this.first(),function(c){b=c.moveCursor(a)}),b},val:function(a){var b;return arguments.length?(e(this,function(b){b.setVal(a)}),this):(e(this.first(),function(a){b=a.getVal()}),b)},destroy:function(){return e(this,function(a,b){m(b),a.destroy()}),this}},a.fn.typeahead=function(a){return q[a]?q[a].apply(this,[].slice.call(arguments,1)):q.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=o,this}}()});
},{"jquery":12}],19:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);

},{}],"book":[function(require,module,exports){
'use strict';

require('jquery-validate');
var productPreview = require('./lib/product-preview');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-book').click(function () {
            var $this = $(this);
            $('#confirm-remove-book').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });

            return false;
        });
    },

    addFun: function addFun() {

        $('#form-add-book').validate();
        this.formActionSelect();
    },
    editFun: function editFun() {

        $('#form-add-book').validate();
        this.formActionSelect();
    },

    previewFun: productPreview,

    //表单提交，是否是保存还是预览
    formActionSelect: function formActionSelect() {

        $('form :submit').click(function () {
            $('form').attr({
                'action': $(this).attr('data-action'),
                'target': $(this).attr('data-target')
            });
            return true;
        });
    }

};

},{"./lib/product-preview":3,"jquery-validate":13}],"customer":[function(require,module,exports){
'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function indexFun() {

        var alert = $('#modal-alert');
        $('.remove-customer').click(function () {

            $('#confirm-remove-customer').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    var _this2 = this;

                    var item = $(this.relatedTarget);
                    $.ajax({
                        type: 'post',
                        url: '/customer/remove/' + item.data('id'),
                        success: function success(data) {
                            if (data.success) {
                                location.reload();
                            } else {
                                alert.modal({
                                    relatedTarget: _this2
                                }).find('.am-modal-bd').html('无法删除,请先删除该用户所有<a href="/order?search-customer-id=' + item.data('id') + '" target="_blank">发货订单</a>后再进行删除');
                            }
                        }
                    });
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {

        var _this = this;

        $('#form-add-customer').validate({
            submitHandler: function submitHandler(form) {
                _this.updateAddress();
                form.submit();
            }
        });

        this.addAddress();
        this.customerTypeAhead();
    },
    editFun: function editFun() {

        var _this = this;

        $('#form-edit-customer').validate({
            submitHandler: function submitHandler(form) {
                _this.updateAddress();
                form.submit();
            }
        });

        this.addAddress();
        this.customerTypeAhead();
    },

    addAddress: function addAddress() {

        var addressContent = $('#content-address');
        var add = $('.address-add');
        var remove = addressContent.find('.remove');

        add.click(function () {
            var field = $('.address-field:last');
            var newField = field.clone(true);
            newField.insertAfter(field);
            newField.find('.address').val('').get(0).focus();
        });

        remove.click(function () {
            $(this).parents('.address-field').detach();
        });
    },
    updateAddress: function updateAddress() {

        var input = $('input[name=address]');
        var address = '';

        $('.address').filter(function () {
            return $.trim(this.value) !== '';
        }).each(function (i, n) {
            address += n.value + '|';
        });

        input.val(address.substr(0, address.length - 1));
    },

    customerTypeAhead: function customerTypeAhead() {

        var parentCustomerInput = $('#parent-customer');
        var parentCustomerIdInput = $('#parent-customer-id');

        var parentCustomer = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: '/customer/add/customer-parent',
                prepare: function prepare(query, settings) {
                    settings.data = {
                        name: parentCustomerInput.val()
                    };
                    return settings;
                }
            }
        });

        parentCustomerInput.typeahead(null, {
            display: 'value',
            highlight: true,
            source: parentCustomer
        });

        parentCustomerInput.on({
            'typeahead:select': function typeaheadSelect(event, item) {
                parentCustomerIdInput.val(item.customerId);
            },
            'blur': function blur() {
                if ($.trim(this.value) === '') {
                    parentCustomerIdInput.val('');
                }
            }
        });
    }
};

},{"bloodhound":5,"jquery-validate":13}],"earning":[function(require,module,exports){
'use strict';

require('jquery-validate');

module.exports = {

    indexFun: function indexFun() {

        var expenseses = function () {
            var value = 0;
            $('.cell-expenses').each(function (i, n) {
                value += parseInt($(n).text());
            });
            return value;
        }();

        var incomes = function () {
            var value = 0;
            $('.cell-income').each(function (i, n) {
                value += parseInt($(n).text());
            });
            return value;
        }();

        $('#month-expenses').text(expenseses);
        $('#month-income').text(incomes);
        $('#month-earning').text(incomes - expenseses);
    },
    editFun: function editFun() {

        $('#form-edit-earning').validate();
        var expenses = $('#expenses');
        var expensesComment = $('#expenses-comment');
        var date = /date=(.*)/.exec(location.search)[1];

        $('.current-day-expenses').click(function () {
            $.ajax({
                url: '/earning/edit/current-day-expenses',
                data: {
                    date: date
                },
                success: function success(data) {
                    expenses.val(data.value);
                    expensesComment.val('采购金额:' + data.value);
                }
            });
        });

        $('#expenses-comment,#income-comment').change(function () {

            var amount = 0;
            var input = $(this).parent().prev().prev().find('input[type=text]');
            var amounts = this.value.match(/(\d+).*\b/g);

            if (!amounts) {
                input.val(0);
                return;
            }

            for (var i = 0; i < amounts.length; i++) {
                amount += parseInt(amounts[i]);
            }
            input.val(amount);
        });
    }
};

},{"jquery-validate":13}],"identity":[function(require,module,exports){

'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-identity').click(function () {
            var $this = $(this);
            $('#confirm-remove-identity').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });

        $('.search-isoften').change(function () {
            $('form').find('.am-btn').click();
        });
    },
    addFun: function addFun() {
        $('#form-add-identity').validate();
    },

    editFun: function editFun() {
        $('#form-edit-identity').validate();
    },

    uploadImg: function uploadImg(callbackName) {

        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');

        formUploadImg.submit(function () {
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success: function success(data) {
                    uploadLoading.removeClass('on');
                    if (data.success) {
                        window.parent[callbackName](data.url);
                    }
                }
            });
            return false;
        });

        iconImage.change(function () {
            formUploadImg.submit();
        });
    }
};

},{"jquery-form":9,"jquery-validate":13}],"index":[function(require,module,exports){
'use strict';

module.exports = {

    indexFun: function indexFun(dataEarning) {

        var chartEarning = echarts.init($('#chart-earning')[0]);
        chartEarning.setOption({
            title: {
                text: '2016年收入明细',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 12
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                selected: {
                    '支出金额': true,
                    '收入金额': true,
                    '盈利': false
                },
                data: ['支出', '收入', '盈利'],
                right: '0%'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '15%',
                containLabel: true
            },
            xAxis: [{
                show: false,
                type: 'category',
                boundaryGap: false,
                data: dataEarning.date
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '支出',
                type: 'line',
                areaStyle: { normal: {} },
                data: dataEarning.expenses,
                itemStyle: { normal: { color: '#0e90d2' } }
            }, {
                name: '收入',
                type: 'line',
                areaStyle: { normal: {} },
                data: dataEarning.income,
                itemStyle: { normal: { color: '#5eb95e' } }
            }, {
                name: '盈利',
                type: 'line',
                areaStyle: { normal: {} },
                data: dataEarning.earning,
                itemStyle: { normal: { color: '#dd514c' } }
            }]
        });
    }

};

},{}],"music":[function(require,module,exports){
'use strict';

require('jquery-validate');
var productPreview = require('./lib/product-preview');

module.exports = {

    indexFun: function indexFun() {

        $('.select-category').change(function () {
            if (this.value > 0) {
                location.href = '/product?categoryId=' + this.value;
            }
        });

        $('.remove-music').click(function () {

            var $this = $(this);

            $('#confirm-remove-music').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });

            return false;
        });
    },

    addFun: function addFun() {
        $('#form-add-music').validate();
        this.formActionSelect();
    },
    editFun: function editFun() {
        $('#form-add-music').validate();
        this.formActionSelect();
    },

    previewFun: productPreview,

    //表单提交，是否是保存还是预览
    formActionSelect: function formActionSelect() {

        $('form :submit').click(function () {
            $('form').attr({
                'action': $(this).attr('data-action'),
                'target': $(this).attr('data-target')
            });
            return true;
        });
    }

};

},{"./lib/product-preview":3,"jquery-validate":13}],"order":[function(require,module,exports){
'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-order').click(function () {

            var $this = $(this);

            $('#confirm-remove-order').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });

        //加载customer data
        {
            (function () {
                var customerListId = [];
                var customerList = $('.am-table').find('tr[data-customer-id]');

                customerList.each(function (i, n) {
                    if ($(n).data('customer-id')) {
                        customerListId.push($(n).data('customer-id'));
                    }
                });

                $.ajax({
                    url: '/order/get-customer',
                    data: { customerListId: customerListId }
                }).then(function (data) {

                    if (!data.success) {
                        return;
                    }
                    $.each(customerList, function (i, n) {
                        var customerId = parseInt($(n).data('customer-id'));
                        $.each(data.customers, function (_i, _n) {
                            if (_n.customerId === customerId) {
                                $(n).find('.taobao-name').removeClass('on').text(_n.taobao);
                            }
                        });
                    });
                    console.info(data);
                });
            })();
        }
    },
    addFun: function addFun() {
        $('#form-add-order').validate();
        this.typeAhead();
        this.orderTypeAheadAdd();
        this.domUpdate();
    },
    editFun: function editFun() {
        $('#form-edit-order').validate();
        this.typeAhead();
        this.orderTypeAheadUpdate();
        this.domUpdate();
    },
    domUpdate: function domUpdate() {
        var shippingCompany = $('#shipping-company');
        var trackingNumber = $('#tracking-number');
        shippingCompany.change(function () {
            trackingNumber.val('').get(0).focus();
        });
    },
    orderTypeAheadAdd: function orderTypeAheadAdd() {

        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var newCustomer = $('.new-customer');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        var taobao = $('#taobao');
        var newAddress = $('.new-address');

        customerNameInput.on({

            //change表示此用户为新用户，而不是autocomplete选择出来的老用户，所以数据需要重置
            'keyup': function keyup() {
                if (!$(this).data('typeselect')) {
                    newCustomer.prop('checked', true);
                    newAddress.prop('checked', true);
                    //    customerNameIdInput.val('');
                    addressList.empty();
                }
            },
            'focus': function focus() {
                $(this).data('typeselect', false);
            },
            'typeahead:select': function typeaheadSelect(event, item) {
                customerNameIdInput.val(item.customerId);
                taobao.val(item.taobao);
                var address = item.address.split('|');
                addressList.empty();

                if (address.length === 1) {
                    shippingAddress.val(address[0]);
                    newAddress.prop('checked', false);
                } else {
                    for (var i = 0; i < address.length; i++) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址</a> </li>');
                    }
                }
                newCustomer.prop('checked', false);
                $(this).data('typeselect', true);
            }
        });

        addressList.on('click', 'a', function () {
            shippingAddress.val($(this).parents('li').find('span').text());
            addressList.empty();
            newAddress.prop('checked', false);
        });

        newAddress.click(function () {
            if (this.checked) {
                shippingAddress.val('').get(0).focus();
                addressList.empty();
            }
        });

        shippingAddress.on('change', function () {
            newAddress.prop('checked', true);
        });
    },
    orderTypeAheadUpdate: function orderTypeAheadUpdate() {

        var customerNameInput = $('#customer-name');
        var customerNameIdInput = $('#customer-name-id');
        var shippingAddress = $('#shipping-address');
        var addressList = $('.address-list');
        var taobao = $('#taobao');

        customerNameInput.on({
            'typeahead:select': function typeaheadSelect(event, item) {
                customerNameIdInput.val(item.customerId);
                taobao.val(item.taobao);
                var address = item.address.split('|');
                addressList.empty();

                if (address.length === 1) {
                    shippingAddress.val(address[0]);
                } else {
                    for (var i = 0; i < address.length; i++) {
                        addressList.append('<li><span>' + address[i] + '</span> <a href="javascript:;">使用此地址</a> </li>');
                    }
                }
            }
        });

        addressList.on('click', 'a', function () {
            shippingAddress.val($(this).parents('li').find('span').text());
            addressList.empty();
        });
    },
    typeAhead: function typeAhead() {

        var customerNameInput = $('#customer-name');
        customerNameInput.typeahead(null, {
            display: function display(item) {
                return item.value;
            },
            templates: {
                suggestion: function suggestion(item) {
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (item.taobao ? '(淘宝名:' + item.taobao + ') ' : '') + item.address + '</span></div>';
                }
            },
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/order/add/search-customer',
                    prepare: function prepare(query, settings) {
                        settings.data = {
                            name: customerNameInput.val()
                        };
                        return settings;
                    }
                }
            })
        });
    }
};

},{"bloodhound":5,"jquery-validate":13}],"product-book":[function(require,module,exports){
'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function indexFun() {

        $('.ckb-is-complete').click(function () {
            var $this = $(this);
            $.ajax({
                url: '/product-book/complete',
                data: {
                    productBookId: $this.attr('data-id'),
                    checked: $this.prop('checked')
                },
                success: function success(data) {
                    console.info(data);
                }
            });
        });

        $('.remove-product-book').click(function () {
            var $this = $(this);
            $('#confirm-remove-product-book').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-product-book').validate();
        this.customerTypeAhead();
    },
    editFun: function editFun() {
        $('#form-edit-product-book').validate();
        this.customerTypeAhead();
    },

    customerTypeAhead: function customerTypeAhead() {

        var customerName = $('#customer-name');
        var customerId = $('#customer-id');

        customerName.typeahead(null, {
            display: function display(item) {
                return item.value;
            },
            templates: {
                suggestion: function suggestion(item) {
                    return '<div><span class="tt-value">' + item.value + '</span><span class="tt-footer">' + (item.taobao ? '淘宝名:' + item.taobao + ' ' : ' ') + (item.weixin ? '微信号:' + item.weixin : '') + '</span></div>';
                }
            },
            highlight: true,
            source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/product-book/get-customer-name',
                    prepare: function prepare(query, settings) {
                        settings.data = {
                            name: customerName.val()
                        };
                        return settings;
                    }
                }
            })
        });

        customerName.on({
            'typeahead:select': function typeaheadSelect(event, item) {
                customerId.val(item.customerId);
            }
        });

        customerName.on('change', function () {
            customerId.val('');
        });
    }

};

},{"bloodhound":5,"jquery-validate":13}],"product-brand":[function(require,module,exports){
'use strict';

require('jquery-validate');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-product-brand').click(function () {
            var $this = $(this);
            $('#confirm-remove-product-brand').modal({
                relatedTarget: this,
                onConfirm: function onConfirm() {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-product-brand').validate();
        this.setTabs();
    },
    editFun: function editFun() {
        $('#form-edit-product-brand').validate();
        this.setTabs();
    },
    setTabs: function setTabs() {
        $('.am-tabs').tabs({
            animation: false
        });
    }

};

},{"jquery-validate":13}],"product-category":[function(require,module,exports){
'use strict';

require('jquery-validate');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-product-category').click(function () {
            var $this = $(this);
            $('#confirm-remove-product-category').modal({
                relatedTarget: this,
                onConfirm: function onConfirm() {

                    $.ajax({
                        url: '/product-category/remove/' + $this.attr('data-id'),
                        success: function success(data) {

                            if (data.success) {
                                return location.href = '/product-category';
                            }

                            var alertModal = $('#alert-remove-product-category');
                            alertModal.find('.am-modal-bd').text(data.msg);
                            alertModal.modal({
                                relatedTarget: this
                            });
                        }
                    });
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-product-category').validate();
    },
    editFun: function editFun() {
        $('#form-edit-product-category').validate();
    }

};

},{"jquery-validate":13}],"product":[function(require,module,exports){
'use strict';

require('jquery-validate');
var productPreview = require('./lib/product-preview');

module.exports = {

    indexFun: function indexFun() {

        $('.select-category').change(function () {
            if (this.value > 0) {
                location.href = '/product?categoryId=' + this.value;
            }
        });

        $('.remove-product').click(function () {

            var $this = $(this);

            $('#confirm-remove-product').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });

            return false;
        });
    },

    addFun: function addFun() {

        $('#form-add-product').validate();
        this.chooseBanner();
        this.formActionSelect();
        this.setTabs();
        this.setMainImage();
    },
    editFun: function editFun() {

        $('#form-add-product').validate();
        this.chooseBanner();
        this.formActionSelect();
        this.setTabs();
        this.setMainImage();
    },

    previewFun: productPreview,

    //使用购买说明信息
    chooseInfo: function chooseInfo() {

        var contentInfo = $('#content-info');
        var mdCodeInfo = $('#md-code-info');

        mdCodeInfo.val('![](' + contentInfo.find('.product-title img').attr('src') + ')');

        contentInfo.find(':checkbox').click(function () {
            if (this.checked) {
                mdCodeInfo.val('![](' + contentInfo.find('.product-title img').attr('src') + ')');
            } else {
                mdCodeInfo.val('');
            }
        });
    },

    //选择banner
    chooseBanner: function chooseBanner() {

        var select = $('#select-banner');
        var bannerLength = select.find('option').length - 1;
        var codeBanner = $('.code-banner');
        var mdCodeBanner = $('#md-code-banner');

        var currentBannerSrc, currentBannerTitle;

        //如果是新增产品，默认为0
        if (parseInt(select.val()) === 0) {

            var count = Math.floor(Math.random(100) * bannerLength);
            currentBannerSrc = select.find('option:eq(' + count + ')').attr('data-src');
            currentBannerTitle = select.find('option:eq(' + count + ')').text();

            codeBanner.html('<img src="' + currentBannerSrc + '"/>');
            mdCodeBanner.val('![' + currentBannerTitle + '](' + currentBannerSrc + ')');

            //编辑产品
        } else {

                currentBannerSrc = select.find('option:selected').attr('data-src');
                currentBannerTitle = select.find('option:selected').text();

                codeBanner.html('<img src="' + currentBannerSrc + '"/>');
                mdCodeBanner.val('![' + currentBannerTitle + '](' + currentBannerSrc + ')');
            }

        select.on('change', function () {

            if (parseInt(this.value) === 0) {
                var count = Math.floor(Math.random(100) * bannerLength);
                currentBannerSrc = select.find('option:eq(' + count + ')').attr('data-src');
                currentBannerTitle = select.find('option:eq(' + count + ')').text();
            } else {
                currentBannerSrc = select.find('option[value=' + this.value + ']').attr('data-src');
                currentBannerTitle = select.find('option[value=' + this.value + ']').text();
            }
            codeBanner.html('<img src="' + currentBannerSrc + '"/>');
            mdCodeBanner.val('![' + currentBannerTitle + '](' + currentBannerSrc + ')');
        });

        $('.banner-enable').click(function () {

            if (this.checked) {
                mdCodeBanner.val('');
                select.addClass('hide');
                codeBanner.addClass('hide');
                mdCodeBanner.addClass('hide');
            } else {
                select.trigger('change');
                select.removeClass('hide');
                codeBanner.removeClass('hide');
                mdCodeBanner.removeClass('hide');
            }
        });
    },

    //表单提交，是否是保存还是预览
    formActionSelect: function formActionSelect() {

        $('form :submit').click(function () {
            $('form').attr({
                'action': $(this).attr('data-action'),
                'target': $(this).attr('data-target')
            });
            return true;
        });
    },

    //tab控件
    setTabs: function setTabs() {
        $('.am-tabs').tabs({
            animation: false
        });
    },

    //设置主图预览
    setMainImage: function setMainImage() {

        var contentImage = $('#content-main-image').find('ul');
        var mainImage = $('#main-image');

        mainImage.change(function () {
            contentImage.empty();
            var arr = mainImage.val().split('\n');
            if ($.trim(arr[0]) === '') {
                return;
            }
            $.each(arr, function (i, n) {
                contentImage.append('<li><a href="' + arr[i] + '" target="_blank"><img src="' + arr[i] + '"/></a></li>');
            });
        }).trigger('change');
    }

};

},{"./lib/product-preview":3,"jquery-validate":13}],"purchase-contact":[function(require,module,exports){
'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-purchase-contact').click(function () {
            var $this = $(this);
            $('#confirm-remove-purchase-contact').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-purchase-contact').validate();
    },

    editFun: function editFun() {
        $('#form-edit-purchase-contact').validate();
    },

    uploadTitleImg: function uploadTitleImg() {

        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');

        formUploadImg.submit(function () {
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success: function success(data) {
                    uploadLoading.removeClass('on');
                    if (data.success) {
                        window.parent.uploadImgResponse(data.url);
                    } else {
                        window.parent.uploadImgError(data.error);
                    }
                }
            });
            return false;
        });

        iconImage.change(function () {
            formUploadImg.submit();
        });
    },

    uploadImgResponse: function uploadImgResponse(url) {
        $('#image-url').val(url);
    },
    uploadImgError: function uploadImgError(error) {
        var modal = $('#alert-image-upload-error');
        modal.find('.am-modal-bd').text(error);
        modal.modal();
    }
};

},{"jquery-form":9,"jquery-validate":13}],"purchase":[function(require,module,exports){
'use strict';

require('jquery-validate');
var Bloodhound = require('bloodhound');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-purchase').click(function () {

            var $this = $(this);

            $('#confirm-remove-purchase').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });

        $('.ckb-shipping-status').click(function () {
            var _this = this;

            $.ajax({
                url: '/purchase/shipping-status',
                type: 'get',
                data: {
                    purchaseId: $(this).attr('data-id'),
                    status: this.checked ? 'arrived' : 'notarrived'
                }
            }).done(function (data) {
                var tr = $(_this).parents('tr');
                if (_this.checked) {
                    tr.addClass('off');
                } else {
                    tr.removeClass('off');
                }
            });
        });

        $('#select-site-type').change(function () {
            if (this.value) {
                return location.href = '/purchase?site-type=' + this.value;
            }
            location.href = '/purchase';
        });
    },
    addFun: function addFun() {
        $('#form-add-purchase').validate();
        this.purchaseTypeAhead();
    },
    editFun: function editFun() {
        $('#form-add-purchase').validate();
        this.purchaseTypeAhead();
    },
    purchaseTypeAhead: function purchaseTypeAhead() {

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
                    url: '/purchase/add/website-desc',
                    prepare: function prepare(query, settings) {
                        settings.data = {
                            name: purchaseDescription.val(),
                            'site-type': siteType
                        };
                        return settings;
                    }
                }
            })
        });

        purchaseDescription.on({
            'typeahead:select': function typeaheadSelect(event, item) {
                purchaseWebsite.val(item.website ? item.website : item.shop);
                purchaseEmail.val(item.email);
                purchaseImage.val(item.image);
                purchaseImageView.find('img').attr('src', item.image);
            }
        });
    }
};

},{"bloodhound":5,"jquery-validate":13}],"record-category":[function(require,module,exports){
'use strict';

require('jquery-validate');

module.exports = {

    indexFun: function indexFun() {

        $('.remove-record-category').click(function () {
            var $this = $(this);
            $('#confirm-remove-record-category').modal({
                relatedTarget: this,
                onConfirm: function onConfirm() {

                    $.ajax({
                        url: '/record-category/remove/' + $this.attr('data-id'),
                        success: function success(data) {

                            if (data.success) {
                                return location.href = '/record-category';
                            }

                            var alertModal = $('#alert-remove-record-category');
                            alertModal.find('.am-modal-bd').text(data.msg);
                            alertModal.modal({
                                relatedTarget: this
                            });
                        }
                    });
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-record-category').validate();
    },
    editFun: function editFun() {
        $('#form-edit-record-category').validate();
    }

};

},{"jquery-validate":13}],"record":[function(require,module,exports){
'use strict';

require('jquery-validate');
require('jquery-form');

module.exports = {
    indexFun: function indexFun() {

        $('.select-record-category').change(function () {
            if (this.value > 0) {
                location.href = '/record?recordCategoryId=' + this.value;
            }
        });

        $('.remove-record').click(function () {
            var $this = $(this);
            $('#confirm-remove-record').modal({
                relatedTarget: this,
                onConfirm: function onConfirm() {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-record').validate();
    },
    editFun: function editFun() {
        $('#form-edit-record').validate();
    },
    uploadImg: function uploadImg() {

        var formUploadImg = $('#form-upload-img');
        var iconImage = $('#icon-image');
        var uploadLoading = $('.upload-loading');

        formUploadImg.submit(function () {
            uploadLoading.addClass('on');
            $(this).ajaxSubmit({
                success: function success(data) {
                    uploadLoading.removeClass('on');
                    if (data.success) {
                        window.parent.uploadImgResponse(data.url);
                    } else {
                        window.parent.uploadImgError(data.error);
                    }
                }
            });
            return false;
        });

        iconImage.change(function () {
            formUploadImg.submit();
        });
    },
    uploadImgResponse: function uploadImgResponse(url) {
        $('#image').val(url);
        $('.show-image').html('<img src="' + url + '"/>');
    },
    uploadImgError: function uploadImgError(error) {
        var modal = $('#alert-image-upload-error');
        modal.find('.am-modal-bd').text(error);
        modal.modal();
    }
};

},{"jquery-form":9,"jquery-validate":13}],"remark":[function(require,module,exports){
'use strict';

require('jquery-validate');

module.exports = {

    indexFun: function indexFun() {

        $('.ckb-is-complete').click(function () {
            var $this = $(this);
            $.ajax({
                url: '/remark/complete',
                data: {
                    remarkId: $this.attr('data-id'),
                    checked: $this.prop('checked')
                },
                success: function success(data) {
                    console.info(data);
                }
            });
        });

        $('.remove-remark').click(function () {
            var $this = $(this);
            $('#confirm-remove-remark').modal({
                relatedTarget: this,
                onConfirm: function onConfirm(options) {
                    location.href = $this.attr('href');
                },
                onCancel: function onCancel() {
                    return false;
                }
            });
            return false;
        });
    },
    addFun: function addFun() {
        $('#form-add-remark').validate();
    },
    editFun: function editFun() {
        $('#form-edit-remark').validate();
    }

};

},{"jquery-validate":13}],"sign":[function(require,module,exports){
'use strict';

require('jquery-validate');

module.exports = {

    loginFun: function loginFun() {
        $('#form-login').validate();
    },

    registerFun: function registerFun() {
        $('#form-register').validate();
    }

};

},{"jquery-validate":13}],"taobao-mail-create":[function(require,module,exports){
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
    var finalDataArray = []; //最终生成的内容

    //初始加载数据
    $.ajax({
        url: '/mail/taobao-mail-create/get-content',
        success: function success(_data) {
            createInitData(_data.content);
            btnCreate.removeAttr('disabled');
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
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

        $('.copy-title').show().zclip({
            path: '/assets/swf/ZeroClipboard.swf',
            copy: function copy() {
                return $('.mail-title').text();
            },
            afterCopy: function afterCopy() {
                copyInfo.show().text('复制邮件标题成功!');
            }
        });

        $('.copy-wangwang').show().zclip({
            path: '/assets/swf/ZeroClipboard.swf',
            copy: function copy() {
                return '亲,商品已发送至您此邮箱,请注意查收! ps:如果您是手机端阅读(尤其是iPhone/iPad),请花30秒时间点击下邮件里的在手机中阅读的链接说明,希望本店商品能对亲有帮助哦,并祝亲能收获满满,心想事成,加油!!';
            },
            afterCopy: function afterCopy() {
                copyInfo.show().text('复制旺旺回复内容成功!');
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        });
        $('.copy-haoping').show().zclip({
            path: '/assets/swf/ZeroClipboard.swf',
            copy: function copy() {
                return '亲,我们已收到您的好评,感谢您对本店的支持,本店会一如既往地为您服务并会持续上架您喜欢的商品,请继续关注我们哦!以下是店主作为答谢赠送您的"天使音乐":[身体工房馆-天使疗愈花园-召唤天使] 下载链接: http://pan.baidu.com/s/1i31U9VJ 密码: 6882';
            },
            afterCopy: function afterCopy() {
                copyInfo.show().text('复制好评回复内容成功!');
            }
        });
    }
};

},{"flash-detect":6,"swfobject":17}]},{},[2]);
