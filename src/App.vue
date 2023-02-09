<template>
  <div class="outer">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isFootHide"></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    }
  },
  mounted() {
    this.getCategoryList();
  }
};
</script>
<style lang="less">

</style>
