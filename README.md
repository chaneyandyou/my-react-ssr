# my-react-ssr

chaney学习React服务端渲染同构系列。

> 公司项目还是推荐使用[next.js](https://nextjs.org/)，经过多年迭代，打造出React服务端渲染的最佳实践方案。本教程主要是通过从零搭建一个React服务端渲染同构项目，学习React服务端渲染应用需要注意的方方面面。

# 打造服务端渲染应用流程
> 以下步骤均已分支形式实现

## Step1: 最简单的服务端渲染demo
创建最简单的服务端渲染应用，要求
* 创建`webpack.server.js`配置文件，使`webpack`能正确打包js模块，对ES6语法，`React`语法能够识别。
* 编写react组件。
* 通过`react-dom/server`的`renderToString`方法将react组件，返回输出字符串给客户端。

## Step2: 同构
第一步输出的服务端渲染demo是静态的，`click`事件等是没有的。<br />使用同构来解决这个问题<br />同构：一套`React`代码，在服务端执行一次，在客户端再执行一次。<br />其实就是在浏览器端执行js代码（React组件打包后）。<br />创建`webpack.client.js`配置文件，打包输出一份客户端index.js文件。
### 坑：
* 因为在React组件代码已经在服务端运行过一次，所以客户端ReactDOM.render的时候会报以下错：

![image.png](https://cdn.nlark.com/yuque/0/2019/png/158611/1549553489077-0648a661-8faf-4555-b15f-e5c1aba2db7e.png#align=left&display=inline&height=51&linkTarget=_blank&name=image.png&originHeight=102&originWidth=1638&size=53686&status=done&width=819)<br />解决方法：改用`ReactDOM.hydtate` 即可

* 服务端渲染的节点存在空格会报错，具体如下：

![image.png](https://cdn.nlark.com/yuque/0/2019/png/158611/1549553445490-d3bbd7d0-4c8f-474d-9dba-da713302d69a.png#align=left&display=inline&height=53&linkTarget=_blank&name=image.png&originHeight=106&originWidth=1640&size=43103&status=done&width=820)<br />解决方法：去掉渲染模板与输出内容中的空格即可。

## Step3: 添加路由机制
使用 [react-router4](https://reacttraining.com/react-router/) 版本进行路由控制。

客户端和服务端都使用同一份路由配置。
### 对于服务端：
使用`StaticRouter` 组件，配置`location`属性。
### 对于客户端：
使用`BrowserRouter` 组件。

## Step4: 同构项目中引入Redux
客户端入口和服务端入口都引用redux。

`componentDidMount` 在服务端是不执行的。

所以需要做异步数据服务端渲染：loadData方法以及路由重构。

在服务端入口通过`react-router-config`的`matchRoutes`匹配到相关路由（也就表示能拿到组件的loadData方法），在返回渲染的html前，先获取数据。

通过在返回给前端的渲染模板中的window注入相关数据，同时前端初始store时根据window相关数据给默认值。

## Step5:使用Node代理做中间层获取数据
使用`express-http-proxy` 进行proxy代理项目前端的请求转发到真正接口服务器。

## Step6：支持多级路由
更改路由配置，使用`react-router-config` 的`renderRoutes`进行多级路由渲染。

对于**react-router V4**版本：
* `react-router`  React Router 核心
* `react-router-dom`  用于 DOM 绑定的 React Router
* `react-router-native`  用于 React Native 的 React Router
* `react-router-redux`  React Router 和 Redux 的集成
* `react-router-config`  用于配置静态路由

## Step7: 处理Node中间层cookie问题
处理Node中间层中转项目前端与接口服务器（如java服务器）`cookie` 。<br />可在服务端创建`axios`实例时，根据请求体在headers中写入`cookie` 。
## Step8: 处理样式
由于`style-loader`处理时会使用`window`全局对象进行一些处理，但在服务端渲染的时候事实上是没有`window`对象的。<br />故针对服务端渲染的webpack配置中，使用`isomorphic-style-loader`来代替`style-loader` 。

服务端渲染输出时，也需要对style进行处理，可在组件上利用`this.props.staticContext` 写入css，在服务端中context中获取并写入待返回的渲染模板中。

## Step9: 搜索引擎优化SEO
使用`react-helmet` 进行搜索引擎优化<br />搜索引擎展示的标题就是页面的title <br />搜索引擎展示的描述就是页面的meta标签的description。

## Last
客户端渲染的项目想要提高seo，但又不想采用服务端渲染的流程，就可以尝试使用“预渲染技术”来达到目的<br />`prerender`帮助你实现。

预渲染的架构流程如图：

![image.png](https://cdn.nlark.com/yuque/0/2019/png/158611/1550853660342-ef6f0476-f6c1-4c66-bb97-3c0d76fd8e2e.png#align=left&display=inline&height=657&linkTarget=_blank&name=image.png&originHeight=1314&originWidth=1824&size=699869&status=done&width=912)

