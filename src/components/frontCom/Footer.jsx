import React, { Component } from 'react';
import './../../../public/css/headFoot.less'

class Footer extends Component {
    render() {
        return (
            <div className="footer-nav">
                <div className="footer-con">
                    My Blog | Copyright © 2020-present Evan You
                </div>
            </div>
        )
    }
}

export default Footer