// 用reduce实现map
Array.prototype.myMap = function (cb, thisArg) {
    return this.reduce((acc, cur, index, arr) => {
        // map函数的第2个参数是执行cb时的this，不传的话是undefined
        acc.push(cb.call(thisArg, cur, index, arr));
        return acc;
    }, []);
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.myMap((item) => item * 3));
