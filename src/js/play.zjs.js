/**
 * 索取HTML url地址參數 不包含中文字符參數
 * @param {參數名稱} name
 */

const gettype= function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}
/**
 * 去掉字符串首尾空格
 * @param str {字符串}
 * @returns {string|void | string | never}
 */
const trim= function (str) {
    if (String.prototype.trim) {
        return str == null ? "" : String.prototype.trim.call(str);
    } else {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}
const cookie = {
    'set': function(name, value, days) {
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString();
    },
    'get': function(name) {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if (arr != null) return unescape(arr[2]);
    },
    'put': function(urls) {
        var cookie = urls.replace(/[^a-z]+/ig, '');
        var cookie = cookie.substring(cookie.length - 32);
        return cookie;
    }
}
const jsempty =function (obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

export {
    gettype,
    trim,
    cookie,
    jsempty
}
