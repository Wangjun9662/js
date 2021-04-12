// 类的继承

/**
 * 原型链继承
 *
 * 缺点：1、父类引用类型的属性被所有实例共享；2、创建子类的实例时，没法向父类传参。
 * **/
function Person(name, hobbies) {
    this.name = name;
    this.hobbies = hobbies;
}
function Teacher() {}
Teacher.prototype = new Person('jason', ['sports', 'music']);

const teacher1 = new Teacher();
const teacher2 = new Teacher();
teacher1.hobbies.push('dance');
console.log(teacher1.hobbies, teacher2.hobbies);

/**
 * 借助构造函数（经典继承）
 *
 * 缺点：解决了原型链继承的2个问题，但是1、方法都得在构造函数中定义；2、每次创建实例都得创建一遍方法，没有共享
 */
function Person2(name, hobbies) {
    this.name = name;
    this.hobbies = hobbies;
    this.fn = function () {};
}
function Teacher(name, hobbies) {
    Person2.call(this, name, hobbies);
}
/**
 * 组合继承
 *
 * 优点：融合原型链和经典继承，是最常用的继承模式
 * 确定：需要调用两次父类的构造函数
 */
function Person3(name, hobbies) {
    this.name = name;
    this.hobbies = hobbies;
}
Person3.prototype.sayHi = function () {};

function Teacher(name, hobbies) {
    // 继承实例属性和方法
    Person.call(this, name, hobbies);
}
// 继承原型方法
Teacher.prototype = new Person3('jason', ['sports', 'music']);
Teacher.prototype.constructor = Teacher;
// Object.create()模拟实现，也叫原型式继承
function create(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

/**
 * 寄生组合式继承
 * 优点：避免两次调用父类构造函数
 */
function Person4(name, hobbies) {
    this.name = name;
    this.hobbies = hobbies;
}
Person3.prototype.sayHi = function () {};

function Teacher(name, hobbies) {
    // 继承实例属性和方法
    Person.call(this, 'jason', ['sports', 'music']);
}
// 继承原型方法
Teacher.prototype = Object.create(Person4.prototype, {
    constructor: {
        value: Teacher,
    },
});
