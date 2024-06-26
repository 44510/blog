# JavaScript

[TOC]

## 查看js的执行工具

1. <https://www.jsv9000.app/>

## 工具函数

**JavaScript 的组成**

- JavaScript 由以下三部分组成：
  - ECMAScript（核心）：JavaScript 语言基础
  - DOM（文档对象模型）：规定了访问 HTML 和 XML 的接口
  - BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法

**检测浏览器版本版本有哪些方式？**

- 根据 navigator.userAgent // UA.toLowerCase().indexOf('chrome')
- 根据 window 对象的成员 // 'ActiveXObject' in window

**说几条写 JavaScript 的基本规范？**

- 代码缩进，建议使用“四个空格”缩进
- 代码段使用花括号{}包裹
- 语句结束使用分号;
- 变量和函数在使用前进行声明
- 以大写字母开头命名构造函数，全大写命名常量
- 规范定义 JSON 对象，补全双引号
- 用{}和[]声明对象和数组

**如何编写高性能的 JavaScript？**

- 遵循严格模式："use strict";
- 将 js 脚本放在页面底部，加快渲染页面
- 将 js 脚本将脚本成组打包，减少请求
- 使用非阻塞方式下载 js 脚本
- 尽量使用局部变量来保存全局变量
- 尽量减少使用闭包
- 使用 window 对象属性方法时，省略 window
- 尽量减少对象成员嵌套
- 缓存 DOM 节点的访问
- 通过避免使用 eval() 和 Function() 构造器
- 给 setTimeout() 和 setInterval() 传递函数而不是字符串作为参数
- 尽量使用直接量创建对象和数组
- 最小化重绘(repaint)和回流(reflow)

**描述浏览器的渲染过程，DOM 树和渲染树的区别？**

- 浏览器的渲染过程：

  - 解析 HTML 构建 DOM(DOM 树)，并行请求 css/image/js
  - CSS 文件下载完成，开始构建 CSSOM(CSS 树)
  - CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)
  - 布局(Layout)：计算出每个节点在屏幕中的位置
  - 显示(Painting)：通过显卡把页面画到屏幕上

- DOM 树 和 渲染树 的区别：
  - DOM 树与 HTML 标签一一对应，包括 head 和隐藏元素
  - 渲染树不包括 head 和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的 css 属性

**重绘和回流（重排）的区别和关系？**

- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS 获取 Layout 属性值（如：offsetLeft、scrollTop、getComputedStyle 等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流

**如何最小化重绘(repaint)和回流(reflow)？**

- 需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
- 需要创建多个 DOM 节点时，使用 DocumentFragment 创建完后一次性的加入 document
- 缓存 Layout 属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
- 尽量避免用 table 布局（table 元素一旦触发回流就会导致 table 里所有的其它元素回流）
- 避免使用 css 表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
- 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx

**script 的位置是否会影响首屏显示时间？**

- 在解析 HTML 生成 DOM 过程中，js 文件的下载是并行的，不需要 DOM 处理到 script 节点。因此，script 的位置不影响首屏显示的开始时间。
- 浏览器解析 HTML 是自上而下的线性过程，script 作为 HTML 的一部分同样遵循这个原则
- 因此，script 会延迟 DomContentLoad，只显示其上部分首屏内容，从而影响首屏显示的完成时间

**解释 JavaScript 中的作用域与变量声明提升？**

- JavaScript 作用域：

  - 在 Java、C 等语言中，作用域为 for 语句、if 语句或{}内的一块区域，称为作用域；
  - 而在 JavaScript 中，作用域为 function(){}内的区域，称为函数作用域。

- JavaScript 变量声明提升：
  - 在 JavaScript 中，函数声明与变量声明经常被 JavaScript 引擎隐式地提升到当前作用域的顶部。
  - 声明语句中的赋值部分并不会被提升，只有名称被提升
  - 函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明
  - 如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数

**JavaScript 有几种类型的值？，你能画一下他们的内存图吗**

- 原始数据类型（Undefined，Null，Boolean，Number、String）-- 栈
- 引用数据类型（对象、数组和函数）-- 堆
- 两种类型的区别是：存储位置不同：
- 原始数据类型是直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据；
- 引用数据类型存储在堆(heap)中的对象，占据空间大、大小不固定，如果存储在栈中，将会影响程序运行的性能；
- 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。
- 当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

**JavaScript 如何实现一个类，怎么实例化这个类？**

- 构造函数法（this + prototype） -- 用 new 关键字 生成实例对象
  - 缺点：用到了 this 和 prototype，编写复杂，可读性差

```javascript
function Mobile(name, price) {
  this.name = name;
  this.price = price;
}
Mobile.prototype.sell = function() {
  alert(this.name + '，售价 $' + this.price);
};
var iPhone7 = new Mobile('iPhone7', 1000);
iPhone7.sell();
```

- Object.create 法 -- 用 Object.create() 生成实例对象
- 缺点：不能实现私有属性和私有方法，实例对象之间也不能共享数据

```javascript
var Person = {
  firstname: 'Mark',
  lastname: 'Yun',
  age: 25,
  introduce: function() {
    alert('I am ' + Person.firstname + ' ' + Person.lastname);
  },
};

var person = Object.create(Person);
person.introduce();

// Object.create 要求 IE9+，低版本浏览器可以自行部署：
if (!Object.create) {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

- 极简主义法（消除 this 和 prototype） -- 调用 createNew() 得到实例对象
  - 优点：容易理解，结构清晰优雅，符合传统的"面向对象编程"的构造

```javascript
var Cat = {
  age: 3, // 共享数据 -- 定义在类对象内，createNew() 外
  createNew: function() {
    var cat = {};
    // var cat = Animal.createNew(); // 继承 Animal 类
    cat.name = '小咪';
    var sound = '喵喵喵'; // 私有属性--定义在 createNew() 内，输出对象外
    cat.makeSound = function() {
      alert(sound); // 暴露私有属性
    };
    cat.changeAge = function(num) {
      Cat.age = num; // 修改共享数据
    };
    return cat; // 输出对象
  },
};

var cat = Cat.createNew();
cat.makeSound();
```

- ES6 语法糖 class -- 用 new 关键字 生成实例对象

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var point = new Point(2, 3);
```

**Javascript 作用链域?**

- 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节
- 如果当前作用域没有找到属性或方法，会向上层作用域查找，直至全局函数，这种形式就是作用域链

**谈谈 this 对象的理解**

- this 总是指向函数的直接调用者
- 如果有 new 关键字，this 指向 new 出来的实例对象
- 在事件中，this 指向触发这个事件的对象
- IE 下 attachEvent 中的 this 总是指向全局对象 Window

**eval 是做什么的？**

**eval 的功能是把对应的字符串解析成 JS 代码并运行**

- 应该避免使用 eval，不安全，非常耗性能（先解析成 js 语句，再执行）
- 由 JSON 字符串转换为 JSON 对象的时候可以用 eval('('+ str +')');

**什么是 Window 对象? 什么是 Document 对象?**

- Window 对象表示当前浏览器的窗口，是 JavaScript 的顶级对象。
- 我们创建的所有对象、函数、变量都是 Window 对象的成员。
- Window 对象的方法和属性是在全局范围内有效的。
- Document 对象是 HTML 文档的根节点与所有其他节点（元素节点，文本节点，属性节点, 注释节点）
- Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问
- Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问

**介绍 DOM 的发展**

- DOM：文档对象模型（Document Object Model），定义了访问 HTML 和 XML 文档的标准，与编程语言及平台无关
- DOM0：提供了查询和操作 Web 文档的内容 API。未形成标准，实现混乱。如：document.forms['login']
- DOM1：W3C 提出标准化的 DOM，简化了对文档中任意部分的访问和操作。如：JavaScript 中的 Document 对象
- DOM2：原来 DOM 基础上扩充了鼠标事件等细分模块，增加了对 CSS 的支持。如：getComputedStyle(elem, pseudo)
- DOM3：增加了 XPath 模块和加载与保存（Load and Save）模块。如：XPathEvaluator

**介绍 DOM0，DOM2，DOM3 事件处理方式区别**

- DOM0 级事件处理方式：
  - `btn.onclick = func;`
  - `btn.onclick = null;`
- DOM2 级事件处理方式：
  - `btn.addEventListener('click', func, false);`
  - `btn.removeEventListener('click', func, false);`
  - `btn.attachEvent("onclick", func);`
  - `btn.detachEvent("onclick", func);`
- DOM3 级事件处理方式：
  - `eventUtil.addListener(input, "textInput", func);`
  - `eventUtil` 是自定义对象，`textInput` 是 DOM3 级事件

**事件的三个阶段**

- 捕获、目标、冒泡

**介绍事件“捕获”和“冒泡”执行顺序和事件的执行次数？**

- 按照 W3C 标准的事件：首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段
- 事件执行次数（DOM2-addEventListener）：元素上绑定事件的个数
  - 注意 1：前提是事件被确实触发
  - 注意 2：事件绑定几次就算几个事件，即使类型和功能完全一样也不会“覆盖”
- 事件执行顺序：判断的关键是否目标元素
  - 非目标元素：根据 W3C 的标准执行：捕获->目标元素->冒泡（不依据事件绑定顺序）
  - 目标元素：依据事件绑定顺序：先绑定的事件先执行（不依据捕获冒泡标准）
  - 最终顺序：父元素捕获->目标元素事件 1->目标元素事件 2->子元素捕获->子元素冒泡->父元素冒泡
  - 注意：子元素事件执行前提 事件确实“落”到子元素布局区域上，而不是简单的具有嵌套关系

**在一个 DOM 上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次，先执行冒泡还是捕获？**

- 该 DOM 上的事件如果被触发，会执行两次（执行次数等于绑定次数）
- 如果该 DOM 是目标元素，则按事件绑定顺序执行，不区分冒泡/捕获
- 如果该 DOM 是处于事件流中的非目标元素，则先执行捕获，后执行冒泡

**事件的代理/委托**

- 事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件
  - 优点：
    - 可以减少事件注册，节省大量内存占用
    - 可以将事件应用于动态添加的子元素上
  - 缺点：
    使用不当会造成事件在不应该触发时触发
  - 示例：

```
ulEl.addEventListener('click', function(e){
    var target = event.target || event.srcElement;
    if(!!target && target.nodeName.toUpperCase() === "LI"){
        console.log(target.innerHTML);
    }
}, false);
```

**IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？**

- IE 只事件冒泡，不支持事件捕获；火狐同时支持件冒泡和事件捕获

**IE 的事件处理和 W3C 的事件处理有哪些区别？**

- 绑定事件

  - W3C: targetEl.addEventListener('click', handler, false);
  - IE: targetEl.attachEvent('onclick', handler);

- 删除事件

  - W3C: targetEl.removeEventListener('click', handler, false);
  - IE: targetEl.detachEvent(event, handler);

- 事件对象

  - W3C: var e = arguments.callee.caller.arguments[0]
  - IE: window.event

