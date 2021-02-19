// 基础版本
function debounce(event, wait) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            event.apply(this, args);
        }, wait);
    };
}

// 基础版本有个问题，就是第一次触发时间一定不会执行，如果想要第一次就执行呢？
function debounce2(event, wait, flag) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }

        if (!timer && flag) {
            event.apply(this, args);
        }
        timer = setTimeout(() => {
            event.apply(this, args);
        }, wait);
    };
}

// 加一个取消debounce的方法
function debounce3(event, wait, flag) {
    let timer = null;
    const debounced = function (...args) {
        if (timer) {
            clearTimeout(timer);
        }

        if (!timer && flag) {
            event.apply(this, args);
        }
        timer = setTimeout(() => {
            event.apply(this, args);
        }, wait);
    };

    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };

    return debounced;
}
