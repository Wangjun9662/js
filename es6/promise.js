// promise及其相关静态和实例方法的实现
function MyPromise(excutor) {
    const self = this;
    self.result = undefined;
    self.reason = undefined;
    self.status = 'pending';
    self.onResolvesCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(result) {
        if (self.status === 'pending') {
            self.result = result;
            self.status = 'fullfilled';
            this.onResolvesCallbacks.forEach((fn) => fn());
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            this.onRejectedCallbacks.forEach((fn) => fn());
        }
    }

    try {
        excutor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
    const self = this;
    let promise2;
    promise2 = new MyPromise((resolve, reject) => {
        if (self.status === 'fullfilled') {
            setTimeout(() => {
                try {
                    const x = onFullfilled(self.result);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }, 0);
        }

        if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    const x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }, 0);
        }

        if (self.status === 'pending') {
            this.onResolvesCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const x = onFullfilled(self.result);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            });
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            });
        }
    });
    return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called;
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(
                    x,
                    (y) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise2, y, resole, reject);
                    },
                    (err) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(err);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (err) {
            if (called) {
                return;
            }
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

// Promise.all
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        const ret = [];
        let count = 0;
        const len = promises.length;
        for (let i = 0; i < len; i++) {
            promises[i].then((data) => {
                ret[i].push(data);
                if (++count === len) {
                    resolve(ret);
                }
            }, reject);
        }
    });
};
// Promise.race
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.len; i++) {
            promises[i].then(resolve, reject);
        }
    });
};
// Promise.prototype.catch
MyPromise.prototype.catch = function (onReject) {
    return this.then(null, onReject);
};
// Promise.reject
MyPromise.reject = function (data) {
    return new Promise((resolve, reject) => {
        reject(data);
    });
};
// Promise.resolve
Promise.resolve = function (data) {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

// Promise进行并发控制，asyncPool
function asyncPool(limit, promises) {
    // 保留所有的promises
    const ret = [];
    // 正在执行中的请求
    const excuting = [];
    let i = 0;
    function run() {
        // promises为空数组的情况
        if (i === promises.length) {
            return Promise.resolve();
        }
        // 每次取出一个
        const item = promises[i++];
        // 包装成promise
        const p = Promise.resolve().then(() => item());
        ret.push(p);

        let r = Promise.resolve();

        if (limit <= promises.length) {
            // 执行完后就删除
            const e = p.then(() => excuting.splice(excuting.indexOf(e), 1));
            excuting.push(e);

            if (excuting.length >= limit) {
                r = Promise.race(excuting);
            }
        }

        return r.then(() => run());
    }

    return run().then(() => Promise.all(ret));
}



// 实现一个函数，并发执行异步任务，失败的任务也不影响执行
function allHandle(promisesArr) {
    const res = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promisesArr.length; i++) {
            promisesArr[i].then(data => {
                res[i] = data;
                if (++i === promisesArr.length) {
                    resolve(res);
                }
            }, e => {
                    res[i] = e;
                    if (++i === promisesArr.length) {
                        resolve(res);
                    }
            });
        }
    });
}

const p1 = new Promise((resolve, reject) => {
    resolve(100);
});

const p2 = new Promise((resolve, reject) => {
    resolve(200);
});

const p3 = new Promise((resolve, reject) => {
    throw new Error('error');
});

allHandle([p1, p2, p3]).then(data => console.log(data[0], data[1], data[2]));