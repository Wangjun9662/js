浅拷贝：重新在内存中分配一个空间，对于基本数据类型，进行值的复制；对于引用类型，只拷贝一层属性，即只拷贝引用地址，共享一份内存空间。
深拷贝：重新在内存中分配一个空间，引用类型会进行递归拷贝，拷贝后的对象和原对象不会相互影响。

## 实现浅拷贝的 5 种方式

#### Object.assign()

只会遍历自身可枚举的属性

#### 扩展运算符：...

#### lodash: clone()

#### Array.prototype.slice()

#### Array.prototype.concat()

## 实现深拷贝的方式

#### JSON.parse(JSON.stringify())

可以满足大部分的需求（对数组和对象的深拷贝）
缺点：不能够拷贝函数、正则等，函数会变为 null，正则会变为空对象

#### lodash cloneDeep()

#### 手动实现深拷贝
