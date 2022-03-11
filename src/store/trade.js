import {reqUserAddress, reqTrade} from '../api/index'
const actions = {
    // 获取用户地址
    async getUserAddress({commit}){
        let result =  await reqUserAddress()
        // console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取购物清单
    async getTrade({commit}){
        let result =  await reqTrade()
        // console.log(result);
        if (result.code == 200) {
            commit('GETTRADE', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, addressInfo){
        state.addressInfo = addressInfo
    },
    GETTRADE(state, trade){
        state.trade = trade
    }
}
const state = {
    addressInfo:{},
    trade:{}
}
const getters = {
    detailArrayList(state){
        return state.trade.detailArrayList || {}
    },
    orderDetailVoList(state){
        return state.trade.orderDetailVoList || {}
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}