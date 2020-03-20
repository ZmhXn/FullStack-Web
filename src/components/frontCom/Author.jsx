import React, { Component } from 'react'
import { Divider, Popover } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined, WeiboOutlined } from '@ant-design/icons'
import './../../../public/css/headFoot.less'
import headImg from './../../../public/image/head-portrait.png'

class Footer extends Component {
    render() {
        return (
            <div className='con-right'>
                <div className="author-introduce">
                    <div className="head-img">
                        <img src={ headImg } alt=""/>
                        <p>站在南极看企鹅</p>
                    </div>
                    <div className="detail">
                        <p>专注于WEB和移动前端开发</p>
                        <p className="motto">业精于勤、学无止境、工匠精神</p>
                        <div className="account">
                            <Divider>社交账号</Divider>
                            <div className="type">
                                <a href="https://github.com/ZmhXn" target="_blank">
                                    <span className="icon"><GithubOutlined /></span>
                                </a>
                                <Popover content='QQ: 624259125'  trigger="hover">
                                    <span className="icon"><QqOutlined /></span>
                                </Popover>
                                <Popover content='Wechat: zmhj214729'  trigger="hover">
                                    <span className="icon"><WechatOutlined /></span>
                                </Popover>
                                <Popover content='Weibo: 巴黎街的boy'  trigger="hover">
                                    <span className="icon"><WeiboOutlined /></span>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer