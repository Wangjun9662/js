// 值传递
let myName = 'Jason';
function change(myName) {
    myName = 'Jack';
}
change(myName);
console.log(myName);

let me = {
    name: 'Jason',
};
function change(me) {
    me.name = 'Jack';
    // 对me重新赋值
    me = { name: 'John' };
}
change(me);
console.log(me);

// symbol的使用场景
// 私有属性
const privateField = Symbol();
class Person {
    constructor() {
        this[privateField] = 'Jason';
    }
    getField() {
        return this[privateField];
    }
    setField(val) {
        this[privateField] = val;
    }
}

// 实现call
Function.prototype.myCall = function (context = window, ...args) {
    // 防止Function.prototype.myCall()直接调用
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol();
    // 往执行上下文天临时添加一个属性
    context[fn] = this;
    const value = context[fn](...args);
    delete context[fn];
    return value;
};

// 实现apply
Function.prototype.myApply = function (context = window, args) {
    // 防止Function.prototype.myCall()直接调用
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol();
    // 往执行上下文天临时添加一个属性
    context[fn] = this;
    args = Array.isArray(args) ? args : [];
    const value = context[fn](...args);
    delete context[fn];
    return value;
};

function log() {
    console.log(this.name);
}

const obj = {
    name: 'jason',
};

log.myCall(obj);

// 拆箱和隐式转换
const a = {
    value: [3, 2, 1],
    valueOf() {
        return this.value.pop();
    },
};
console.log(a == 1 && a == 2 && a == 3);
