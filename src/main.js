import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "@/components/TypeNav";
import SwiperList from "@/components/SwiperList";
import Pagination from "@/components/Pagination";
import "@/mock/mock";

Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component(SwiperList.name, SwiperList);
Vue.component(Pagination.name, Pagination);

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
