<template>
  <div>
    <!-- 引用三级联动组件模板 -->
    <TypeNav></TypeNav>
    <!-- 列表 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 爱好 -->
    <Like></Like>
    <!-- 楼层 -->
    <HomeFloor v-for="floor in floorList" :key="floor.id" :list='floor'></HomeFloor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
// 注册组件
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import HomeFloor from "./HomeFloor";
import Brand from "./Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    HomeFloor,
    Brand,
  },
  mounted() {
    // 获取底部信息
    this.$store.dispatch("reqFloorList");
    // 获取用户信息
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
</style>
