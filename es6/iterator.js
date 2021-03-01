// iterator
// 模拟实现iterator对象
function createIterator(source) {
    let currentIndex = 0;
    return {
        next() {
            const done = currentIndex === source.length ? true : false
            const value = !done ? source[currentIndex++] : undefined
            return {
                value,
                done
            }
        }
    }
}

// 给obj部署Iterator对象
const obj = {
    value: 1
}
// 自定义Iterator
obj[Symbol.iterator] = function () {
    return createIterator([1, 2, 3])
}

for (const val of obj) {
    console.log(val)
}

// arguments和DOMList都已经部署了Iterator接口，对于一般的类数组对象，可以自己部署
// 部署数组自带的Iterator
const arrayLike = {
    0: 'Jason',
    1: 'Jack',
    2: 'Jahn',
    3: 'Jackson',
    length: 4,
    [Symbol.iterator]: [][Symbol.iterator]
}

for (const val of arrayLike) {
    console.log(val)
}