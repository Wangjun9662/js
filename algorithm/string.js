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
