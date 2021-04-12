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
function use(path, action) {
    routes.push([path, action]);
}
