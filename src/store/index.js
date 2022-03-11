// 导入包
import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)
// 导入小仓库home
import home from './home'
import Search from './Search'
import detail from './detail'
import clartList from './clartList'
import user from './user'
import trade from './trade'
export default new vuex.Store({
    // modules将小仓库放入大仓库
    modules: {
        home,
        Search,
        detail,
        clartList,
        user,
        trade
    }
})