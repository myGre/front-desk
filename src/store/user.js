import { reqGetPhoneCode, reqRegister, reqUserLogin, reqUserInfo, reqLogout } from '../api/index'
import { setToken, getToken, remverToken } from '../uuid/toden'
const actions = {
    // 获取手机验证码
    async getPhoneCode({ commit }, phone) {
        let resule = await reqGetPhoneCode(phone)
        // console.log(resule);
        if (resule.code == 200) {
            commit('GETPHONECODE', resule.data)
        } else {
            Promise.reject(new Error('farle'))
        }
    },
    // 注册账号
    async getRegister({ commit }, data) {
        let result = await reqRegister(data)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录页面
    async getLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 持久化存储
        // console.log(result.data.token);
        setToken(result.data.token)
        if (result.code == 200) {
            // token是服务器给用户传的一个令牌,唯一标识符
            commit('GETLOGIN', result.data.token)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async getLogout({ commit }) {
        let result = await reqLogout()
        // console.log(result);
        if (result.code == 200) {
            commit('GETLOGOUT')
        }
    }
}
const mutations = {
    // 获取验证码
    GETPHONECODE(state, code) {
        state.code = code
    },
    // 登录处理
    GETLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userObj) {
        state.userObj = userObj
    },
    // 退出登录
    GETLOGOUT(state){
        // 清空用户信息
        state.token = ''
        state.userObj = {}
        remverToken()
    }
}
const state = {
    code: '',
    token: getToken(),
    userObj: {}
}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}