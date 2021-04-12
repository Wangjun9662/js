// 实现简单的lazy-load原理
let index = 0;
// 获取所有img
const imgs = document.getElementsByName('img');
const innerHeight = window.innerHeight || document.documentElement.clientHeight;

function lazyLoad() {
    for (let i = index; i < imgs.length; i++) {
        const img = imgs[i];
        const top = img.getBoundingClientRect().top;
        if (top < innerHeight) {
            img.src = img.getAttribute('data-src');
            index++;
        }
    }
}

// 可以加个节流
window.addEventListener('scroll', lazyLoad, false);
