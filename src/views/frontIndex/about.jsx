import React, { Component } from 'react';
import { withRouter } from "react-router"
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"
import { connect } from 'react-redux'
 class About extends Component {
    render () {
        return (
            <div className="about-me m-t60">
                
               about
                
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