- 事件目标

  - W3C: e.target
  - IE: window.event.srcElement

- 阻止事件默认行为

  - W3C: e.preventDefault()
  - IE: window.event.returnValue = false

- 阻止事件传播
  - W3C: e.stopPropagation()
  - IE: window.event.cancelBubble = true

**W3C 事件的 target 与 currentTarget 的区别？**

- target 只会出现在事件流的目标阶段
- currentTarget 可能出现在事件流的任何阶段
- 当事件流处在目标阶段时，二者的指向相同
- 当事件流处于捕获或冒泡阶段时：currentTarget 指向当前事件活动的对象(一般为父级)

**如何派发事件(dispatchEvent)？（如何进行事件广播？）**

- W3C: 使用 dispatchEvent 方法
- IE: 使用 fireEvent 方法

```javascript
var fireEvent = function(element, event) {
  if (document.createEventObject) {
    var mockEvent = document.createEventObject();
    return element.fireEvent('on' + event, mockEvent);
  } else {
    var mockEvent = document.createEvent('HTMLEvents');
    mockEvent.initEvent(event, true, true);
    return !element.dispatchEvent(mockEvent);
  }
};
```

**什么是函数节流？介绍一下应用场景和原理？**

- 函数节流(throttle)是指阻止一个函数在很短时间间隔内连续调用。
  只有当上一次函数执行后达到规定的时间间隔，才能进行下一次调用。
  但要保证一个累计最小调用间隔（否则拖拽类的节流都将无连续效果）

- 函数节流用于 onresize, onscroll 等短时间内会多次触发的事件

- 函数节流的原理：使用定时器做时间节流。
  当触发一个事件时，先用 setTimout 让这个事件延迟一小段时间再执行。
  如果在这个时间间隔内又触发了事件，就 clearTimeout 原来的定时器，
  再 setTimeout 一个新的定时器重复以上流程。

- 函数节流简单实现：

```javascript
function throttle(method, context) {
     clearTimeout(methor.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }， 100); // 两次调用至少间隔 100ms
}
// 调用
window.onresize = function(){
    throttle(myFunc, window);
}
```

**区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”？**

- 客户区坐标：鼠标指针在可视区中的水平坐标(clientX)和垂直坐标(clientY)
- 页面坐标：鼠标指针在页面布局中的水平坐标(pageX)和垂直坐标(pageY)
- 屏幕坐标：设备物理屏幕的水平坐标(screenX)和垂直坐标(screenY)

**如何获得一个 DOM 元素的绝对位置？**

- elem.offsetLeft：返回元素相对于其定位父级左侧的距离
- elem.offsetTop：返回元素相对于其定位父级顶部的距离
- elem.getBoundingClientRect()：返回一个 DOMRect 对象，包含一组描述边框的只读属性，单位像素

**分析 ['1', '2', '3'].map(parseInt) 答案是多少？**

- 答案:[1, NaN, NaN]

- parseInt(string, radix) 第 2 个参数 radix 表示进制。省略 radix 或 radix = 0，则数字将以十进制解析
- map 每次为 parseInt 传 3 个参数(elem, index, array)，其中 index 为数组索引
- 因此，map 遍历 ["1", "2", "3"]，相应 parseInt 接收参数如下

```
parseInt('1', 0);  // 1
parseInt('2', 1);  // NaN
parseInt('3', 2);  // NaN
```

- 所以，parseInt 参数 radix 不合法，导致返回值为 NaN

**new 操作符具体干了什么？**

- 创建实例对象，this 变量引用该对象，同时还继承了构造函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this

**用原生 JavaScript 的实现过什么功能吗？**

- 封装选择器、调用第三方 API、设置和获取样式

**解释一下这段代码的意思吗？**

```javascript
[].forEach.call($$('*'), function(el) {
  el.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
});
```

- 解释：获取页面所有的元素，遍历这些元素，为它们添加 1 像素随机颜色的轮廓(outline)
- 1. `$$(sel)` // \$\$函数被许多现代浏览器命令行支持，等价于 document.querySelectorAll(sel)
- 2. `[].forEach.call(NodeLists)` // 使用 call 函数将数组遍历函数 forEach 应到节点元素列表
- 3. `el.style.outline = "1px solid #333"` // 样式 outline 位于盒模型之外，不影响元素布局位置
- 4. `(1<<24)` // parseInt("ffffff", 16) == 16777215 == 2^24 - 1 // 1<<24 == 2^24 == 16777216
- 5. `Math.random()*(1<<24)` // 表示一个位于 0 到 16777216 之间的随机浮点数
- 6. `~~Math.random()*(1<<24)` // `~~` 作用相当于 parseInt 取整
- 7. `(~~(Math.random()*(1<<24))).toString(16)` // 转换为一个十六进制-

**JavaScript 实现异步编程的方法？**

- 回调函数
- 事件监听
- 发布/订阅
- Promises 对象
- Async 函数[ES7]

**web 开发中会话跟踪的方法有哪些**

- cookie
- session
- url 重写
- 隐藏 input
- ip 地址

**说几条写 JavaScript 的基本规范？**

- 不要在同一行声明多个变量
- 请使用 ===/!==来比较 true/false 或者数值
- 使用对象字面量替代 new Array 这种形式
- 不要使用全局函数
- Switch 语句必须带有 default 分支
- 函数不应该有时候有返回值，有时候没有返回值
- If 语句必须使用大括号
- for-in 循环中的变量 应该使用 var 关键字明确限定作用域，从而避免作用域污

**JavaScript 有几种类型的值？，你能画一下他们的内存图吗？**

- 栈：原始数据类型（Undefined，Null，Boolean，Number、String）
- 堆：引用数据类型（对象、数组和函数）

- 两种类型的区别是：存储位置不同；
- 原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其
- 在栈中的地址，取得地址后从堆中获得实体

![](https://camo.githubusercontent.com/d1947e624a0444d1032a85800013df487adc5550/687474703a2f2f7777772e77337363686f6f6c2e636f6d2e636e2f692f63745f6a735f76616c75652e676966)

**javascript 创建对象的几种方式？**

> javascript 创建对象简单的说,无非就是使用内置对象或各种自定义对象，当然还可以用 JSON；但写法有很多种，也能混合使用

- 对象字面量的方式

```
person={firstname:"Mark",lastname:"Yun",age:25,eyecolor:"black"};
```

- 用 function 来模拟无参的构造函数

```
 function Person(){}
    var person=new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
        person.name="Mark";
        person.age="25";
        person.work=function(){
        alert(person.name+" hello...");
    }
person.work();
```

- 用 function 来模拟参构造函数来实现（用 this 关键字定义构造的上下文属性）

```
function Pet(name,age,hobby){
       this.name=name;//this作用域：当前对象
       this.age=age;
       this.hobby=hobby;
       this.eat=function(){
          alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员");
       }
    }
    var maidou =new Pet("麦兜",25,"coding");//实例化、创建对象
    maidou.eat();//调用eat方法
```

- 用工厂方式来创建（内置对象）

```
var wcDog =new Object();
     wcDog.name="旺财";
     wcDog.age=3;
     wcDog.work=function(){
       alert("我是"+wcDog.name+",汪汪汪......");
     }
     wcDog.work();
```

- 用原型方式来创建

```
function Dog(){

     }
     Dog.prototype.name="旺财";
     Dog.prototype.eat=function(){
     alert(this.name+"是个吃货");
     }
     var wangcai =new Dog();
     wangcai.eat();

```

- 用混合方式来创建

```
 function Car(name,price){
      this.name=name;
      this.price=price;
    }
     Car.prototype.sell=function(){
       alert("我是"+this.name+"，我现在卖"+this.price+"万元");
      }
    var camry =new Car("凯美瑞",27);
    camry.sell();
```

**Javascript 作用链域?**

- 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节
- 当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找
- 直至全局函数，这种组织形式就是作用域链

**谈谈 This 对象的理解**

- this 总是指向函数的直接调用者（而非间接调用者）
- 如果有 new 关键字，this 指向 new 出来的那个对象
- 在事件中，this 指向触发这个事件的对象，特殊的是，IE 中的 attachEvent 中的 this 总是指向全局对象 Window

**eval 是做什么的？**

- 它的功能是把对应的字符串解析成 JS 代码并运行
- 应该避免使用 eval，不安全，非常耗性能（2 次，一次解析成 js 语句，一次执行）
- 由 JSON 字符串转换为 JSON 对象的时候可以用 eval，var obj =eval('('+ str +')')

**null，undefined 的区别？**

- undefined 表示不存在这个值。
- undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined
- 例如变量被声明了，但没有赋值时，就等于 undefined

- null 表示一个对象被定义了，值为“空值”
- null : 是一个对象(空对象, 没有任何属性和方法)
- 例如作为函数的参数，表示该函数的参数不是对象；

- 在验证 null 时，一定要使用　=== ，因为 == 无法分别 null 和　 undefined

**写一个通用的事件侦听器函数**

```js
// event(事件)工具集，来源：github.com/markyun
markyun.Event = {
  // 页面加载完成后
  readyEvent: function(fn) {
    if (fn == null) {
      fn = document;
    }
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = fn;
    } else {
      window.onload = function() {
        oldonload();
        fn();
      };
    }
  },
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 参数： 操作的元素,事件名称 ,事件处理程序
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      //事件类型、需要执行的函数、是否捕捉
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, function() {
        handler.call(element);
      });
    } else {
      element['on' + type] = handler;
    }
  },
  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.datachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
  stopPropagation: function(ev) {
    if (ev.stopPropagation) {
      ev.stopPropagation();
    } else {
      ev.cancelBubble = true;
    }
  },
  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
  getEvent: function(e) {
    var ev = e || window.event;
    if (!ev) {
      var c = this.getEvent.caller;
      while (c) {
        ev = c.arguments[0];
        if (ev && Event == ev.constructor) {
          break;
        }
        c = c.caller;
      }
    }
    return ev;
  },
};
```

**["1", "2", "3"].map(parseInt) 答案是多少？**

- [1, NaN, NaN] 因为 parseInt 需要两个参数 (val, radix)，其中 radix 表示解析时用的基数。
- map 传了 3 个 (element, index, array)，对应的 radix 不合法导致解析失败。

**事件是？IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？**

- 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为
- 事件处理机制：IE 是事件冒泡、Firefox 同时支持两种事件模型，也就是：捕获型事件和冒泡型事件
- ev.stopPropagation();（旧 ie 的方法 ev.cancelBubble = true;）

**javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？**

- use strict 是一种 ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,使 JS 编码更加规范化的模式,消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为

**如何判断一个对象是否属于某个类？**

```
// 使用instanceof （待完善）
   if(a instanceof Person){
       alert('yes');
   }
```

**new 操作符具体干了什么呢?**

- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this

```
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```

**js 延迟加载的方式有哪些？**

- defer 和 async、动态创建 DOM 方式（用得最多）、按需异步载入 js

**Ajax 是什么? 如何创建一个 Ajax？**

> ajax 的全称：Asynchronous Javascript And XML

- 异步传输+js+xml
- 所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验

- 创建 XMLHttpRequest 对象,也就是创建一个异步调用对象
- 建一个新的 HTTP 请求,并指定该 HTTP 请求的方法、URL 及验证信息
- 设置响应 HTTP 请求状态变化的函数
- 发送 HTTP 请求
- 获取异步调用返回的数据
- 用 JavaScript 和 DOM 实现局部刷新

**同步和异步的区别?**

- 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作
- 异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容

**异步加载 JS 的方式有哪些？**

- defer，只支持 IE
- async：
- 创建 script，插入到 DOM 中，加载完毕后 callBack

**documen.write 和 innerHTML 的区别**

- document.write 只能重绘整个页面
- innerHTML 可以重绘页面的一部分

**DOM 操作——怎样添加、移除、移动、复制、创建和查找节点?**

- （1）创建新节点
  - createDocumentFragment() //创建一个 DOM 片段
  - createElement() //创建一个具体的元素
  - createTextNode() //创建一个文本节点
- （2）添加、移除、替换、插入
  - appendChild()
  - removeChild()
  - replaceChild()
  - insertBefore() //在已有的子节点前插入一个新的子节点
- （3）查找
  - getElementsByTagName() //通过标签名称
  - getElementsByName() // 通过元素的 Name 属性的值(IE 容错能力较强，会得到一个数组，其中包括 id 等于 name 值的)
  - getElementById() //通过元素 Id，唯一性

**那些操作会造成内存泄漏？**

- 内存泄漏指任何对象在您不再拥有或需要它之后仍然存在
- 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收
- setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

**渐进增强和优雅降级**

- 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

- 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容

**Javascript 垃圾回收方法**

- 标记清除（mark and sweep）

> - 这是 JavaScript 最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”
> - 垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

**引用计数(reference counting)**

> 在低版本 IE 中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加 1，如果该变量的值变成了另外一个，则这个值得引用次数减 1，当这个值的引用次数变为 0 的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的空间

**defer 和 async**

- defer 并行加载 js 文件，会按照页面上 script 标签的顺序执行 async 并行加载 js 文件，下载完成立即执行，不会按照页面上 script 标签的顺序执行

**用过哪些设计模式？**

- 工厂模式：
  - 主要好处就是可以消除对象间的耦合，通过使用工程方法而不是 new 关键字。将所有实例化的代码集中在一个位置防止代码重复
  - 工厂模式解决了重复实例化的问题 ，但还有一个问题,那就是识别问题，因为根本无法 搞清楚他们到底是哪个对象的实例
  -

```
function createObject(name,age,profession){//集中实例化的函数var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.profession = profession;
    obj.move = function () {
        return this.name + ' at ' + this.age + ' engaged in ' + this.profession;
    };
    return obj;
}
var test1 = createObject('trigkit4',22,'programmer');//第一个实例var test2 = createObject('mike',25,'engineer');//第二个实例

```

- 构造函数模式

  - 使用构造函数的方法 ，即解决了重复实例化的问题 ，又解决了对象识别的问题，该模式与工厂模式的不同之处在于

- 构造函数方法没有显示的创建对象 (new Object());

- 直接将属性和方法赋值给 this 对象;

- 没有 renturn 语句

**请解释一下 JavaScript 的同源策略**

- 概念:同源策略是客户端脚本（尤其是 Javascript）的重要的安全度量标准。它最早出自 Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议
- 指一段脚本只能读取来自同一来源的窗口和文档的属性

**为什么要有同源限制？**

- 我们举例说明：比如一个黑客程序，他利用 Iframe 把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过 Javascript 读取到你的表单中 input 中的内容，这样用户名，密码就轻松到手了。
- 缺点

  - 现在网站的 JS 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge 后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节

**实现一个函数 clone，可以对 JavaScript 中的 5 种主要的数据类型（包括 Number、String、Object、Array、Boolean）进行值复制**

```
Object.prototype.clone = function(){

            var o = this.constructor === Array ? [] : {};

            for(var e in this){

                    o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];

            }

            return o;
    }

```

**说说严格模式的限制**

- 严格模式主要有以下限制：

- 变量必须声明后再使用

- 函数的参数不能有同名属性，否则报错

- 不能使用 with 语句

- 不能对只读属性赋值，否则报错

- 不能使用前缀 0 表示八进制数，否则报错

- 不能删除不可删除的属性，否则报错

- 不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]

