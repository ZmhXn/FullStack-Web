import React, { Component } from 'react'
import { withRouter } from "react-router"
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'

class HomePage extends Component {
    constructor (props) {
        super (props)
        this.state = {
        }
    }

    render () {
        return (
            <div>
                <div className="">
                    静则思，思则变，变则通，通则达
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
)(withRouter(HomePage))