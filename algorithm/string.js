// 反转字符串
const str = 'hello';
console.log(str.split('').reverse().join(''));

// 判断字符串是否是回文字符串
const str2 = 'hellolleh';

/**
 * 1、反转后是否相等
 */
function isPalindrome1(str) {
    return str === str.split('').reverse().join('');
}

/**
 * 2、双指针
 */
function isPalindrome2(str) {
    let i = 0;
    let j = str.length - 1;
    while (i < j) {
        if (str[i] !== str[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}

/**
 * 3、利用对称性
 */
function isPalindrome3(str) {
    const len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - i - 1]) {
            return false;
        }
    }
    return true;
}
console.log(isPalindrome1(str2), isPalindrome2(str2), isPalindrome3(str2));

// 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
const s = 'hellolleh';
function isPalindrome4(str) {
    const len = str.length;
    let i = 0;
    let j = len - 1;
    while (i < j) {
        if (str[i] !== str[j]) {
            const left = str.substring(i + 1, j + 1);
            const right = str.substring(i, j);
            return isPalindrome1(left) || isPalindrome1(right);
        }
        i++;
        j--;
    }
    return true;
}
console.log(isPalindrome4(s));

/**
 * 真题描述： 设计一个支持以下两种操作的数据结构：
 * void addWord(word)
 * bool search(word)
 * search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
 * . 可以表示任何一个字母。
 *
 * 示例：
 * addWord("bad")
 * addWord("dad")
 * addWord("mad")
 * search("pad") -> false
 * search("bad") -> true
 * search(".ad") -> true
 * search("b..") -> true
 * 说明:
 * 你可以假设所有单词都是由小写字母 a-z 组成的。
 */

class WordsDictionary {
    constructor() {
        this.words = {};
    }

    addWord(word) {
        // 以字符串的长度为key存储字符串
        const len = word.length;
        if (this.words[len]) {
            this.words[len].push(word);
        } else {
            this.words[len] = [word];
        }
    }

    search(word) {
        const len = word.length;
        if (!this.words[len]) {
            return false;
        }

        if (!word.includes('.')) {
            return this.words[len].includes(word);
        } else {
            const reg = new RegExp(word);
            return this.words[len].some(item => reg.test(item));
        }
    }
}
const wordDic = new WordsDictionary();
wordDic.addWord('bad');
wordDic.addWord('dad');
wordDic.addWord('pad');
console.log(wordDic.search('.ad'));

// 真题描述：请你来实现一个 atoi 函数，使其能将字符串转换成整数。
function atoi(str) {
    const MAX = Math.pow(2, 31) - 1;
    const MIN = -Math.pow(2, 31);
    const reg = /\s*([+-]?[0-9]*).*/;
    let targetNum = 0;
    const groups = str.match(reg);

    if (groups) {
        console.log(groups);
        const isNaN = Number.isNaN(+groups[1]);
        if (!isNaN) {
            targetNum = +groups[1];
        }
    }

    if (targetNum > MAX) {
        targetNum = MAX;
    } else if (targetNum < MIN) {
        targetNum = MIN;
    }
    return targetNum;
}
console.log(atoi('   +23482s ss'));