- eval 不会在它的外层作用域引入变量

- eval 和 arguments 不能被重新赋值

- arguments 不会自动反映函数参数的变化

- 不能使用 arguments.callee

- 不能使用 arguments.caller

- 禁止 this 指向全局对象

- 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈

- 增加了保留字（比如 protected、static 和 interface）

**如何删除一个 cookie**

- 将时间设为当前时间往前一点

```
var date = new Date();

date.setDate(date.getDate() - 1);//真正的删除
```

setDate()方法用于设置一个月的某一天

- expires 的设置

```
  document.cookie = 'user='+ encodeURIComponent('name')  + ';expires = ' + new Date(0)
```

**编写一个方法 求一个字符串的字节长度**

- 假设：一个英文字符占用一个字节，一个中文字符占用两个字节

```
function GetBytes(str){

        var len = str.length;

        var bytes = len;

        for(var i=0; i<len; i++){

            if (str.charCodeAt(i) > 255) bytes++;

        }

        return bytes;

    }

alert(GetBytes("你好,as"));

```

**请解释什么是事件代理**

- 事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。使用事件代理的好处是可以提高性能

**attribute 和 property 的区别是什么？**

- attribute 是 dom 元素在文档中作为 html 标签拥有的属性；
- property 就是 dom 元素在 js 中作为对象拥有的属性。

- 对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的
- 但是对于自定义的属性来说，他们是不同步的

**页面编码和被请求的资源编码如果不一致如何处理？**

- 后端响应头设置 charset
- 前端页面`<meta>`设置 charset

**把`<script>`放在`</body>`之前和之后有什么区别？浏览器会如何解析它们？**

- 按照 HTML 标准，在`</body>`结束后出现`<script>`或任何元素的开始标签，都是解析错误
- 虽然不符合 HTML 标准，但浏览器会自动容错，使实际效果与写在`</body>`之前没有区别
- 浏览器的容错机制会忽略<script>之前的`</body>`，视作`<script>`仍在 body 体内。省略`</body>`和`</html>`闭合标签符合 HTML 标准，服务器可以利用这一标准尽可能少输出内容

**延迟加载 JS 的方式有哪些？**

- 设置`<script>`属性 defer="defer" （脚本将在页面完成解析时执行）
- 动态创建 script DOM：document.createElement('script');
- XmlHttpRequest 脚本注入
- 延迟加载工具 LazyLoad

**异步加载 JS 的方式有哪些？**

- 设置`<script>`属性 async="async" （一旦脚本可用，则会异步执行）
- 动态创建 script DOM：document.createElement('script');
- XmlHttpRequest 脚本注入
- 异步加载库 LABjs
- 模块加载器 Sea.js

**JavaScript 中，调用函数有哪几种方式？**

- 方法调用模式 Foo.foo(arg1, arg2);
- 函数调用模式 foo(arg1, arg2);
- 构造器调用模式 (new Foo())(arg1, arg2);
- call/applay 调用模式 Foo.foo.call(that, arg1, arg2);
- bind 调用模式 Foo.foo.bind(that)(arg1, arg2)();

**简单实现 Function.bind 函数？**

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(that) {
    var func = this,
      args = arguments;
    return function() {
      return func.apply(that, Array.prototype.slice.call(args, 1));
    };
  };
}
// 只支持 bind 阶段的默认参数：
func.bind(that, arg1, arg2)();

