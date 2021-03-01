// 自动执行generator的函数

const { resolve } = require('path');

// 第一版
function run(gen) {
    // 遍历器iterator对象
    const g = gen();
    function next(data) {
        const result = g.next(data);
        if (result.done) {
            return;
        }
        if (typeof result.value.then === 'function') {
            // 返回的value是promise
            result.value.then((data) => {
                next(data);
            });
        } else {
            // 返回的是回调函数
            result.value(next);
        }
    }
    next();
}

// 第2版，错误处理和获取run函数的返回值，返回一个promise对象
function run(gen) {
    let g;
    if (typeof gen === 'function') {
        // 遍历器iterator对象
        g = gen();
    }

    if (!g || typeof g.next !== 'function') {
        return resolve(gen);
    }

    return new Promise((resolve, reject) => {
        function next(data) {
            let result;
            try {
                result = g.next(data);
            } catch (e) {
                reject(e);
            }
            if (result.done) {
                return resolve(result.value);
            }
            const value = toPromise(result.value);
            value
                .then((data) => {
                    next(data);
                })
                .catch((err) => {
                    reject(err);
                });
        }
        next();
    });
}

function isPromise(obj) {
    return typeof obj.then === 'function';
}

function toPromise(obj) {
    if (isPromise(obj)) {
        return obj;
    }
    if (typeof obj === 'function') {
        return new Promise((resolve, reject) => {
            obj(function (err, data) {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }

    return obj;
}
