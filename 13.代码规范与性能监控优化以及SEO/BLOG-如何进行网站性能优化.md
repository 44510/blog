---
title: 如何进行网站性能优化
date: 2017-5-6
tags:
  - 性能优化
categories:
  - [性能优化, 网站性能优化手段]
---

[TOC]

## 前端性能优化一般可以想到的，main

1. 减少资源获取的时间；
2. 减少 reflow 和 repaint；
3. 充分利用浏览器的 cup 和 gpu。

### 1. 减少资源获取的时间：加载内容上看，主要是请求的大小、次数、速度

1. **减少对服务器的数据请求次数**：**多次请求合并**，然后分割保存，再使用。合并图片（如 css sprites，内置图片使用数据）、合并 CSS、JS，这一点很重要，但是要考虑合并后的文件体积。
2. **对 JS、CSS、图片文件的体积进行相应的压缩**，**减小体积**。启用服务的 Gzip，网页压缩技术：**减少数据的传输体积，提高网页的加载速度**。
3. 使用**页面缓存**：当展示不经常变动的数据时，直接使用页面的本地缓存对象。为文件头指定 Expires 或 Cache-Control，使内容具有缓存性。
4. **延迟加载**，不重要的内容可以延后加载；
   1. 使用图片**懒加载**-lazyload。
5. **预加载**，提前加载可能用到的内容，比如较大的图片；
6. 使用内容分发 **cdn 加速**；
7. **多域资源请求**；避免同域资源加载的个数限制；
8. 减少**Cookie 的大小**，请求大小方面，cookie 会随着 http 请求，一直发送；
9. 使用 HTTP / 2.0；
10. **服务端渲染 SSR**，加快首屏渲染，利于 SEO。
11. SPA 项目，通过 import 或者 require 做**路由按需（减小资源大小）加载**，避免首页加载时间过长。
12. 页面使用**骨架屏**，提高首页加载速度（提高加载速度）

### 2. 减少 reflow 和 repaint：页面渲染方面来说，主要是回流 reflow 和重绘 repaint

1. 把 CSS 放到顶部，把 JS 放到底部；**减少回流与重绘**；
2. **减少 DOM 访问**，减少操作 DOM；在脚本中用变量**缓存 DOM 的值**；
3. **克隆节点，然后修改，接着替换原有的节点**，可以最少的触发重排，也就是不要多次修改 dom，合并为一次。

### 3. 充分利用浏览器的 cup 和 gpu 的性能

1. **高效的 CSS 书写规则**，**不应该嵌套多层**，css 解析从右往左；
2. **css 来实现动画**，**开启 gpu 加速渲染**；
   1. 通过设置`transform: translate3d(0,0)`或者`tanslateZ(0)`属性就可以做到，原因是，通过设置该属性，**浏览器会创建独立图层**，图层中有动画的话用 GPU 进行硬件加速。
   2. opacity；
3. 在脚本中用变量**缓存 DOM 的值**；
4. **时间切片**，在运行期间, **长时间的脚本执行会阻塞主线程**而导致页面没有响应. 将脚本的**工作量分成多个小块来执行**(使用 `requestAnimationFrame()` 或 `requestIdleCallback()` 进行任务调度)可以最小化响应性问题。
5. **垃圾回收机制**，避免全局变量、避免溢出、避免内存泄漏；
6. **优化 js 代码结构，减少冗余代码**，注意平时的代码规范，和优化代码的方法，注意**复用，封装**。
7. 删除不必要的空格、注释。
8. 将 inline（嵌入 html 的） 的 script 和 css 移到外部文件。
9. 用“===”取代“==”；
10. 不使用 eval();安全问题，性能问题；
11. 用 setTimeout 来避免页面失去响应；

## 性能优化常见的问题

### 哪些地方会出现 css 阻塞，哪些地方会出现 js 阻塞

#### JS 的阻塞特性

