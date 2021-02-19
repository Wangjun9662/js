// 打乱数组，洗牌算法
function disorder(source) {
    const len = source.length;
    let current = len - 1;
    while (current >= 0) {
        const rdn = getRandomInt(0, current);
        [source[rdn], source[current]] = [source[current], source[rdn]];
        current--;
    }
    return source;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
console.log(disorder(arr));
