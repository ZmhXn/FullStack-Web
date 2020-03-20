import React, { Component } from 'react';
import './../public/css/common.less'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import {LocaleProvider, Spin} from "antd";
import { connect } from "react-redux";
import Router from './route/router'
import 'antd/dist/antd.less'

class App extends Component {

    render () {
        return (
            <LocaleProvider locale={zh_CN}>
                <div className='init'>
                    {this.props.globalLoading.loading ?
                        <Spin size="large" className='globalLoading' spinning={true} delay={500}
                                tip={this.props.globalLoading.loadTip}/> : ""}
                    <Router />
                </div>
            </LocaleProvider>
        )
    }
}

export default connect( state => ({ globalLoading: state.globalLoading }))(App)
