/**
 * Zjs 
 * zjs.yiruan.wang yshxw@qq.com
 * import zjs from '@/components/javascript/zjs'
 * Vue.prototype.Zjs = zjs
 * demo: var demo = this.Zjs.demo();   console.log(demo); 
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
        var undefined, key, $, document = window.document, zjs = {};
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