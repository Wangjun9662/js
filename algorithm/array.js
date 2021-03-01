// 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

const nums = [1, 3, 7, 9, 5, 6];
const target = 6;

/**
 * 解法一：双重循环
 */
let res = [];
for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] + nums[i] === target) {
            res = [i, j];
            break;
        }
    }
}
console.log(res);

/**
 * 解法二：差值法
 *
 * 几乎所有的求和问题都可以转换为求差 问题
 */
const map = new Map();
let ret = [];
for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (map.has(target - val)) {
        ret = [map.get(target - val), i];
        break;
    }
    map.set(val, i);
}
console.log(ret);

// 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
const nums1 = [9, 12, 16, 19, 25, 27, 29];
const nums2 = [3, 7, 11, 14, 22];
/**
 * 双指针法
 * 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序。否则双指针根本无法帮助我们缩小定位的范围，压根没有意义。
 */
function merge(nums1, m, nums2, n) {
    let i = m - 1,
        j = n - 1,
        k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
    return nums1;
}
console.log(merge(nums1, 7, nums2, 5));

// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
const nums3 = [-1, 0, 1, 2, -1, -4];
// 结果：[ [-1, 0, 1], [-1, -1, 2] ]
function threeSum(arr) {
    // 排序
    arr = arr.sort((a, b) => a - b);
    const res = [];
    const len = arr.length;
    for (let i = 0; i < len - 2; i++) {
        const cur = arr[i];
        // 去除重复的
        if (i > 0 && cur === arr[i - 1]) {
            continue;
        }
        let k = i + 1;
        let j = len - 1;
        while (k < j) {
            if (arr[k] + arr[j] + cur > 0) {
                j--;

                // 处理重复的
                while (k < j && arr[j] === arr[j + 1]) {
                    j--;
                }
            } else if (arr[k] + arr[j] + cur < 0) {
                k++;

                // 处理重复的
                while (k < j && arr[k] === arr[k - 1]) {
                    k++;
                }
            } else {
                res.push([arr[i], arr[k], arr[j]]);
                j--;
                k++;
                // 处理重复的
                while (k < j && arr[j] === arr[j + 1]) {
                    j--;
                }
                // 处理重复的
                while (k < j && arr[k] === arr[k - 1]) {
                    k++;
                }
            }
        }
    }
    return res;
}
console.log(threeSum(nums3));
