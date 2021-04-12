// 判断两个值是否相等

// +0 === -0
// 1 / +0 === Infinity
// 1 / -0 === -Infinity
// NaN !== NaN


function is(a, b) {
    if (a === b) {s
        return a !== 0 || 1 / a === 1 / b;
    }

    return a !== a && b !== b;
}