import React, { Component } from 'react'
import { withRouter } from "react-router"
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'
import './../../../public/css/login.less'
class Login extends Component {
    constructor (props) {
        super (props)
        this.state = {
        }
    }

    componentDidMount () {
    }

    render () {

        return (
            <div className="login">
                <div className="title">
                    后台博客系统
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