//引入react jsx写法的必须
import React from 'react'; 
//引入需要用到的页面组件 
import Home from './../views/frontIndex/home'
import About from './../views/frontIndex/about'
import ArticleSharing from './../views/frontIndex/articleSharing'
import Details from './../views/frontIndex/details'
//引入一些模块
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import HeadNav from './../components/frontCom/Header'
import FootNav from './../components/frontCom/Footer'

function router () {
    return (
        <Router>
            {/* <Switch> */}
                <HeadNav />
                {/* 默认页面初始打开这个 */}
                <Route exact={true} path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/articlesharing" component={ArticleSharing} />
                <Route path="/about" component={About} />
                <Route path="/details" component={Details} />
                <FootNav />
            {/* </Switch> */}
        </Router>
    )
}

export default router;