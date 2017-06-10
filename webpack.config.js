// webpack.config.js
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

