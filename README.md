# rocket-selece 远程下拉搜索 

嗨，大家好我叫**韩广金**，是一名**前端**开发工程师，目前工作在北京，很高兴在这里认识大家，希望我的项目能对您的工作有一定帮助，有BUG欢迎留言，我们看到会第一时间处理

# 项目简介

rocket-selece目前我们没有集成ajax功能，建议大家使用axios，如果您的项目是jQery的话我们也是支持的，坦白的说我们是存原生js插件，不限制您用那种方式请求后端，目前是以组件的形式提供给大家，灵活度比较高，依赖比较少。现在支持上下和enter等快捷键，目前对扫描枪支持也比较好，解决扫描枪默认的enter事件冲突

## 目录介绍

build：webpack配置文件夹
dist：打包后的文件夹
src：开发目录 

## 使用说明

首先在dist目录找到我们的js 引入到您的项目里面
**html**
<div id="app"></div>
**javascript**  
var rt = new RocketAuToComplete({   
	el: '#app', // 挂载的位置 id名称自定义   
	tpl: '', // 可以自定义模板 String类型  Html模本字符串   
	
})
