// 模拟new的实现

function objectFactory(Ctor, ...args) {
    const obj = Object.create(Ctor.prototype);
    const ret = Ctor.apply(obj, args);

    return typeof ret === 'object' ? ret || obj : obj;
}

// test
function F(name, age) {
    this.name = name;
    this.age = age;
}

const f = objectFactory(F, 'jason', 18);
console.log(f.name, f.age);