// 不支持以下调用阶段传入的参数：
func.bind(that)(arg1, arg2);
```

**列举一下 JavaScript 数组和对象有哪些原生方法？**

- 数组：

  - arr.concat(arr1, arr2, arrn);
  - arr.join(",");
  - arr.sort(func);
  - arr.pop();
  - arr.push(e1, e2, en);
  - arr.shift();
  - unshift(e1, e2, en);
  - arr.reverse();
  - arr.slice(start, end);
  - arr.splice(index, count, e1, e2, en);
  - arr.indexOf(el);
  - arr.includes(el); // ES6

- 对象：
  - object.hasOwnProperty(prop);
  - object.propertyIsEnumerable(prop);
  - object.valueOf();
  - object.toString();
  - object.toLocaleString();
  - Class.prototype.isPropertyOf(object);

**Array.splice() 与 Array.splice() 的区别？**

- slice -- “读取”数组指定的元素，不会对原数组进行修改

  - 语法：arr.slice(start, end)
  - start 指定选取开始位置（含）
  - end 指定选取结束位置（不含）

- splice

  - “操作”数组指定的元素，会修改原数组，返回被删除的元素
  - 语法：arr.splice(index, count, [insert Elements])
  - index 是操作的起始位置
  - count = 0 插入元素，count > 0 删除元素
  - [insert Elements] 向数组新插入的元素

**JavaScript 对象生命周期的理解？**

- 当创建一个对象时，JavaScript 会自动为该对象分配适当的内存
- 垃圾回收器定期扫描对象，并计算引用了该对象的其他对象的数量
- 如果被引用数量为 0，或惟一引用是循环的，那么该对象的内存即可回收

**哪些操作会造成内存泄漏？**

- JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收

- 未使用 var 声明的全局变量
- 闭包函数(Closures)
- 循环引用(两个对象相互引用)
- 控制台日志(console.log)
- 移除存在绑定事件的 DOM 元素(IE)

## js 常用函数整理

[js 常用函数整理](blog/js/js手写函数整理)

### 变量声明提升的问题

### DOM2 事件流, 冒泡和捕获问题

### this 指向问题, 一般都是在笔试题里, 拿着问你, 问的比较多

### call 和 apply 区别? 有的还会加问 bind

### jQuery 获取复选框选中状态, 为什么要用 prop 方法

### jQuery API , 各种操作 DOM 用法, 还有一些新的 API, 这种在不用 3 大框架的公司会问的

详细###

### 可能有些考算法结构的, 可以了解一下, 一般前端掌握的很少

### Ajax 基本都问, 问的细节可能不同, 比如 get 和 post 有什么区别

### 数组的方法 - es6 以下基本都能熟练使用, 应该会加分不

### 字符串的方法 - 拼接, 截取, 带些正

### ES6 的 Promise , 很多都会问. 如果公司用框架或者你写了, 还会问你 Class

### var, let, const 区别, 问的多

### 栈和队列结构, 有的会问

### 操作 DOM 的成本很高，不要轻易去操作 DOM ？vue，react 等框架，相对于操作 dom 在这方面的优势在哪里？

[参考文章 1:DOM 操作成本到底高在哪儿？](https://mp.weixin.qq.com/s/pa9mmQah-DNb9fNAYe2AvA)

Document Object Model 文档对象模型，由解析 html 的浏览器构建。

DOM 是 Model，是 Object Model，对象模型，是为 HTML（and XML）提供的 API。

前端们可以用脚本语言（JavaScript）通过 DOM 去操作 HTML 内容。当然别的语言也是可以的，Python 也可以访问 DOM。所以 DOM 不是提供给 Javascript 的 API，也不是 Javascript 里的 API。

实质上还存在**CSSOM**：CSS Object Model，**浏览器将 CSS 代码解析成树形的数据结构，与 DOM 是两个独立的数据结构。**

无论是 DOM 还是 CSSOM，都是要经过 **Bytes→characters→tokens→nodes→objectmodel**这个过程。

### 回流与重绘

#### 何时触发 reflow 和 repaint

reflow(回流): 根据 Render Tree 布局(几何属性)，意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树；

repaint(重绘): 意味着元素发生的改变只影响了节点的一些样式（背景色，边框颜色，文字颜色等），只需要应用新样式绘制这个元素就可以了；

**reflow 回流的成本开销要高于 repaint 重绘**，一个节点的回流往往回导致子节点以及同级节点的回流；

GoogleChromeLabs 里面有一个 csstriggers，列出了各个 CSS 属性对浏览器执行 Layout、Paint、Composite 的影响。

#### 引起 reflow 回流

现代浏览器会对回流做优化，**它会等到足够数量的变化发生，再做一次批处理回流**。

页面第一次渲染（初始化）

DOM 树变化（如：增删节点）

Render 树变化（如：padding 改变）

浏览器窗口 resize

**获取元素的某些属性**：

浏览器为了获得正确的值也**会提前触发回流**，这样就使得浏览器的优化失效了，这些属性包括 offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了 getComputedStyle()或者 IE 的 currentStyle

#### 引起 repaint 重绘

**reflow 回流必定引起 repaint 重绘**，重绘可以单独触发

背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）

#### 优化 reflow、repaint 触发次数

避免逐个修改节点样式，尽量一次性修改

使用 DocumentFragment 将需要多次修改的 DOM 元素缓存，最后一次性 append 到真实 DOM 中渲染

可以将需要多次修改的 DOM 元素设置 display:none，操作完再显示。（因为隐藏元素不在 render 树内，因此修改隐藏元素不会触发回流重绘）

避免多次读取某些属性（见上）

将复杂的节点元素脱离文档流，降低回流成本

### 首屏优化 Tips

说了这么多，其实可以总结几点浏览器首屏渲染优化的方向：

减少资源请求数量（内联亦或是延迟动态加载）

使 CSS 样式表尽早加载，减少@import 的使用，因为需要解析完样式表中所有 import 的资源才会算 CSS 资源下载完

异步 js：阻塞解析器的 JavaScript 会强制浏览器等待 CSSOM 并暂停 DOM 的构建，导致首次渲染的时间延迟

so on...

### css 盒子模型

### 页面加载如何优化

### url->页面加载完成的整个流程

### 优雅降级与渐进增强

### xhtml 是什么

### ajax 的优缺点

### js 组成部分

### 解释一下变量声明提升

### js 如何判断一个数组

### 阐述一下 js 严格模式

### 负载均衡你了解吗？阐述一下

### linux 环境你熟悉吗？说一些你用过的指令

### webpack 了解吗？用过哪些功能

### 对 css 预编译器有所了解吗？

### JavaScript 中的 this 指向问题

### CORS

### AJAX 的几种状态，ajax 与 fetch，hijax

### iframe 与 onload 阻塞主页面

### JS 异步加载

### IE 内存泄露

### JS 创建对象的几种方式

### JS 继承的几种方式与优缺点

### SEO

### ES6 新特性

### promise 与 generator

### 服务器推

### jQuery 相关

### js 捕获与冒泡

### drag 和 drop 实现拖拽

### cookie/session/本地存储

### 雅虎网站优化的军规

### CSS 与 JS 的阻塞加载

### Chrome / IE 浏览器事件兼容

### 图片懒加载

### 实现页面加载进度条

### 事件委托

### jsonp 原理、postMessage 原理

### 实现拖拽功能，比如把 5 个兄弟节点中的最后一个节点拖拽到节点 1 和节点 2 之间

### 手写 parseInt 的实现：要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用 JS 原

生的字符串转数字的 API，比如 Number()

### 编写分页器组件的时候，为了减少服务端查询次数，点击“下一页”怎样能确保还有数据可以加载（请求数据不会为空）？

### ES6 新增了哪些特性，使用过哪些，也有当场看代码说输出结果的

### require.js 的实现原理（如果使用过 webpack，进一步会问，两者打包的异同及优缺点）

### promise 的实现原理，进一步会问 async、await 是否使用过

### 使用前端框架（angular/vue/react）带来哪些好处，相对于使用 jQuery

### vue 双向数据绑定的实现

### 单页应用，如何实现其路由功能

### 对象拷贝

<https://github.com/wengjq/Blog/issues/3>

<https://mp.weixin.qq.com/s/scz9gRJeh7PM6GJ7wvnTsA>

<https://mp.weixin.qq.com/s/SvtRJXtquh7dJxATCIwNgw>

### 前端异步

[详解前端异步编程的六种方案](https://mp.weixin.qq.com/s/Y21LMWcEatoBvtnqvQyxXg)

## \$javascript 概念部分

### DOM 元素 e 的 e.getAttribute(propName)和 e.propName 有什么区别和联系

- e.getAttribute()，是标准 DOM 操作文档元素属性的方法，具有通用性可在任意文档上使用，返回元素在源文件中**设置的属性**
- e.propName 通常是在 HTML 文档中访问特定元素的**特性**，浏览器解析元素后生成对应对象（如 a 标签生成 HTMLAnchorElement），这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用 getAttribute 进行访问
- e.getAttribute()返回值是源文件中设置的值，类型是字符串或者 null（有的实现返回""）
- e.propName 返回值可能是字符串、布尔值、对象、undefined 等
- 大部分 attribute 与 property 是一一对应关系，修改其中一个会影响另一个，如 id，title 等属性
- 一些布尔属性`<input hidden/>`的检测设置需要 hasAttribute 和 removeAttribute 来完成，或者设置对应 property
- 像`<a href="../index.html">link</a>`中 href 属性，转换成 property 的时候需要通过转换得到完整 URL
- 一些 attribute 和 property 不是一一对应如：form 控件中`<input value="hello"/>`对应的是 defaultValue，修改或设置 value property 修改的是控件当前值，setAttribute 修改 value 属性不会改变 value property

### offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别

- offsetWidth/offsetHeight 返回值包含**content + padding + border**，效果与 e.getBoundingClientRect()相同
- clientWidth/clientHeight 返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
- scrollWidth/scrollHeight 返回值包含**content + padding + 溢出内容的尺寸**

[Measuring Element Dimension and Location with CSSOM in Windows Internet Explorer 9](<http://msdn.microsoft.com/en-us/library/ie/hh781509(v=vs.85).aspx>)

![元素尺寸](img/element-size.png)

### XMLHttpRequest 通用属性和方法

1. `readyState`:表示请求状态的整数，取值：

- UNSENT（0）：对象已创建
- OPENED（1）：open()成功调用，在这个状态下，可以为 xhr 设置请求头，或者使用 send()发送请求
- HEADERS_RECEIVED(2)：所有重定向已经自动完成访问，并且最终响应的 HTTP 头已经收到
- LOADING(3)：响应体正在接收
- DONE(4)：数据传输完成或者传输产生错误

3. `onreadystatechange`：readyState 改变时调用的函数
4. `status`：服务器返回的 HTTP 状态码（如，200， 404）
5. `statusText`:服务器返回的 HTTP 状态信息（如，OK，No Content）
6. `responseText`:作为字符串形式的来自服务器的完整响应
7. `responseXML`: Document 对象，表示服务器的响应解析成的 XML 文档
8. `abort()`:取消异步 HTTP 请求
9. `getAllResponseHeaders()`: 返回一个字符串，包含响应中服务器发送的全部 HTTP 报头。每个报头都是一个用冒号分隔开的名/值对，并且使用一个回车/换行来分隔报头行
10. `getResponseHeader(headerName)`:返回 headName 对应的报头值
11. `open(method, url, asynchronous [, user, password])`:初始化准备发送到服务器上的请求。method 是 HTTP 方法，不区分大小写；url 是请求发送的相对或绝对 URL；asynchronous 表示请求是否异步；user 和 password 提供身份验证
12. `setRequestHeader(name, value)`:设置 HTTP 报头
13. `send(body)`:对服务器请求进行初始化。参数 body 包含请求的主体部分，对于 POST 请求为键值对字符串；对于 GET 请求，为 null

### focus/blur 与 focusin/focusout 的区别与联系

1. focus/blur 不冒泡，focusin/focusout 冒泡
2. focus/blur 兼容性好，focusin/focusout 在除 FireFox 外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在 FireFox 下使用事件捕获 elem.addEventListener('focus', handler, true)
3. 可获得焦点的元素：
   1. window
   2. 链接被点击或键盘操作
   3. 表单空间被点击或键盘操作
   4. 设置`tabindex`属性的元素被点击或键盘操作

### mouseover/mouseout 与 mouseenter/mouseleave 的区别与联系

1. mouseover/mouseout 是标准事件，**所有浏览器都支持**；mouseenter/mouseleave 是 IE5.5 引入的特有事件后来被 DOM3 标准采纳，现代标准浏览器也支持
2. mouseover/mouseout 是**冒泡**事件；mouseenter/mouseleave**不冒泡**。需要为**多个元素监听鼠标移入/出事件时，推荐 mouseover/mouseout 托管，提高性能**
3. 标准事件模型中 event.target 表示发生移入/出的元素,**vent.relatedTarget**对应移出/如元素；在老 IE 中 event.srcElement 表示发生移入/出的元素，**event.toElement**表示移出的目标元素，**event.fromElement**表示移入时的来源元素

例子：鼠标从 div#target 元素移出时进行处理，判断逻辑如下：

    <div id="target"><span>test</span></div>

    <script type="text/javascript">
    var target = document.getElementById('target');
    if (target.addEventListener) {
      target.addEventListener('mouseout', mouseoutHandler, false);
    } else if (target.attachEvent) {
      target.attachEvent('onmouseout', mouseoutHandler);
    }

    function mouseoutHandler(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;

      // 判断移出鼠标的元素是否为目标元素
      if (target.id !== 'target') {
        return;
      }

      // 判断鼠标是移出元素还是移到子元素
      var relatedTarget = event.relatedTarget || e.toElement;
      while (relatedTarget !== target
        && relatedTarget.nodeName.toUpperCase() !== 'BODY') {
        relatedTarget = relatedTarget.parentNode;
      }

      // 如果相等，说明鼠标在元素内部移动
      if (relatedTarget === target) {
        return;
      }

      // 执行需要操作
      //alert('鼠标移出');

    }
    </script>

### sessionStorage,localStorage,cookie 区别

1. 都会在浏览器端保存，有大小限制，同源限制
2. cookie 会在请求时发送到服务器，作为会话标识，服务器可修改 cookie；web storage 不会发送到服务器
3. cookie 有 path 概念，子路径可以访问父路径 cookie，父路径不能访问子路径 cookie
4. 有效期：cookie 在设置的有效期内有效，默认为浏览器关闭；sessionStorage 在窗口关闭前有效，localStorage 长期有效，直到用户删除
5. 共享：sessionStorage 不能共享，localStorage 在同源文档之间共享，cookie 在同源且符合 path 规则的文档之间共享
6. localStorage 的修改会促发其他文档窗口的 update 事件
7. cookie 有 secure 属性要求 HTTPS 传输
8. 浏览器不能保存超过 300 个 cookie，单个服务器不能超过 20 个，每个 cookie 不能超过 4k。web storage 大小支持能达到 5M

### javascript 有哪几种方法定义函数

1. [函数声明表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
2. [function 操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
3. [Function 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
4. [ES6:arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions)

重要参考资料：[MDN:Functions_and_function_scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope)

### 应用程序存储和离线 web 应用

HTML5 新增应用程序缓存，允许 web 应用将应用程序自身保存到用户浏览器中，用户离线状态也能访问。 1.为 html 元素设置 manifest 属性:`<html manifest="myapp.appcache">`，其中后缀名只是一个约定，真正识别方式是通过`text/cache-manifest`作为 MIME 类型。所以需要配置服务器保证设置正确
2.manifest 文件首行为`CACHE MANIFEST`，其余就是要缓存的 URL 列表，每个一行，相对路径都相对于 manifest 文件的 url。注释以#开头
3.url 分为三种类型：`CACHE`:为默认类型。`NETWORK`：表示资源从不缓存。 `FALLBACK`:每行包含两个 url，第二个 URL 是指需要加载和存储在缓存中的资源， 第一个 URL 是一个前缀。任何匹配该前缀的 URL 都不会缓存，如果从网络中载入这样的 URL 失败的话，就会用第二个 URL 指定的缓存资源来替代。以下是一个文件例子：

```
CACHE MANIFEST

