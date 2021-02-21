// 排序算法：猫婆、选择、插入、归并、快排

// 冒泡排序
// 每次比较相邻的两项，如果前面的大于后面的，则交换2者的位置
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

const arr = [5, 9, 10, 20, 1, 3, 6, 9, 14, 19, 34, 24, 2, 7];
console.log('arr', bubbleSort(arr));

// 选择排序
// 第一次选出最小的，第二次选出第二小的，一次类推
function pickSort(arr) {
    const len = arr.length;
    // 假设第一项是最小的
    let minIndex = 0;
    // 找到第二大的时候，最大的就确定了，所以可以少一次循环
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 没有找到更小的就不交换位置
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}
const arr2 = [5, 9, 10, 20, 1, 3, 6, 9, 14, 19, 34, 24, 2, 7];
console.log('arr2', pickSort(arr2));

// 插入排序
// 假设第一项是排好序的，后面每一项都往前面排好序的数组插入到正确位置
function insertSort(arr) {
    const len = arr.length;
    let j, temp;
    for (let i = 1; i < len; i++) {
        j = i;
        temp = arr[j];
        // 当前项与前面的每项比较，如果比前面的项小，则将前面的那一项挪到当前项
        while (j > 0 && arr[j - 1] > arr[j]) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}
const arr3 = [5, 9, 10, 20, 1, 3, 6, 9, 14, 19, 34, 24, 2, 7];
console.log('arr3', insertSort(arr3));

// 归并排序
// 分治思想，先分为长度为1的数组（肯定是有序的），再将这些数组合并为一个数组
function mergeSort(arr) {
    const len = arr.length;
    if (len === 1) {
        return arr;
    }
    const pivotIdx = Math.floor(len / 2);
    const left = arr.slice(0, pivotIdx);
    const right = arr.slice(pivotIdx);
    return merge(mergeSort(left), mergeSort(right));
}

/** 将2个有序数组合并为一个数组 */
function merge(left, right) {
    const res = [];
    const lenLeft = left.length;
    const lenRight = right.length;
    let i = 0,
        j = 0;
    while (i < lenLeft && j < lenRight) {
        if (left[i] < right[j]) {
            res.push(left[i++]);
        } else {
            res.push(right[j++]);
        }
    }
    while (i < lenLeft) {
        res.push(left[i++]);
    }
    while (j < lenRight) {
        res.push(right[j++]);
    }

    return res;
}

const arr4 = [5, 9, 10, 20, 1, 3, 6, 9, 14, 19, 34, 24, 2, 7];
console.log('merge', merge([1, 3, 5, 7, 9], [2, 4, 6, 8]));
console.log('arr4', mergeSort(arr4));

// 快速排序
// 也是分治思想，但不是分为长度为1的数组
function quickSort1(arr) {
    const len = arr.length;
    if (len <= 1) {
        return arr;
    }
    const left = [];
    const right = [];
    const pivotIdx = Math.floor(len / 2);
    const pivot = arr.splice(pivotIdx, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort1(left).concat([pivot], quickSort1(right));
}

// 这种实现在空间上是浪费的
const arr5 = [5, 9, 10, 20, 1, 3, 6, 9, 14, 19, 34, 20, 9, 24, 2, 7];
console.log('quickSort1', quickSort1(arr5));

// 更好的实现
function quickSort2(arr, start, end) {
    if (arr.length > 1) {
        const idx = partion(arr, start, end);
        if (start < idx - 1) {
            quickSort2(arr, start, idx - 1);
        }
        if (idx < end) {
            quickSort2(arr, idx, end);
        }
    }
    return arr;
}

// 将一个数组在原数组上以pivot为分界点变为一边比pivot小，一边比pivot大
// 首先获取pivot，然后找出左边第一个比pivot小的，右边第一个比pivot大，两者交换位置，最终把数组分割为一边是比pivot小的，一边是比pivot大的
function partion(arr, start, end) {
    const pivotIdx = Math.floor((start + end) / 2);
    const pivot = arr[pivotIdx];
    let i = start,
        j = end;
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    return i;
}
const arr6 = [5, 9, 10, 20, 1, 3, 6, 9, 14, 19, 34, 20, 9, 24, 2, 7];
console.log('quickSort2', quickSort2(arr6, 0, arr6.length - 1));

const str = '1234567890123456';
const reg = /.^/;
str.replace(reg, (_, $) => {
    return ',';
});
console.log(str);
