#  检查规则

> ✨ 模块主要是通过npm postinstall hooks来实现，模块安装成功后自动更新依赖，并将依赖更新到assests目录下。

- [技术栈及版本说明](#chapter-1)
- [安装](#chapter-2)
- [使用说明](#chapter-3)
- [参数说明](#chapter-4)


<br/>

### 1. 技术栈及版本说明 <a id="chapter-1" name="chapter-1"></a>

  语法检查 | npm权限控制 | nodejs版本要求 |
------------- | ------------- | ------------- |
eslint + eslint-plugin-node + chokidar(`实现watcher模块变动`) | npm-registry-client | nodejs(`>=10`) |

<br/>

### 2. 安装 <a id="chapter-2" name="chapter-2"></a>

因为本模块使用了公司私有模块，所以请在安装模块依赖之前请先设置`npm`仓库镜像, 镜像地址为 `http://172.30.0.176:4873/`, 你可以[http://172.30.0.176:4873/](http://172.30.0.176:4873/) 查看我们已经发布的模块。[私有仓库的配置可以查看](http://175.102.179.36:9011/front-end-base/hf-vue-h5/blob/master/README.md#chapter-2)

<br/>
```shell
$ npm install hf-npm-hooks
```

### 3. 使用说明 <a id="chapter-3" name="chapter-3"></a>

> 注意：在初始化页面的时候请优化安装此模块，因为此模块是要作为 `npm` 的 `posinstall` hook 来执行的，如果模块还没有安装成功，将会导致执行失败。

#### 3.1 配置

我们只需要将 hf-npm-hooks 配置到项目的package.json， 如下例：

```javascript
// package.json scripts 代码片段
"scripts": {
  "eslint": "eslint --fix --config .eslintrc.js src/js/**/*.{js,vue}",
  "postinstall": "hf-npm-hooks postInstall"
}
```
### 4. 参数说明 <a id="chapter-4" name="chapter-4"></a>

```javascript
// package.json scripts 代码片段
"scripts": {
  "eslint": "eslint --fix --config .eslintrc.js src/js/**/*.{js,vue}",
  "postinstall": "hf-npm-hooks postInstall"
}
```

#### 4.1 参数项说明

##### postInstall

在当前工程下面安装所有模块后会触发，对应 `npm` 的 `postinstall hook`


##### preInstall
Will comming soon ❤️
