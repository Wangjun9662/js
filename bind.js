Function.prototype.myBind = function (context, ...args1) {
    // 防止Function.prototype.myBind()直接调用
    if (this === Function.prototype) {
        throw new Error('Error');
    }
    const self = this;
    return function F(...args2) {
        if (this instanceof F) {
            // 如果是构造函数调用，则用new调用当前函数
            // 原生bind中，当使用new调用时，绑定的context会失效，new出来的实例的this是绑定函数的this
            return new self(...args1, ...args2);
        } else {
            return self.apply(context, args1.concat(args2));
        }
    };
};

const value = 1;
const obj = {
    value: 2,
};

function foo() {
    console.log(this.value);
}

const bar = foo.myBind(obj);
const f = new bar();
