<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carouselList in list.carouselList"
        :key="carouselList.id"
      >
        <img :src="carouselList.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper包
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  mounted(){
  },
  watch: {
    list: {
      immediate: true, // 初始化时监听一次
      handler(newValue, old) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            autoplay: true, //自动切换
            autoplay: {
              delay: 2000, //自动切换的时间间隔，单位ms
              disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
          mySwiper.el.onmouseover = function () {
            //鼠标放上暂停轮播
            mySwiper.autoplay.stop();
          };
          //鼠标离开继续轮播
          mySwiper.el.onmouseleave = function () {
            mySwiper.autoplay.start();
          };
        });
      },
    },
  },
};
</script>

<style>
</style>