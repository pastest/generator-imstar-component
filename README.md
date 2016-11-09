# generator-imstar-component [![NPM version](https://img.shields.io/npm/v/generator-imstar-component.svg)](https://www.npmjs.com/package/generator-imstar-component) [![Build Status](https://travis-ci.org/pastest/generator-imstar-component.svg?branch=master)](https://travis-ci.org/pastest/generator-imstar-component)
> yeoman generator插件，用于生成IMStar组件

## Installation

安装并添加devDependence:

```bash
tnpm install --save-dev yo
tnpm install --save-dev generator-imstar-component
```

package.json中增加add命令:

```js
// package.json

{
  scripts: {
    add: "yo imstar-component"
  }
}
```

使用：  

```bash
npm run add

# 根据提示输入相关信息，自动生成新cates页面所需要的文件
```
