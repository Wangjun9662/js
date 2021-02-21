/**
 * 重点：正则表达式，要么匹配字符，要么匹配位置
 *
 * #### 字符匹配
 *
 * 两种模糊匹配：
 *
 * 1、字符组(匹配单个字符)
 * [a-zA-Z0-9]
 * [^abc]
 * \d \D
 * \w \W
 * \s \S
 * . 不包括换行符、回车符等的任意字符
 *
 *
 * 2、量词（匹配多个字符）
 * *
 * ?
 * +
 * {m}
 * {m,n}
 *
 * 匹配多个字符时，默认使用贪婪匹配，在量词后面加个?表示要惰性匹配
 *
 * 3、多分支
 * [a|b]
 */

// 匹配任意字符
const reg1 = /[\s\S]/;
const reg2 = /[\d\D]/;
const reg3 = /[\w\W]/;
const reg4 = /[^]/;

// 不匹配任何字符
const reg5 = /.^/;

/**
 * #### 匹配位置
 *
 * 位置可以理解为空字符串
 *
 * ^ 多行的时候，匹配的是每行的开头
 * $ 多行的时候，匹配的是每行的结尾
 * \b 单词边界，\w和\W之间的位置，也包括\w和^，\w和$之间的位置
 * \B
 * (?=p) p前面的位置
 * (?!p) 非p前面的位置
 *
 *
 *
 */

// 位置是空字符串
const reg6 = /(?=he)^^he(?=\w)llo$\b\b$/;
console.log(reg6.test('hello')); // true

// 千分位逗号
// 思路：
// 1、弄出最后一个逗号 (?=\d{3}$)
// 2、弄出所有逗号 (?=(\d{3})+$)
// 3、排除开头的逗号
// const reg7 = /(?!^)(?=(\d{3})+$)/g;
// or
const reg7 = /\B(?=(\d{3})+$)/g;
const str = '122345678943433';
console.log(str.replace(reg7, ','));

// 一串密码由6-12位数字、大小写字母组成，且必须包含数字
// 思路
// 1、由数字和字符组成的密码：^[a-zA-Z0-9]{6,12}$
// 2、必须包含数字：(?=.*[0-9])^[a-zA-Z0-9]{6,12}$
const reg8 = /(?=.*[0-9])^[a-zA-Z0-9]{6,12}$/;
console.log(reg8.test('abddddddd'), reg8.test('abdd45dddd'));

/**
 *
 * #### 引用分组
 *
 * 1、api中引用
 * 2、正则里面反向引用  \1、\2、\3......，括号嵌套的情况下以左括号为准
 * 3、(?:p)非捕获分组
 */

// trim模拟
const reg9 = /^\s+|\s+$/g;

// 将每个单词的首字母变为大写
const sentence = 'my name is jason';
const reg10 = /(?!$)\b\w/g;
const reg11 = /(?:^|\s)\w/g;
const sentence1 = sentence.toLowerCase().replace(reg11, (_) => _.toUpperCase());
console.log(sentence1);

// 驼峰化

const reg12 = /[-_\s]+(.)?/g;
const camel = '- moz-transform-';
console.log(
    camel.replace(reg12, (_, $0) => {
        return $0 ? $0.toUpperCase() : '';
    })
);

// 匹配成对标签
const reg13 = /<([^>]+)>[^]*<\/\1>/;
const html = '<div>hello</div>';
console.log(html.match(reg13), reg13.test(html));

/**
 * #### api
 *
 * 1、正则api
 * a、exec
 * b、test
 *
 * 2、字符串api
 * a、split
 * b、search
 * c、match
 * d、replace
 *
 *
 * 注意点：
 * 1、match和search传字符串的时候，会把字符串转为正则
 * 2、match返回结果的格式，与正则对象是否有修饰符g有关。
 *      没有g，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是输入的目标字符串。
 *      有g，返回的是所有匹配的内容。
 *      当没有匹配时，不管有无g，都返回null。
 * 3、split方法看起来不起眼，但要注意的地方有两个的。
 *      第一，它可以有第二个参数，表示结果数组的最大长度
 *      第二，正则使用分组时，结果数组中是包含分隔符的
 */

const date = '2020.02.22';
console.log(date.search('.')); // 0
console.log(date.search('\\.')); // 4
