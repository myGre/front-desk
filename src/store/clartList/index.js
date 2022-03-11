import { reqCartList, reqUpcheckCartList, reqDeleteCartList } from "../../api"
const actions = {
    // 获取购物车数据
    async getCartList({ commit }) {
        let resule = await reqCartList()
        if (resule.code == 200) {
            commit('GETCARTLIST', resule.data)
        }
    },
    // 删除某一条数据
    async deleteCartList({ commit }, skuId) {
        let resule = await reqDeleteCartList(skuId)
        // console.log(resule);
        if (resule == 200) {
            return 'ok'
        }
    },
    // 更新checked
    async updateCartList({ commit }, { skuId, isChecked }) {
        let resule = await reqUpcheckCartList(skuId, isChecked)
        // console.log(resule);
        if (resule == 200) {
            return 'ok'
        }
    },
    // 删除选中的商品
    deleteCartListAll(context) {
        let promiseAll = []
        let promise = context.getters.getCart.cartInfoList.forEach(item => {
            // 如果 isChecked ==1 则派发deleteCartList
            item.isChecked == 1 ? context.dispatch('deleteCartList', item.skuId) : ''
            promiseAll.push(promise)
        })
        // 如果数组里面全部成功，则返回成功，有一个失败则返回失败
        return Promise.all(promiseAll)
    },
    // 全选按钮状态的改变
    updateAllIsChecked({ dispatch, getters }, isChecked) {
        let promiseAll = []
        getters.getCart.cartInfoList.forEach(item=> {
            let promise = dispatch('updateCartList', {skuId: item.skuId, isChecked} )
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },

}
const mutations = {
    GETCARTLIST(state, cartObj) {
        state.cartObj = cartObj
    }
}
const state = {
    cartObj: []
}
const getters = {
    getCart(state) {
        return state.cartObj[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}