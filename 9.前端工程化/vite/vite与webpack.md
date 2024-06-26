# vite 与 webpack

## webpack 的一些问题

如果应用过于复杂，使用 Webpack 的开发过程会出现以下问题：

1. Webpack Dev Server **冷启动时间会比较长**；
2. **Webpack HMR 热更新的反应速度比较慢**；

## 它们存在五个主要区别

1. 开发模式不同；
   1. Webpack 在开发模式下依然会对所有模块进行打包操作，虽然提供了热更新，但大型项目中依然可能会出现启动和编译缓慢的问题；**而 Vite 则采用了基于 ES Module 的开发服务器，只有在需要时才会编译对应的模块，大幅度提升了开发环境的响应速度**。
2. 打包效率不同；
   1. Webpack 在打包时，会把所有的模块打包成一个 bundle，这会导致初次加载速度较慢；而 Vite 则利用了浏览器对 ES Module 的原生支持，**只打包和缓存实际改动的模块，从而极大提高了打包效率**。
3. 插件生态不同；
   1. Webpack 的插件生态非常丰富，有大量社区和官方插件可以选择，覆盖了前端开发的各个方面；**而 Vite 的插件生态尽管在不断发展，但相比 Webpack 来说还显得较为稀少**。
4. 配置复杂度不同；
   1. **Webpack 的配置相对复杂，对新手不够友好**；
   2. **而 Vite 在设计上更注重开箱即用，大部分场景下用户无需自己写配置文件**。
5. 热更新机制不同(这不就是第一条吗)。
   1. **Webpack 的热更新需要整个模块链重新打包和替换，对于大型项目可能会有延迟**；Vite 的热更新则只会针对改动的模块进行更新，提高了更新速度。

总的来说，**Vite 的开发环境启动速度和模块热更新速度相比 Webpack 有显著提升**，**而 Webpack 的生态系统更为丰富**。

## webpack 与 vite

1. vite 的优势就是开发过程中几乎不需要编译，直接运行到了浏览器；
2. 而 Vite 则采用了基于 ES Module 的开发服务器，只有在需要时才会编译对应的模块，大幅度提升了开发环境的响应速度；
3. webpack 配置相对复杂，插件的开发要对 webpack 有深入的理解；

## vite

为开发提供极速响应。

vite 的特点：

1. 极速的服务启动：
   1. 使用原生 ESM 文件，无需打包!
2. 轻量快速的热重载：
   1. 无论应用程序大小如何，都始终极快的模块热替换（HMR）
3. 丰富的功能：
   1. 对 TypeScript、JSX、CSS 等支持开箱即用。
4. 优化的构建：
   1. 可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建
5. 通用的插件：
   1. 在开发和构建之间共享 Rollup-superset 插件接口。
6. 完全类型化的 API：
   1. 灵活的 API 和完整的 TypeScript 类型。

### 现实问题

在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。**这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件**。

Vite 旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。

### Vite 的方式

1. Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：**Vite 只需要在浏览器请求源码时进行转换并按需提供源码**。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。
2. 在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[1]（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。
3. Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

### 为什么生产环境仍需打包

1. 尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

### 它主要由两部分组成

1. 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

2. 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## ES Modules

1. 主流的浏览器（IE11 除外）均已经支持，其最大的特点是在浏览器端使用 export import 的方式导入和导出模块，在 script 标签里设置 type="module"，然后使用模块内容。

## webpack

1. **Webpack 是一个静态模块打包器**，主要用于把前端项目中的模块（js、css、图片等）打包成浏览器可以识别的形式。
2. **webpack dev server 在启动时需要先 build 一遍**，而这个过程需要消耗很多时间；
   1. 而 Vite 不同的是 执行 vite serve 时，**内部直接启动了 web Server, 并不会先编译所有的代码文件**。

### MFSU 技术

1. Webpack5 中使用的 MFSU 技术；

## chatgpt 的关于二者的对比

