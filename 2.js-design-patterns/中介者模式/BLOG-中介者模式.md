---
title: 中介者模式
date: 2018-3-6
tags:
  - 设计模式
  - 中介者模式
categories:
  - [设计模式, 中介者模式]
---

## 中介者模式定义

是一个行为设计模式，它允许我们公开一个统一的接口，**系统的不同部分可以通过该接口进行通信，而不需要显示的相互作用**；

## 适用场景（多模块强耦合）

**如果一个系统的各个组件之间看起来有太多的直接关系**，这个时候则需要一个中心控制点，**以便各个组件可以通过这个中心控制点进行通信**；

该模式促进松散耦合的方式是：**确保组件的交互是通过这个中心点来进行处理的**，而不是通过显示的引用彼此；

## 中介者模式角色

1. **抽象中介者（AbstractMediator）**：定义中介者和各个同事者之间的通信的接口；
2. **抽象同事者（AbstractColleague）**：定义同事者和中介者通信的接口，实现同事的公共功能；
3. **中介者（ConcreteMediator）**：需要了解并且维护每个同事对象，实现抽象方法，负责协调和各个具体的同事的交互关系；
4. **同事者（ConcreteColleague）**：实现自己的业务，并且实现抽象方法，和中介者进行通信；

其中同事者是多个同事相互影响的才能叫做同事者；

![中介者模式](./中介者模式.jpg)

中介者模式避免了同事之间的过度耦合，使得中介者可以独立的管理同事；

但是要注意使用中介者模式，因为这种模式**最大的缺点就是**：它会引来单一故障点，将 Mediator 放置于模块之间可能导致**性能下降**，因为有些模块可能需要直接跟另个模块进行通信；由于松耦合的关系，**很难通过紧紧关注广播来确定一个系统如果作出反应；**

## 代码实现

```js
/**
 * 中介者模式
 * @param mediator 同事
 * @constructor
 * @description 同事可以是一种类型也可以是多种类型的，这里按照单个类型处理，有两个方法，发消息和收消息
 */

function Colleague(mediator, name) {
  this.mediator = mediator;
  this.name = name;
}
Colleague.prototype.send = function(msg, receiver) {
  // 1
  this.mediator.send(msg, this.name, receiver);
};
Colleague.prototype.receiveMsg = function(msg, sender) {
  // b 3
  console.log(this.name, '####', sender + ' say: ' + msg);
};

/**
 * 中介者（可以处理多个同事）
 * @constructor
 */
function Mediator() {}

Mediator.prototype.addColleague = function(colleague) {
  // 需要将同事的引用保存到中心节点上
  this[colleague.name] = colleague;
  return this;
};

/**
 * @param sender 发送的人
 * @param receiver 接受的人
 */
// @ts-ignore
Mediator.prototype.send = function(msg, sender, receiver) {
  // 2
  try {
    this[receiver].receiveMsg(msg, sender);
  } catch (err) {
    console.log('receiver ' + receiver + ' is not exsit');
    this[sender].receiveMsg('receiver ' + receiver + ' is not exsit', 'mediator');
  }
};

// 测试中介者模式，通过a发消息给b
var _mediator = new Mediator();
var a = new Colleague(_mediator, 'a');
var b = new Colleague(_mediator, 'b');
console.log(_mediator, a, b);

_mediator.addColleague(a).addColleague(b);

a.send('hello i am a', 'b');
b.send('hello i am b', 'a');
```