CACHE:
myapp.html
myapp.css
myapp.js

FALLBACK:
videos/ offline_help.html

NETWORK:
cgi/
```

### 客户端存储 localStorage 和 sessionStorage

- localStorage 有效期为永久，sessionStorage 有效期为顶层窗口关闭前
- 同源文档可以读取并修改 localStorage 数据，sessionStorage 只允许同一个窗口下的文档访问，如通过 iframe 引入的同源文档。
- Storage 对象通常被当做普通 javascript 对象使用：**通过设置属性来存取字符串值**，也可以通过**setItem(key, value)设置**，**getItem(key)读取**，**removeItem(key)删除**，**clear()删除所有数据**，**length 表示已存储的数据项数目**，**key(index)返回对应索引的 key**

```
localStorage.setItem('x', 1); // storge x->1
localStorage.getItem('x); // return value of x

// 枚举所有存储的键值对
for (var i = 0, len = localStorage.length; i < len; ++i ) {
    var name = localStorage.key(i);
    var value = localStorage.getItem(name);
}

localStorage.removeItem('x'); // remove x
localStorage.clear();  // remove all data
```

### cookie 及其操作

- cookie 是 web 浏览器存储的少量数据，最早设计为服务器端使用，作为 HTTP 协议的扩展实现。cookie 数据会自动在浏览器和服务器之间传输。
- 通过读写 cookie 检测是否支持
- cookie 属性有**名**，**值**，**max-age**，**path**, **domain**，**secure**；
- cookie 默认有效期为浏览器会话，一旦用户关闭浏览器，数据就丢失，通过设置**max-age=seconds**属性告诉浏览器 cookie 有效期
- cookie 作用域通过**文档源**和**文档路径**来确定，通过**path**和**domain**进行配置，web 页面同目录或子目录文档都可访问
- 通过 cookie 保存数据的方法为：为 document.cookie 设置一个符合目标的字符串如下
- 读取 document.cookie 获得'; '分隔的字符串，key=value,解析得到结果

```
document.cookie = 'name=qiu; max-age=9999; path=/; domain=domain; secure';

document.cookie = 'name=aaa; path=/; domain=domain; secure';
// 要改变cookie的值，需要使用相同的名字、路径和域，新的值
// 来设置cookie，同样的方法可以用来改变有效期

// 设置max-age为0可以删除指定cookie

//读取cookie，访问document.cookie返回键值对组成的字符串，
//不同键值对之间用'; '分隔。通过解析获得需要的值
```

[cookieUtil.js](https://github.com/qiu-deqing/google/blob/master/module/js/cookieUtil.js)：自己写的 cookie 操作工具

### javascript 有哪些方法定义对象

1. 对象字面量： `var obj = {};`
2. 构造函数： `var obj = new Object();`
3. Object.create(): `var obj = Object.create(Object.prototype);`

### ===运算符判断相等的流程是怎样的

1. 如果两个值不是相同类型，它们不相等
2. 如果两个值都是 null 或者都是 undefined，它们相等
3. 如果两个值都是布尔类型 true 或者都是 false，它们相等
4. 如果其中有一个是**NaN**，它们不相等
5. 如果都是数值型并且数值相等，他们相等， -0 等于 0
6. 如果他们都是字符串并且在相同位置包含相同的 16 位值，他它们相等；如果在长度或者内容上不等，它们不相等；两个字符串显示结果相同但是编码不同==和===都认为他们不相等
7. 如果他们指向相同对象、数组、函数，它们相等；如果指向不同对象，他们不相等

### ==运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照===比较方法进行比较
2. 如果类型不同，使用如下规则进行比较
3. 如果其中一个值是 null，另一个是 undefined，它们相等
4. 如果一个值是**数字**另一个是**字符串**，将**字符串转换为数字**进行比较
5. 如果有布尔类型，将**true 转换为 1，false 转换为 0**，然后用==规则继续比较
6. 如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较
7. **其他所有情况都认为不相等**

### 对象到字符串的转换步骤

1. 如果对象有 toString()方法，javascript 调用它。如果返回一个原始值（primitive value 如：string number boolean）,将这个值转换为字符串作为结果
2. 如果对象没有 toString()方法或者返回值不是原始值，javascript 寻找对象的 valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3. 否则，javascript 不能从 toString()或者 valueOf()获得一个原始值，此时 throws a TypeError

### 对象到数字的转换步骤

    1. 如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果
    2. 否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果
    3. 否则，throws a TypeError

### <,>,<=,>=的比较规则

所有比较运算符都支持任意类型，但是**比较只支持数字和字符串**，所以需要执行必要的转换然后进行比较，转换规则如下:

1. 如果操作数是对象，转换为原始值：如果 valueOf 方法返回原始值，则使用这个值，否则使用 toString 方法的结果，如果转换失败则报错
2. 经过必要的对象到原始值的转换后，如果两个操作数都是字符串，按照字母顺序进行比较（他们的 16 位 unicode 值的大小）
3. 否则，如果有一个操作数不是字符串，**将两个操作数转换为数字**进行比较

### +运算符工作流程

1. 如果有操作数是对象，转换为原始值
2. 此时如果有**一个操作数是字符串**，其他的操作数都转换为字符串并执行连接
3. 否则：**所有操作数都转换为数字并执行加法**

### 函数内部 arguments 变量有哪些特性,有哪些属性,如何将它转换为数组

- arguments 所有函数中都包含的一个局部变量，是一个类数组对象，对应函数调用时的实参。如果函数定义同名参数会在调用时覆盖默认对象
- arguments[index]分别对应函数调用时的实参，并且通过 arguments 修改实参时会同时修改实参
- arguments.length 为实参的个数（Function.length 表示形参长度）
- arguments.callee 为当前正在执行的函数本身，使用这个属性进行递归调用时需注意 this 的变化
- arguments.caller 为调用当前函数的函数（已被遗弃）
- 转换为数组：<code>var args = Array.prototype.slice.call(arguments, 0);</code>

### DOM 事件模型是如何的,编写一个 EventUtil 工具类实现事件管理兼容

- DOM 事件包含捕获（capture）和冒泡（bubble）两个阶段：捕获阶段事件从 window 开始触发事件然后通过祖先节点一次传递到触发事件的 DOM 元素上；冒泡阶段事件从初始元素依次向祖先节点传递直到 window
- 标准事件监听 elem.addEventListener(type, handler, capture)/elem.removeEventListener(type, handler, capture)：handler 接收保存事件信息的 event 对象作为参数，event.target 为触发事件的对象，handler 调用上下文 this 为绑定监听器的对象，event.preventDefault()取消事件默认行为，event.stopPropagation()/event.stopImmediatePropagation()取消事件传递
- 老版本 IE 事件监听 elem.attachEvent('on'+type, handler)/elem.detachEvent('on'+type, handler)：handler 不接收 event 作为参数，事件信息保存在 window.event 中，触发事件的对象为 event.srcElement，handler 执行上下文 this 为 window 使用闭包中调用 handler.call(elem, event)可模仿标准模型，然后返回闭包，保证了监听器的移除。event.returnValue 为 false 时取消事件默认行为，event.cancleBubble 为 true 时取消时间传播
- 通常利用事件冒泡机制托管事件处理程序提高程序性能。

```js
/**
 * 跨浏览器事件处理工具。只支持冒泡。不支持捕获
 * @author  (qiu_deqing@126.com)
 */

var EventUtil = {
  getEvent: function(event) {
    return event || window.event;
  },
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  // 返回注册成功的监听器，IE中需要使用返回值来移除监听器
  on: function(elem, type, handler) {
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
      return handler;
    } else if (elem.attachEvent) {
      var wrapper = function() {
        var event = window.event;
        event.target = event.srcElement;
        handler.call(elem, event);
      };
      elem.attachEvent('on' + type, wrapper);
      return wrapper;
    }
  },
  off: function(elem, type, handler) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, handler);
    }
  },
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else if ('returnValue' in event) {
      event.returnValue = false;
    }
  },
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else if ('cancelBubble' in event) {
      event.cancelBubble = true;
    }
  },
  /**
   * keypress事件跨浏览器获取输入字符
   * 某些浏览器在一些特殊键上也触发keypress，此时返回null
   **/
  getChar: function(event) {
    if (event.which == null) {
      return String.fromCharCode(event.keyCode); // IE
    } else if (event.which != 0 && event.charCode != 0) {
      return String.fromCharCode(event.which); // the rest
    } else {
      return null; // special key
    }
  },
};
```

## \$javascript 编程部分

### 请用原生 js 实现一个函数,给页面制定的任意一个元素添加一个透明遮罩(透明度可变,默认 0.2),使这个区域点击无效,要求兼容 IE8+及各主流浏览器,遮罩层效果如下图所示

![遮罩效果](img/element-mask.jpg)

```
<style>
#target {
    width: 200px;
    height: 300px;
    margin: 40px;
    background-color: tomato;
}
</style>

