// 导入reqListContainer,reqBanner
import {reqListContainer, reqBanner, reqFloor} from '../../api'

// 处理业务
/* 
    async/await是用来处理传过来的params数据
*/
const actions = {
    // 处理三级联动业务
    async categoryList(context){
        let resule = await reqListContainer()
        if(resule.code == 200) {
            context.commit('CATEGORYLIST',resule.data)
        }
    },
    // 处理banner业务
    async categoryBanner(context){
        // console.log('开始发送请求了');
      let resule = await reqBanner()
        if (resule.code == 200) {
            context.commit('CATEGORYBANNER', resule.data)
        }
    },
    // 处理floor业务
    async reqFloorList(context){
        let resule = await reqFloor()
        if (resule.code == 200) {
            context.commit('REQFLOORLIST', resule.data)
        }
    }
}

// 处理数据
const mutations = {
    CATEGORYLIST(state, categoryListObj){
        // console.log(categoryListObj);
        state.categoryListObj = categoryListObj
    },
    CATEGORYBANNER(state, bannerObj){
        // console.log('处理数据完成');
        state.bannerObj = bannerObj
    },
    REQFLOORLIST(state, floorList){
        state.floorList = floorList
    }
}
// state存储值
const state = {
    // 初始数据
    categoryListObj:[],
    bannerObj:[],
    floorList:[]
}
// 可以对state存储值的数据进行加工
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}