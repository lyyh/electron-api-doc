# 开发日志
### 生产环境预览
package.json:
```
"build-main": "cross-env NODE_ENV=production node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config webpack.config.main.prod.js --colors",
"build-renderer": "cross-env NODE_ENV=production node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config webpack.config.renderer.prod.js --colors",
```
修改为：
```
"build-main": "cross-env NODE_ENV=development node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config webpack.config.main.prod.js --colors",
"build-renderer": "cross-env NODE_ENV=development node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config webpack.config.renderer.prod.js --colors",
```

webpack.config.main.prod.js 将production环境改为了development环境
webpack.config.renderer.pros.js 将production环境改为了development环境
