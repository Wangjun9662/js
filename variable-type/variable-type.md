##### 参考文档：https://juejin.cn/post/6844903854882947080#heading-4

#### js 数据类型

一共 8 种数据类型，分为 2 大类：

原始数据类型：
Null: null
Undefined: undefined
Number: 包括特殊的+Infinity，-Infinity 和 NaN
String
Boolean
Symbol
BigInt: es10 新增的数据类型

引用数据类型：
Object(包括 Object，Function，Array，Date，RegExp 等)

#### 原始类型和引用类型在内存中的存储

原始类型存储在栈内存当中，有如下特点：

1、存储值的大小固定（原始类型是不可变的，以字符串为例，所有的字符串操作都不会改变原始的字符串）
2、内存较小
3、可以直接操作其保存的变量，效率很高
4、栈内存由系统自动进行分配

引用类型数据存储在堆内存当中，其引用地址存储在栈内存当中，有如下特点：

1、内存值的大小不固定，可以动态调整
2、内存占用较大
3、不能够直接操作其内部保存的数据，使用引用地址读取
4、堆内存通过代码进行分配

#### 复制

复制的时候，原始类型和引用类型的表现是不一样的。

原始类型是在栈中开辟一个新的存储空间，用来存储复制的值。两者是不会相互影响的。

引用类型复制的时候，是在栈中开辟一个新的存储空间，用来存储引用地址，指向堆中相同的内存空间

#### 比较

比较的时候，原始类型和引用类型的表现是不一样的。

原始类型直接对值进行比较

引用类型会比较引用地址，虽然地址指向同一个堆内存中存储的对象，但是由于引用地址不同，所以比较的结果是 false

#### 值传递和引用传递

首先，js 中所有函数参数都是按值传递的。

验证：

```javascript
let myName = 'Jason';
function change(myName) {
    myName = 'Jack';
}
change(myName);
console.log(myName); // Jason
```

最后输出的是 Jason，说明函数内部对 myName 的重新赋值，并没有影响外部的 myName，只是改变了函数内部的局部变量，可以证明传递给函数参数的变量是对外部 myName 的一个复制，而不是引用

再来看一例子：

```javascript
let me = {
    name: 'Jason',
};
function change(me) {
    me.name = 'Jack';
}
change(me);
console.log(me.name); // Jack
```

外部 me 对象的 name 属性被函数内部的复制改变了，是不是说明引用类型的参数不是按值传递，而是引用传递的呢？
再看下面这个例子：

```javascript
let me = {
    name: 'Jason',
};
function change(me) {
    me.name = 'Jack';
    // 对me重新赋值
    me = { name: 'John' };
}
change(me);
console.log(me); // {name: 'Jack'}
```

在函数内部对 me 进行重新赋值，但是没有改变原有 me 的值。所以，对于引用类型的数据，也是按值传递的，只不过传递的值是复制的引用地址，函数内部对对象的改变会改变引用地址指向堆中存储的同一个对象。当在函数内部对其重新赋值的时候，改变的是复制的引用地址指向的对象，而没有改变原始对象。

#### null 和 undefined

null

表示一个被赋值过的对象，只是值为 null

undefined

表示缺少值，此处应该有一个值，但是还没被定义

类型转换的时候：Number(null) = 0 Number(undefined) = NaN

#### Symbol()

特点：
1、每个 Symbol 值都是唯一的，如果想创建两个相等的 Symbol，可以使用 Symbol.for(key)，传入同一个 key
2、原始数据类型，使用 Symbol()函数创建，不能使用 new
3、使用 for...in 循环、Object.keys()、Object.getOwnPropertyNames()无法获取 Symbol 属性，可以使用 Object.getOwnPropertySymbols()获取 Symbol 属性

使用场景

1、对象的属性

2、类的私有属性

3、防止属性污染，我们需要在某个对象上临时调用一个方法，又不能造成属性污染，Symbol 是一个很好的选择。如实现 call 方法

#### 0.1+0.2!=0.3？

总结：存储 number 类型数据，当超过存储位数限制时会丢失精度

底层原因：

计算机在底层都是使用二进制来存储数据的，js（还有 java 等） 规定使用固定 64 位（对于科学计数法来说的）的长度来存储 Number 类型数据，为了节省存储空间，计算机使用二进制的科学计数法来表示。

