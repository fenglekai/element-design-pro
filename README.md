# element-design-pro

> A starter kit for Element Plus with Vite

<img width="800" alt="Element Plus" src="./src/assets/logo.png">

<img src="./public/preview-1.png" alt="preview-1" style="zoom:75%;" />

<img src="./public/preview-2.png" alt="preview-2" style="zoom:75%;" />

<img src="./public/preview-3.png" alt="preview-3" style="zoom:75%;" />

- [Preview](http://feng-lekai.gitee.io/element-design-pro)

> 这是基于element-plus-vite-starter进一步开发的模板

​		致力于快速开发后台系统编写的代码。轻量化配置布局、主题、菜单，让开发人员注重内容开发减轻布局上的繁琐配置。

## 默认集成插件

- echarts
- vue-router
- pinia
- unocss

## 未来要集成的插件

- commitizen
- cz-customizable
- vue-i18n

## 启动项目

```bash
npm install
```

### 运行开发环境

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

### 自定义主题

See `src/styles/element/index.scss`.

## 已知问题修复

1. `ElMenu`在`collapse`生效的时候，如果不固定展开宽度，一级目录出现塌陷

   ```css
   .ep-menu-vertical-demo:not(.ep-menu--collapse) {
     width: 200px;
   }
   ```

   

2. `ElTooltip`在变更`namespace`为`ep`后，`transition`属性也就是`hover`的动画效果不发生变化，需要手动更改

   ```html
   <ElTooltip
       content="清新绿"
       placement="top"
       transition="ep-fade-in-linear"
   >
   	清新绿
   </ElTooltip>
   ```

   

3. `vite`在使用`JSX`后`ElDropdown`部分样式不生效，需要在`vite.config.js`中添加配置

   ```js
   import ElementPlus from "unplugin-element-plus/vite";
   
   plugins: [
   	ElementPlus({
       	useSource: true,
       }),
   ]
   ```

   

4. ...

