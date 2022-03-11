import { reqGetGoodsInfo, reqAddShopGood } from '../../api/index'
import { uuid } from '../../uuid'
const actions = {
    // 获取商品详情数据业务
    async getGoodsInfo(context, skuId) {
        let resule = await reqGetGoodsInfo(skuId)
        if (resule.code == 200) {
            context.commit('GETGOODSINFO', resule.data)
        }
    },
    /* 
        添加购物车
        没有其他数据返回，只进行路由跳转，不用三连环
        判断成功或失败，通过 promise
    */
    async addShopGood(context, { skuId, skuNum }) {
        let resule = await reqAddShopGood(skuId, skuNum)
        // console.log(resule);
        if (resule.code == 200) {
            return 'ok'
        }

    }
}
const mutations = {
    GETGOODSINFO(state, skuId) {
        state.skuId = skuId
    }
}
const state = {
    skuId: {},
    // 游客的ID
    uuid_token:uuid()
}
const getters = {
    categoryView(state) {
        return state.skuId.categoryView || {}
    },
    skuInfo(state) {
        return state.skuId.skuInfo || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}