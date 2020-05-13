import React from 'react'
import { Route } from "react-router-dom"
//引入需要用到的页面组件 
import Login from './../views/backStage/login'
import Index from './../views/backStage/index'

function backStage () {
    return (
        <div>
            <Route path="/login" component={Login} />
            <Route path="/index" component={Index} />
        </div>
    )
}

export default backStage