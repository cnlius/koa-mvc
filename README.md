### 项目目录结构

```
koa-mvc
|- static //静态文件 bootstrap4.x
|- controllers // controller层：处理api请求；
|-|- index.js
|-|- signin.js
|- views // view层： 渲染视图；
|-|- index.html
|-|- signin-ok.html
|-|- signin-failed.html
|- controller.js // 扫描所有controllers目录下的api请求处理js文件；
|- static-files.js // 开发环境下，静态文件加载
|- app.js // 入口文件：负责加载初始配置，注册请求；

```

### 运行项目

```
$ npm install
$ typing install
```