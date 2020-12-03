import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
//引入需要用到的页面组件 
import Login from './../views/backStage/login'
import MenuLayOut from './../views/backStage/menuLayOut'

function backStage () {
    return (
        <div>
            <Route path="/login" component={Login} />
            <Route path="/index" component={MenuLayOut} />
        </div>
    )
}

export default backStage