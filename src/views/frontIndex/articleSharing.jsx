import React, { Component } from 'react'
import { withRouter } from "react-router"
import { BackTop, Affix, Input, Button } from 'antd'
import axios from './../../config/http' 
import './../../../public/css/zmh.less'
import FootNav from './../../components/frontCom/Footer'
import HeadNav from './../../components/frontCom/Header'
import Author from './../../components/frontCom/Author'
import './../../../public/css/markdownNav.less'
import marked from 'marked'
import hljs from "highlight.js"
import './../../../public/css/monokai-sublime.css'
import Tocify from './../../components/tocify.tsx'
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'
const { TextArea } = Input;

 class ArticleSharing extends Component {
    constructor (props) {
        super(props)
        this.state = {
            html: ''
        }
    }

    textChange = (e) => {
        this.setState({
            html: e.target.value
        })
    }
    submit = () => {
        this.props.GlobalLoadingShow('文章数据获取')
        axios.post('/api/news/addArtical', { content: this.state.html, user_id: '5e8f28146407db008492ff30' }
        ).then(res => {
            if (res.status == 0) {
                this.props.DeleteGlobalLoading()
                // this.setState({
                //     detail: res.detailList
                // })
            }
        })
    }
    render () {

        const tocify = new Tocify()
        const renderer = new marked.Renderer()
        renderer.heading = (text, level, raw) => {
            const anchor = tocify.add(text, level)
            return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
        };
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: false,
            smartLists: true,
            smartypants: false,
            highlight: code => hljs.highlightAuto(code).value
        }) 
        const { html } = this.state

        return (
            <div>
                <HeadNav />
                <div className="artical-share  front-home m-t60">
                    {/* 回顶部  */}
                    <BackTop />
                    <div className="home-content">
                        <div className="con-left">
                            <ul className="details-con">
                                <li className="cont">
                                    <TextArea name="markdown" id="" cols="30" rows="10" onChange={this.textChange}></TextArea>
                                </li>
                                <li className="cont">
                                    <div dangerouslySetInnerHTML = {{__html: marked(html)}}></div>
                                </li>
                            </ul>
                            <Button onClick={this.submit}>提交</Button>
                        </div>
                        <div className="common-right">
                            {/* 作者信息 */}
                            <Author />
                            {/* Affix 将页面元素钉在可视范围 */}
                            <Affix offsetTop={60}>
                                {/* markdown的目录 */}
                                <div className="detailed-nav con-right">
                                    <div className="nav-title">文章目录</div>
                                    <div className="toc-list">
                                        { tocify && tocify.render() }
                                    </div>
                                </div>
                            </Affix>
                        </div>
                    </div>
                </div>
                <FootNav />
            </div>
        )
    }
}

export default connect(
    null,
    {
        GlobalLoadingShow,
        DeleteGlobalLoading
    }
)(withRouter(ArticleSharing)) 

let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '```js\n console.log(111)\n```\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '![img](./../../../public/image/head-portrait.png)\n'+
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '```js\n var a=11;\n ```'