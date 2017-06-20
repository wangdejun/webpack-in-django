## 1.安装webpack

```
npm init
npm i webpack -g
```

在当前目录下新建文件webpack.config.js，编辑如下

```js
module.exports = {
entry: './JavaScriptNotes/test/src/frame8.js',
output: {
filename: './JavaScriptNotes/test/dest/frame8.bundle.js'
}
}
```



添加uglify插件的时候，遇到了一个问题

```
ERROR in ./JavaScriptNotes/test/dest/frame8.bundle.js from UglifyJs
TypeError: Cannot read property 'reset' of undefined...
```


Google到了如下解决方法，原来是uglify-js版本太高了
从3调节到2.8
https://github.com/webpack-contrib/uglif
yjs-webpack-plugin/issues/31

问题顺利解决
现在能做单个静态js文件的丑化和代码压缩了

2.Uglify(丑化压缩)
webpack.config.js

```js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    module.exports = {
        entry: './JavaScriptNotes/test/src/frame8.js',
        output: {
            filename: './JavaScriptNotes/test/dest/frame8.bundle.js'
    },
    plugins: [
        new UglifyJSPlugin()
    ]
}
```


实验结果发现文件大小由14KB压缩为6KB，代入原有项目，运行OK。

3.文件名修改
新的功能开发后需要部署静态文件（CSS|JS）和页面（html），通过修改文件名字，才能使cache失效，过去是手动修改文件名，现在要借助webpack工具修改文件名
    方式：添加hash串的方式
    实验结果结果生效
// webpack.config.js

```js
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        frame17: "./JavaScriptNotes/test/src/frame17.js",
        main: "./JavaScriptNotes/test/src/main.js"
    },
    output: {
    path: path.join(__dirname, "build"),
        filename: "[name].[hash].js"
    },
    plugins: [
            new UglifyJSPlugin()
    ]
}
```


4.将修改后的文件名注入html文档
文件名字发生变化之后，引用此html的地址也发生变化，这样long terms cache才会生效。
// webpack.config.js

```js
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        JS_FRAME: ["./JavaScriptNotes/test/src/frame17.js"],
        JS_MAIN: ["./JavaScriptNotes/test/src/main.js"]
    },
    output: {
        path: path.join(__dirname, "JavaScriptNotes/test/dest"),
        filename: "entry[name].[chunkhash].js"
    },
    plugins: [
        new UglifyJSPlugin(),
        new ManifestPlugin({
            fileName: 'my-manifest.json',
            basePath: ''
        })
    ]
}
```

结果生成manifest.json文件

```js
{
    "JS_FRAME.js": "entryJS_FRAME.76f9d4e3b5cd25fdeec2.js",
    "JS_MAIN.js": "entryJS_MAIN.68af7cf3fde3b49e84a5.js"
}
```

html文件通过引用key值自动取到相应的js文件

参考资料：
丑化plugin
https://github.com/webpack-contrib/uglifyjs-webpack-plugin



