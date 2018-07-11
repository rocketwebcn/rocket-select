# rocket-selece 远程下拉搜索 

嗨，大家好我叫**韩广金**，是一名**前端**开发工程师，目前工作在北京，很高兴在这里认识大家，希望我的项目能对您的工作有一定帮助，有BUG欢迎留言，我们看到会第一时间处理

# 项目简介

rocket-selece目前我们没有集成ajax功能，建议大家使用axios，如果您的项目是jQery的话我们也是支持的，坦白的说我们是纯原生js插件，不依赖于任何js框架，对项目侵入性小，目前是以组件的形式提供给大家，灵活度比较高，无任何依赖。现在支持上下和enter等快捷键，目前对扫描枪支持也比较好，解决扫描枪默认的enter事件冲突

## 目录介绍

build：webpack配置文件夹
dist：打包后的文件夹
src：开发目录 

## 使用说明

首先在dist目录找到我们的js 引入到您的项目里面
**html**
```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <meta name="keywords" content="Editor.md, Markdown, Editor" />
        <title>Hello world!</title>
        <script src="./dist/js/rocketSelect.js"></script>
    </head>
    <body>
        <div id="app"></div>div>
    </body>
</html>
````````

**javascript**     

      new RocketAuToComplete({
          el: '#app', // 挂载位置
          headList: ['名字', '性别'], // 如果想设置表头设置此选项
          tpl: '<div>{{name}}</div><div>{{sex}}</div>', // 默认使用的是{{key}}遍历数组对象的key
          listContent: [], // 数组里面必须是对象
          change: function(val) {
              // 当input发生改变接收的值 用来发送ajax
              console.log(val)
              
              // 获取后端数据后需要调用 this.setState(Array)传进去数组 将自动更新页面
          },
          selectHandle: function(rowData) {
              // 用户选择后的数据
              console.log(rowData)
          }
      })
