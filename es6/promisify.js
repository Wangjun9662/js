function promisify(origin) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function (err, ...data) {
                if (err) {
                    return reject(err)
                }
                return resolve(...data)
            })
            origin.apply(this, args)
        });
    }
}

const fs = require('fs')
const path = require('path')
const readFile = promisify(fs.readFile)
const path2 = path.resolve(__dirname, 'iterator.js')
readFile(path2).then((res) => {
    console.log(res.toString())
}).catch((err) => {
    console.log(err)
});
