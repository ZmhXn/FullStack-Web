## 个人博客

### 文件名对照：

- frontIndex  //前台文件夹
  - home  //首页
- backStage //后台文件夹
  - login //登录页



### react-markdown是react专用的markdown解析组件，markdown-navbar生成目录 
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'


### marked + highlight.js 有高亮效果
#### Tocify 生成目录 （别人封装的）
```js
  import Tocify from './../../components/tocify.tsx'
```
#### 引入模块
```js
  import marked from 'marked'
  import hljs from "highlight.js"
  import 'highlight.js/styles/monokai-sublime.css'
```
#### 设置一下marked.setOptions
```js
const renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

let html = marked(props.article_content) 
```
> 属性说明
+ renderer: 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
+ gfm：启动类似Github样式的Markdown,填写true或者false
+ pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
+ sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
+ tables： 支持Github形式的表格，必须打开gfm选项
+ breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
+ smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
+ highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成

