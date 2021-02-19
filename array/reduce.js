Array.prototype.myReduce = function (reducer, initialValue) {
    let k = 0;
    let value;
    const len = this.length;
    if (!initialValue) {
        // 没有传initialValue，如果数组为空，则会报错TypeError
        if (k >= len) {
            throw new TypeError('Reduce of empty arrray with no initial value');
        }
        // 没有传initialValue，第一个参数acc就是第一项，currentValue从第2项开始
        value = this[k++];
    } else {
        // 传了initialValue，第一个参数acc就是initialValue，currentValue从第1项开始
        value = initialValue;
    }
    while (k < len) {
        value = reducer(value, this[k], k, this);
        k++;
    }
    return value;
};

const arr = [1, 2, 4, 5, 6];
console.log(arr.myReduce((acc, cur) => acc + cur));

// reduce的一些使用场景