<div id="target"></div>

<script>
function addMask(elem, opacity) {
    opacity = opacity || 0.2;

    var rect = elem.getBoundingClientRect();
    var style = getComputedStyle(elem, null);

    var mask = document.createElement('div');
    mask.style.position = 'absolute';
    var marginLeft = parseFloat(style.marginLeft);
    mask.style.left = (elem.offsetLeft - marginLeft) + 'px';
    var marginTop = parseFloat(style.marginTop);
    mask.style.top = (elem.offsetTop - marginTop) + 'px';
    mask.style.zIndex = 9999;
    mask.style.opacity = '' + opacity;
    mask.style.backgroundColor = '#000';

    mask.style.width = (parseFloat(style.marginLeft) +
        parseFloat(style.marginRight) + rect.width) + 'px';
    mask.style.height = (parseFloat(style.marginTop) +
        parseFloat(style.marginBottom) + rect.height) + 'px';

    elem.parentNode.appendChild(mask);
}

var target = document.getElementById('target');
addMask(target);

target.addEventListener('click', function () {
    console.log('click');
}, false);
</script>
```

### 请用代码写出(今天是星期 x)其中 x 表示当天是星期几,如果当天是星期一,输出应该是"今天是星期一"

```
var days = ['日','一','二','三','四','五','六'];
var date = new Date();

console.log('今天是星期' + days[date.getDay()]);
```

### 下面这段代码想要循环延时输出结果 0 1 2 3 4,请问输出结果是否正确,如果不正确,请说明为什么,并修改循环内的代码使其输出正确结果

```js
for (var i = 0; i < 5; ++i) {
  setTimeout(function() {
    console.log(i + ' ');
  }, 100);
}
```

不能输出正确结果，因为循环中 setTimeout 接受的参数函数通过闭包访问变量 i。javascript 运行环境为单线程，setTimeout 注册的函数需要等待线程空闲才能执行，此时 for 循环已经结束，i 值为 5.五个定时输出都是 5
修改方法：将 setTimeout 放在函数立即调用表达式中，将 i 值作为参数传递给包裹函数，创建新闭包

```js
for (var i = 0; i < 5; ++i) {
  (function(i) {
    setTimeout(function() {
      console.log(i + ' ');
    }, 100);
  })(i);
}
```

### 现有一个 Page 类,其原型对象上有许多以 post 开头的方法(如 postMsg);另有一拦截函数 chekc,只返回 ture 或 false.请设计一个函数,该函数应批量改造原 Page 的 postXXX 方法,在保留其原有功能的同时,为每个 postXXX 方法增加拦截验证功能,当 chekc 返回 true 时继续执行原 postXXX 方法,返回 false 时不再执行原 postXXX 方法

```
function Page() {}

Page.prototype = {
  constructor: Page,

  postA: function (a) {
    console.log('a:' + a);
  },
  postB: function (b) {
    console.log('b:' + b);
  },
  postC: function (c) {
    console.log('c:' + c);
  },
  check: function () {
    return Math.random() > 0.5;
  }
}

function checkfy(obj) {
  for (var key in obj) {
    if (key.indexOf('post') === 0 && typeof obj[key] === 'function') {
      (function (key) {
        var fn = obj[key];
        obj[key] = function () {
          if (obj.check()) {
            fn.apply(obj, arguments);
          }
        };
      }(key));
    }
  }
} // end checkfy()

checkfy(Page.prototype);

var obj = new Page();

obj.postA('checkfy');
obj.postB('checkfy');
obj.postC('checkfy');
```

### 完成下面的 tool-tip

![xxx](img/tip-box.jpg)

### 编写 javascript 深度克隆函数 deepClone

    function deepClone(obj) {
        var _toString = Object.prototype.toString;

        // null, undefined, non-object, function
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        // DOM Node
        if (obj.nodeType && 'cloneNode' in obj) {
            return obj.cloneNode(true);
        }

        // Date
        if (_toString.call(obj) === '[object Date]') {
            return new Date(obj.getTime());
        }

        // RegExp
        if (_toString.call(obj) === '[object RegExp]') {
            var flags = [];
            if (obj.global) { flags.push('g'); }
            if (obj.multiline) { flags.push('m'); }
            if (obj.ignoreCase) { flags.push('i'); }

            return new RegExp(obj.source, flags.join(''));
        }

        var result = Array.isArray(obj) ? [] :
            obj.constructor ? new obj.constructor() : {};

        for (var key in obj ) {
            result[key] = deepClone(obj[key]);
        }

        return result;
    }

    function A() {
        this.a = a;
    }

    var a = {
        name: 'qiu',
        birth: new Date(),
        pattern: /qiu/gim,
        container: document.body,
        hobbys: ['book', new Date(), /aaa/gim, 111]
    };

    var c = new A();
    var b = deepClone(c);
    console.log(c.a === b.a);
    console.log(c, b);

### 补充代码,鼠标单击 Button1 后将 Button1 移动到 Button2 的后面

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>TEst</title>
    </head>
    <body>

    <div>
       <input type="button" id ="button1" value="1" />
       <input type="button" id ="button2" value="2" />
    </div>

    <script type="text/javascript">
        var btn1 = document.getElementById('button1');
        var btn2 = document.getElementById('button2');

        addListener(btn1, 'click', function (event) {
            btn1.parentNode.insertBefore(btn2, btn1);
        });

        function addListener(elem, type, handler) {
            if (elem.addEventListener) {
                elem.addEventListener(type, handler, false);
                return handler;
            } else if (elem.attachEvent) {
                function wrapper() {
                    var event = window.event;
                    event.target = event.srcElement;
                    handler.call(elem, event);
                }
                elem.attachEvent('on' + type, wrapper);
                return wrapper;
            }
        }

    </script>
    </body>
    </html>

### 网页中实现一个计算当年还剩多少时间的倒数计时程序,要求网页上实时动态显示"×× 年还剩 ×× 天 ×× 时 ×× 分 ×× 秒"

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>TEst</title>
    </head>
    <body>

        <span id="target"></span>


    <script type="text/javascript">
        // 为了简化。每月默认30天
        function getTimeString() {
            var start = new Date();
            var end = new Date(start.getFullYear() + 1, 0, 1);
            var elapse = Math.floor((end - start) / 1000);

            var seconds = elapse % 60 ;
            var minutes = Math.floor(elapse / 60) % 60;
            var hours = Math.floor(elapse / (60 * 60)) % 24;
            var days = Math.floor(elapse / (60 * 60 * 24)) % 30;
            var months = Math.floor(elapse / (60 * 60 * 24 * 30)) % 12;
            var years = Math.floor(elapse / (60 * 60 * 24 * 30 * 12));

            return start.getFullYear() + '年还剩' + years + '年' + months + '月' + days + '日'
                + hours + '小时' + minutes + '分' + seconds + '秒';
        }

        function domText(elem, text) {
            if (text == undefined) {

                if (elem.textContent) {
                    return elem.textContent;
                } else if (elem.innerText) {
                    return elem.innerText;
                }
            } else {
                if (elem.textContent) {
                    elem.textContent = text;
                } else if (elem.innerText) {
                    elem.innerText = text;
                } else {
                    elem.innerHTML = text;
                }
            }
        }

        var target = document.getElementById('target');

        setInterval(function () {
            domText(target, getTimeString());
        }, 1000)
    </script>

    </body>
    </html>

### 完成一个函数,接受数组作为参数,数组元素为整数或者数组,数组元素包含整数或数组,函数返回扁平化后的数组

如：[1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]

```
    var data =  [1, [2, [ [3, 4], 5], 6]];

    function flat(data, result) {
        var i, d, len;
        for (i = 0, len = data.length; i < len; ++i) {
            d = data[i];
            if (typeof d === 'number') {
                result.push(d);
            } else {
                flat(d, result);
            }
        }
    }

    var result = [];
    flat(data, result);

    console.log(result);
```

### 如何判断一个对象是否为数组

如果浏览器支持 Array.isArray()可以直接判断否则需进行必要判断

```
/**
 * 判断一个对象是否是数组，参数不是对象或者不是数组，返回false
 *
 * @param {Object} arg 需要测试是否为数组的对象
 * @return {Boolean} 传入参数是数组返回true，否则返回false
 */
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}
```

### 请评价以下事件监听器代码并给出改进意见

```
if (window.addEventListener) {
  var addListener = function (el, type, listener, useCapture) {
    el.addEventListener(type, listener, useCapture);
  };
}
else if (document.all) {
  addListener = function (el, type, listener) {
    el.attachEvent('on' + type, function () {
      listener.apply(el);
    });
  };
}
```

作用：浏览器功能检测实现跨浏览器 DOM 事件绑定

优点：

1. 测试代码只运行一次，根据浏览器确定绑定方法
2. 通过`listener.apply(el)`解决 IE 下监听器 this 与标准不一致的地方
3. 在浏览器不支持的情况下提供简单的功能，在标准浏览器中提供捕获功能

缺点：

1. document.all 作为 IE 检测不可靠，应该使用 if(el.attachEvent)
2. addListener 在不同浏览器下 API 不一样
3. `listener.apply`使 this 与标准一致但监听器无法移除
4. 未解决 IE 下 listener 参数 event。 target 问题

改进:

```
var addListener;

if (window.addEventListener) {
  addListener = function (el, type, listener, useCapture) {
    el.addEventListener(type, listener, useCapture);
    return listener;
  };
}
else if (window.attachEvent) {
  addListener = function (el, type, listener) {
    // 标准化this，event，target
    var wrapper = function () {
      var event = window.event;
      event.target = event.srcElement;
      listener.call(el, event);
    };

    el.attachEvent('on' + type, wrapper);
    return wrapper;
    // 返回wrapper。调用者可以保存，以后remove
  };
}
```

### 如何判断一个对象是否为函数

```
/**
 * 判断对象是否为函数，如果当前运行环境对可调用对象（如正则表达式）
 * 的typeof返回'function'，采用通用方法，否则采用优化方法
 *
 * @param {Any} arg 需要检测是否为函数的对象
 * @return {boolean} 如果参数是函数，返回true，否则false
 */
function isFunction(arg) {
    if (arg) {
        if (typeof (/./) !== 'function') {
            return typeof arg === 'function';
        } else {
            return Object.prototype.toString.call(arg) === '[object Function]';
        }
    } // end if
    return false;
}
```

### 编写一个函数接受 url 中 query string 为参数,返回解析后的 Object,query string 使用 application/x-www-form-urlencoded 编码

```
/**
 * 解析query string转换为对象，一个key有多个值时生成数组
 *
 * @param {String} query 需要解析的query字符串，开头可以是?，
 * 按照application/x-www-form-urlencoded编码
 * @return {Object} 参数解析后的对象
 */
