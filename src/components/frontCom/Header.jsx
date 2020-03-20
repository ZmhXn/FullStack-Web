import React, { Component } from 'react'
import { Menu, Avatar } from 'antd'
import './../../../public/css/headFoot.less'
import { HomeOutlined, ShareAltOutlined, TeamOutlined } from '@ant-design/icons'
import { withRouter } from "react-router"
import { NavLink } from 'react-router-dom'
import headImg from './../../../public/image/head-portrait.png'


class Header extends Component {
    state = {
        current: 'home',
    }
    handleClick= (e) => { //点击事件
        this.setState({ current: e.key })
    }
    render () {
        return (
            <div className="head-nav">
                <div className="nav-wrap">
                    <div className="nav-logo-wrap">
                        <Avatar src={ headImg } />
                        <span className="name">站在南极看企鹅</span>
                    </div>
                    <div className="nav-list-wrap">
                        <Menu
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            onClick={this.handleClick}
                        >
                            <Menu.Item key="home">
                                <NavLink  to="/home"  className='link' activeClassName='active'>
                                    <HomeOutlined />
                                    首页
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="article">
                                <NavLink  to="/articlesharing?id=1"  className='link' activeClassName='active'>
                                    <ShareAltOutlined />
                                    文章分享
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="aboutme">
                                <NavLink  to="/about"  className='link' activeClassName='active'>
                                    <TeamOutlined />
                                    关于我
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Header)