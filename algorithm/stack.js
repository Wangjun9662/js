// 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
function isValid(str) {
    if (!str) {
        return true;
    }
    const brackets = {
        '(': ')',
        '[': ']',
        '{': '}',
    };

    const stack = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
            stack.push(brackets[str[i]]);
        } else {
            if (!stack.length || stack.pop() !== str[i]) {
                return false;
            }
        }
    }

    return !stack.length;
}

console.log(isValid('(){}[]'));

// 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。\
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
function dailyTemperature(arr) {
    const len = arr.length;
    const stack = [];
    const res = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            const top = stack.pop();

            res[top] = i - top;
        }
        stack.push(i);
    }
    return res;
}
console.log(dailyTemperature(temperatures));

// 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
// push(x) pop() top() getMin()
class Stack {
    constructor() {
        this.stack = [];
        // 额外用一个栈来存储最小值，递减栈，栈顶就是最小值
        this._stack2 = [];
    }

    pop() {
        const pop = this.stack.pop();
        if (pop === this._stack2.pop()) {
            this._stack2.pop();
        }
        return pop;
    }

    push(x) {
        this.stack.push(x);

        if (!this._stack2.length || x <= this._stack2[this._stack2.length - 1]) {
            this._stack2.push(x);
        }
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this._stack2[this._stack2.length - 1];
    }
}
const myStack = new Stack()
myStack.push(1)
myStack.push(4)
myStack.push(-1)
myStack.push(-4)
myStack.push(10)
// console.log(myStack.pop())
console.log(myStack.top())
console.log(myStack.getMin())

//