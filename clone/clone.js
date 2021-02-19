function deepClone(source, hash = new WeakMap()) {
    // undefined 和 null
    if (source == null) {
        return source;
    }

    if (source instanceof Date) {
        return new Date(source);
    }

    if (source instanceof RegExp) {
        return new RegExp(source);
    }

    if (typeof source !== 'object') {
        return source;
    }
    // 通过原型链查找constructor属性，而constructor属性指向当前类本身
    const target = new source.constructor();
    if (hash.get(source)) {
        return hash.get(source);
    }
    hash.set(source, target);
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = deepClone(source[key], hash);
        }
    }

    return target;
}

const a = [1, 2, [3, 4, 5]];
const obj = {
    name: 'jason',
    age: 18,
    hobbies: {
        sports: ['basketball', 'tennis'],
        music: ['jazz', 'rock'],
    },
};

// array
const b = deepClone(a);
b[2].push(100);
console.log(a, b);

// obj
const obj2 = deepClone(obj);
obj2.hobbies.sports.push('ping-pong');
console.log(obj);
console.log(obj2);

// function
const f = function () {
    console.log(1111);
};
const farr = [1, 2, f, new Date()];
const f2 = deepClone(f);
console.log(f2(), JSON.parse(JSON.stringify(farr)));

// RegExp
const reg = new RegExp('[^123]');
const reg2 = deepClone(reg);
console.log(reg2, JSON.parse(JSON.stringify(reg)));

// Date
const d1 = new Date();
const d2 = deepClone(d1);
console.log(d2);

// 非obj
const str = 'jason';
const str2 = deepClone(str);
console.log(str2);

// 循环引用
obj.obj = obj;
