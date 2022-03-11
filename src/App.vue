<template>
  <div id="app">
    <Header v-show="$route.meta.see" ></Header>
    <!-- 路由出口文件 -->
    <router-view></router-view>
    <!-- Home Search 组件显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{Header, Footer},
  mounted(){
    // 通知vuex向服务器发送请求，获取数据，放在app组件的mounted函数中只发一次请求，优化请求
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
a{
  cursor: pointer;
}
a:hover{
  color: skyblue;
}
</style>
