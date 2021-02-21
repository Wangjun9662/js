// 类型判断工具方法

function type(source) {
    // undefined 和 null直接返回字符串
    if (source == null) {
        return '' + source;
    }

    const reg = /^\[\w+\s(\w+)\]$/;
    return Object.prototype.toString.call(source).replace(reg, (_, $0) => {
        return $0.charAt(0).toLowerCase() + $0.substring(1);
    });
}

// test
console.log(type([]));
console.log(type(new Date()));
console.log(type(new RegExp()));
console.log(type('jason'));
console.log(type(1));
console.log(type(true));
console.log(type(null));
console.log(type(undefined));
console.log(type({}));
console.log(type(Symbol('jason')));

// 判断是不是window对象
function isWindow(obj) {
    return !!(obj && obj.isWindow === obj);
}

// 判断是不是一个DOM元素
function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
}

// 判断是不是一个空对象
function isEmptyObject(obj) {
    for (const key in obj) {
        return false;
    }
    return true;
}

// 判断是不是一个纯粹的对象（对象字面量，Object.create(null)，new Object()3种方式生成的对象)
function isPlainObject(obj) {
    const toString = {}.toString;
    if (!obj || toString.call(obj) !== '[object Object]') {
        return false;
    }

    // Object.create(null)
    const proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return true;
    }

    // new Object()
    const hasOwn = {}.hasOwnProperty;
    const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
    return (
        typeof Ctor === 'function' &&
        hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
    );
}

console.log(isPlainObject({}));
console.log(isPlainObject(Object.create(null)));
console.log(isPlainObject(new Object()));
