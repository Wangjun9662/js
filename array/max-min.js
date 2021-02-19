// 求数组中最大的值

// Math.max
function max(arr) {
    // return Math.max(...arr);
    return Math.max.apply(null, arr);
}

// reduce
function max1(arr) {
    return arr.reduce((acc, cur) => Math.max(acc, cur));
}

const arr = [1, 2, 3, 6, 9];
console.log(max(arr), max1(arr));
