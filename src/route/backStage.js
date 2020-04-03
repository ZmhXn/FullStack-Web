import React from 'react'
import { Route } from "react-router-dom"
//引入需要用到的页面组件 
import Login from './../views/backStage/login'

function backStage () {
    return (
        <div>
            <Route path="/login" component={Login} />
        </div>
    )
}

export default backStage