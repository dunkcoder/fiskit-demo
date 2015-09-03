# fiskit CMD规范 demo

由于seajs的alias不支持多个模块指向同一文件，所以放弃js的部分打包，不过可以用seajs-combo进行合并请求。css文件部分打包没问题。

## 前后端模板共用

`fiskit release tmpl`只发布vm模板。由于`fis3-postpackager-loader`模块化加载依赖页面中带`data-loader`的`script`标签，所以将页面底部js引用放到`/page/_scripts.html`中，这样模板在单文件处理阶段`::stantard`就已经引入了js，在`::package`阶段即可被`fis3-packager-loader`识别。