```markdown
# Webpack 与 Vite: 构建工具的对比

随着现代前端开发的不断发展，构建工具成为了每个前端开发者工作流的重要组成部分。Webpack 和 Vite 都是流行的构建工具，它们在许多方面都提供了类似的功能，但也存在一些显著的区别。在本文中，我们将对 Webpack 和 Vite 进行比较，以帮助你更好地了解它们之间的异同以及在何种情况下选择哪个工具。

## Webpack: 强大而复杂

Webpack 是一个强大且灵活的构建工具，已经成为前端开发的事实标准之一。以下是 Webpack 的一些关键特点和优势：

### 特点和优势：

1. **生态系统：** Webpack 拥有庞大而活跃的社区和生态系统。有大量的插件和加载器可供选择，可以满足各种开发需求。

2. **完整的生产就绪：** Webpack 可以用于构建复杂的应用程序，支持代码拆分、懒加载、性能优化等功能，适用于大型项目。

3. **配置灵活性：** Webpack 提供了详细的配置选项，允许开发者根据项目需求进行高度定制，但也需要更多的配置工作。

4. **热模块替换（HMR）：** Webpack 支持热模块替换，使开发过程更加高效，无需手动刷新页面。

5. **大型社区支持：** 由于其流行度，Webpack 有大量的文档、教程和社区支持，容易找到解决问题的资源。

### 不足之处：

1. **配置复杂性：** Webpack 的配置复杂，对新手来说学习曲线较高。配置文件可能会变得庞大而难以维护。

2. **启动时间：** 在大型项目中，Webpack 的启动时间可能会很长，尤其是在首次构建时。

3. **繁琐的插件管理：** 需要手动安装和配置各种插件来满足不同的需求，这可能会导致配置文件变得复杂。

## Vite: 轻量且快速

Vite 是一个相对较新的构建工具，它旨在解决 Webpack 的一些问题并提供更快的开发体验。以下是 Vite 的一些关键特点和优势：

### 特点和优势：

1. **快速的开发服务器：** Vite 通过使用 ES 模块（ESM）原生加载模块的方式，实现了快速的开发服务器，启动速度非常快。

2. **即时预览（Instant Preview）：** Vite 可以在保存文件时快速更新浏览器，使开发者可以立即看到修改的效果。

3. **按需加载（On-Demand Loading）：** Vite 支持按需加载，只有在需要时才会加载模块，减少了初次加载时间。

4. **Vue.js 生态系统：** Vite 是 Vue.js 官方推荐的构建工具，对 Vue.js 应用程序提供了特殊的支持，但也可以用于 React 等其他框架。

5. **零配置：** 对于大多数项目，Vite 提供了零配置选项，不需要复杂的配置文件。

### 不足之处：

1. **相对较新：** Vite 相对较新，可能在一些较大或复杂的项目中缺少某些高级功能。

2. **生态系统较小：** 相对于 Webpack，Vite 的生态系统和插件数量相对较小，可能需要自行解决一些问题。

## 如何选择？

选择使用 Webpack 还是 Vite 取决于你的项目需求和偏好：

- **Webpack** 适合大型项目，需要复杂的配置和高级功能，或者需要与其他构建工具集成。如果你已经熟悉 Webpack 并且需要其强大的功能，那么它可能是更好的选择。

- **Vite** 适合小型到中型项目，或者需要快速启动和即时预览的项目。如果你希望简化配置并且更关注开发体验，Vite 可能是更合适的工具。

最终，Webpack 和 Vite 都是强大的构建工具，可以根据项目需求来选择。无论你选择哪个工具，都要根据团队的需求和项目的规模来权衡它们的特点和优劣势。
```

## 测试 demo

1. <https://stackblitz.com/edit/vitejs-vite-zr7byr?file=vite.config.js>

## vite 打包原理

我们知道，当声明一个  script  标签类型为  module  时，浏览器会对其内部的  import  引用发起  HTTP  请求获取模块内容。那么，vite 会劫持这些请求并进行相应处理。因为浏览器只会对用到的模块发送 http 请求，所以 vite 不用对项目中所有文件都打包，而是按需加载，大大减少了 AST 树的生成和代码转换，降低服务启动的时间和项目复杂度的耦合，提升了开发者的体验。

### vite 热更新

我们可以使用 **[chokidar](https://www.npmjs.com/package/chokidar) 库来监听某个文件夹的变更**，只要监听到有文件变更，就用 websocket 通知浏览器重新发一个请求，浏览器就会在代码每次变更之后立刻重新请求这份资源。
