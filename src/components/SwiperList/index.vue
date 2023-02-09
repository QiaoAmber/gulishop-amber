<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.imageUrl" />
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
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";

export default {
  name: "SwiperList",
  props: ["bannerList"],
  watch: {
    bannerList: {
      immediate: true,
      handler(newV, oldV) {
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            loop: true,
            pagination: {
              el: ".swiper-pagination"
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      }
    }
  }

};
</script>

<style scoped>

</style>