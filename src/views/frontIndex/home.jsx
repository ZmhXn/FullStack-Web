import React, { Component } from 'react'
import { withRouter } from "react-router"
import { BackTop, Pagination, Affix } from 'antd'
import { MessageOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import axios from './../../config/http' 
import './../../../public/css/zmh.less'
import FootNav from './../../components/frontCom/Footer'
import HeadNav from './../../components/frontCom/Header'
import Author from './../../components/frontCom/Author'
import { DeleteGlobalLoading, GlobalLoadingShow } from "./../../redux/globalLoading"

class Home extends Component {
    constructor (props) {
        super (props)
        this.state = {
            currentIndex: 0,
            page: 1, //当前页
            pageSize: 10, //每页条数
            totalCount: 0, //总数
            newData: []
        }
    }
    componentDidMount () {
        this.init()
    }
    
    changeCurrent = (index) => {
        this.setState({
            currentIndex: index
        })
    }
    // 改变每页显示条目数
    onShowSizeChange = (current, pageSize) => {
        this.setState({
            pageSize
        }, () => this.init())
    }
    //受控制的页码
    onChange = page => {
        this.setState({
            page
        }, () => this.init())
    }
    showTotal = (total) => {
        return `共 ${total} 条`
    }
    //初始化
    init = () => {
        const { page, pageSize } = this.state
        this.props.GlobalLoadingShow('文章数据获取')
        axios.post('/api/news/queryNews', { page, pageSize }
        ).then(res => {
            this.props.DeleteGlobalLoading()
            if (res.status == 0) {
                this.setState({
                    newData: res.newsList,
                    totalCount: res.totalCount
                })
            }
        })
    }
    /**点赞 */
    praise = (id) => {
        const { newData } = this.state
        axios.post('/api/news/Addpraise', { id }
        ).then(res => {
            if (res.status == 0) {
                let detail, detailList = []
                newData.forEach(item => {
                    if (item._id == id) {
                        detail = Object.assign({}, item, { praise_num: item.praise_num + 1 })
                    } else {
                        detail = item
                    }
                    detailList.push(detail)
                })
                this.setState({
                    newData: detailList
                })
            }
        })
    }

    //js时间格式转换为几天前几小时几分钟等
    getDateDiff = (dateTimeStamp) => {
        dateTimeStamp = new Date(dateTimeStamp).getTime()
        let result
        var minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,
        now = new Date().getTime(),
        diffValue = now - dateTimeStamp
        var yearC = diffValue / year,
        monthC = diffValue / month,
        weekC = diffValue / (7 * day),
        dayC = diffValue / day, 
        hourC = diffValue / hour,
        minC = diffValue / minute
		if (yearC >= 1) {
			result = parseInt(yearC) + "年前"
		} else if (monthC >= 1) {
		 	result = parseInt(monthC) + "个月前"
		} else if (weekC >= 1) {
		 	result = parseInt(weekC) + "周前"
		} else if (dayC >= 1) {
		 	result = parseInt(dayC) + "天前"
		} else if (hourC >= 1) {
		 	result = parseInt(hourC) + "个小时前"
		} else if (minC >= 1) {
		 	result = parseInt(minC) + "分钟前"
		} else {
			result = "刚刚"
		}
		return result
    }
    
    //跳转详情页
    detail = (id, type) => {
        this.props.history.push(`/details?id=${id}`)
        sessionStorage.setItem("type", type)
    }
    render () {
        const { currentIndex, newData, totalCount, page, pageSize } = this.state
        return (
            <div>
                <HeadNav />
                <div className="front-home m-t60">
                    {/* 回顶部  */}
                    <BackTop />
                    <div className="con-top">
                        <ul className="select-con">
                            {
                                selectData.map((item, index) => (
                                    <li key={`s${index}`} className={ currentIndex == index ? 'current' : '' , "cont" } onClick={() => this.changeCurrent(index)}>
                                        { item.name }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="home-content">
                        <div className="con-left">
                            <ul className="details-con">
                                {
                                    newData.map((item, index) => (
                                        <li key={`n${index}`} className="cont"> 
                                            <div className="title" onClick={() => this.detail(item._id, 1)}>
                                                { item.title }
                                            </div>
                                            <div className="time">
                                                <span className="time-date">{ this.getDateDiff(item.time) }</span>
                                                <span className="time-type">{ item.type }</span>
                                            </div>
                                            <div className="content">
                                                { item.introduce }
                                            </div>
                                            <div className="praise">
                                                <span className="par" onClick={() => this.detail(item._id, 2)}>
                                                    <EyeOutlined />
                                                    <i>{ item.read_num }</i>
                                                </span>
                                                <span className="par" onClick={() => this.praise(item._id) }>
                                                    <LikeOutlined />
                                                    <i>{ item.praise_num }</i>
                                                </span>
                                                <span className="par" onClick={() => this.detail(item._id, 3)}>
                                                    <MessageOutlined />
                                                    <i>{ item.mes_num }</i>
                                                </span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            {/* 分页 */}
                            <Pagination
                                showSizeChanger
                                pageSizeOptions={['10', '15', '20','30']}
                                onShowSizeChange={this.onShowSizeChange}
                                onChange={this.onChange}
                                showTotal={this.showTotal}
                                current={page}
                                pageSize={pageSize}
                                total={totalCount}
                            />
                        </div>
                        <div className="common-right">
                            {/* 作者信息 */}
                            <Affix offsetTop={60}>
                                <Author />
                            </Affix>
                        </div>
                    </div>
                </div>
                <FootNav />
            </div>
        )
    }
}

const selectData = [
    {
        name: '热门',
    },
    {
        name: '最新',
    },
    {
        name: '热榜',
    }
]

export default connect(
    null,
    {   
        GlobalLoadingShow,
        DeleteGlobalLoading
    }
)(withRouter(Home))

