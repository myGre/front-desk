import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入路由页面
import routes from './router'
// 引入store
import store from '../store'
/* 
    重写push和replace方法
    ①二次封装方法
    ②apply和call
    相同点：都是执行一次方法
    不同点：apply返回的是一个数组，call返回的是原数据
 */
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 应用插件
Vue.use(VueRouter)

let router = new VueRouter({
    // 使用路由路由页面
    routes,
    // 页面跳转
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { X: 0, y: 0 }
    },

})
// 配置路由守卫
// 全局前置路由守卫
router.beforeEach(async (to, from, next)=>{
    // to: 跳到哪个页面
    // from：来自哪个页面
    // next(),是否放行
    let token = store.state.user.token
    let name = store.state.user.userObj.name
    if (token) {
        // 登录成功
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        }
        // 登录了，但跳转的不是login页面，要重新发请求获取信息，
        else{
            // 如果有用户信息
            if (name) {
                next()
            }else{
                // 没有用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效，重新登录
                    await store.dispatch('getLogout')
                    next('/login')
                }
            }
        }
    }
    // 未登录
    else{
        // let toPath = to.path
        // next()
        // if (toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/shop') != -1 ) {
        //     // 如果跳转的是以上页面，则重定向到登录页面
        //     next('/login?redirect='+ toPath)
        // }
        next()
    }

})


export default router