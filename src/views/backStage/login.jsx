import React, { Component } from 'react'
import { withRouter } from "react-router"
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import axios from './../../config/http' 
import { connect } from 'react-redux'
import './../../../public/css/login.less'
class Login extends Component {
    constructor (props) {
        super (props)
        this.state = {
            verCodeImage: ''
        }
    }

    componentDidMount () {
        this.getVerCode()
    }
    getVerCode = () => {
        axios.get('/api/users/getVerCode')
        .then(res => {
            if (res.status == 0) {
                this.setState({
                    verCodeImage: res.verCode
                })
            } 
        })
    }
    onFinish = values => {
        axios.post('/api/users/login', values)
        .then(res => {
            if (res.status == 0) {
                this.props.history.push('/index')
            } else {
                this.getVerCode()
            }
        })
    }
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }
    render () {

        return (
            <div className="login">
                <div className="content">
                    <h3>后台博客系统</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{
                        //     remember: true,
                        // }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="user_name"
                            rules={[
                            {
                                required: true,
                                message: '请输入您的用户名!',
                            },
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="用户名" 
                            />
                        </Form.Item>
                        <Form.Item
                            name="user_password"
                            rules={[
                            {
                                required: true,
                                message: '请输入您的密码!',
                            },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <div className="verification-code">
                                <Form.Item
                                name="verification_code"
                                rules={[
                                {
                                    required: true,
                                    message: '请输入您的验证码!',
                                },
                                ]}
                            >
                                <Input
                                    placeholder="验证码"
                                />
                                
                            </Form.Item>
                            <div className="code" dangerouslySetInnerHTML={{__html: this.state.verCodeImage }}   onClick={this.getVerCode}></div>
                        </div>
                      
                        <Form.Item className="login-submit">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
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
)(withRouter(Login))