function parseQuery(query) {
    var result = {};

    // 如果不是字符串返回空对象
    if (typeof query !== 'string') {
        return result;
    }

    // 去掉字符串开头可能带的?
    if (query.charAt(0) === '?') {
        query = query.substring(1);
    }

    var pairs = query.split('&');
    var pair;
    var key, value;
    var i, len;

    for (i = 0, len = pairs.length; i < len; ++i) {
        pair = pairs[i].split('=');
        // application/x-www-form-urlencoded编码会将' '转换为+
        key = decodeURIComponent(pair[0]).replace(/\+/g, ' ');
        value = decodeURIComponent(pair[1]).replace(/\+/g, ' ');

        // 如果是新key，直接添加
        if (!(key in result)) {
            result[key] = value;
        }
        // 如果key已经出现一次以上，直接向数组添加value
        else if (isArray(result[key])) {
            result[key].push(value);
        }
        // key第二次出现，将结果改为数组
        else {
            var arr = [result[key]];
            arr.push(value);
            result[key] = arr;
        } // end if-else
    } // end for

    return result;
}

function isArray(arg) {
    if (arg && typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}
/**
console.log(parseQuery('sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8'));
 */
```

### 解析一个完整的 url,返回 Object 包含域与 window.location 相同

```
/**
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      username: '用户名', // 暂时不支持
 *      password: '密码',  // 暂时不支持
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */
function parseUrl(url) {
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

    var match = regexp.exec(url);

    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }

    return result;
}
```

### 完成函数 getViewportSize 返回指定窗口的视口尺寸

```
/**
* 查询指定窗口的视口尺寸，如果不指定窗口，查询当前窗口尺寸
**/
function getViewportSize(w) {
    w = w || window;

    // IE9及标准浏览器中可使用此标准方法
    if ('innerHeight' in w) {
        return {
            width: w.innerWidth,
            height: w.innerHeight
        };
    }

    var d = w.document;
    // IE 8及以下浏览器在标准模式下
    if (document.compatMode === 'CSS1Compat') {
        return {
            width: d.documentElement.clientWidth,
            height: d.documentElement.clientHeight
        };
    }

    // IE8及以下浏览器在怪癖模式下
    return {
        width: d.body.clientWidth,
        height: d.body.clientHeight
    };
}
```

### 完成函数 getScrollOffset 返回窗口滚动条偏移量

    /**
     * 获取指定window中滚动条的偏移量，如未指定则获取当前window
     * 滚动条偏移量
     *
     * @param {window} w 需要获取滚动条偏移量的窗口
     * @return {Object} obj.x为水平滚动条偏移量,obj.y为竖直滚动条偏移量
     */
    function getScrollOffset(w) {
        w =  w || window;
        // 如果是标准浏览器
        if (w.pageXOffset != null) {
            return {
                x: w.pageXOffset,
                y: w.pageYOffset
            };
        }

        // 老版本IE，根据兼容性不同访问不同元素
        var d = w.document;
        if (d.compatMode === 'CSS1Compat') {
            return {
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop
            }
        }

        return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        };
    }

### 现有一个字符串 richText,是一段富文本,需要显示在页面上.有个要求,需要给其中只包含一个 img 元素的 p 标签增加一个叫 pic 的 class.请编写代码实现.可以使用 jQuery 或 KISSY

    function richText(text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        var p = div.getElementsByTagName('p');
        var i, len;

        for (i = 0, len = p.length; i < len; ++i) {
            if (p[i].getElementsByTagName('img').length === 1) {
                p[i].classList.add('pic');
            }
        }

        return div.innerHTML;
    }

### 请实现一个 Event 类,继承自此类的对象都会拥有两个方法 on,off,once 和 trigger

    function Event() {
        if (!(this instanceof Event)) {
            return new Event();
        }
        this._callbacks = {};
    }
    Event.prototype.on = function (type, handler) {
        this_callbacks = this._callbacks || {};
        this._callbacks[type] = this.callbacks[type] || [];
        this._callbacks[type].push(handler);

        return this;
    };

    Event.prototype.off = function (type, handler) {
        var list = this._callbacks[type];

        if (list) {
            for (var i = list.length; i >= 0; --i) {
                if (list[i] === handler) {
                    list.splice(i, 1);
                }
            }
        }

        return this;
    };

    Event.prototype.trigger = function (type, data) {
        var list = this._callbacks[type];

        if (list) {
            for (var i = 0, len = list.length; i < len; ++i) {
                list[i].call(this, data);
            }
        }
    };

    Event.prototype.once = function (type, handler) {
        var self = this;

        function wrapper() {
            handler.apply(self, arguments);
            self.off(type, wrapper);
        }
        this.on(type, wrapper);
        return this;
    };

### 编写一个函数将列表子元素顺序反转

```
<ul id="target">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>

<script>
    var target = document.getElementById('target');
    var i;
    var frag = document.createDocumentFragment();

    for (i = target.children.length - 1; i &gt;= 0; --i) {
        frag.appendChild(target.children[i]);
    }
    target.appendChild(frag);
</script>
```

### 以下函数的作用是?空白区域应该填写什么

```
// define
(function (window) {
    function fn(str) {
        this.str = str;
    }

    fn.prototype.format = function () {
        var arg = __1__;
        return this.str.replace(__2__, function (a, b) {
            return arg[b] || '';
        });
    };

    window.fn = fn;
})(window);

// use
(function () {
    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
    console.log(t.format('http://www.alibaba.com', 'Alibaba', 'Welcome'));
})();
```

define 部分定义一个简单的模板类，使用{}作为转义标记，中间的数字表示替换目标，format 实参用来替换模板内标记
横线处填：

1. `Array.prototype.slice.call(arguments, 0)`
2. `/\{\s*(\d+)\s*\}/g`

### 编写一个函数实现 form 的序列化(即将一个表单中的键值序列化为可提交的字符串)

    <form id="target">
        <select name="age">
            <option value="aaa">aaa</option>
            <option value="bbb" selected>bbb</option>
        </select>
        <select name="friends" multiple>
            <option value="qiu" selected>qiu</option>
            <option value="de">de</option>
            <option value="qing" selected>qing</option>
        </select>
        <input name="name" value="qiudeqing">
        <input type="password" name="password" value="11111">
        <input type="hidden" name="salery" value="3333">
        <textarea name="description">description</textarea>
        <input type="checkbox" name="hobby" checked value="football">Football
        <input type="checkbox" name="hobby" value="basketball">Basketball
        <input type="radio" name="sex" checked value="Female">Female
        <input type="radio" name="sex" value="Male">Male
    </form>


    <script>

    /**
     * 将一个表单元素序列化为可提交的字符串
     *
     * @param {FormElement} form 需要序列化的表单元素
     * @return {string} 表单序列化后的字符串
     */
    function serializeForm(form) {
      if (!form || form.nodeName.toUpperCase() !== 'FORM') {
        return;
      }

      var result = [];

      var i, len;
      var field, fieldName, fieldType;

      for (i = 0, len = form.length; i < len; ++i) {
        field = form.elements[i];
        fieldName = field.name;
        fieldType = field.type;

        if (field.disabled || !fieldName) {
          continue;
        } // enf if

        switch (fieldType) {
          case 'text':
          case 'password':
          case 'hidden':
          case 'textarea':
            result.push(encodeURIComponent(fieldName) + '=' +
                encodeURIComponent(field.value));
            break;

          case 'radio':
          case 'checkbox':
            if (field.checked) {
              result.push(encodeURIComponent(fieldName) + '=' +
                encodeURIComponent(field.value));
            }
            break;

          case 'select-one':
          case 'select-multiple':
            for (var j = 0, jLen = field.options.length; j < jLen; ++j) {
              if (field.options[j].selected) {
                result.push(encodeURIComponent(fieldName) + '=' +
                  encodeURIComponent(field.options[j].value || field.options[j].text));
              }
            } // end for
            break;

          case 'file':
          case 'submit':
            break; // 是否处理？

          default:
            break;
        } // end switch
      } // end for

        return result.join('&');
    }

    var form = document.getElementById('target');
    console.log(serializeForm(form));
    </script>

### 使用原生 javascript 给下面列表中的 li 节点绑定点击事件,点击时创建一个 Object 对象,兼容 IE 和标准浏览器

```
<ul id="nav">
    <li><a href="http://11111">111</a></li>
    <li><a href="http://2222">222</a></li>
    <li><a href="http://333">333</a></li>
    <li><a href="http://444">444</a></li>
</ul>

Object:
{
    "index": 1,
    "name": "111",
    "link": "http://1111"
}
```

script:

```
var EventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // 返回注册成功的监听器，IE中需要使用返回值来移除监听器
    on: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
            return handler;
        } else if (elem.attachEvent) {
            function wrapper(event) {
                return handler.call(elem, event);
            };
            elem.attachEvent('on' + type, wrapper);
            return wrapper;
        }
    },
    off: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else if ('returnValue' in event) {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else if ('cancelBubble' in event) {
            event.cancelBubble = true;
        }
    }
};
var DOMUtil = {
    text: function (elem) {
        if ('textContent' in elem) {
            return elem.textContent;
        } else if ('innerText' in elem) {
            return elem.innerText;
        }
    },
    prop: function (elem, propName) {
        return elem.getAttribute(propName);
    }
};

var nav = document.getElementById('nav');

