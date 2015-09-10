# fiskit CMD规范 demo

由于seajs的alias不支持多个模块指向同一文件，所以放弃js的部分打包，不过可以用seajs-combo进行合并请求。css文件部分打包没问题。

或者在`fk-conf.js`中对`velocity`配置项添加`loadSync:true`来同步加载依赖资源，这样就可以使用allInOne或部分打包方式了。

## 前后端模板共用

`fiskit release vm`只发布vm模板。由于`fis3-postpackager-loader`模块化加载依赖页面中对require.js|mod.js|sea.js的引用或者带`data-loader`的`script`标签来识别模块化框架，所以将页面底部js引用放到`/page/_scripts.vm`中，这样模板在单文件处理阶段`::stantard`就已经引入了js，在`::package`阶段即可被`fis3-packager-loader`识别。

如果感觉不太优雅，也可以将模块化识别标识写入每个页面文件，不过这样每个页面文件都要引入require.js|mod.js|sea.js。两种方法，按各人喜好选择吧。