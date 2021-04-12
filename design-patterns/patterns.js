// 1、单例模式
// 定义：保证一个类只有一个实例，并提供全局的访问接口
// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
// a、类版本
class Storage {
    static getInstance() {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    setItem(key, value) {
        return localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }
}

// b、闭包版本
const Storage2 = (function () {
    let instance = null;

    return function () {
        if (!instance) {
            instance = new StorageBase();
        }
        return instance;
    }
})();

function StorageBase() {}
StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key);
}
StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value);
}



// 2、代理模式
// a、事件代理
// 事件委托
const father = document.getElementById('#id');
father.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        alert();
    }
})
// b、虚拟代理
// 图片预加载
class PreloadImage {
    static LOADING_IMAGE = 'xxxx';

    constructor(imgNode) {
        this.imgNode = imgNode;
    }

    setSrc(targetImg) {
        this.imgNode.src = PreloadImage.LOADING_IMAGE;
        const image = new Image();
        image.src = targetImg;
        image.onload = () => {
            this.imgNode.src = targetImg;
        }
    }
}

// 单一职责原则
class PreloadImage2 {
    static LOADING_IMAGE = 'xxxx';

    constructor(imgNode) {
        this.imgNode = imgNode;
    }

    setSrc(src) {
        this.imgNode.src = src;
    }
}

class ProxyImage {
    static LOADING_IMAGE = 'xxxx';

    constructor(imgNode) {
        this.imgNode = imgNode;
    }

    setSrc(targetSrc) {
        this.imgNode.setSrc(ProxyImage.LOADING_IMAGE);

        const virtualImage = new Image();
        virtualImage.src = targetSrc;
        virtualImage.onload = () => {
            this.imgNode.setSrc(targetSrc);
        }
    }
}
// c、保护代理
// Proxy和Object.defineProperty()

// d、缓存代理
// 对计算的值进行缓存
const cache = {};
function fib(n) {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    if (cache[n]) {
        return cache[n];
    }



    return cache[n] = fib(n - 1) + fib(n - 2);
}

console.log(fib(1000))


// 3、观察者模式
// 实现EventBus（全局事件总线）
class MyEventEmmiter {
    constructor() {
        this.handlers = {};
    }

    on(type, cb) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push(cb);
    }

    emit(type, ...args) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(cb => {
                cb(...args);
            });
        }
    }

    off(type, cb) {
        const idx = this.handlers[type] && this.handlers[type].indexOf(cb);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    }

    once(type, cb) {
        const wrapper = (...args) => {
            cb(...args);
            this.off(type, wrapper);
        }

        this.on(type, wrapper);
    }
}