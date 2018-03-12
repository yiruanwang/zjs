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
       * 描述：判断对象是否为数组
          用法：.isArray(obj)
          参数： obj (类型：Object)
          返回值：Boolean
          示例：
          $api.isArray([1,2,3]);  // => true
          $api.isArray('123')  // => false
       * @param {*} obj 
       */
        zjs.isArray = function (obj) {
            if (Array.isArray) {
                return Array.isArray(obj);
            } else {
                return obj instanceof Array;
            }
        };
        /**
         * Zjs dom end
         * Zjs URLSParams  start
         *             console.log(
                        "______________________________URLSearchParams start__________________________________"
                        );

                        var params = new this.Zjs.URLSParams();
                        params.append("appskey", "yz.config.appskey");
                        params.append("appid", "yz.config.appid");
                        params.append("appkey", "yz.config.appkey");
                        console.log(params.toString());
                        var paramsString = "q=URLUtils.searchParams&topic=api&name=中文";
                        console.log("paramsString:" + paramsString);
                        var searchParams = new this.Zjs.URLSParams(paramsString);
                        console.log("searchParams:" + searchParams);
                        searchParams.has("topic") === true; // true
                        console.log('searchParams.has("topic") :' + searchParams.has("topic"));
                        searchParams.get("topic") === "api"; // true
                        console.log('searchParams.get("topic"):' + searchParams.get("topic"));
                        searchParams.getAll("topic"); // ["api"]
                        console.log('searchParams.getAll("topic"):' + searchParams.getAll("topic"));
                        searchParams.get("foo") === ""; // true
                        console.log('searchParams.get("foo"):' + searchParams.get("foo"));
                        searchParams.append("topic", "webdev");
                        console.log(
                        'searchParams.append("topic", "webdev"):' +
                            searchParams.append("topic", "webdev")
                        );
                        searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
                        console.log("searchParams.toString():" + searchParams.toString());
                        searchParams.set("topic", "More webdev");
                        console.log(
                        'searchParams.set("topic", "More webdev"):' +
                            searchParams.set("topic", "More webdev")
                        );
                        searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
                        console.log("searchParams.toString():" + searchParams.toString());
                        searchParams.delete("topic");
                        console.log('searchParams.delete("topic"):' + searchParams.delete("topic"));
                        searchParams.toString(); // "q=URLUtils.searchParams"
                        console.log("searchParams.toString():" + searchParams.toString());
                        searchParams.get("name");
                        console.log('searchParams.get("name"):' + searchParams.get("name"));
                        var foo = searchParams.get("foo") || "yzjs";//如果没有参数就用预留的yzjs
                        console.log("foo:" + foo);
                        console.log(
                        "______________________________URLSearchParams end__________________________________"
                        );
         * url 参数搜索
         * @param {*} params 
         */
        zjs.URLSParams = function (params) {
            this._keys = {};
            if (params) {
                var pairs = params.toString().split("&");
                for (var x = 0; x < pairs.length; x++) {
                    var tmp = pairs[x].split("=");
                    this.append(decodeURIComponent(tmp[0]), decodeURIComponent(tmp.slice(1).join("=")));
                }
            }
        };
        zjs.URLSParams.prototype = {
            append: function (key, value) {
                if (this.has(key)) {
                    this._keys[key].push(value);
                } else {
                    this._keys[key] = [value];
                }
            },
            delete: function (key) {
                if (this.has(key)) {
                    delete this._keys[key];
                }
            },
            get: function (key) {
                if (this.has(key) && this._keys[key].length) {
                    return this._keys[key][0];
                }
                return null;
            },
            getAll: function (key) {
                if (this.has(key)) {
                    return this._keys[key];
                }
                return [];
            },
            has: function (key) {
                return key in this._keys;
            },
            set: function (key, value) {
                this._keys[key] = [value];
            },
            toString: function () {
                var tmp = [];
                for (var key in this._keys) {
                    for (var i = 0; i < this._keys[key].length; i++) {
                        tmp.push(encodeURIComponent(key) + "=" + encodeURIComponent(this._keys[key][i]));
                    }
                }
                return tmp.join("&");
            }

        }
		/**
         * Zjs URLSParams  end
		 * 逻辑方法开始
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