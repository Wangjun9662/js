const { fstat } = require('fs');
const http = require('http');
const app = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World!');
});
app.listen(3004, () => {
    console.log('server running on port 3004');
});


// 方法的处理
function methodsHandle(req, res) {
    switch (req.method) {
        case 'POST':
            create(req, res);
            break;
        case 'PUT':
            update(req, res);
            break;
        case 'DELETE':
            delete(req, res);
            break;
        case 'GET':
        default:
            get(req, res);
            break;
    }
}

// 路径解析
// hash会被丢弃，不会存在于任何地方
function handPath(req, res) {
    // 静态文件查找
    const path = url.parse(req.url).pathname;
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('file not found');
            return;
        }
        res.end(data);
    });


    // 基于路径选择控制器
    // /controller/action/a/b/c
    const params = path.split('/');
    const controller = params[1] || 'index';
    const action = params[2] || 'index';
    const args = params.slice(3);

    if (controller && controller[action]) {
        const res = controller[action].apply(null, [req, res].concat(args));
        res.writeHead(200);
        res.end(res);
    } else {
        res.writeHead(500);
        res.end('找不到控制器');
    }
}


// 查询字符串
function handleQueryString(req, res) {
    // 注意，如果query有重复的key，返回的应该是一个数组
    req.query = url.parse(req.url, true).query;
}

// cookie
function parseCookie(cookie) {
    const cookies = {};
    if (!cookie) {
        return cookies;
    }

    const list = cookie.split(';');

    for (let i = 0; i < list.length; i++) {
        const temp = list.split('=');
        cookie[temp[0].trim()] = temp[1];
    }

    return cookies;
}

req.cookies = parseCookie(req.headers.cookie);



// 数据上传
// http_parser只会解析报文的头部，然后出发request事件
// 如果请求中携带数据，需要自行接收和解析，通过请求头中的transfer-encoding和content-length可以判断是否有携带数据。
function parseBody(req, res) {
    const hasBody = 'transfer-encoding' in req.headers || 'content-length' in req.headers;
    if (hasBody) {
        const buffer = [];
        req.on('data', (chunk) => {
            buffer.push(chunk);
        });

        req.on('end', () => {
            req.rawBody = Buffer.concat(buffer);
        })
    }
}

// 路由解析
const routes = [];
// 将动态路由路径转化为正则表达式，匹配动态路由等。
const pathRegExp = function (path) {
    return new RegExp();
}
function use(path, action) {
    routes.push([pathRegExp(path), action]);
}




const app = http.createServer(callback());
// 中间件
function callback() {
    // this.middleware存储中间件
    const fn = compose(this.middlewares);

    const handleRequest = function(req, res) {
        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn);
    }

    return handleRequest;
}

// 请求回调函数
function handleRequest(ctx, fn) {

    return fn(ctx).then(() => respond(ctx)).catch();
}

// 组合中间件
function compose(middlewares) {
    return function (ctx, next) {
        let index = -1;
        return dispatch(0);

        function dispatch(i) {
            const fn = middlewares[i];
            index = i;
            if (index === middlewares.length) {
                fn = next;
            }
            // 最终是业务回调函数
            if (!fn) {
                return Promise.resolve();
            }

            try {
                return Promise.resolve(fn(ctx, dispatch(i + 1)));
            }
            catch (e) {
                return Promise.reject(e);
            }
        }
    }
}


