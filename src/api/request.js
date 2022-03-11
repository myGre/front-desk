import axios from "axios";
// 引入进度条
// start 代表开始 done 代表结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入vuex仓库
import store from '../store'
// 创建一个axios实例,二次修改
const requests = axios.create({
    // baseURL 是请求时默认有/api
    baseURL: '/api',
    // 请求延迟不能超过5S
    timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) =>{
    // 进度条开始
    nprogress.start()
    // config中包含重要的请求头headers
    if (store.state.detail.uuid_token) {
        // console.log(store);
        // 请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 添加用户token字段
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 响应成功
    // 进度条结束
    nprogress.done()
    // 返回获取到的数据
    return res.data
}, (err)=>{
    // 响应失败
    return Promise.reject(new Error('500'))
})

export default requests