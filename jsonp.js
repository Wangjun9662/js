/**
 * JSONP handler
 *
 * options:
 *      prefix {String} default '__jp'
 *      name {String} default '__jp' + count++
 *      param {String} default callback
 *      timeout {Number} default 60000
 *
 * @param {String} url
 * @param {Object | Function} opts optional opts/callback
 * @param {Function} fn optional callback
 */
function originJsonp(url, opts, fn) {
    let count = 0;
    const noop = function () {};
    // 第二个参数传的fn
    if (typeof opts === 'function') {
        fn = opts;
        opts = {};
    }

    if (!opts) {
        opts = {};
    }

    const prefix = opts.prefix || '__jp';
    const id = opts.name || `${prefix}${count++}`;

    const param = opts.param || 'callback';
    const timeout = opts.timeout || 60000;
    const target = document.getElementsByTagName('script')[0] || document.head;
    let timer;
    let script;

    // 超时
    if (timeout) {
        timer = setTimeout(() => {
            cleanUp();
            if (fn) {
                fn(null, new Error('timeout'));
            }
        }, timeout);
    }

    // 清除script标签、清除回调函数、清除计时器
    function cleanUp() {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
        window[id] = noop;
        if (timer) {
            clearTimeout(timer);
        }
    }

    // 取消
    function cancel() {
        if (window[id]) {
            cleanUp();
        }
    }

    // 处理qs
    url +=
        (~url.indexOf('?') ? '&' : '?') + param + '=' + encodeURIComponent(id);
    url.replace('?&', '?');

    // 注册回调函数
    window[id] = function (data) {
        cleanUp();
        if (fn) {
            fn(null, data);
        }
    };

    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel;
}

/**
 * JSONP promisefy
 */
export default function jsonp(url, params, opts) {
    url += ~url.indexOf('?') ? '&' : '?' + param(params);
    url.replace('?&', '?');
    return new Promise((resolve, reject) => {
        originJsonp(url, opts, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

/**
 * 对象转为params参数
 */

function param(data) {
    let url = '';
    for (const k in data) {
        const value = data[k] === undefined ? '' : data[k];
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
}
