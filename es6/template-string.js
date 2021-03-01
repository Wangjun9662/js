// 模板字符串

// 标签模板

const str = `
    <div>
        <p>hello</p>
        <p>world</p>
    </div>
`;

// 输出正确格式的代码
function tripIndent(literals, ...values) {
    let ret = literals.reduce((acc, cur, idx) => {
        const temp = values[idx - 1];
        return acc + temp + cur;
    });
    const spaceArr = ret.match(/^[^\S\n]+/gm);

    const min = Math.min(...spaceArr.map((s) => s.length));

    const reg = new RegExp(`^[^\\S\\n]{${min}}`, 'gm');

    ret = ret.replace(reg, '').trim();
    return ret;
}

console.log(str);
console.log(tripIndent`${str}`);