它由 3 部分组成：符号位（1 位）、指数位（11 位）、尾数位（52 位）

如果没有限制，0.1 的二进制表示为：0.00011001100110011001100110011001100110011001100110011001100......，无限循环
用科学计数法表示就是 1.10011001100110011001100110011001100110011001100110011001100.... X 2 -4
因为尾数位 52 位的限制，所以最后变为 1.1001100110011001100110011001100110011001100110011001101 X 2 -4，二进制表示为
0.00011001100110011001100110011001100110011001100110011001101
0.2 也会有同样的问题，这样就会导致精度丢失

由此也可以看出 js 能表示的最大数字是：1.111111111.... X 2 1023，十进制是 1.7976931348623157e+308，即 Math.MAX_VALUE

最大安全数字 Math.MAX_SAFE_INTEGER 为 1.111... X 2 52，十进制是 9007199254740991

为了解决这个问题，es10 中提出了 BigInt 类型

#### 包装类型

基本包装类型：

Boolean
Number
String

引用类型和包装类型的区别：

主要是对象的生存期。引用类型对象的生存期直到执行流离开当前作用域为止。而包装类型的生存期仅仅是在那行代码执行的一瞬间，然后立马就被销毁了。

所以，不能在运行时为基本类型添加属性和方法

#### 装箱和拆箱

装箱：把基本类型转换为引用类型
拆箱：把引用类型装换为基本类型

当我们使用原始类型数据的方法时，就是一个装箱和拆箱的过程：
1、创建一个包装类型实例
2、在实例上调用方法
3、销毁实例

拆箱过程一般会调用 valueOf 或者 toString 方法，一般转换成不同类型的值遵循的原则不同，例如：

引用类型转换为 Number 类型，优先调用 valueOf，再调用 toString
引用类型转换为 String 类型，优先调用 toString，再调用 valueOf
若这 2 个方法都不存在或者没有返回原始数据类型，则会抛出 TypeError

#### 类型转换

显式类型转换和隐式类型转换

需要注意的一些转换规则:
转换前 转换后 Boolean 转换后 String 转换后 Number
Symbol true TypeError TypeError
null false 'null' 0
undefined false 'undefined' NaN
function() {} true 'function() {}' NaN
{} true [object Object] NaN
[] true '' 0
[1] true '1' 1
[1, 2] true '1,2' NaN
[null] true '' 0
[undefined] true '' 0

falsy: NaN,undefined,null,0,false,''

数学运算：

减、乘、除都会将运算符两边的值转为 Number 类型

+有点不同：

1、如果一侧有 string 类型，则被识别为字符串拼接，会将另一侧转为 string 类型

2、如果一侧有 number 类型，另外一侧为非 string 的原始类型，则会将另外一侧转为 number 类型

3、如果一侧有 number 类型，另外一侧为引用类型，则会将 number 类型和引用类型都转为 string 类型后拼接

#### ==

若==两侧类型不同，会发生类型转换

1、NaN

NaN 和任何职都不==，包括其自身

2、Boolean

都会先转换为 Number 类型

```javascript
true == 1; // true
false == 0; // true
true == ['1']; // true
undefined == false; // false
null == false; // false
```

3、String 和 Number 比较，先将 string 转为 Number

```javascript
123 == '123';
```

4、undefined 和 null

null == undefined 比较结果是 true，除此之外，null、undefined 和其他任何结果的比较值都为 false。

5.原始类型和引用类型

当原始类型和引用类型做比较时，对象类型会依照 ToPrimitive 规则转换为原始类型:

```javascript
[] == ![]; // true
[null] == false; // true
[undefined] == false; // true
```

6、有趣的面试题：如何让 a == 1 && a == 2 && a ==3

```javascript
const a = {
    value: [3, 2, 1],
    valueOf() {
        return this.value.pop();
    },
};
```

#### 判断数据类型

1、typeof

可以返回的类型有 7 种：
string
number
boolean
object
function
undefined
symbol

2、instanceof

3、toString()
每一个引用类型都有 toString 方法，默认情况下，toString()方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。
注意，上面提到了如果此方法在自定义对象中未被覆盖，toString 才会达到预想的效果，事实上，大部分引用类型比如 Array、Date、RegExp 等都重写了 toString 方法。
我们可以直接调用 Object 原型上未被覆盖的 toString()方法，使用 call 来改变 this 指向来达到我们想要的效果。
