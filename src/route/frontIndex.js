import React from 'react'
import { Route } from "react-router-dom"
//引入需要用到的页面组件 
import Home from './../views/frontIndex/home'
import About from './../views/frontIndex/about'
import ArticleSharing from './../views/frontIndex/articleSharing'
import Details from './../views/frontIndex/details'

function frontIndex () {
    return (
        <div>
            {/* 默认页面初始打开这个 */}
            <Route exact={true} path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/articlesharing" component={ArticleSharing} />
            <Route path="/about" component={About} />
            <Route path="/details" component={Details} />
        </div>
    )
}

export default frontIndex