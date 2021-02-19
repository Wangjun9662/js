// 时间戳法，第一次一定会执行，但是最后一次不会执行
function throttle(event, wait) {
    let previous = 0;
    return function (...args) {
        const now = +new Date();
        if (now - previous >= wait) {
            event.apply(this, args);
            previous = +new Date();
        }
    };
}

// 定时器法，第一次一定不会执行，最后一次会执行
function throttle2(event, wait) {
    let timer = null;
    return function (...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = null;
            event.apply(this, args);
        }, wait);
    };
}

// 综合两者
function throttle(event, wait) {
    let timer = null;
    let previous = 0;
    return function (...args) {
        const now = +new Date();
        const remaining = wait - (now - previous);
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            event.apply(this, args);
            previous = now;
        } else if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                previous = +new Date();
                event.apply(this, args);
            }, remaining);
        }
    };
}
