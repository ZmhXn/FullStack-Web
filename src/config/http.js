import axios from 'axios'
import { message } from 'antd';  


//创建axios实例
const _axios = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 200000, // 请求超时时间
    headers: { 'content-type': 'application/json;charset=utf-8' },
    withCredentials: true, // 选项表明了是否是跨域请求 
})

/*
默认请求带loading效果，如果不需要loading,设置参数 authParams: {
    noLoading: true
}
默认请求后，会对数据判断，如果报错，统一处理，
如果不需要统一处理的，设置参数 authParams: {
    endNone: true
}
 
post请求在data后面加，如：
axios.post('xxxxurl',{
    name: ''
},{
    authParams: {
        noLoading: true
    }
})
 
get请求增加格式
axios.get('xxxurl',{
    authParams: {
        noLoading: true
    }
})
*/

const delayTime = 100; //设置相应时间超过100ms 才显示loading 否则不显示loading
let loadTimeout

//添加请求拦截器
_axios.interceptors.request.use(config => {
    if (!(config.authParams && config.authParams.noLoading)) {}
    return config;
}, err => {
    clearTimeout(loadTimeout)
    return Promise.reject(err)
})

// 添加响应拦截器
_axios.interceptors.response.use(
    response => {
        if (!(response.config.authParams && response.config.authParams.endNone)) {
            //请求成功后，根据数据进行判断，提示语或者返回首页
            if (response.data.status == 1) {
                message.error(response.data.message || response.data.msg,'提示');
            }
            else if (response.data.status == 2) {  //去登录
                message.error(response.data.message || response.data.msg,'提示',{
                    callback: action => {
                        // router.push(
                        //     {
                        //         path: '/login',
                        //         query: {
                        //             redirect: router.currentRoute.fullPath
                        //         }
                        //     }
                        // )
                    }
                });
            }
        }
        return response.data
    },
    error => {
        if (!(error.response.config.authParams && error.response.config.authParams.endNone)) {
            switch (error.response.status) {
                case 404:
                    message.error('系统异常，请稍后再试','提示');
                    break;
                case 500:
                    message.error('网络异常，请稍后再试','提示');
                    break;
                default:
                    message.error('网络异常，请稍后再试','提示')
            }
        }
        return Promise.reject(error)
    }
)
export default _axios