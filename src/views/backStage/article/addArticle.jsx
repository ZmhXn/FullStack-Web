import React, { Component } from 'react'
import { withRouter } from "react-router"
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../../redux/globalLoading"
import { connect } from 'react-redux'

class AddArticle extends Component {
    constructor (props) {
        super (props)
        this.state = {
        }
    }

    render () {
        return (
            <div>
                <div className="">
                    添加文章
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
)(withRouter(AddArticle))