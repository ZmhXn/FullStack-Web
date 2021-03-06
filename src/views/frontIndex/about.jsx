import React, { Component } from 'react'
import { withRouter } from "react-router"
import FootNav from './../../components/frontCom/Footer'
import HeadNav from './../../components/frontCom/Header'
import Author from './../../components/frontCom/Author'
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'
 class About extends Component {
    constructor (props) {
        super (props)
        this.state = {
        }
    }

    render () {
        return (
            <div>
                <HeadNav />
                <div className="about-me m-t60">
                    <a href="/login">login</a>
                </div>
                <FootNav />
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
)(withRouter(About))