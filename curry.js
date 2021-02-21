// 函数的柯里化
function curry(fn, ...args) {
    return fn.length === args.length
        ? fn(...args)
        : curry.bind(null, fn, ...args);
}

// or
function curry2(fn, ...args) {
    return fn.length === args.length
        ? fn(...args)
        : (...args2) => curry(fn, ...args, ...args2);
}

const fn = function (a, b, c, d) {
    return [a, b, c, d];
};
const curryFn = curry2(fn);
console.log(curryFn(1, 2, 3, 4), curryFn(1)(2)(3)(4));

// 不定长curry
// 实现如下
// add(1) //1
// add(1)(2) //3
// add(1)(2)(3) //6

function add(...args) {
    const sum = args.reduce((acc, cur) => acc + cur);
    const fn = (...args) => {
        const sum2 = args.reduce((acc, cur) => acc + cur);
        return add(sum + sum2);
    };
    fn.valueOf = () => sum;
    return fn;
}

console.log(+add(1, 2), +add(1)(2)(3, 4, 5), +add(1)(2)(3));
