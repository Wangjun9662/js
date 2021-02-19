// underscore
function unique(arr, isSorted, iteratee) {
    const res = [];
    let seen = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        const value = arr[i];
        const computed = iteratee ? iteratee(value, i, arr) : value;
        // 如果是排序好的数组，直接使用相邻两项对比的方法，一次循环就可以，性能较优
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value);
                seen = value;
            }
        } else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        } else {
            // indexOf底层是通过===判断两个值是否相等，所以对于NaN、{}是没法去重的
            if (res.indexOf(value) === -1) {
                res.push(value);
            }
        }
    }
    return res;
}

// filter + indexOf
function unique2(arr) {
    return arr.filter((item, index, arr) => {
        // arr.indexOf(NaN) === -1，所以去重后的数组会过滤掉NaN
        return arr.indexOf(item) === index;
    });
}

// set
// 可以去重NaN，但是不能去重对象
const unique3 = (arr) => [...new Set(arr)];

// Object
function unique4(arr) {
    const obj = {};
    return arr.filter((item) => {
        // 因为对象的属性只能是字符串，所以1和'1'是一样的，这样会有问题，所以拼接一下
        // 但是JSON.stringify()会将正则转换为‘{}’，这样就会和{}一起被去重，所以将typeof换为更加精确的类型判断
        // const key = typeof item + JSON.stringify(item);
        const key = Object.prototype.toString.call(item) + JSON.stringify(item);
        console.log(key);
        return obj.hasOwnProperty(key) ? false : (obj[key] = true);
    });
}

const arr = [1, 1, 2, 9, 5, 6, 6, 3, 3];
const arr2 = [1, 1, 2, 2, 3, 3, 4, 5, 6];
const arr3 = [1, 'a', 'A', 'B', 'b', 4, 4, 5, 6, 7, 7];
const arr4 = [
    NaN,
    NaN,
    1,
    1,
    3,
    4,
    undefined,
    undefined,
    null,
    null,
    {},
    {},
    /a/,
    /a/,
];
console.log(
    unique(arr),
    unique(arr2, true),
    unique(arr3, false, (item) => {
        return typeof item === 'string' ? item.toLowerCase() : item;
    }),
    unique(arr4)
);
console.log(unique2(arr), unique2(arr2), unique2(arr4));
console.log(unique3(arr), unique3(arr4));
console.log(unique4(arr4));
