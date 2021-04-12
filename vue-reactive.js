function observe(data) {
    return new Observer(data);
}

class Observer {
    constructor(data) {
        // 添加不可枚举的__ob__对象，作为响应式数据的标识。
        def(data, '__ob__', this);

        this.walk(data);
    }

    walk(data) {
        for (let key in data) {
            defineReactive(data, key);
        }
    }
}

function def(data, key, value, enumerable) {
    Object.defineProperties(data, key, {
        value,
        writable: true,
        enumerable: !!enumerable,
        configurable: true
    });
}

function defineReactive(obj, key) {
    const dep = new Dep();
    const val = obj[key];
    Object.defineProperties(obj, key, {
        configurable: true,
        ennumerable: true,
        get() {
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set(nval) {
            if (nval === val) {
                return;
            }
            obj[key] = nval;
            dep.notify();
        }
    });
}


class Dep {
    constructor() {
        this.subs = [];
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    notify() {
        const subs = this.subs.slice();
        for (let i = 0; i < subs.length; i++) {
            subs[i].notify();
        }
    }
}

class Watcher {
    constructor(updateComponent) {
        this.getter = updateComponent;
        this.get();
        this.newDepIds = new Set();
        this.newDeps = [];
        this.depIds = new Set();
        this.deps = [];
    }

    addDep(dep) {
        if (!this.newDepIds.has(dep.id)) {
            this.newDepIds.add(dep.id);
            this.newDeps.push(dep);

            if (!this.depIds.has(dep.id)) {
                dep.addSub(this);
            }
        }
    }

    get() {
        // pushTarget()
        Dep.target = this;
        this.getter();
        // pupTarget()
        Dep.target = null;
    }

    update() {
        this.get();
    }
}


// nexttick
const callbacks = [];
let pending = false;

let timeFunc;
if (typeof Promise !== 'undefined') {
    const p = Promise.resolve();
    timeFunc = () => {
        p.then(flushCallbacks);
    }
}
else if (typeof MutationObserver !== 'undefined') {
    let counter = 0;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
        characterData: true
    });

    timeFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = counter;
    }
}
else if (typeof setImmediate !== 'undefined') {
    timeFunc = () => {
        setImmediate(flushCallbacks);
    }
} else {
    timeFunc = () => {
        setTimeout(flushCallbacks, 0);
    }
}


function nexttick(fn, ctx) {
    let _resolve;
    callbacks.push(() => {
        if (fn) {
            try {
                fn.call(ctx);
            } catch (e) {
                throw new Error('error');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });

    if (!pending) {
        // 保证一次只添加一个微任务，等待该微任务里面的任务执行完成之后，再添加新的微任务。
        pending = true;
        // 添加一个微任务
        timeFunc();
    }

    // 如果没有传回调
    if (!fn && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}

function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice();
    callbacks.length = 0;

    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}