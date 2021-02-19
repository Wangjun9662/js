// 数组扁平化

// 循环 + 递归
function flatten(source) {
    return source.reduce((acc, cur) => {
        return Array.isArray(cur) ? acc.concat(flatten(cur)) : acc.concat(cur);
        // concat会返回一个新的数组，不会改变原有数组
        // return acc;
    }, []);
}

const arr = [1, 2, [3, 4, 5, [10, 11]], [6, 7, 8]];
console.log(flatten(arr));
