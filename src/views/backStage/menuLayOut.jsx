import React, { Component } from 'react'
import {
    HomeOutlined,
    FileAddOutlined,
    FileOutlined,
    MailOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    ExportOutlined
  } from '@ant-design/icons'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu
import { withRouter } from "react-router"
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'
import axios from './../../config/http' 
import './../../../public/css/login.less'
import headImg from './../../../public/image/head-portrait.png'
import { Route, Switch, Redirect } from "react-router-dom"
import AddArticle from './article/addArticle'
import HomePage from './homePage'

class MenuLayOut extends Component {
    constructor (props) {
        super (props)
        this.state = {
            collapsed: false, //左侧菜单展开折叠
            keyList: ['首页'], //默认页面
            keyDetail: [ //菜单栏的url
                {
                    name: '首页',
                    url: 'homePage'
                },
                {
                    name: '添加文章',
                    url: 'addArticle'
                },
                {
                    name: '文章列表',
                    url: 'articleList'
                },
                {
                    name: '留言',
                    url: 'leavingMessage'
                },
                {
                    name: '设置',
                    url: 'setUp'
                }
            ]
        }
    }
    componentDidMount () {
        this.state.keyDetail.forEach(item => {
            if (this.props.location.pathname.split('/')[2] == item.url) {
                this.setState({
                    keyList: [item.name]
                })
            }
        })
    }
    /** 
     * 
     */
    onCollapse = (collapsed) => {
        this.setState({
            collapsed
        })
    }
    handleClickArticle = (e) => {
        this.setState({
            keyList: e.keyPath
        })
        this.state.keyDetail.forEach(item => {
            if (item.name == e.key) {
                this.props.history.push('/index/' + item.url)
            }
        })
    }
    /**
     * 退出登录
     */
    loginOut = () => {
        axios.post('/api/users/loginOut')
        .then(res => {
            if (res.status == 0) {
                this.props.history.push('/login')
            } 
        })
    }

    render () {
        const { collapsed, keyList } = this.state
        
        return (
            <Layout style={{ minHeight: '100vh' }} className='index'>
                <Sider  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="head-img">
                        <img src={ headImg }  alt="" srcset=""/>
                        <p>站在南极看企鹅</p>
                    </div>
                    <Menu theme="dark" selectedKeys={keyList[0]} mode="inline">
                        <Menu.Item key="首页" onClick={this.handleClickArticle}>
                            <HomeOutlined />
                            <span>首页</span>
                        </Menu.Item>
                        <SubMenu
                            key="文章管理"
                            onClick={this.handleClickArticle}
                            title={
                                <span>
                                    <FileOutlined />
                                    <span>文章管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="添加文章">
                                <FileAddOutlined />
                                <span>添加文章</span> 
                            </Menu.Item>
                            <Menu.Item key="文章列表">
                                <UnorderedListOutlined />
                                <span>文章列表</span> 
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="留言管理" onClick={this.handleClickArticle}>
                            <MailOutlined /> 
                            <span>留言管理</span>
                        </Menu.Item>
                        <Menu.Item key="设置" onClick={this.handleClickArticle}>
                            <SettingOutlined /> 
                            <span>设置</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                    <Content style={{ margin: '0 16px' }}>
                        {
                            keyList.length == 1 ? 
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>{keyList[0]}</Breadcrumb.Item>
                            </Breadcrumb> :
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>{keyList[1]}</Breadcrumb.Item>
                                <Breadcrumb.Item>{keyList[0]}</Breadcrumb.Item>
                            </Breadcrumb>
                        }
                        <ul>
                            <li onClick={ this.loginOut }>
                                <ExportOutlined />
                                退出
                            </li>
                            </ul>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Route path="/index/homePage" component={HomePage}/>
                                <Route path="/index/addArticle" component={AddArticle}/>
                                <Redirect from="/index" to="/index/homePage" exact/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Mr.Zhang's blog</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    null,
    {   
        GlobalLoadingShow,
        DeleteGlobalLoading
    }
)(withRouter(MenuLayOut))