// 用reduce实现filter
Array.prototype.myFilter = function (cb, thisArg) {
    return this.reduce((acc, cur, index, arr) => {
        // filter函数的第2个参数是执行cb时的this，不传的话是undefined
        if (cb.call(thisArg, cur, index, arr)) {
            acc.push(cur);
        }
        return acc;
    }, []);
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.myFilter((item) => item >= 3));
