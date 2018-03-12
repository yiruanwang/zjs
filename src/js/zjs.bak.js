/**
 * Zjs 
 * zjs.yiruan.wang yshxw@qq.com
 * import zjs from 'yzjs'
 * demo: var demo = Zjs.demo();   console.log(demo); 
 */
(function (global, factory) {
    if (typeof define === 'function' && define.amd)
        define(function () {
            return factory(global)
        })
    else
        factory(global)
}(this, function (window) {
    var Zjs = (function () {
        var undefined, key, $, document = window.document, zjs = {}, z = {};
        /**
         * Z dom
         */
        /**
         * 描述：去掉字符串首尾空格
            用法：trim(str)
            参数： str (类型：String)
            返回值：去除首尾空格的字符串
            示例：Zjs.trim('   abc  123   ');  // => "abc  123"
         */
        zjs.trim = function (str) {
            if (String.prototype.trim) {
                return str == null ? "" : String.prototype.trim.call(str);
            } else {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
        };
        /**
         * 描述：去掉字符串所有空格
            用法：trimAll(str)
            参数：str (类型：String)
            返回值：去除所有空格的字符串
            示例：
            Zjs.trimAll('  abc 123  ');  // => "abc123"
         * @param {*} str 
         */
        zjs.trimAll = function (str) {
            return str.replace(/\s*/g, '');
        };
		/**
		 * 逻辑方法开始
		 */
        zjs.demo = function () {
            return "demoZjs";
        }
		/**
	 * 輸出地址包含中文等
	 * @param {Object} url
	 */
        zjs.encodeURI = function (url) {
            if (url != null) {
                return window.location.href = encodeURI(encodeURI(url));
            } else {
                return null;
            }
        };
        /**
         * 地址包含中文等
         * @param {Object} url
         */
        zjs.getencodeURI = function (url) {
            if (url != null) {
                return encodeURI(encodeURI(url));
            } else {
                return null;
            }
        };
        /**
         * 索取HTML url地址參數 包含中文字符參數
         * @param {參數名稱} name
         */
        zjs.getUrlParamZh = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(unescape(r[2]));
            } else {
                return null;
            }
        };
        /**
         * 索取HTML url地址參數 不包含中文字符參數
         * @param {參數名稱} name
         */
        zjs.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        };
		/**
		 * 逻辑方法结束
		 */
        yZjs = zjs.prototype = zjs
        return yZjs
    })()

    window.Zjs = Zjs
    window.$ === undefined && (window.$ = window.zjs = Zjs)
    return Zjs
}))

// window.Zjs = window.$ = window.zjs = require(Zjs);