EventUtil.on(nav, 'click', function (event) {
    var event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    var children = this.children;
    var i, len;
    var anchor;
    var obj = {};

    for (i = 0, len = children.length; i < len; ++i) {
        if (children[i] === target) {
            obj.index = i + 1;
            anchor = target.getElementsByTagName('a')[0];
            obj.name = DOMUtil.text(anchor);
            obj.link = DOMUtil.prop(anchor, 'href');
        }
    }

    alert('index: ' + obj.index + ' name: ' + obj.name +
        ' link: ' + obj.link);
});
```

10，写出 3 个使用 this 的典型应用

1. 事件引用当前的元素；
2. 函数的 this 拿到当前的执行上下文环境；
3. 构造函数创建对象。

21，请编写一个 JavaScript 函数 parseQueryString，它的用途是把 URL 参数解析为一个对象，如：
正则匹配
function parseQueryString(argu){
  var str = argu.split['?'](1);
  var result = {};
  var temp = str.split('&');
  for(var i=0; i<temp.length; i++)
  {
     var temp2 = temp[i].split('=');
     result[temp2[0]] = temp2[1];
  }
  return result;
}

# js 笔试面试题

### 1. 实现一个 bind 函数

借助于 apply 方法实现 bind 函数

```
//编写函数
function bindThis (func, context) {
    return function () {
        return func.apply(context, arguments);
    }
}
// 调用，生成bind函数
var newFunc = bindThis(function(a, b){
 return this.test + a + b
}, {test: 1});
// 使用bind函数
newFunc(2, 3);
```

### 2. 解析 url 参数（借助 location 对象）

```
//借助于浏览器内置的方法，a标签的href属性
function parseURL(url) {
  var a =  document.createElement('a');
  a.href = url;
  return {
   source: url,
   protocol: a.protocol.replace(':',''),
   host: a.hostname,
   port: a.port,
   query: a.search,
  params: (function(){
       var ret = {},
         seg = a.search.replace(/^\?/,'').split('&'),
         len = seg.length, i = 0, s;
      for (;i<len;i++) {
           if (!seg[i]) { continue; }
           s = seg[i].split('=');
           ret[s[0]] = s[1];
       }
       return ret;
   })(),
   file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
   hash: a.hash.replace('#',''),
   path: a.pathname.replace(/^([^\/])/,'/$1'),
   relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
   segments: a.pathname.replace(/^\//,'').split('/')
  };
}
var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
//var myURL = parseURL('http://localhost:8080/test/mytest/toLogina.ction?m=123&pid=abc');
console.log(myURL);
```

### 3. 共同节点查找（查找算法）

```
// 总共有三种情况，1包含2， 2包含1， 1与2平级
function commonParentNode(oNode1, oNode2) {
    if(oNode1.contains(oNode2)){
        return oNode1;
    }else{
        return arguments.callee(oNode1.parentNode,oNode2);
    }
}
```

### 4. 数组去重算法

1. ES6 语法 set 数据结构

   ```
   Array.prototype.uniq = function (arr) {
    return [...new Set(arr)]
   };
   ```

2. 生成新的数组，（具体的细节，数据类型还需要深刻讨论，null，NaN，Data 对象，对象类型等）

   ```
   Array.prototype.uniq = function () {
      var resArr = [];
      var flag = true;

      for(var i=0;i<this.length;i++){
          if(resArr.indexOf(this[i]) == -1){
              if(this[i] != this[i]){   //排除 NaN ，只需要排除NaN就好了 ,这里是判断指向同一个位置，或者同一个数是否相等。
                 if(flag){
                      resArr.push(this[i]);
                      flag = false;
                 }
              }else{
                   resArr.push(this[i]);
              }
          }
      }
       return resArr;
   }
   ```

### 6. 格式化时间

```
function formatDate(t,str){
    var obj = {
        yyyy:t.getFullYear(),//返回年份
        yy:(""+ t.getFullYear()).slice(-2),//返回四位年份的后两位
        M:t.getMonth()+1,//返回月份，需要加1
        MM:("0"+ (t.getMonth()+1)).slice(-2),//机智，如果本来就是两位就会变成三围，截取后两位，依然是两位表示。
        d:t.getDate(),//返回是几号
        dd:("0" + t.getDate()).slice(-2),
        H:t.getHours(),//返回小时数，24小时计算
        HH:("0" + t.getHours()).slice(-2),
        h:t.getHours() % 12,//返回十二小时计
        hh:("0"+t.getHours() % 12).slice(-2),
        m:t.getMinutes(),//返回分钟数
        mm:("0" + t.getMinutes()).slice(-2),
        s:t.getSeconds(),//返回秒数
        ss:("0" + t.getSeconds()).slice(-2),
        w:['日', '一', '二', '三', '四', '五', '六'][t.getDay()] //这里的getDay()方法返回的是0到6表示的数字，所以可以这样来表示星期几。
    };
    return str.replace(/([a-z]+)/ig,function($1){return obj[$1]}); //依次更改匹配到的连着的字符串
}
// 测试
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w');
```

### 7. 颜色值转换函数

```
function rgb2hex(sRGB) {
    var regexp=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    var ret=sRGB.match(regexp);
    if(!ret){
        return sRGB;
    }else{
        var str='#';
        for(var i=1;i<=3;i++){
            var m=parseInt(ret[i]);
            if(m<=255&&m>=0){
             // 十进制转16进制
                str+=(m<16?'0'+m.toString(16):m.toString(16));
            }else{
                return sRGB;
            }
        }
        return str;
    }
}
rgb2hex('rgb(255, 255, 255)')
#ffffff
```

### 8. 横杠转驼峰

```
function cssStyle2DomStyle(sName) {
    var reg1 = /^-/g;
    var newsName = sName.replace(reg1,'');
    var reg = /-(\w)/g;
    return newsName.replace(reg,function($,$1){
        return $1.toUpperCase();
    })
}
cssStyle2DomStyle('font-size')
fontSize
```

### 考察 this

```
var length = 10;
function fn() {
 console.log(this.length);
}
var obj = {
    length: 5,
    method: function(fn) {
        fn();
        arguments[0]();
    }
};
obj.method(fn, 1);
// 输出：10 2
// 第一次输出10应该没有问题。我们知道取对象属于除了点操作符还可以用中括号，
// 所以第二次执行时相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2。
```

## js 的类型检测

typeof 的结果有: 'number', 'string', 'object', 'undefined', 'boolean', 'function';
实际的 js 类型有: string, number, boolean, undefined, null, object;

### 检测 json 类型对象

### 检测数组

## 严格模式 'use strict

### 在 JavaScript 源文件的开头包含'use strict'的意义和有什么好处？

这里最简单也是最重要的答案是 use strict 是一种在运行时自动执行更严格的 JavaScript 代码解析和错误处理的方法。如果代码错误被忽略或失败，将会产生错误或抛出异常。总的来说，这是一个很好的做法。

严格模式的一些主要优点包括：

- 使调试更容易。 如果代码错误本来会被忽略或失败，那么现在将会产生错误或抛出异常，从而更快地发现代码中的问题，并更快地指引它们的源代码。

- 防止意外全局。 如果没有严格模式，将值赋给未声明的变量会自动创建一个具有该名称的全局变量。这是 JavaScript 中最常见的错误之一。在严格模式下，尝试这样做会引发错误。

- 消除隐藏威胁。在没有严格模式的情况下，对 null 或 undefined 的这个值的引用会自动强制到全局。这可能会导致许多 headfakes 和 pull-out-your-hair 类型的错误。在严格模式下，引用 null 或 undefined 的这个值会引发错误。

- 不允许重复的参数值。 严格模式在检测到函数的重复命名参数（例如，函数 foo（val1，val2，val1）{}）时会引发错误，从而捕获代码中几乎可以肯定存在的错误，否则您可能会浪费大量的时间追踪。

注意：它曾经是（在 ECMAScript 5 中）strict 模式将禁止重复的属性名称（例如 var object = {foo：“bar”，foo：“baz”};）但是从 ECMAScript 2015 开始，就不再有这种情况了。

- 使 eval()更安全。 eval()在严格模式和非严格模式下的行为方式有些不同。最重要的是，在严格模式下，在 eval()语句内部声明的变量和函数不会在包含范围中创建（它们是以非严格模式在包含范围中创建的，这也可能是问题的常见来源）。

- 抛出无效的使用错误的删除符。 删除操作符（用于从对象中删除属性）不能用于对象的不可配置属性。当试图删除一个不可配置的属性时，非严格代码将自动失败，而在这种情况下，严格模式会引发错误。

## Number 相关

### 浮点数相加的问题

一个典型的解决方案是比较两个数字与特殊常数 Number.EPSILON 之间的绝对差值：

```
function areTheNumbersAlmostEqual(num1, num2) {
  return Math.abs( num1 - num2 ) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));
```

# Interview questions

## JS

### 手写深度赋值函数

1. 借助 JSON 对象的方法，主要是复制了数据，对象上的引用类型无法复制

```
function clone_JSON(obj){
    return JSON.parse(JSON.stringify(obj));
}
var testObj = {a:1,b:2, c: function() {return 123}};
var copyObj = clone_JSON(testObj);
testObj.a = 100;
console.log(copyObj.a);
console.log(copyObj.c());
// 结果，复制的对象没有了c方法
copyObj
{a: 1, b: 2}
testObj
{a: 100, b: 2, c: ƒ}
```

2. 需要考虑基本类型与引用类型，如果是引用类型还要考虑引用类型内部是否还嵌套有引用类型

```
function clone(obj)
{
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null) return obj;//基本类型Undefined，string，number，boolean，null排除，就剩下array和object（测试都是object）
    if(obj instanceof(Array))//array类型，循环遍历
    {
        o=[];
        i=0;j=obj.length;
        for(;i<j;i++)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)//如果内嵌引用类型
            {
                o[i]=arguments.callee(obj[i]);//对当前的值使用该函数clone
            }
            else
            {
                o[i]=obj[i];//基本类型，非object和null就直接复制引用，方法的重用是没有什么关系的
            }
        }
    }
    else  //object类型
    {
        o={};
        for(i in obj)//使用for in 來遍历
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)//同样的道理
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }

    return o;
}
var testObj = {a:1,b:2, c: function() {return 123}};
var copyObj = clone(testObj);
testObj.a = 100;
console.log(copyObj.a);
console.log(copyObj.c());

testObj.c === copyObj.c // true, 复制了指向
```

### 排版引擎与 JS 引擎

### DOM1，DOM2，DOM3 规范

### 浏览器缓存与应用缓存

## 以下是你应该熟悉的 JavaScript 知识点

你需要了解 JavaScript，而且是彻底地了解。你面试的职位越高，对语言知识的要求就越高。

- 执行上下文，尤其是词法作用域和闭包；
- 提升、函数和块作用域，以及函数表达式和声明；
- 绑定——特别是 call、bind、apply 和 this；
- 对象原型、构造函数和 mixin；
- 组合和高阶函数；
- 事件委托和冒泡；
- 使用 typeof、instanceof 和 Object.prototype.toString 进行类型转换；
- 使用回调、promise、await 和 async 处理异步调用；
- 什么时候可以使用函数声明和表达式。

### 自己实现一个 Symbol Interator

// 给一个对象设置 Symbol Interator

```js
var obj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};
```

### options 头是在什么时候会进行发送

检测服务器所支持的请求方法

CORS 中的预检请求

## WebAssembly

WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种**低级的类汇编语言**，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C / C ++等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。

对于网络平台而言，WebAssembly 具有巨大的意义——它提供了一条途径，**以使得以各种语言编写的代码都可以以接近原生的速度在 Web 中运行**。在这种情况下，以前无法以此方式运行的客户端软件都将可以运行在 Web 中。

WebAssembly 被设计为可以和 JavaScript 一起协同工作——通过使用 WebAssembly 的 JavaScript API，你可以把 WebAssembly 模块加载到一个 JavaScript 应用中并且在两者之间共享功能。这允许你在同一个应用中利用 WebAssembly 的性能和威力以及 JavaScript 的表达力和灵活性，即使你可能并不知道如何编写 WebAssembly 代码。

## js 阻止文本双击选中

```js
// 添加事件
onselectstart = 'return false;';
```

可能被多次点击的地方需要做节流处理。

## 使用 css 属性控制

```css
user-select: none;
```

## js的API设计原则

1. 简单
2. 可读
3. 可扩展
4. 单一性
5. 对象传递参数 || this
6. 错误处理
7. 注释和文档的可读性
8. 可预见性
