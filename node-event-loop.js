const fs = require('fs');
const t0 = +new Date();

// timeout最少4ms，如果进入事件循环的时间小于4ms，则先执行setImmediate，如果是大于4ms，先执行setTimeout。
// 如果timeout设置为0或者不设置，则默认为1ms，所以，当设置为0时，settimeout一定先执行。因为进入事件循环的时间不可能为1ms。
setTimeout(() => {
    console.log('time: ', +new Date() - t0);
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});

const p = require('path').resolve(__dirname, './new.js');
fs.readFile(p, (err, data) => {
    if (err) {
        throw new Error(err);
    }

    console.log('readfile');
});

Promise.resolve().then(() => {
    console.log('then');
});

console.log('2')