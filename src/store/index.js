import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/modules/home";
import search from "@/store/modules/search";
import detail from "@/store/modules/detail";
import cart from "@/store/modules/cart";
import user from "@/store/modules/user";
import trade from "@/store/modules/trade";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    cart,
    user,
    trade,
  },
});
