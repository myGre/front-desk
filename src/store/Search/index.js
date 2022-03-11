import { reqGetSearchList } from "../../api"

const actions = {
    // parme={}, 如果没有传，默认为空对象
    async getSearch(context, parme={}){
        // console.log(parme);
      let resule =  await reqGetSearchList(parme)
      if(resule.code == 200) {
          context.commit('GETSEARCH', resule.data)
      }
    }
}
const mutations = {
    GETSEARCH(state, getSearchObj){
        state.getSearchObj = getSearchObj
    }
}
const state = {
    getSearchObj:{}
}
// 计算属性
const getters = {
    goodsList(state){
        return state.getSearchObj.goodsList || []
    },
    attrsList(state){
        return state.getSearchObj.attrsList
    },
    trademarkList(state){
        return state.getSearchObj.trademarkList
    },
}

export default {
    actions,
    mutations,
    state,
    getters
}