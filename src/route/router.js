import React, { Component } from 'react'
//引入一些模块
import { BrowserRouter as Router } from "react-router-dom"
import FrontIndex from './frontIndex'
import BackStage from './backStage'

class router extends Component {

    render () {
        return (
            <Router>
                <FrontIndex />
                <BackStage />
            </Router>
        )
    }
}

export default router