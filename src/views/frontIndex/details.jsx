import React, { Component } from 'react'
import { withRouter } from "react-router"
import { BackTop, Affix, Breadcrumb, Input, Button, message, Skeleton  } from 'antd'
import marked from 'marked'
import hljs from "highlight.js" 
import { MessageOutlined, ScheduleOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons'
import axios from './../../config/http' 
import './../../../public/css/zmh.less'
import Author from './../../components/frontCom/Author'
import './../../../public/css/monokai-sublime.css'
import Tocify from './../../components/tocify.tsx'
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'
const { TextArea } = Input

class ArticleSharing extends Component {

    constructor (props) {
        super(props)
        this.state = {
            detail: [], //当前文章的列表信息
            currentId: '', //当前文章的id
            value: '', //评论的内容
            comments: [], //评论内容
        }
    }
    componentDidMount () {
        const id = this.props.location.search.split('=')[1]
        this.props.GlobalLoadingShow('文章数据获取')
        axios.post('/api/news/lookDetail', { id }
        ).then(res => {
            this.props.DeleteGlobalLoading()
            if (res.status == 0) {
                this.setState({
                    detail: res.detailList,
                    currentId: id
                })
                let type = sessionStorage.getItem("type") || 1
                if (type == 3) { //如果是留言的就滚动到留言部分
                    document.getElementById('A1').scrollIntoView({
                        block: 'start',
                        inline: 'nearest',
                        behavior: 'smooth'
                    })
                }
            }
        })
        /**获取评论信息 */
        this.queryComent()
    }
    /**获取留言评论 */
    queryComent = () => {
        const id = this.props.location.search.split('=')[1]
        axios.post('/api/acticle/queryComments', { id }
        ).then(res => {
            if (res.status == 0) {
                this.setState({
                    comments: res.comments
                })
            }
        })
    }
    /**点赞 */
    praise = () => {
        const { currentId, detail } = this.state
        this.props.GlobalLoadingShow('加载中...')
        axios.post('/api/news/addPraise', { id: currentId }
        ).then(res => {
            this.props.DeleteGlobalLoading()
            if (res.status == 0) {
                this.setState({
                    detail: Object.assign({}, detail, { praise_num: detail.praise_num + 1 })
                })
            }
        })
    }
    /**编辑评论的内容 */
    textChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    /**取消回复 */
    cancelSend = () => {
        this.setState({
            value: '',
        })
    }
    /**发表评论 */
    sendNote = () => {
        const { value, currentId, detail } = this.state
        if (value == '') {
            message.warning('内容不能为空!')
            return
        }
        this.props.GlobalLoadingShow('加载中...')
        axios.post('/api/acticle/addComments', { id: currentId, content: value }
        ).then(res => {
            this.props.DeleteGlobalLoading()
            if (res.status == 0) {
                message.success('评论成功！')
                this.setState({
                    value: '',
                    detail: Object.assign({}, detail, { mes_num: detail.mes_num + 1 })
                })
                this.queryComent()
            }
        })
    }
    /**评论内容的点赞 */
    addCommentsPraise = (id) => {
        const { comments } = this.state
        this.props.GlobalLoadingShow('加载中...')
        axios.post('/api/acticle/addCommentsPraise', { id}
        ).then(res => {
            this.props.DeleteGlobalLoading()
            if (res.status == 0) {
                let detail, detailList = []
                comments.forEach(item => {
                    if (item._id == id) {
                        detail = Object.assign({}, item, { praise_num: item.praise_num + 1 })
                    } else {
                        detail = item
                    }
                    detailList.push(detail)
                })
                this.setState({
                    comments: detailList
                })
            }
        })
    }
    render () {

        const { detail, value, comments } = this.state 
        const tocify = new Tocify()
        const renderer = new marked.Renderer()
        renderer.heading = (text, level, raw) => {
            const anchor = tocify.add(text, level)
            return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
        }
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

        return (
            <div className="artical-share  front-home m-t60">
                {/* 回顶部  */}
                <BackTop />
                <div className="home-content" >
                    <div className="con-left" ref={ node => { this.commentEnd = node } }>
                        <div className="detail-content">
                            <div className="bread-div">
                                <Breadcrumb>
                                    <Breadcrumb.Item>
                                    <a href="/">首页</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        文章分享
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>{ detail.title }</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="detail-infos">
                                <div className="detail-intro">
                                    <div className="title">{ detail.title }</div>
                                    <div className="infos">
                                        <span className="par">
                                            <ScheduleOutlined />
                                            <i>{ detail.time }</i>
                                        </span>
                                        <span className="par">
                                            <EyeOutlined />
                                            <i>{ detail.read_num }</i>
                                        </span>
                                    </div>
                                </div>
                                {
                                    (detail && detail.content) && 
                                    <div dangerouslySetInnerHTML = {{__html: marked(detail.content)}}></div>
                                }
                                <div className="praise-note">
                                    <span className="par" onClick={ this.praise }>
                                        <LikeOutlined />
                                        <span>点赞</span>
                                        <i>{ detail.praise_num != 0 ? detail.praise_num : '' }</i>
                                    </span>
                                    <span className="par">
                                        <MessageOutlined />
                                        <span>留言</span>
                                        <i>{ detail.mes_num != 0 ? detail.mes_num : ''}</i>
                                    </span>
                                </div>
                                <div className="note-details" id="A1">
                                    <TextArea name="markdown" id="" cols="30" rows="3" maxLength="500" placeholder="想对作者说点什么" onChange={ this.textChange }></TextArea>
                                    <div className="send-note">
                                        还能输入{ 500 - value.length }个字符
                                    {   value != '' ?
                                        <Button onClick={ this.cancelSend }>取消回复</Button>
                                        : ''
                                    }
                                        <Button type="primary" danger onClick={ this.sendNote }>发表评论</Button>
                                    </div> 
                                </div> 
                                {
                                    comments.length ? 
                                    <div className="leaving-infos">
                                        <div className="tip-title">最新评论</div>
                                        <ul>
                                            {
                                                comments.map((item, index) => (
                                                    <li  key={`c${index}`}>
                                                        <div className="author-head">
                                                            <img src={require('./../../../public/image/' + item.author)}/>
                                                        </div>
                                                        <div className="comment-detail">
                                                            <div className="name-date">
                                                                <span>{ item.name }</span>
                                                                <span>{ item.date }</span>
                                                            </div>
                                                            <div className="content">{ item.content }</div>
                                                            <div className="praise">
                                                                <span className="answer">回复</span>
                                                                <span onClick={() => this.addCommentsPraise(item._id)}>
                                                                    <LikeOutlined /> { item.praise_num != 0 && item.praise_num }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li> 
                                                )) 
                                            }
                                        </ul>
                                    </div> : ''
                                }
                            </div>
                        </div>
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
                                    { (detail && detail.content) ? tocify && tocify.render() : <Skeleton />}
                                </div>
                            </div>
                        </Affix>
                    </div>
                </div>
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