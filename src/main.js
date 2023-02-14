import Vue from "vue";
import { Image, Message, MessageBox, Pagination as elPagination } from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "@/components/TypeNav";
import SwiperList from "@/components/SwiperList";
import Pagination from "@/components/Pagination";
import * as API from "@/api";
import "@/mock/mock";

Vue.use(Image);
Vue.use(elPagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component(SwiperList.name, SwiperList);
Vue.component(Pagination.name, Pagination);

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
