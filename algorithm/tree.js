// 树的前中后序遍历
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

const root = new TreeNode('A');

const nodeB = new TreeNode('B');
const nodeC = new TreeNode('C');
const nodeD = new TreeNode('D');
const nodeE = new TreeNode('E');
const nodeF = new TreeNode('F');
root.right = nodeC;
root.left = nodeB;
nodeB.left = nodeD;
nodeB.right = nodeE;
nodeC.right = nodeF;

// 先序遍历
function preorder(root) {
    if (!root) {
        return;
    }
    console.log(root.val);
    preorder(root.left);
    preorder(root.right);
}

// 中序遍历
function inorder(root) {
    if (!root) {
        return;
    }
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
}

// 后序遍历
function postorder(root) {
    if (!root) {
        return;
    }
    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
}

console.log(preorder(root));
console.log(inorder(root));
console.log(postorder(root));