1. **所有浏览器在下载 JS 的时候，会阻止一切其他活动，比如其他资源的下载，内容的呈现等等**。
2. **直到 JS 下载、解析、执行完毕后**才开始继续并行下载其他资源并呈现内容。
3. 为了提高用户体验，**新一代浏览器都支持并行下载 JS**，**但是 JS 下载仍然会阻塞其它资源的下载**（例如.图片，css 文件等）。
   1. **原因：由于浏览器为了防止出现 JS 修改 DOM 树，需要重新构建 DOM 树的情况，所以就会阻塞其他的下载和呈现。**
4. **嵌入 JS** 会阻塞所有内容的呈现，而**外部 JS 只会阻塞其后内容的显示**，2 种方式都会阻塞其后资源的下载。也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。

#### CSS 怎么会阻塞加载

1. CSS 本来是可以并行下载的，在什么情况下会出现阻塞加载了(在测试观察中，IE6 下 CSS 都是阻塞加载）。
2. 当 CSS 后面跟着**嵌入的 JS 的时候**，该 CSS 就会出现阻塞后面资源下载的情况。而当把嵌入 JS 放到 CSS 前面，就不会出现阻塞的情况了。

根本原因：因为浏览器会维持 html 中 css 和 js 的顺序，**样式表必须在嵌入的 JS 执行前先加载、解析完**。**而嵌入的 JS 会阻塞后面的资源加载，所以就会出现上面 CSS 阻塞下载的情况。**

#### JS 应该放在什么位置

1. 放在**底部**，虽然放在底部照样会阻塞所有呈现，但不会阻塞资源下载。
2. **如果嵌入 JS 放在 head 中，请把嵌入 JS 放在 CSS 头部。**
3. 使用 defer（**只支持 IE**）
4. **不要在嵌入的 JS 中调用运行时间较长的函数，如果一定要用，可以用 setTimeout 来调用**，延后执行

#### css 与 js 阻塞 dom 解析与渲染

[参考]<https://mp.weixin.qq.com/s/xUUxYs_iFyKg6z4RrtcjVg>

浏览器的策略：尽量减少渲染的次数。

本质上来说：css 与 html 都是可以被操作的内容，js 就是来操作的内容，**必须等到 dom Tree 与 css Tree 都生成且稳定的时候才会显示出来**，而中间的这段时间就是阻塞的时间。

- `CSS 不会阻塞 DOM 的解析`
- `CSS 阻塞页面渲染`: 所以 dom 会先解析，等待 css 树生成之后再渲染，这样就会让 css 阻塞页面的渲染，主要的问题在于，css 文件的下载时间。
- `JS 阻塞 DOM 解析`: 浏览器并不知道脚本的内容是什么，如果先行解析下面的 DOM，万一脚本内全删了后面的 DOM，浏览器就白干活了。更别谈丧心病狂的 document.write。浏览器无法预估里面的内容，那就干脆全部停住，等脚本执行完再干活就好了。
- js 同样的原理，如果 js 会操作 dom，那就会改变 render 树，从而阻止渲染。
- `JS 执行会等待 CSS 下载`
- `JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，预先下载相关资源。`
- `每次碰到<script>标签时，浏览器都会渲染一次页面。`这是基于同样的理由，浏览器不知道脚本的内容，因而碰到脚本时，只好先渲染页面，确保脚本能获取到最新的 DOM 元素信息，尽管脚本可能不需要这些信息。
- `浏览器遇到 <script>且没有 defer 或 async 属性的 标签时，会触发页面渲染`，因而如果前面 CSS 资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

#### 资源阻塞的优化策略

如果 JS 文件体积太大，同时你确定没必要阻塞 DOM 解析的话，不妨按需要加上 defer 或者 async 属性，此时脚本下载的过程中是不会阻塞 DOM 解析的。

## 常见优化问题

### 页面 DOM 节点太多，会出现什么问题？如何优化

会产生的问题：页面卡顿、不利于 seo，渲染耗时。

1. 不完全展示：不同时展示所有的，滑动到哪里就加载那部分的元素，多的隐藏(display: none)，位置空出来。
2. 时间切片：分段渲染。
