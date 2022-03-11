import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
//引入全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
// 统一暴露api
import *  as API from './api'
// 引入store
import store from './store'
// 引入mockServer数据
import './mock/mockServer'
// 引入轮播图样式swiper
import 'swiper/css/swiper.css'
// 引入element UI
import { Button, MessageBox, Message, Popconfirm } from 'element-ui';
// 表单验证
import './plugins/validate'
// 注册使用elementUI
Vue.component(Button.name, Button);
Vue.component(Popconfirm .name, Popconfirm);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)



Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册store
  store,
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    // 注册全局API接口
    Vue.prototype.$API = API
  }
}).$mount('#app')
