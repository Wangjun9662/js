// 链表

// 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
const list1 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 5,
            next: {
                val: 7,
                next: {
                    val: 9,
                    next: null,
                },
            },
        },
    },
};
const list2 = {
    val: 2,
    next: {
        val: 4,
        next: {
            val: 6,
            next: {
                val: 8,
                next: {
                    val: 10,
                    next: null,
                },
            },
        },
    },
};
function mergeLinkedList(list1, list2) {
    const head = {
        val: 'head',
        next: null,
    };

    let cur = head;

    while (list1 && list2) {
        if (list1.val > list2.val) {
            cur.next = list2;
            list2 = list2.next;
        } else {
            cur.next = list1;
            list1 = list1.next;
        }
        cur = cur.next;
    }
    // 处理长度不一样的问题
    cur.next = list1 ? list1 : list2;
    return head.next;
}
let ret = mergeLinkedList(list1, list2);
while (ret) {
    // console.log(ret.val);
    ret = ret.next;
}

// 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
const list3 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 3,
                next: {
                    val: 5,
                    next: {
                        val: 5,
                        next: {
                            val: 7,
                            next: {
                                val: 7,
                                next: null,
                            },
                        },
                    },
                },
            },
        },
    },
};

/**
 * 如果下个节点和当前节点重复，则接着看下下个节点是否也与当前节点重复......，一次去除所有连续的重复值
 */
function uniqueLinkedList(list) {
    const cur = list;
    while (list) {
        let node = list.next;
        if (node && node.val === list.val) {
            while (node && node.next && node.val === node.next.val) {
                node = node.next;
            }
            list.next = node.next;
        } else {
            list = list.next;
        }
    }
    return cur;
}
let res = uniqueLinkedList(list3);
while (res) {
    // console.log(res.val);
    res = res.next;
}

/**
 * 一个一个的去重(代码更简洁)
 */
function uniqueLinkedList2(head) {
    let cur = head;
    while (cur && cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
}
let res2 = uniqueLinkedList2(list3);
while (res2) {
    // console.log(res2.val);
    res2 = res2.next;
}

// 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
const list4 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 3,
                next: {
                    val: 5,
                    next: {
                        val: 5,
                        next: {
                            val: 7,
                            next: {
                                val: 7,
                                next: null,
                            },
                        },
                    },
                },
            },
        },
    },
};
function uniqueLinkedList3(head) {
    const dummy = {
        val: 'dummy',
        next: head,
    };

    let cur = dummy;

    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const val = cur.next.val;
            let node = cur.next.next;
            while (node && node.next && node.next.val === val) {
                node = node.next;
            }
            cur.next = node.next;
        } else {
            cur = cur.next;
        }
    }

    return dummy.next;
}
let res3 = uniqueLinkedList3(list4);
while (res3) {
    // console.log(res3.val);
    res3 = res3.next;
}
//
//
//
//
// 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
const list5 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 5,
            next: {
                val: 7,
                next: {
                    val: 9,
                    next: null,
                },
            },
        },
    },
};
function deleteLastIndexOf(list, n) {
    // 不适用dummy，第一个元素无法删除
    const dummy = {
        val: 'dummy',
        next: list,
    };
    let slow = dummy;
    let fast = dummy;
    while (n !== 0) {
        fast = fast.next;
        n--;
    }

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}
let res5 = deleteLastIndexOf(list5, 5);
while (res5) {
    // console.log(res5.val);
    res5 = res5.next;
}

// 真题描述：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
const list6 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 5,
            next: {
                val: 7,
                next: {
                    val: 9,
                    next: null,
                },
            },
        },
    },
};

function reverseLinkedList(list) {
    let pre = null;
    let cur = list;
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}
let res6 = reverseLinkedList(list6);
while (res6) {
    console.log(res6.val);
    res6 = res6.next;
}
