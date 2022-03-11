import axios from "axios";
// 引入进度条
// start 代表开始 done 代表结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 创建一个axios实例,二次修改
const requests = axios.create({
    // baseURL 是请求时默认有/api
    baseURL: '/mock',
    // 请求延迟不能超过5S
    timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) =>{
    // 进度条开始
    nprogress.start()
    // config中包含重要的请求头headers
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 响应成功
    // 进度条结束
    nprogress.done()
    return res.data
}, (err)=>{
    // 响应失败
    return Promise.reject(new Error('404'))
})

export default requests